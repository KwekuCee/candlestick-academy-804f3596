import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/signals/")({
  head: () => ({ meta: [{ title: "Signals | Candlesticks Academy" }, { name: "description", content: "Signals at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Signals | Candlesticks Academy" }, { property: "og:description", content: "Signals at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFeedPage"),
});
