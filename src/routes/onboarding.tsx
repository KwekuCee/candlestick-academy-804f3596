import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
