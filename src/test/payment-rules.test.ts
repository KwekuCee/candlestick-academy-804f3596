import { describe, expect, it } from 'vitest';
import { checkoutInput, planPrice, verifiedOutcome } from '@/server/payment-rules';
import { validCallbackSecret } from '@/server/moolre-webhook';
import { portalDestination, logoutDestination } from '@/lib/portal-domains';
const expected = { external_ref: 'CSA-test-reference', amount: 310, currency: 'GHS', account_number: 'wallet-test' };
const success = { status: 1, data: { txstatus: 1, externalref: expected.external_ref, amount: '310.00', accountnumber: expected.account_number, transactionid: 'provider-1' } };
describe('Verified payments', () => {
  it('charges the existing $20 monthly plan as GHS 310', () => expect(planPrice('monthly_20')).toEqual({ usd: 20, amount: 310, currency: 'GHS' }));
  it('charges the existing $100 permanent plan as GHS 1550', () => expect(planPrice('permanent_100')).toEqual({ usd: 100, amount: 1550, currency: 'GHS' }));
  it('confirms a matching provider-verified payment', () => expect(verifiedOutcome(success, expected).status).toBe('PAID'));
  it('does not fulfill an initiation response', () => expect(() => verifiedOutcome({ status: 1, code: 'TR099', data: 'prompt-id' }, expected)).toThrow());
  it('does not fulfill a pending payment', () => expect(verifiedOutcome({ ...success, data: { ...success.data, txstatus: 0 } }, expected).status).toBe('PENDING'));
  it('does not fulfill a failed payment', () => expect(verifiedOutcome({ ...success, data: { ...success.data, txstatus: 2, amount: '0', transactionid: null } }, expected).status).toBe('FAILED'));
  it.each(['amount', 'externalref', 'accountnumber', 'currency', 'transactionid'])('rejects mismatched %s', field => {
    const values = { amount: '309', externalref: 'other-ref', accountnumber: 'other-wallet', currency: 'NGN', transactionid: null };
    expect(() => verifiedOutcome({ ...success, data: { ...success.data, [field]: values[field as keyof typeof values] } }, expected)).toThrow();
  });
  it('rejects an unverifiable provider response', () => expect(() => verifiedOutcome({ status: 0, data: null }, expected)).toThrow());
  it('rejects checkout with missing mobile-money phone', () => expect(checkoutInput.safeParse({ plan: 'monthly_20', method: 'mobile_money', requestId: '4c858f06-154e-4c3c-bf26-f1e8d41af2ab' }).success).toBe(false));
  it('requires the expected callback secret', async () => expect(await validCallbackSecret('wrong-test-value', 'expected-test-value')).toBe(false));
});
describe('Production portal domains', () => {
  it('routes admins to master', () => expect(portalDestination('admin')).toBe('https://master.candlesticksacademy.online/admin'));
  it('routes students to student', () => expect(portalDestination('student')).toBe('https://student.candlesticksacademy.online/dashboard'));
  it('returns admin logout to the apex', () => expect(logoutDestination('master.candlesticksacademy.online')).toBe('https://candlesticksacademy.online/'));
  it('returns student logout to the apex', () => expect(logoutDestination('student.candlesticksacademy.online')).toBe('https://candlesticksacademy.online/'));
  it('rejects external redirect paths', () => expect(portalDestination('student', '//evil.example')).toBe('https://student.candlesticksacademy.online/dashboard'));
});