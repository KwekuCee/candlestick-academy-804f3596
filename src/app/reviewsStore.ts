import { supabase } from "@/integrations/supabase/client";

export type StudentReview = {
  id: string;
  quote: string;
  student_name: string;
  location: string;
  badge: string;
  is_published: boolean;
  sort_order: number;
};

// The generated types may lag behind new tables; keep access typed locally.
const table = () => (supabase as any).from("student_reviews");

export async function fetchReviews(includeHidden = false): Promise<StudentReview[]> {
  let q = table()
    .select("id,quote,student_name,location,badge,is_published,sort_order")
    .order("sort_order")
    .order("created_at");
  if (!includeHidden) q = q.eq("is_published", true);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as StudentReview[];
}

export async function saveReview(
  r: Partial<StudentReview> & { quote: string; student_name: string },
) {
  const row = {
    quote: r.quote.trim(),
    student_name: r.student_name.trim(),
    location: (r.location ?? "").trim(),
    badge: (r.badge ?? "✓").trim() || "✓",
    is_published: r.is_published ?? true,
    sort_order: r.sort_order ?? 0,
  };
  const { error } = r.id ? await table().update(row).eq("id", r.id) : await table().insert(row);
  if (error) throw new Error(error.message);
}

export async function deleteReview(id: string) {
  const { error } = await table().delete().eq("id", id);
  if (error) throw new Error(error.message);
}
