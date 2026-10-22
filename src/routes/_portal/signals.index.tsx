import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/")({
  head: () => ({ meta: [{ title: "Signals | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFeedPage"),
});
