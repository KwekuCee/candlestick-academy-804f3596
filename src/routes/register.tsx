import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register | Candlesticks Academy" }, { name: "description", content: "Register at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Register | Candlesticks Academy" }, { property: "og:description", content: "Register at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
