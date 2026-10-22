import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/")({
  head: () => ({ meta: [{ title: "Admin | Candlesticks Academy" }, { name: "description", content: "Admin at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Admin | Candlesticks Academy" }, { property: "og:description", content: "Admin at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "AdminDashboardPage"),
});
