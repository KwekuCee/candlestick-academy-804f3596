import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/sessions")({
  head: () => ({ meta: [{ title: "Admin Sessions | Candlesticks Academy" }, { name: "description", content: "Admin Sessions at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Admin Sessions | Candlesticks Academy" }, { property: "og:description", content: "Admin Sessions at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/AdminStudioPages"), "AdminLiveSessionsPage"),
});
