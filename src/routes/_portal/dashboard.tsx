import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard | Candlesticks Academy" }, { name: "description", content: "Dashboard at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Dashboard | Candlesticks Academy" }, { property: "og:description", content: "Dashboard at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "DashboardPage"),
});
