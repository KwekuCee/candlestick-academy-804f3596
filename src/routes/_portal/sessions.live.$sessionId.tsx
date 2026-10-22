import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/live/$sessionId")({
  head: () => ({ meta: [{ title: "Live Room | Candlesticks Academy" }, { name: "description", content: "Live Room at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Live Room | Candlesticks Academy" }, { property: "og:description", content: "Live Room at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LiveRoomPage"),
});
