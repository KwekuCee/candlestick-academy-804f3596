import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/payments")({
  head: () => ({
    meta: [
      { title: "Student Payment Records | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review student payments and membership records in Candlesticks Academy administration.",
      },
      { property: "og:title", content: "Student Payment Records | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Review student payments and membership records in Candlesticks Academy administration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/payments" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/payments" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "PaymentsPage"),
});
