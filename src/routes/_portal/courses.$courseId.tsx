import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/courses/$courseId")({
  head: () => ({ meta: [{ title: "Course | Candlesticks Academy" }, { name: "description", content: "Course at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Course | Candlesticks Academy" }, { property: "og:description", content: "Course at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "CourseDetailPage"),
});
