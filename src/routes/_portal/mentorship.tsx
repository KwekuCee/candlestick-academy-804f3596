import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/mentorship")({
  head: () => ({ meta: [{ title: "Mentorship | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "Mentorship1on1Page"),
});
