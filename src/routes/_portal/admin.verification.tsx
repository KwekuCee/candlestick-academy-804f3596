import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/verification")({
  head: () => ({
    meta: [
      { title: "Student Partner Verification | Candlesticks Academy" },
      { name: "description", content: "Review Exness partner linkage and student verification records for Candlesticks Academy." },
      { property: "og:title", content: "Student Partner Verification | Candlesticks Academy" },
      { property: "og:description", content: "Review Exness partner linkage and student verification records for Candlesticks Academy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/verification" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/verification" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "VerificationPage"),
});
