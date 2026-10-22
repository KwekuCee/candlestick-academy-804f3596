import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import mentorShare from "@/assets/academy-mentor-share.jpg.asset.json";
import { getShareOrigin } from "@/lib/share-origin.functions";

const title = "Candlesticks Academy | Top Forex Academy & Trading Company in Ghana & Africa";
const description =
  "Candlesticks Academy trading mentorship platform: forex courses, live trading sessions, market signals and a student portal.";

export const Route = createFileRoute("/")({
  loader: async () => ({ shareOrigin: await getShareOrigin() }),
  head: ({ loaderData }) => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      ...(loaderData
        ? [
            { property: "og:image", content: `${loaderData.shareOrigin}${mentorShare.url}` },
            { name: "twitter:image", content: `${loaderData.shareOrigin}${mentorShare.url}` },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            {
              property: "og:image:alt",
              content: "Kwekucandles, Candlesticks Academy forex trading mentor",
            },
          ]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: lazyRouteComponent(() => import("@/app/HomePage"), "default"),
});
