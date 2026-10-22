import { z } from 'zod';
import { bearerUser, sameOrigin } from './portal-auth';
import { checkoutInput, planPrice, verifiedOutcome } from './payment-rules';

function config() {
  const user = process.env['MOOLRE_API_USER'];
  const key = process.env['MOOLRE_PUBLIC_KEY'];
  const account = process.env['MOOLRE_ACCOUNT_NUMBER'];
  if (!user || !key || !account) throw new Error('Live Moolre credentials are not configured.');
  if (process.env['MOOLRE_CURRENCY'] && process.env['MOOLRE_CURRENCY'] !== 'GHS') throw new Error('The payment wallet must use GHS for the displayed plans.');
  // Moolre collection/status APIs require PUBKEY, not a guessed private-key header.
  return { user, key, account };
}
async function moolre(path: string, body: unknown) {
  const cfg = config();
  const res = await fetch(`https://api.moolre.com${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-API-USER': cfg.user, 'X-API-PUBKEY': cfg.key }, body: JSON.stringify(body), signal: AbortSignal.timeout(20000) });
  const raw = await res.text();
  if (!res.ok) {
    // Do not print provider bodies: callbacks/errors may contain credentials.
    throw new Error(`Moolre request failed (${res.status}). Please check the merchant configuration.`);
  }
  const data = JSON.parse(raw);
  if (Number(data.status) !== 1) throw new Error(`Moolre declined this request (${String(data.code || 'unknown')}). Please check the payment details.`);
  return data;
}
async function adminClient() { return (await import('@/integrations/supabase/client.server')).supabaseAdmin; }
export async function reconcilePayment(ref: string) {
  const admin = await adminClient();
  const { data: attempt, error } = await admin.from('moolre_payment_attempts').select('*').eq('external_ref', ref).single();
  if (error || !attempt) throw new Error('Payment record not found.');
  const status = await moolre('/open/transact/status', { type: 1, idtype: 1, id: ref, accountnumber: attempt.account_number });
  const outcome = verifiedOutcome(status, attempt);
  if (outcome.status === 'PAID') {
    const { error: confirmError } = await admin.rpc('confirm_moolre_payment', { p_ref: ref, p_transaction_id: outcome.transactionId, p_amount: outcome.amount, p_account: outcome.account });
    if (confirmError) throw new Error('Payment verified, but account update is pending. Please check again.');
  } else if (outcome.status === 'FAILED' && attempt.status !== 'PAID') {
    const { error: updateError } = await admin.from('moolre_payment_attempts').update({ status: 'FAILED' }).eq('id', attempt.id).neq('status', 'PAID');
    if (updateError) throw new Error('Unable to record payment status.');
  }
  const { data: updated, error: readError } = await admin.from('moolre_payment_attempts').select('*').eq('id', attempt.id).single();
  if (readError || !updated) throw new Error('Unable to read payment confirmation.');
  if (updated.status === 'PAID') {
    const { data: student } = await admin.from('students').select('email,full_name').eq('id', updated.student_id).single();
    if (student?.email) {
      try {
        const { sendEventEmail } = await import('./academy-emails');
        await sendEventEmail('payment', student.email, updated.id, { name: student.full_name, reference: updated.external_ref, amount: `${updated.currency} ${Number(updated.amount).toFixed(2)}`, actionUrl: 'https://student.candlesticksacademy.online/dashboard' });
      } catch { console.error('Verified payment receipt unavailable; payment remains confirmed'); }
    }
  }
  return updated;
}
export async function paymentAction(request: Request, action: 'checkout' | 'verify') {
  if (!sameOrigin(request)) return Response.json({ message: 'Request origin not allowed.' }, { status: 403 });
  let identity;
  try { identity = await bearerUser(request); } catch { return Response.json({ message: 'Please sign in to make a payment.' }, { status: 401 }); }
  try {
    const admin = await adminClient();
    if (action === 'verify') {
      const { reference } = z.object({ reference: z.string().min(10).max(120) }).parse(await request.json());
      const { data: own } = await identity.client.from('moolre_payment_attempts').select('user_id').eq('external_ref', reference).single();
      if (!own || own.user_id !== identity.user.id) return Response.json({ message: 'Payment not found.' }, { status: 404 });
      const attempt = await reconcilePayment(reference);
      const { data: student } = await identity.client.from('students').select('subscription_tier,subscription_ends_at,trial_ends_at').eq('id', attempt.student_id).single();
      return Response.json({ success: attempt.status === 'PAID', status: attempt.status, student, message: attempt.status === 'PAID' ? 'Payment confirmed. Your membership has been updated.' : attempt.status === 'FAILED' ? 'Payment failed. Your membership has not changed.' : 'Awaiting Moolre confirmation. Your membership has not changed.' });
    }
    const input = checkoutInput.parse(await request.json());
    const { data: student, error: studentError } = await identity.client.from('students').select('id,email,full_name').eq('auth_user_id', identity.user.id).single();
    if (studentError || !student) throw new Error('Your student profile must be linked to your signed-in account before paying.');
    const cfg = config();
    const price = planPrice(input.plan);
    const ref = `CSA-${identity.user.id}-${input.requestId}`;
    let { data: attempt } = await admin.from('moolre_payment_attempts').select('*').eq('external_ref', ref).maybeSingle();
    if (attempt) return Response.json({ success: true, transaction: attempt, paymentUrl: attempt.authorization_url, message: 'Payment request already recorded. Check its status before trying again.' });
    const { data: created, error: createError } = await admin.from('moolre_payment_attempts').insert({ external_ref: ref, user_id: identity.user.id, student_id: student.id, plan: input.plan, amount_usd: price.usd, amount: price.amount, currency: price.currency, account_number: cfg.account }).select('*').single();
    if (createError || !created) throw new Error('Unable to create payment record.');
    attempt = created;
    let url: string | null = null;
    const body = { type: 1, amount: price.amount.toFixed(2), currency: price.currency, externalref: ref, accountnumber: cfg.account };
    try {
      if (input.method === 'moolre_link') {
        const response = await moolre('/embed/link', { ...body, email: 'payments@candlesticksacademy.online', reusable: '0', expiration_time: 30, callback: 'https://student.candlesticksacademy.online/api/public/payments/moolre-webhook', redirect: 'https://student.candlesticksacademy.online/dashboard' });
        url = z.string().url().parse(response.data?.authorization_url);
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:' || !['pos.moolre.com', 'pay.moolre.com'].includes(parsed.hostname)) throw new Error('Unexpected Moolre checkout destination.');
        const { error: saveError } = await admin.from('moolre_payment_attempts').update({ authorization_url: url }).eq('id', created.id);
        if (saveError) throw new Error('Checkout created; its link could not be saved. Check the existing payment reference.');
      } else {
        const response = await moolre('/open/transact/payment', { ...body, payer: (input.phone || '').replace(/[\s-]/g, ''), channel: String({ MTN: 13, Telecel: 6, AT: 7 }[input.network]), reference: `Candlesticks Academy ${input.plan}` });
        if (response.code === 'TP14') throw new Error('Moolre requires phone verification. Complete the SMS verification, then use hosted checkout.');
      }
    } catch (err) {
      return Response.json({ success: false, transaction: created, message: err instanceof Error ? err.message : 'Payment request outcome is uncertain. Check its status before paying again.' }, { status: 502 });
    }
    return Response.json({ success: true, transaction: { ...attempt, authorization_url: url }, paymentUrl: url, message: url ? 'Checkout ready. Membership changes only after Moolre confirms payment.' : 'Approve the payment on your phone, then check payment status.' });
  } catch (error) {
    return Response.json({ success: false, message: error instanceof z.ZodError ? error.issues[0]?.message : error instanceof Error ? error.message : 'Payment could not be processed.' }, { status: 400 });
  }
}