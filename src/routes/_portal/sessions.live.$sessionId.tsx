import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_portal/sessions/live/$sessionId")({
  head: () => ({ meta: [{ title: "Live Room | Candlesticks Academy" }] }),
  component: lazyRouteComponent(() => import("@/app/PlatformPages"), "LiveRoomPage"),
});
