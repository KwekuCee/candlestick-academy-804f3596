import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/trades")({
  head: () => ({
    meta: [
      { title: "Trading Journal | Candlesticks Academy" },
      { name: "description", content: "Record and review your trades, risk calculations and trading performance in Candlesticks Academy." },
      { property: "og:title", content: "Trading Journal | Candlesticks Academy" },
      { property: "og:description", content: "Record and review your trades, risk calculations and trading performance in Candlesticks Academy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/trades" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/trades" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "TradesPage"),
});
