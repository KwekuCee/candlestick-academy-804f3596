import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/LegalPages"), "PrivacyPage"),
});
