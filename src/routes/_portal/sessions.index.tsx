import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/")({
  head: () => ({ meta: [{ title: "Live Sessions | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SessionSchedulePage"),
});
