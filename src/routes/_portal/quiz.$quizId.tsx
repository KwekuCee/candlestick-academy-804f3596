import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/quiz/$quizId")({
  head: ({ params }) => ({
    meta: [
      { title: "Course Knowledge Assessment | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Complete your Candlesticks Academy course assessment and review your answers and explanations.",
      },
      { property: "og:title", content: "Course Knowledge Assessment | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Complete your Candlesticks Academy course assessment and review your answers and explanations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/quiz/${params.quizId}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/quiz/${params.quizId}` }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "QuizPage"),
});
