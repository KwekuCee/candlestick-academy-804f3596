import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/progress")({
  head: () => ({
    meta: [
      { title: "Learning Progress and Certificates | Candlesticks Academy" },
      { name: "description", content: "Track completed lessons, quiz results and course certificates in your Candlesticks Academy portal." },
      { property: "og:title", content: "Learning Progress and Certificates | Candlesticks Academy" },
      { property: "og:description", content: "Track completed lessons, quiz results and course certificates in your Candlesticks Academy portal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/progress" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/progress" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "ProgressPage"),
});
