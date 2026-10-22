import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/messages")({
  head: () => ({ meta: [{ title: "Mentor Inbox | Candlesticks Academy" }, { name: "description", content: "Mentor Inbox at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Mentor Inbox | Candlesticks Academy" }, { property: "og:description", content: "Mentor Inbox at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminMentorInboxPage"),
});
