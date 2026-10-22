import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/sessions")({
  head: () => ({ meta: [{ title: "Admin Sessions | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminLiveSessionsPage"),
});
