import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/public/payments/moolre-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        (await import("@/server/moolre-webhook")).paymentWebhook(request),
    },
  },
});
