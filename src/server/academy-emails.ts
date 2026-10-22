import React from "react";
import { render } from "@react-email/render";
import { z } from "zod";
import {
  AcademyEmail,
  emailSenders,
  emailSubjects,
  type AcademyEmailKind,
} from "@/lib/email-templates/academy-email";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
type EmailData = {
  name?: string;
  reference?: string;
  amount?: string;
  message?: string;
  actionUrl?: string;
};
// Only feature handlers call this helper; there is no arbitrary browser email-send endpoint.
export async function sendAcademyEmail(
  kind: AcademyEmailKind,
  recipient: string,
  eventId: string,
  props: EmailData = {},
) {
  const to = z.string().email().max(254).parse(recipient);
  const key = process.env["RESEND_API_KEY"];
  const appKey = process.env["LOVABLE_API_KEY"];
  if (!key || !appKey) throw new Error("Resend is not configured.");
  const html = await render(React.createElement(AcademyEmail, { ...props, kind }));
  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appKey}`,
      "X-Connection-Api-Key": key,
      "Idempotency-Key": `${kind}-${eventId}`,
    },
    body: JSON.stringify({
      from: `Candlesticks Academy <${emailSenders[kind]}>`,
      to: [to],
      reply_to: emailSenders[kind],
      subject: emailSubjects[kind],
      html,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    // Log provider error categories, never credential-bearing request or response bodies.
    console.error(
      "Resend send failed",
      response.status,
      typeof body.name === "string" ? body.name : "provider_error",
    );
    throw new Error(`Resend could not send this email (${response.status}).`);
  }
  return z.object({ id: z.string() }).parse(await response.json());
}

// An existing audit trail records successful event delivery, not a queue or recipient list.
export async function sendEventEmail(
  kind: AcademyEmailKind,
  recipient: string,
  eventId: string,
  props: EmailData = {},
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const eventType = `email_sent_${kind}`;
  const { data, error } = await supabaseAdmin
    .from("audit_logs")
    .select("id")
    .eq("event_type", eventType)
    .eq("actor", eventId)
    .limit(1);
  if (error) throw new Error("Unable to check email event history.");
  if (data?.length) return { alreadySent: true };
  const sent = await sendAcademyEmail(kind, recipient, eventId, props);
  const { error: recordError } = await supabaseAdmin
    .from("audit_logs")
    .insert({ event_type: eventType, actor: eventId, detail: `Resend message ${sent.id}` });
  if (recordError) console.error("Unable to record email delivery audit");
  return { alreadySent: false };
}

export async function sendAccountWelcome(user: { id: string; email?: string }, name?: string) {
  if (!user.email) return;
  await sendEventEmail("signup", user.email, user.id, {
    name,
    actionUrl: "https://student.candlesticksacademy.online/dashboard",
  });
}
