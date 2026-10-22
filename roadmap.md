# System database and settings audit

- [x] Compare every app table and column against the connected Supabase schema.
- [x] Apply non-destructive missing schema updates with protected access.
- [x] Align the app with the connected Supabase client and verify database reads.
- [x] Save third-party credentials through secure secret storage; never copy the uploaded environment file into source.
- [x] Report existing security issues and remaining connection limitations: broad legacy access and imported login need repair; Moolre settings are stored but its existing browser payment flow is not migrated or verified.
- [ ] Verify live Exness sync as an administrator — blocked on identifying and approving a real Supabase administrator account; no privileges inferred from legacy student roles.