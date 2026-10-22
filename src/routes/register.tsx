import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
