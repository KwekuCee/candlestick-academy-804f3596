import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/live/$sessionId")({
  head: ({ params }) => ({
    meta: [
      { title: "Live Trading Classroom | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Join a Candlesticks Academy live trading classroom with market analysis, resources and student chat.",
      },
      { property: "og:title", content: "Live Trading Classroom | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Join a Candlesticks Academy live trading classroom with market analysis, resources and student chat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/sessions/live/${params.sessionId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/sessions/live/${params.sessionId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LiveRoomPage"),
});
