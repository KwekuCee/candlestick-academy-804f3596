import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/")({
  head: () => ({
    meta: [
      { title: "Academy Administration | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review student activity and manage Candlesticks Academy services from the administrator dashboard.",
      },
      { property: "og:title", content: "Academy Administration | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Review student activity and manage Candlesticks Academy services from the administrator dashboard.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "AdminDashboardPage"),
});
