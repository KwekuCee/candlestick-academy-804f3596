import { bearerUser, sameOrigin } from "./portal-auth";
import { sendAccountWelcome } from "./academy-emails";
export async function accountWelcome(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  let identity;
  try {
    identity = await bearerUser(request);
  } catch {
    return new Response(null, { status: 401 });
  }
  try {
    await sendAccountWelcome(
      identity.user,
      String(identity.user.user_metadata.full_name || "Trader").slice(0, 200),
    );
    return Response.json({ sent: true });
  } catch {
    return Response.json(
      { sent: false, message: "Your account is ready, but the welcome email could not be sent." },
      { status: 502 },
    );
  }
}
