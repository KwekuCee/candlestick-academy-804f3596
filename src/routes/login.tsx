import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login | Candlesticks Academy" }, { name: "description", content: "Login at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Login | Candlesticks Academy" }, { property: "og:description", content: "Login at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LoginPage"),
});
