import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/account-management")({
  head: () => ({
    meta: [
      { title: "Trading Account Management | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review your linked Exness trading account and account-management services in your Candlesticks Academy portal.",
      },
      { property: "og:title", content: "Trading Account Management | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Review your linked Exness trading account and account-management services in your Candlesticks Academy portal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/account-management" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/account-management" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "AccountManagementPage"),
});
