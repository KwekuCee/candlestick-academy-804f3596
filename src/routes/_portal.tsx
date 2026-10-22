import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

// Pathless layout: PortalLayout renders <Outlet /> for every portal page.
export const Route = createFileRoute("/_portal")({
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "PortalLayout"),
});
