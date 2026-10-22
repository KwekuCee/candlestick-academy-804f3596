import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/exness/connect-existing")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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
