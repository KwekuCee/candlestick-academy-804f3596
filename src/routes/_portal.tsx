import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";

// Pathless layout: PortalLayout renders <Outlet /> for every portal page.
export const Route = createFileRoute("/_portal")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const store = await import("@/app/exnessStore");
    await store.hydrateCrossDomainSession();
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login" });
    if (location.pathname.startsWith("/admin") && !store.isMasterAdminAuthenticated())
      throw redirect({ to: "/dashboard" });
  },
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "PortalLayout"),
});
