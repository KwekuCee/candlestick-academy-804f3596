DROP POLICY "Anyone can read published reviews" ON public.student_reviews;
CREATE POLICY "Visitors read published reviews" ON public.student_reviews FOR SELECT TO anon USING (is_published);
CREATE POLICY "Signed-in read reviews" ON public.student_reviews FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'));