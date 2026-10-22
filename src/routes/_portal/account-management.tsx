import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/account-management")({
  head: () => ({ meta: [{ title: "Account Management | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "AccountManagementPage"),
});
