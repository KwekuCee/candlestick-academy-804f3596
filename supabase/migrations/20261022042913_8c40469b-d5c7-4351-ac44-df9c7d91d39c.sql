CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TABLE public.user_roles (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 role public.app_role NOT NULL DEFAULT 'user',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own trusted roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE FUNCTION public.academy_set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER user_roles_updated_at BEFORE UPDATE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION public.academy_set_updated_at();
CREATE TABLE public.audit_logs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_type text NOT NULL,
 actor text NOT NULL DEFAULT '',
 detail text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audit records" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role((SELECT auth.uid()), 'admin'));
CREATE POLICY "Admins append audit records" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (public.has_role((SELECT auth.uid()), 'admin'));
CREATE TRIGGER audit_logs_updated_at BEFORE UPDATE ON public.audit_logs FOR EACH ROW EXECUTE FUNCTION public.academy_set_updated_at();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS username text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_students_username_lower ON public.students(lower(username)) WHERE username IS NOT NULL AND username <> '';
CREATE INDEX IF NOT EXISTS idx_client_notifications_email_created ON public.client_notifications(student_email, created_at DESC);
REVOKE ALL ON public.client_notifications FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_notifications TO authenticated;
GRANT ALL ON public.client_notifications TO service_role;
ALTER TABLE public.client_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students read own and shared alerts" ON public.client_notifications FOR SELECT TO authenticated USING (lower(student_email) = lower((SELECT auth.jwt())->>'email') OR student_email = 'ALL' OR public.has_role((SELECT auth.uid()), 'admin'));
CREATE POLICY "Admins manage alerts" ON public.client_notifications FOR ALL TO authenticated USING (public.has_role((SELECT auth.uid()), 'admin')) WITH CHECK (public.has_role((SELECT auth.uid()), 'admin'));
CREATE POLICY "Students mark own alerts" ON public.client_notifications FOR UPDATE TO authenticated USING (lower(student_email) = lower((SELECT auth.jwt())->>'email')) WITH CHECK (lower(student_email) = lower((SELECT auth.jwt())->>'email'));
REVOKE ALL ON public.certificate_templates FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificate_templates TO authenticated;
GRANT ALL ON public.certificate_templates TO service_role;
ALTER TABLE public.certificate_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read certificate template" ON public.certificate_templates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage certificate templates" ON public.certificate_templates FOR ALL TO authenticated USING (public.has_role((SELECT auth.uid()), 'admin')) WITH CHECK (public.has_role((SELECT auth.uid()), 'admin'));
NOTIFY pgrst, 'reload schema';