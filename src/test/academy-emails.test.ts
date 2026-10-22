import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { emailSenders } from '@/lib/email-templates/academy-email';
import { sendAcademyEmail } from '@/server/academy-emails';
describe('Resend feature sends', () => {
  beforeEach(() => { vi.stubEnv('RESEND_API_KEY', 'test-connection'); vi.stubEnv('LOVABLE_API_KEY', 'test-app'); });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it.each([
    ['signup', 'noreply@candlesticksacademy.online'], ['login', 'noreply@candlesticksacademy.online'],
    ['payment', 'payments@candlesticksacademy.online'], ['support', 'support@candlesticksacademy.online'],
    ['blog', 'info@candlesticksacademy.online'], ['contact', 'contact@candlesticksacademy.online'],
  ] as const)('uses the requested %s sender', (kind, sender) => expect(emailSenders[kind]).toBe(sender));
  it('sends one payment receipt through the gateway with a stable event key', async () => {
    const fetcher = vi.fn(async () => Response.json({ id: 'message-test' })); vi.stubGlobal('fetch', fetcher);
    await sendAcademyEmail('payment', 'recipient@example.com', 'attempt-123', { amount: 'GHS 310.00' });
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, options] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://connector-gateway.lovable.dev/resend/emails');
    expect(new Headers(options.headers).get('Idempotency-Key')).toBe('payment-attempt-123');
    expect(JSON.parse(String(options.body))).toMatchObject({ to: ['recipient@example.com'], from: 'Candlesticks Academy <payments@candlesticksacademy.online>' });
  });
  it('rejects invalid recipients before contacting Resend', async () => {
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    await expect(sendAcademyEmail('login', 'invalid', 'test')).rejects.toThrow(); expect(fetcher).not.toHaveBeenCalled();
  });
  it('reports failed delivery instead of reporting an email sent', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ name: 'validation_error' }, { status: 403 })));
    await expect(sendAcademyEmail('support', 'recipient@example.com', 'test')).rejects.toThrow('(403)');
  });
});