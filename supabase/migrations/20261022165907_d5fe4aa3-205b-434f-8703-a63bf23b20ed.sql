DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['courses','lessons','course_lessons','live_sessions','signals','trading_signals','live_session_messages','mentor_messages','support_tickets','exness_partner_clients','exness_verifications','student_trades','student_progress','student_lesson_progress','student_quiz_attempts','student_certificates'] LOOP
  EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'Allow full access on '||t, t);
  EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))', 'Admins manage '||t, t);
 END LOOP; END $$;
CREATE POLICY "Visitors read courses" ON public.courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Members read lessons" ON public.lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members read course lessons" ON public.course_lessons FOR SELECT TO authenticated USING (is_published);
CREATE POLICY "Members read live sessions" ON public.live_sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members read signals" ON public.signals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members read trading signals" ON public.trading_signals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members read live chat" ON public.live_session_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members post own live chat" ON public.live_session_messages FOR INSERT TO authenticated
 WITH CHECK (lower(sender_email) = lower(auth.jwt()->>'email') AND is_host = false AND is_pinned = false);
CREATE POLICY "Students read own mentor thread" ON public.mentor_messages FOR SELECT TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students write own mentor messages" ON public.mentor_messages FOR INSERT TO authenticated
 WITH CHECK (lower(student_email) = lower(auth.jwt()->>'email') AND sender_role = 'student' AND is_resolved = false);
CREATE POLICY "Students read own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = support_tickets.student_id AND s.auth_user_id = auth.uid()));
CREATE POLICY "Students read own verifications" ON public.exness_verifications FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = exness_verifications.student_id AND s.auth_user_id = auth.uid()));
CREATE POLICY "Students manage own trades" ON public.student_trades FOR ALL TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email')) WITH CHECK (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students manage own progress" ON public.student_progress FOR ALL TO authenticated
 USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_progress.student_id AND s.auth_user_id = auth.uid()))
 WITH CHECK (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_progress.student_id AND s.auth_user_id = auth.uid()));
CREATE POLICY "Students manage own lesson progress" ON public.student_lesson_progress FOR ALL TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email')) WITH CHECK (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students read own quiz attempts" ON public.student_quiz_attempts FOR SELECT TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students record own quiz attempts" ON public.student_quiz_attempts FOR INSERT TO authenticated WITH CHECK (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students read own certificates" ON public.student_certificates FOR SELECT TO authenticated USING (lower(student_email) = lower(auth.jwt()->>'email'));
CREATE POLICY "Students request own certificates" ON public.student_certificates FOR INSERT TO authenticated WITH CHECK (lower(student_email) = lower(auth.jwt()->>'email') AND approved_by_admin = false);
DROP POLICY IF EXISTS "Members read certificate template" ON public.certificate_templates;
CREATE POLICY "Members read certificate template" ON public.certificate_templates FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);