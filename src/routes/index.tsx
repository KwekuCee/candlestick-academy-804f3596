import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const title = "Candlesticks Academy | Top Forex Academy & Trading Company in Ghana & Africa";
const description =
  "Candlesticks Academy trading mentorship platform: forex courses, live trading sessions, market signals and a student portal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: lazyRouteComponent(() => import("@/app/HomePage"), "default"),
});
