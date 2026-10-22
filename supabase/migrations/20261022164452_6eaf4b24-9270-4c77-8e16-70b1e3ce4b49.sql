CREATE TABLE public.student_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  student_name text NOT NULL,
  location text NOT NULL DEFAULT '',
  badge text NOT NULL DEFAULT '✓',
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.student_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_reviews TO authenticated;
GRANT ALL ON public.student_reviews TO service_role;
ALTER TABLE public.student_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published reviews" ON public.student_reviews FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add reviews" ON public.student_reviews FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins edit reviews" ON public.student_reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins remove reviews" ON public.student_reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER student_reviews_updated_at BEFORE UPDATE ON public.student_reviews FOR EACH ROW EXECUTE FUNCTION public.academy_set_updated_at();
INSERT INTO public.student_reviews (quote, student_name, location, badge, sort_order) VALUES
('The live sessions changed everything. I finally understand why a setup works instead of blindly copying trades.', 'AKOSUA D.', 'ACCRA', '+', 1),
('The structure gave me discipline. I stopped overtrading and started making decisions I could actually explain.', 'NANA K.', 'KUMASI', '✓', 2),
('Clear, practical, and honest. This is the first trading community where I never felt lost or pressured.', 'YAW M.', 'TAKORADI', '↑', 3);