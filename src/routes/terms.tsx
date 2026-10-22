import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service | Candlesticks Academy" }, { name: "description", content: "Terms of Service at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:title", content: "Terms of Service | Candlesticks Academy" }, { property: "og:description", content: "Terms of Service at Candlesticks Academy: forex education, trading mentorship, and student services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "TermsPage"),
});
