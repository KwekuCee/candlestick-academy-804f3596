import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/courses")({
  head: () => ({ meta: [{ title: "Admin Courses | Candlesticks Academy" }, { name: "description", content: "Admin Courses at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Admin Courses | Candlesticks Academy" }, { property: "og:description", content: "Admin Courses at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminCoursesPage"),
});
