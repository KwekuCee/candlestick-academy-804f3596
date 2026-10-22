import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/$signalId")({
  head: () => ({ meta: [{ title: "Signal | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalDetailPage"),
});
