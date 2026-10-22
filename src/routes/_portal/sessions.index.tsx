import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/")({
  head: () => ({ meta: [{ title: "Live Sessions | Candlesticks Academy" }, { name: "description", content: "Live Sessions at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Live Sessions | Candlesticks Academy" }, { property: "og:description", content: "Live Sessions at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SessionSchedulePage"),
});
