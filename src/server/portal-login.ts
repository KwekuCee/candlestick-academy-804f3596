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
      if (!/^[a-z0-9_]{3,40}$/.test(username)) return Response.json({ message: 'Incorrect email, username or password.' }, { status: 401 });
      const { data } = await supabaseAdmin.from('students').select('email').ilike('username', username).maybeSingle();
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
    let { data: student } = await authed.from('students').select('*').eq('auth_user_id', data.user.id).maybeSingle();
    if (!student && role === 'student' && data.user.email_confirmed_at && data.user.email) {
      const metadata = data.user.user_metadata;
      const { data: created, error: createError } = await supabaseAdmin.from('students').insert({
        id: `std-${data.user.id}`, auth_user_id: data.user.id, email: data.user.email,
        full_name: String(metadata.full_name || 'Student').slice(0, 200), country: String(metadata.country || '').slice(0, 100),
        username: typeof metadata.username === 'string' ? metadata.username.slice(0, 40) : null,
      }).select('*').single();
      if (createError || !created) throw new Error('Unable to create your student profile.');
      student = created;
    }
    if (!student && role === 'student') return Response.json({ message: 'Please confirm your email before opening your student account.' }, { status: 403 });
    let emailSent = true;
    try {
      const { sendAccountWelcome, sendAcademyEmail } = await import('./academy-emails');
      await sendAccountWelcome(data.user, student?.full_name);
      if (data.user.email) await sendAcademyEmail('login', data.user.email, crypto.randomUUID(), { name: student?.full_name, actionUrl: 'https://candlesticksacademy.online/login' });
    } catch { emailSent = false; console.error('Account email notification unavailable'); }
    return Response.json({ success: true, role, session: data.session, student, emailSent }, { headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
  } catch {
    return Response.json({ message: 'Sign-in could not be completed. Please try again.' }, { status: 400 });
  }
}