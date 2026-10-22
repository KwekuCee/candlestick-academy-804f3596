import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/lessons/$lessonId")({
  head: ({ params }) => ({
    meta: [
      { title: "Forex Video Lesson | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Study a Candlesticks Academy video lesson and review its educational trading takeaways.",
      },
      { property: "og:title", content: "Forex Video Lesson | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Study a Candlesticks Academy video lesson and review its educational trading takeaways.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/lessons/${params.lessonId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/lessons/${params.lessonId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LessonPage"),
});
