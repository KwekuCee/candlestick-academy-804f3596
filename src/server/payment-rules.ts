import { z } from 'zod';

export const checkoutInput = z.object({
  plan: z.enum(['monthly_20', 'permanent_100']),
  method: z.enum(['mobile_money', 'moolre_link']),
  network: z.enum(['MTN', 'Telecel', 'AT']).default('MTN'),
  phone: z.string().max(30).optional(),
  requestId: z.string().uuid(),
}).superRefine((v, ctx) => {
  if (v.method === 'mobile_money' && !/^0\d{9}$/.test((v.phone || '').replace(/[\s-]/g, ''))) {
    ctx.addIssue({ code: 'custom', message: 'Enter a 10-digit mobile money number starting with 0.', path: ['phone'] });
  }
});

// Server-owned prices; browser settings never determine the charge.
export function planPrice(plan: 'monthly_20' | 'permanent_100') {
  const usd = plan === 'permanent_100' ? 100 : 20;
  return { usd, amount: usd * 15.5, currency: 'GHS' as const };
}
export function verifiedOutcome(raw: unknown, expected: { external_ref: string; amount: number; account_number: string; currency: string }) {
  const envelope = z.object({ status: z.coerce.number(), data: z.unknown() }).parse(raw);
  if (envelope.status !== 1) throw new Error('Moolre could not verify this payment. Please check again later.');
  const data = z.object({ txstatus: z.coerce.number().int(), externalref: z.string(), accountnumber: z.string(), amount: z.coerce.number().finite(), transactionid: z.union([z.string(), z.number(), z.null()]).optional(), currency: z.string().optional() }).parse(envelope.data);
  if (data.externalref !== expected.external_ref || data.accountnumber !== expected.account_number || (data.currency && data.currency !== expected.currency)) throw new Error('Payment verification details do not match.');
  if (data.txstatus !== 1) return { status: data.txstatus === 2 ? 'FAILED' as const : 'PENDING' as const };
  if (Math.round(data.amount * 100) !== Math.round(Number(expected.amount) * 100) || !data.transactionid) throw new Error('Payment verification amount or transaction reference does not match.');
  return { status: 'PAID' as const, transactionId: String(data.transactionid), amount: data.amount, account: data.accountnumber };
}