import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/signals/new")({
  head: () => ({ meta: [{ title: "New Signal | Candlesticks Academy" }, { name: "description", content: "New Signal at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "New Signal | Candlesticks Academy" }, { property: "og:description", content: "New Signal at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFormPage"),
});
