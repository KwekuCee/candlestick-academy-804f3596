import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy and Data Protection | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Read how Candlesticks Academy collects, uses and protects student information, and how to exercise your privacy rights.",
      },
      {
        property: "og:title",
        content: "Privacy Policy and Data Protection | Candlesticks Academy",
      },
      {
        property: "og:description",
        content:
          "Read how Candlesticks Academy collects, uses and protects student information, and how to exercise your privacy rights.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "PrivacyPage"),
});
