import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/quiz/generate-from-pdf")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { authorizeExnessRequest } = await import("@/server/exnessAccess");
        const denied = await authorizeExnessRequest(request, true);
        if (denied) return denied;
        try {
          const body = await request.json().catch(() => ({}));
          const { generateQuizFromPdfServer } = await import("@/server/pdfQuizEngine");
          return Response.json(await generateQuizFromPdfServer(body));
        } catch (e: any) {
          return Response.json({ success: false, message: e?.message }, { status: 400 });
        }
      },
    },
  },
});
