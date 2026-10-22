import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/verification")({
  head: () => ({ meta: [{ title: "Verification | Candlesticks Academy" }, { name: "description", content: "Verification at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Verification | Candlesticks Academy" }, { property: "og:description", content: "Verification at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "VerificationPage"),
});
