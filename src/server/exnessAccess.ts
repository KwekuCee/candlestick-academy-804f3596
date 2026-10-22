import { createClient } from '@supabase/supabase-js';

// Browser flags and imported admin passwords never authorize privileged syncs.
export async function authorizeExnessRequest(request: Request, adminOnly: boolean): Promise<Response | null> {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return Response.json({ success: false, message: 'Please sign in to continue.' }, { status: 401 });
  }
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'] || process.env['SUPABASE_ANON_KEY'];
  if (!url || !key) {
    return Response.json({ success: false, message: 'The database connection is not configured.' }, { status: 503 });
  }
  const token = authorization.slice(7);
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authorization } },
  });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) {
    return Response.json({ success: false, message: 'Please sign in again.' }, { status: 401 });
  }
  if (adminOnly) {
    const { data: role, error: roleError } = await client.from('user_roles')
      .select('role').eq('user_id', data.user.id).eq('role', 'admin').maybeSingle();
    if (roleError || !role) {
      return Response.json({ success: false, message: 'Administrator access is required.' }, { status: 403 });
    }
  }
  return null;
}