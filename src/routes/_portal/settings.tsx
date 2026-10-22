import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/settings")({
  head: () => ({ meta: [{ title: "Settings | Candlesticks Academy" }, { name: "description", content: "Settings at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Settings | Candlesticks Academy" }, { property: "og:description", content: "Settings at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SettingsPage"),
});
