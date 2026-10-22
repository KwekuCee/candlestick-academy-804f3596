import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Lesson | Candlesticks Academy" }, { name: "description", content: "Lesson at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Lesson | Candlesticks Academy" }, { property: "og:description", content: "Lesson at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LessonPage"),
});
