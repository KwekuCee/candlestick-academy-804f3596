import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service and Trader Agreement | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review Candlesticks Academy student terms, educational risk disclosures, broker affiliations and subscription conditions.",
      },
      {
        property: "og:title",
        content: "Terms of Service and Trader Agreement | Candlesticks Academy",
      },
      {
        property: "og:description",
        content:
          "Review Candlesticks Academy student terms, educational risk disclosures, broker affiliations and subscription conditions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "TermsPage"),
});
