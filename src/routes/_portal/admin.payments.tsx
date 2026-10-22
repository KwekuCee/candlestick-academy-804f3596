import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/payments")({
  head: () => ({ meta: [{ title: "Payments | Candlesticks Academy" }, { name: "description", content: "Payments at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Payments | Candlesticks Academy" }, { property: "og:description", content: "Payments at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "PaymentsPage"),
});
