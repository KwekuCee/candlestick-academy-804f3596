import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/courses/")({
  head: () => ({ meta: [{ title: "Courses | Candlesticks Academy" }, { name: "description", content: "Courses at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Courses | Candlesticks Academy" }, { property: "og:description", content: "Courses at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "CoursesPage"),
});
