import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/market/prices")({
  server: {
    handlers: {
      GET: async () => {
        const { getLiveMarketPricesServer } = await import("@/server/pdfQuizEngine");
        const prices = await getLiveMarketPricesServer();
        return Response.json({ success: true, prices, timestamp: new Date().toISOString() });
      },
    },
  },
});
