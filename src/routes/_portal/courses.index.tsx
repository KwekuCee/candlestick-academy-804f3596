import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/courses/")({
  head: () => ({
    meta: [
      { title: "Forex Trading Courses | Candlesticks Academy" },
      { name: "description", content: "Browse Candlesticks Academy courses covering forex foundations, price action and disciplined trading." },
      { property: "og:title", content: "Forex Trading Courses | Candlesticks Academy" },
      { property: "og:description", content: "Browse Candlesticks Academy courses covering forex foundations, price action and disciplined trading." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/courses" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "CoursesPage"),
});
