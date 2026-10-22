import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/")({
  head: () => ({
    meta: [
      { title: "Educational Forex Signals | Candlesticks Academy" },
      { name: "description", content: "Review Academy educational forex trade setups, market commentary and position-sizing tools." },
      { property: "og:title", content: "Educational Forex Signals | Candlesticks Academy" },
      { property: "og:description", content: "Review Academy educational forex trade setups, market commentary and position-sizing tools." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signals" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/signals" }],
  }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFeedPage"),
});
