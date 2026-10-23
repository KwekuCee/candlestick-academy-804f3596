CREATE OR REPLACE FUNCTION public.has_paid_access(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR EXISTS (
    SELECT 1 FROM public.students s WHERE s.auth_user_id = _user_id AND (
      s.subscription_tier = 'permanent_100'
      OR (s.subscription_tier = 'monthly_20' AND coalesce(s.subscription_ends_at, now()) > now())
      OR (s.subscription_tier = 'free_trial' AND coalesce(s.trial_ends_at, s.registration_date + interval '30 days') > now())
    ))
$$;
REVOKE EXECUTE ON FUNCTION public.has_paid_access(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_paid_access(uuid) TO authenticated, service_role;

DROP POLICY "Members read lessons" ON public.lessons;
DROP POLICY "Members read course lessons" ON public.course_lessons;
DROP POLICY "Members read live sessions" ON public.live_sessions;
CREATE POLICY "Paid members read lessons" ON public.lessons FOR SELECT TO authenticated USING (public.has_paid_access(auth.uid()));
CREATE POLICY "Paid members read course lessons" ON public.course_lessons FOR SELECT TO authenticated USING (is_published AND public.has_paid_access(auth.uid()));
CREATE POLICY "Paid members read live sessions" ON public.live_sessions FOR SELECT TO authenticated USING (public.has_paid_access(auth.uid()));

-- Progress and quiz results are written only by the server after verification.
DROP POLICY "Students manage own lesson progress" ON public.student_lesson_progress;
CREATE POLICY "Students read own lesson progress" ON public.student_lesson_progress FOR SELECT TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students reset own lesson progress" ON public.student_lesson_progress FOR DELETE TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email'));
DROP POLICY "Students manage own progress" ON public.student_progress;
CREATE POLICY "Students read own progress" ON public.student_progress FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_progress.student_id AND s.auth_user_id = auth.uid()));
DROP POLICY "Students record own quiz attempts" ON public.student_quiz_attempts;

CREATE TABLE public.lesson_watch_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
GRANT SELECT ON public.lesson_watch_sessions TO authenticated;
GRANT ALL ON public.lesson_watch_sessions TO service_role;
ALTER TABLE public.lesson_watch_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students read own watch sessions" ON public.lesson_watch_sessions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER lesson_watch_sessions_updated_at BEFORE UPDATE ON public.lesson_watch_sessions FOR EACH ROW EXECUTE FUNCTION public.academy_set_updated_at();