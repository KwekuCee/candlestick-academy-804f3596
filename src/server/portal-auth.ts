import { createClient } from "@supabase/supabase-js";
import { isAcademyHost } from "@/lib/portal-domains";

export function publicClient(token?: string) {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Account connection is not configured.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
          headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
export async function bearerUser(request: Request) {
  const token = request.headers.get("Authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new Error("Please sign in to continue.");
  const client = publicClient(token);
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) throw new Error("Please sign in again.");
  return { user: data.user, client, token };
}
export async function trustedRole(client: ReturnType<typeof publicClient>, userId: string) {
  const { data, error } = await client
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error("Unable to verify account permissions.");
  return data ? ("admin" as const) : ("student" as const);
}
export function sameOrigin(request: Request) {
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  return (
    origin === url.origin &&
    (isAcademyHost(url.hostname) ||
      url.hostname === "localhost" ||
      url.hostname.endsWith(".lovable.app"))
  );
}
