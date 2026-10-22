import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student and Admin Login | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Sign in to Candlesticks Academy with your email or username to access your student or administrator portal.",
      },
      { property: "og:title", content: "Student and Admin Login | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Sign in to Candlesticks Academy with your email or username to access your student or administrator portal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/login" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LoginPage"),
});
