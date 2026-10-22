import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/")({
  head: () => ({
    meta: [
      { title: "Live Trading Session Schedule | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Browse upcoming Candlesticks Academy trading broadcasts and available session replays.",
      },
      { property: "og:title", content: "Live Trading Session Schedule | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Browse upcoming Candlesticks Academy trading broadcasts and available session replays.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sessions" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/sessions" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SessionSchedulePage"),
});
