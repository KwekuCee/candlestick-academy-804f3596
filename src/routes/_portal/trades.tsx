import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/trades")({
  head: () => ({ meta: [{ title: "Trades | Candlesticks Academy" }, { name: "description", content: "Trades at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Trades | Candlesticks Academy" }, { property: "og:description", content: "Trades at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "TradesPage"),
});
