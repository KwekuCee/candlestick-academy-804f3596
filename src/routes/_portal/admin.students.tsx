import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/students")({
  head: () => ({
    meta: [
      { title: "Student Roster | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Review student profiles, enrollment and learning activity in Candlesticks Academy administration.",
      },
      { property: "og:title", content: "Student Roster | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Review student profiles, enrollment and learning activity in Candlesticks Academy administration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/students" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/students" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "StudentRosterPage"),
});
