import { z } from 'zod';
import { reconcilePayment } from './moolre';
export async function validCallbackSecret(received: string, expected: string) {
  const encode = new TextEncoder();
  const [a, b] = await Promise.all([crypto.subtle.digest('SHA-256', encode.encode(received)), crypto.subtle.digest('SHA-256', encode.encode(expected))]);
  const aa = new Uint8Array(a), bb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}
export async function paymentWebhook(request: Request) {
  const secret = process.env['MOOLRE_CALLBACK_SECRET'];
  if (!secret) return Response.json({ message: 'Payment callbacks are not configured.' }, { status: 503 });
  try {
    const text = await request.text();
    if (text.length > 16384) return new Response(null, { status: 413 });
    const input = z.object({ data: z.object({ externalref: z.string().min(10).max(120), secret: z.string().min(1).max(4096) }) }).parse(JSON.parse(text));
    if (!await validCallbackSecret(input.data.secret, secret)) return new Response(null, { status: 401 });
    // Never trust callback status/amount. Read the final state directly from Moolre.
    await reconcilePayment(input.data.externalref);
    return Response.json({ received: true });
  } catch { return Response.json({ message: 'Payment reconciliation unavailable. Retry this callback.' }, { status: 503 }); }
}