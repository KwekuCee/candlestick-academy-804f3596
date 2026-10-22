import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/account-management")({
  head: () => ({ meta: [{ title: "Account Management | Candlesticks Academy" }, { name: "description", content: "Account Management at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Account Management | Candlesticks Academy" }, { property: "og:description", content: "Account Management at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "AccountManagementPage"),
});
