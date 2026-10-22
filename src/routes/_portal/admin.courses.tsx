import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/courses")({
  head: () => ({ meta: [{ title: "Admin Courses | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminCoursesPage"),
});
