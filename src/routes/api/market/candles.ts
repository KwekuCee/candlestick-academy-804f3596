import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/market/candles")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const { getLiveMarketCandlesServer } = await import("@/server/pdfQuizEngine");
        const payload = await getLiveMarketCandlesServer(
          url.searchParams.get("symbol") || "EUR/USD",
          url.searchParams.get("interval") || "1m",
        );
        return Response.json({ success: true, ...payload });
      },
    },
  },
});
