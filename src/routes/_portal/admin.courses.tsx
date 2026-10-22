import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/courses")({
  head: () => ({
    meta: [
      { title: "Manage Academy Courses | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Manage course content, lessons and assessments for Candlesticks Academy students.",
      },
      { property: "og:title", content: "Manage Academy Courses | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Manage course content, lessons and assessments for Candlesticks Academy students.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/courses" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/courses" }],
  }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminCoursesPage"),
});
