import { useEffect, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteReview, fetchReviews, saveReview, type StudentReview } from "./reviewsStore";

const empty = {
  quote: "",
  student_name: "",
  location: "",
  badge: "✓",
  is_published: true,
  sort_order: 0,
};

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [form, setForm] = useState<Partial<StudentReview> & typeof empty>(empty);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () =>
    fetchReviews(true)
      .then(setReviews)
      .catch((e) => setMsg(e.message));
  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.quote.trim() || !form.student_name.trim())
      return setMsg("Add the review text and student name.");
    setBusy(true);
    try {
      await saveReview(form);
      setMsg(
        form.id
          ? "Review updated — it now shows on the homepage."
          : "Review added to the homepage.",
      );
      setForm(empty);
      await load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not save review.");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(r: StudentReview) {
    await saveReview({ ...r, is_published: !r.is_published }).catch((e) => setMsg(e.message));
    await load();
  }

  async function remove(r: StudentReview) {
    if (!confirm(`Delete the review from ${r.student_name}?`)) return;
    await deleteReview(r.id).catch((e) => setMsg(e.message));
    await load();
  }

  return (
    <div className="portal-page reviews-admin">
      <header className="reviews-admin-head">
        <p className="eyebrow">HOMEPAGE · STUDENT STORIES</p>
        <h1>Student reviews</h1>
        <p>Reviews published here appear in the “Progress you can feel” section of the homepage.</p>
      </header>

      <form className="reviews-form" onSubmit={submit}>
        <h2>{form.id ? "Edit review" : "Add a review"}</h2>
        <label>
          Review
          <textarea
            rows={3}
            maxLength={600}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
          />
        </label>
        <div className="reviews-form-row">
          <label>
            Student name
            <input
              maxLength={60}
              value={form.student_name}
              onChange={(e) => setForm({ ...form, student_name: e.target.value })}
            />
          </label>
          <label>
            City / country
            <input
              maxLength={60}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </label>
          <label>
            Badge
            <input
              maxLength={2}
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            />
          </label>
          <label>
            Order
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            />
          </label>
        </div>
        <label className="reviews-check">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
          />{" "}
          Show on homepage
        </label>
        <div className="reviews-actions">
          <button className="button" disabled={busy} type="submit">
            <Plus size={15} /> {form.id ? "Save changes" : "Add review"}
          </button>
          {form.id && (
            <button type="button" className="button ghost" onClick={() => setForm(empty)}>
              Cancel
            </button>
          )}
        </div>
        {msg && (
          <p className="reviews-msg" role="status">
            {msg}
          </p>
        )}
      </form>

      <div className="reviews-list">
        {reviews.map((r) => (
          <article key={r.id} className={`reviews-item ${r.is_published ? "" : "is-hidden"}`}>
            <p>“{r.quote}”</p>
            <b>
              {r.student_name}
              <small>
                {r.location} · {r.is_published ? "Published" : "Hidden"}
              </small>
            </b>
            <div className="reviews-item-actions">
              <button type="button" aria-label="Edit review" onClick={() => setForm({ ...r })}>
                <Pencil size={15} />
              </button>
              <button
                type="button"
                aria-label={r.is_published ? "Hide review" : "Publish review"}
                onClick={() => toggle(r)}
              >
                {r.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <button type="button" aria-label="Delete review" onClick={() => remove(r)}>
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
        {!reviews.length && <p className="reviews-msg">No reviews yet.</p>}
      </div>
    </div>
  );
}
