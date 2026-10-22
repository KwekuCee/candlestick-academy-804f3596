# System database and settings audit

## Live payments, portals and branded emails

- [x] Secure server-only Moolre initiation and provider reconciliation with atomic student updates; verification and reconciliation tests pass.
- [x] Request and securely store live Moolre credentials and shared callback secret.
- [x] Implement trusted-role portal redirects and logout to the apex domain.
- [x] Create branded signup/login/payment/support/blog/contact email templates.
- [x] Apply Manrope throughout the app, chart/certificate output and emails.
- [x] Connect Resend, verify candlesticksacademy.online and wire welcome/login notifications, confirmed-payment receipts and persisted support-ticket acknowledgements; 36 tests pass and unsigned welcome requests return 401.
- [ ] Confirm inbox delivery — Resend accepted the requested test to essilfim3@gmail.com but reported it bounced; recipient confirmation or another test address needed.
- [ ] Contact/blog sending — templates are ready, but no contact submission or blog event exists in the imported app to wire.
- [ ] Verify a real live payment and duplicate callbacks update the student only once — blocked on published custom domains, Moolre callback configuration and a real authorized payment; automated rule/reconciliation tests and unsigned browser checks passed, authenticated checks unavailable for external Supabase.
- [ ] Verify sign-in across production subdomains and logout — blocked on published domains and real sign-in; external Supabase does not provide a managed test session.

- [x] Compare every app table and column against the connected Supabase schema.
- [x] Apply non-destructive missing schema updates with protected access.
- [x] Align the app with the connected Supabase client and verify database reads.
- [x] Save third-party credentials through secure secret storage; never copy the uploaded environment file into source.
- [x] Report existing security issues and remaining connection limitations: broad legacy access and imported login need repair; Moolre settings are stored but its existing browser payment flow is not migrated or verified.
- [ ] Verify live Exness sync as an administrator — blocked on identifying and approving a real Supabase administrator account; no privileges inferred from legacy student roles.

## SEO findings

- [x] Correct public headings and accessible content names; all six public routes verified in the browser.
- [x] Correct social text and page addresses on all 29 content routes; homepage uses a verified 1200×630 mentor sharing image (77 KB).

## Homepage, admin and live studio updates

- [x] Mentor photo cropped to face and shoulders, served as WebP (56 KB); mentor renamed Kwekucandles.
- [x] Admin-managed student reviews shown on the homepage; collapsible themed FAQ.
- [x] Master admin account (username master) created; sign-in verified.
- [x] Screen share asks for a real screen first, then goes live; fake demo screens removed; RTMP fields cleared with provider guidance.
- [x] Admin can switch to client view and back; client overview redesigned.
- [ ] Hosted RTMP ingest — needs a streaming provider account (Cloudflare Stream, Mux or YouTube Live); our hosting cannot run an RTMP server.
