import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/progress")({
  head: () => ({ meta: [{ title: "Progress | Candlesticks Academy" }, { name: "description", content: "Progress at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Progress | Candlesticks Academy" }, { property: "og:description", content: "Progress at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "ProgressPage"),
});
