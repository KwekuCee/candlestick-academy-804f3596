import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/mentorship")({
  head: () => ({
    meta: [
      { title: "One-to-One Trading Mentorship | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review your private mentorship sessions and discuss trading questions with your Candlesticks Academy mentor.",
      },
      { property: "og:title", content: "One-to-One Trading Mentorship | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Review your private mentorship sessions and discuss trading questions with your Candlesticks Academy mentor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mentorship" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/mentorship" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "Mentorship1on1Page"),
});
