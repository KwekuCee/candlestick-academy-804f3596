import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/$signalId")({
  head: () => ({ meta: [{ title: "Signal | Candlesticks Academy" }, { name: "description", content: "Signal at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Signal | Candlesticks Academy" }, { property: "og:description", content: "Signal at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalDetailPage"),
});
