import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding | Candlesticks Academy" }, { name: "description", content: "Onboarding at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Onboarding | Candlesticks Academy" }, { property: "og:description", content: "Onboarding at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
