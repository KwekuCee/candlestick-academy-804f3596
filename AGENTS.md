<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Imported Candlesticks Academy pages live in `src/app/` and use `src/app/routerCompat.tsx` for links/navigation; keep it instead of adding react-router (TanStack Router is fixed).
- SSR is off app-wide (`defaultSsr: false` in `src/start.ts`) because the imported pages read browser storage while rendering.
- Former Vite dev-middleware endpoints are TanStack server routes under `src/routes/api/` with the same URLs the pages already call.
- Imported pages use the generated Supabase client through their compatibility export so sessions and opaque publishable-key handling stay consistent.
- Trusted privileges live in `public.user_roles`; Exness server operations validate bearer sessions and require a trusted admin role for partner-wide syncs, never browser admin flags.
- Environment uploads are never copied into source; private credentials use encrypted runtime secrets and server code reads `SUPABASE_URL`, not browser configuration.
