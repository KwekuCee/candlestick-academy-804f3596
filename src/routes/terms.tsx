import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "TermsPage"),
});
