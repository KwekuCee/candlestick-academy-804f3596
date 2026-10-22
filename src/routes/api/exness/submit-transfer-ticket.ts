import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/exness/submit-transfer-ticket")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { authorizeExnessRequest } = await import('@/server/exnessAccess');
        const denied = await authorizeExnessRequest(request, false);
        if (denied) return denied;
        try {
          const body = await request.json().catch(() => ({}));
          const { connectExistingExnessClientInDb } = await import("@/server/exnessSync");
          return Response.json(await connectExistingExnessClientInDb(body));
        } catch (e: any) {
          return Response.json({ success: false, message: e?.message }, { status: 400 });
        }
      },
    },
  },
});
