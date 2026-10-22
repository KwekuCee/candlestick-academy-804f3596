import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/public/payments/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        (await import("@/server/moolre")).paymentAction(request, "checkout"),
    },
  },
});
