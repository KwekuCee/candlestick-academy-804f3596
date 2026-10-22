# System database and settings audit

## Live payments, portals and branded emails
- [ ] Secure Moolre initiation and server verification with atomic student updates; test failures and duplicate confirmations.
- [ ] Request live Moolre credentials and Resend connection; verify provider configuration.
- [ ] Secure role-based portal redirects and logout to the apex domain.
- [ ] Create branded signup/login/payment/support/blog/contact email templates and wire supported events.
- [ ] Apply Manrope throughout the app and emails.
- [ ] Verify end-to-end flows; report external setup blockers.

- [x] Compare every app table and column against the connected Supabase schema.
- [x] Apply non-destructive missing schema updates with protected access.
- [x] Align the app with the connected Supabase client and verify database reads.
- [x] Save third-party credentials through secure secret storage; never copy the uploaded environment file into source.
- [x] Report existing security issues and remaining connection limitations: broad legacy access and imported login need repair; Moolre settings are stored but its existing browser payment flow is not migrated or verified.
- [ ] Verify live Exness sync as an administrator — blocked on identifying and approving a real Supabase administrator account; no privileges inferred from legacy student roles.