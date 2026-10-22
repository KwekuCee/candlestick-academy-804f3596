import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/sessions")({
  head: () => ({
    meta: [
      { title: "Manage Live Trading Sessions | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Schedule and manage Candlesticks Academy live trading broadcasts and session replays.",
      },
      { property: "og:title", content: "Manage Live Trading Sessions | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Schedule and manage Candlesticks Academy live trading broadcasts and session replays.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/sessions" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/sessions" }],
  }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminLiveSessionsPage"),
});
