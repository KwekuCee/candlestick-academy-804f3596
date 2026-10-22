import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your Academy Account | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Register for Candlesticks Academy by verifying your Exness partner referral and creating your student profile.",
      },
      { property: "og:title", content: "Create Your Academy Account | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Register for Candlesticks Academy by verifying your Exness partner referral and creating your student profile.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/register" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: lazyRouteComponent(() => import("@/app/OnboardingFlow"), "OnboardingFlow"),
});
