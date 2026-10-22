import { createFileRoute } from "@tanstack/react-router";
import { z } from 'zod';

export const Route = createFileRoute("/api/exness/submit-transfer-ticket")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { authorizeExnessRequest } = await import('@/server/exnessAccess');
        const denied = await authorizeExnessRequest(request, false);
        if (denied) return denied;
        try {
          const body = z.object({ tradingAccountId: z.string().trim().min(1).max(40).regex(/^[0-9]+$/), email: z.string().email().max(254), fullName: z.string().max(200).optional(), country: z.string().max(100).optional() }).parse(await request.json());
          const { connectExistingExnessClientInDb } = await import("@/server/exnessSync");
          const result = await connectExistingExnessClientInDb(body);
          let emailSent = false;
          if (result.success) {
            const { bearerUser } = await import('@/server/portal-auth');
            const identity = await bearerUser(request);
            const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
            const { data: ticket } = await supabaseAdmin.from('support_tickets').select('id,ticket_ref').eq('ticket_ref', result.ticketRef).eq('exness_email', body.email.trim().toLowerCase()).maybeSingle();
            if (ticket && identity.user.email) {
              try {
                const { sendEventEmail } = await import('@/server/academy-emails');
                await sendEventEmail('support', identity.user.email, ticket.id, { name: body.fullName, reference: ticket.ticket_ref, actionUrl: 'https://student.candlesticksacademy.online/account-management' });
                emailSent = true;
              } catch { console.error('Support acknowledgement unavailable'); }
            }
          }
          return Response.json({ ...result, emailSent });
        } catch (e: any) {
          return Response.json({ success: false, message: e?.message }, { status: 400 });
        }
      },
    },
  },
});
