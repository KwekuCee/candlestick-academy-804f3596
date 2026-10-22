import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | Candlesticks Academy" }, { name: "description", content: "Privacy Policy at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Privacy Policy | Candlesticks Academy" }, { property: "og:description", content: "Privacy Policy at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "PrivacyPage"),
});
