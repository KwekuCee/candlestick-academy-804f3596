import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/replay/$sessionId")({
  head: ({ params }) => ({
    meta: [
      { title: "Trading Session Replay | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Watch a recorded Candlesticks Academy market session and review its chapters and resources.",
      },
      { property: "og:title", content: "Trading Session Replay | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Watch a recorded Candlesticks Academy market session and review its chapters and resources.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/sessions/replay/${params.sessionId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/sessions/replay/${params.sessionId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "ReplayPage"),
});
