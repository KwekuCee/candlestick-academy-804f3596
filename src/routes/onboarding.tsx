import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Exness Partner Verification | Candlesticks Academy" },
      { name: "description", content: "Connect your Exness trading account, verify your Academy partner referral and complete student onboarding." },
      { property: "og:title", content: "Exness Partner Verification | Candlesticks Academy" },
      { property: "og:description", content: "Connect your Exness trading account, verify your Academy partner referral and complete student onboarding." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/onboarding" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/onboarding" }],
  }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
