import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/students")({
  head: () => ({ meta: [{ title: "Students | Candlesticks Academy" }, { name: "description", content: "Students at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Students | Candlesticks Academy" }, { property: "og:description", content: "Students at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "StudentRosterPage"),
});
