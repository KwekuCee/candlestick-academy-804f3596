import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Lesson | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LessonPage"),
});
