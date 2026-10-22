import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/messages")({
  head: () => ({
    meta: [
      { title: "Mentor Message Inbox | Candlesticks Academy" },
      { name: "description", content: "Review and respond to student mentorship questions in the Candlesticks Academy mentor inbox." },
      { property: "og:title", content: "Mentor Message Inbox | Candlesticks Academy" },
      { property: "og:description", content: "Review and respond to student mentorship questions in the Candlesticks Academy mentor inbox." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/messages" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/messages" }],
  }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminMentorInboxPage"),
});
