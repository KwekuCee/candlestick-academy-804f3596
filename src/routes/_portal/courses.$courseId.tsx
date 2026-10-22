import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/courses/$courseId")({
  head: ({ params }) => ({
    meta: [
      { title: "Forex Course Details | Candlesticks Academy" },
      { name: "description", content: "Review this Candlesticks Academy forex course, its modules and your lesson progress." },
      { property: "og:title", content: "Forex Course Details | Candlesticks Academy" },
      { property: "og:description", content: "Review this Candlesticks Academy forex course, its modules and your lesson progress." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/courses/${params.courseId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/courses/${params.courseId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "CourseDetailPage"),
});
