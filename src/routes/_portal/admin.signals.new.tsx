import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/admin/signals/new")({
  head: () => ({ meta: [{ title: "New Signal | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "SignalFormPage"),
});
