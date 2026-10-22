import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/signals/new")({
  head: () => ({
    meta: [
      { title: "Publish a Trading Signal | Candlesticks Academy" },
      {
        name: "description",
        content:
          "Create an educational trade setup with entry, stop-loss, take-profit targets and market commentary.",
      },
      { property: "og:title", content: "Publish a Trading Signal | Candlesticks Academy" },
      {
        property: "og:description",
        content:
          "Create an educational trade setup with entry, stop-loss, take-profit targets and market commentary.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/signals/new" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/signals/new" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFormPage"),
});
