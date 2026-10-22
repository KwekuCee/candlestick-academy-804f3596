import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/replay/$sessionId")({
  head: () => ({ meta: [{ title: "Replay | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "ReplayPage"),
});
