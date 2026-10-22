import { z } from 'zod';
import { publicClient, sameOrigin, trustedRole } from './portal-auth';
export async function portalLogin(request: Request) {
  if (!sameOrigin(request)) return Response.json({ message: 'Request origin not allowed.' }, { status: 403 });
  try {
    const input = z.object({ identifier: z.string().min(1).max(254), password: z.string().min(1).max(256) }).parse(await request.json());
    let email = input.identifier.trim().toLowerCase();
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    if (!email.includes('@')) {
      const username = email.replace(/^@+/, '');
      const { data } = await supabaseAdmin.from('students').select('email').eq('username', username).maybeSingle();
      if (!data) return Response.json({ message: 'Incorrect email, username or password.' }, { status: 401 });
      email = data.email;
    }
    const client = publicClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password: input.password });
    if (error || !data.user || !data.session) return Response.json({ message: 'Incorrect email, username or password. Use your registered account or reset your password.' }, { status: 401 });
    const authed = publicClient(data.session.access_token);
    const role = await trustedRole(authed, data.user.id);
    // Legacy profiles are linked only after Supabase verifies the email/password.
    if (data.user.email_confirmed_at && data.user.email) {
      const { error: linkError } = await supabaseAdmin.from('students').update({ auth_user_id: data.user.id }).ilike('email', data.user.email).is('auth_user_id', null);
      if (linkError) throw new Error('Unable to link your student account.');
    }
    const { data: student } = await authed.from('students').select('*').eq('auth_user_id', data.user.id).maybeSingle();
    return Response.json({ success: true, role, session: data.session, student }, { headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
  } catch {
    return Response.json({ message: 'Sign-in could not be completed. Please try again.' }, { status: 400 });
  }
}