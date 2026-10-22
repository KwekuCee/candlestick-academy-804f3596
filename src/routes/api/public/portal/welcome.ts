import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/public/portal/welcome")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        (await import("@/server/account-welcome")).accountWelcome(request),
    },
  },
});
