import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/quiz/$quizId")({
  head: () => ({ meta: [{ title: "Quiz | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "QuizPage"),
});
