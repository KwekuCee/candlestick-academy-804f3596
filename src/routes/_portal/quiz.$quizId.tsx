import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/quiz/$quizId")({
  head: () => ({ meta: [{ title: "Quiz | Candlesticks Academy" }, { name: "description", content: "Quiz at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Quiz | Candlesticks Academy" }, { property: "og:description", content: "Quiz at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "QuizPage"),
});
