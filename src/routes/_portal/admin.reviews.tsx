import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Manage Student Reviews | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Add, edit and publish the student reviews shown on the Candlesticks Academy homepage.",
      },
      { property: "og:title", content: "Manage Student Reviews | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Add, edit and publish the student reviews shown on the Candlesticks Academy homepage.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/reviews" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/reviews" }],
  }),
  component: lazyRouteComponent(() => import("@/app/AdminReviewsPage"), "AdminReviewsPage"),
});
