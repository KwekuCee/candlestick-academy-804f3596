import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/$signalId")({
  head: ({ params }) => ({
    meta: [
      { title: "Educational Trade Setup | Candlesticks Academy" },
      { name: "description", content: "Review this Candlesticks Academy trading signal with entry levels, risk targets and market reasoning." },
      { property: "og:title", content: "Educational Trade Setup | Candlesticks Academy" },
      { property: "og:description", content: "Review this Candlesticks Academy trading signal with entry levels, risk targets and market reasoning." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/signals/${params.signalId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/signals/${params.signalId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalDetailPage"),
});
