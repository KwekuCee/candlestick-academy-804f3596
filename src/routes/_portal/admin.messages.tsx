import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/messages")({
  head: () => ({ meta: [{ title: "Mentor Inbox | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminMentorInboxPage"),
});
