import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Learning Dashboard | Candlesticks Academy" },
      { name: "description", content: "Review your Candlesticks Academy learning progress, upcoming trading sessions and student account." },
      { property: "og:title", content: "Student Learning Dashboard | Candlesticks Academy" },
      { property: "og:description", content: "Review your Candlesticks Academy learning progress, upcoming trading sessions and student account." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dashboard" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "DashboardPage"),
});
