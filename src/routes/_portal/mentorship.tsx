import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/mentorship")({
  head: () => ({ meta: [{ title: "Mentorship | Candlesticks Academy" }, { name: "description", content: "Mentorship at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Mentorship | Candlesticks Academy" }, { property: "og:description", content: "Mentorship at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "Mentorship1on1Page"),
});
