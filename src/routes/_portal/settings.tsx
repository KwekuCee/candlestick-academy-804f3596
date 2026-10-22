import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/settings")({
  head: () => ({
    meta: [
      { title: "Student Profile and Trading Settings | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Manage your Academy profile, login details, notifications and educational trading risk preferences.",
      },
      {
        property: "og:title",
        content: "Student Profile and Trading Settings | Candlesticks Academy",
      },
      {
        property: "og:description",
        content:
          "Manage your Academy profile, login details, notifications and educational trading risk preferences.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/settings" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/settings" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SettingsPage"),
});
