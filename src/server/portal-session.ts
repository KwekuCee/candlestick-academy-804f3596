import { z } from "zod";
import { bearerUser, publicClient, sameOrigin, trustedRole } from "./portal-auth";
import { isAcademyHost } from "@/lib/portal-domains";

const COOKIE = "ca_secure_session";
const sessionSchema = z.object({
  access_token: z.string().min(20).max(12000),
  refresh_token: z.string().min(10).max(4000),
});
async function cipherKey() {
  const secret = process.env["PORTAL_SESSION_SECRET"];
  if (!secret) throw new Error("Portal session configuration is missing.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}
function base64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}
async function seal(value: unknown) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await cipherKey(),
    new TextEncoder().encode(JSON.stringify(value)),
  );
  return `${base64(iv)}.${base64(new Uint8Array(encrypted))}`;
}
async function unseal(value: string) {
  const parts = value.split(".");
  if (parts.length !== 2) throw new Error("Invalid session");
  const iv = Uint8Array.from(atob(parts[0]), (c) => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(atob(parts[1]), (c) => c.charCodeAt(0));
  return sessionSchema.parse(
    JSON.parse(
      new TextDecoder().decode(
        await crypto.subtle.decrypt({ name: "AES-GCM", iv }, await cipherKey(), ciphertext),
      ),
    ),
  );
}
function cookie(request: Request, value: string, clear = false) {
  const url = new URL(request.url);
  return `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${clear ? 0 : 2592000}${url.protocol === "https:" ? "; Secure" : ""}${isAcademyHost(url.hostname) ? "; Domain=candlesticksacademy.online" : ""}`;
}
export async function portalSession(request: Request) {
  if (!["GET", "POST", "DELETE"].includes(request.method))
    return new Response(null, { status: 405 });
  if (request.method !== "GET" && !sameOrigin(request))
    return Response.json({ message: "Request origin not allowed." }, { status: 403 });
  const headers = { "Cache-Control": "no-store", Vary: "Cookie", "Referrer-Policy": "no-referrer" };
  if (request.method === "DELETE")
    return Response.json(
      { success: true },
      { headers: { ...headers, "Set-Cookie": cookie(request, "", true) } },
    );
  try {
    if (request.method === "POST") {
      const { user, client } = await bearerUser(request);
      const data = sessionSchema.parse(await request.json());
      const check = publicClient();
      const { data: checked, error } = await check.auth.setSession(data);
      if (error || checked.user?.id !== user.id || !checked.session)
        throw new Error("Invalid session");
      const role = await trustedRole(client, user.id);
      return Response.json(
        { role },
        {
          headers: {
            ...headers,
            "Set-Cookie": cookie(request, await seal(sessionSchema.parse(checked.session))),
          },
        },
      );
    }
    const encoded = request.headers
      .get("Cookie")
      ?.split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1);
    if (!encoded) return Response.json({ session: null }, { headers });
    const client = publicClient();
    const { data, error } = await client.auth.setSession(await unseal(decodeURIComponent(encoded)));
    if (error || !data.user || !data.session) throw new Error("Invalid session");
    const role = await trustedRole(client, data.user.id);
    return Response.json(
      { session: data.session, role },
      {
        headers: {
          ...headers,
          "Set-Cookie": cookie(request, await seal(sessionSchema.parse(data.session))),
        },
      },
    );
  } catch {
    return Response.json(
      { message: "Please sign in again.", session: null },
      { status: 401, headers: { ...headers, "Set-Cookie": cookie(request, "", true) } },
    );
  }
}
