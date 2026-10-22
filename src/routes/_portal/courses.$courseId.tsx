import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/courses/$courseId")({
  head: () => ({ meta: [{ title: "Course | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "CourseDetailPage"),
});
