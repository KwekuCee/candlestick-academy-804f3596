# System database and settings audit

## Live payments, portals and branded emails
- [x] Secure server-only Moolre initiation and provider reconciliation with atomic student updates; verification and reconciliation tests pass.
- [x] Request and securely store live Moolre credentials and shared callback secret.
- [x] Implement trusted-role portal redirects and logout to the apex domain.
- [x] Create branded signup/login/payment/support/blog/contact email templates.
- [x] Apply Manrope throughout the app, chart/certificate output and emails.
- [ ] Wire Resend account, payment and support events and verify sending — Resend connected and candlesticksacademy.online verified.
- [ ] Verify a real live payment and duplicate callbacks update the student only once — blocked on published custom domains, Moolre callback configuration and a real authorized payment; automated rule/reconciliation tests and unsigned browser checks passed, authenticated checks unavailable for external Supabase.
- [ ] Verify sign-in across production subdomains and logout — blocked on published domains and real sign-in; external Supabase does not provide a managed test session.

- [x] Compare every app table and column against the connected Supabase schema.
- [x] Apply non-destructive missing schema updates with protected access.
- [x] Align the app with the connected Supabase client and verify database reads.
- [x] Save third-party credentials through secure secret storage; never copy the uploaded environment file into source.
- [x] Report existing security issues and remaining connection limitations: broad legacy access and imported login need repair; Moolre settings are stored but its existing browser payment flow is not migrated or verified.
- [ ] Verify live Exness sync as an administrator — blocked on identifying and approving a real Supabase administrator account; no privileges inferred from legacy student roles.