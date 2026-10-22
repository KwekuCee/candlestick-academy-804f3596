import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/exness/sync")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { authorizeExnessRequest } = await import("@/server/exnessAccess");
        const denied = await authorizeExnessRequest(request, true);
        if (denied) return denied;
        const url = new URL(request.url);
        const { syncLiveExnessWithSupabase } = await import("@/server/exnessSync");
        const result = await syncLiveExnessWithSupabase({
          account: url.searchParams.get("account") || undefined,
          email: url.searchParams.get("email") || undefined,
        });
        return Response.json(result);
      },
    },
  },
});
