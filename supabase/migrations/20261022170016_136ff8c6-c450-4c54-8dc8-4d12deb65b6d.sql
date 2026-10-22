DROP POLICY IF EXISTS "Public Access Candlesticks Buckets" ON storage.objects;
CREATE POLICY "Users manage own avatar files" ON storage.objects FOR ALL TO authenticated
 USING (bucket_id = 'student-avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
 WITH CHECK (bucket_id = 'student-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Admins manage academy files" ON storage.objects FOR ALL TO authenticated
 USING (bucket_id IN ('student-avatars','course-videos','course-pdfs','certificate-templates') AND public.has_role(auth.uid(), 'admin'))
 WITH CHECK (bucket_id IN ('student-avatars','course-videos','course-pdfs','certificate-templates') AND public.has_role(auth.uid(), 'admin'));