import { z } from 'zod';
import { bearerUser } from './portal-auth';
import { generateAutoQuizQuestions, type QuizQuestionItem } from '@/lib/quiz-bank';

const PASS_MARK = 70;
const FALLBACK_LESSON_MINUTES = 5;
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

async function caller(request: Request) {
  const who = await bearerUser(request);
  const { data: paid } = await who.client.rpc('has_paid_access', { _user_id: who.user.id });
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: student } = await supabaseAdmin.from('students').select('id,email').eq('auth_user_id', who.user.id).maybeSingle();
  return { ...who, paid: Boolean(paid), student, admin: supabaseAdmin };
}

/** Same selection order the portal used: admin level quiz, then lesson quizzes, then the level fallback. */
export async function buildCourseQuiz(admin: any, courseId: string): Promise<{ title: string; questions: QuizQuestionItem[] } | null> {
  const { data: course } = await admin.from('courses').select('id,title,level,description,level_quiz_questions').eq('id', courseId).maybeSingle();
  if (!course) return null;
  const title = `${course.title} (${course.level} PDF Quiz)`;
  if (Array.isArray(course.level_quiz_questions) && course.level_quiz_questions.length > 0) return { title, questions: course.level_quiz_questions };
  const { data: lessons } = await admin.from('course_lessons').select('title,description,key_takeaways,auto_quiz_questions').eq('course_id', courseId).eq('is_published', true).order('lesson_number');
  const collected: QuizQuestionItem[] = [];
  for (const l of lessons ?? []) {
    const qs = Array.isArray(l.auto_quiz_questions) && l.auto_quiz_questions.length > 0
      ? l.auto_quiz_questions
      : generateAutoQuizQuestions(courseId, l.title, l.description, Array.isArray(l.key_takeaways) ? l.key_takeaways : []);
    collected.push(...qs.slice(0, 2));
  }
  if (collected.length >= 4) return { title, questions: collected.slice(0, 8) };
  return { title, questions: generateAutoQuizQuestions(course.id, `${course.title} (${course.level})`, course.description, []) };
}

export function gradeQuiz(questions: QuizQuestionItem[], answers: number[]) {
  const correct = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const percent = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  return { correct, total: questions.length, percent, passed: percent >= PASS_MARK };
}

/** Minutes a student must have had the lesson open before it can count as watched. */
export function requiredWatchMinutes(durationMinutes: number | null | undefined) {
  if (!durationMinutes || durationMinutes <= 0) return FALLBACK_LESSON_MINUTES;
  return Math.max(1, Math.ceil(durationMinutes * 0.8));
}

export async function quizQuestions(request: Request) {
  try {
    const c = await caller(request);
    const { courseId } = z.object({ courseId: z.string().min(1).max(100) }).parse(await request.json());
    const quiz = await buildCourseQuiz(c.admin, courseId);
    if (!quiz) return json({ message: 'Course not found.' }, 404);
    return json(quiz);
  } catch (e) {
    return json({ message: e instanceof Error ? e.message : 'Unable to load quiz.' }, 400);
  }
}

export async function submitQuiz(request: Request) {
  try {
    const c = await caller(request);
    if (!c.student || !c.user.email) return json({ message: 'Student profile not found.' }, 403);
    const input = z.object({ courseId: z.string().min(1).max(100), answers: z.array(z.number().int().min(-1).max(10)).max(50) }).parse(await request.json());
    const quiz = await buildCourseQuiz(c.admin, input.courseId);
    if (!quiz) return json({ message: 'Course not found.' }, 404);
    const g = gradeQuiz(quiz.questions, input.answers);
    const attemptedAt = new Date().toISOString();
    const { error } = await c.admin.from('student_quiz_attempts').insert({
      student_id: c.student.id, student_email: c.user.email.toLowerCase(), course_id: input.courseId, lesson_id: null,
      quiz_title: quiz.title, score_percent: g.percent, correct_answers: g.correct, total_questions: g.total, passed: g.passed, attempted_at: attemptedAt,
    });
    if (error) throw new Error('Unable to save your quiz result.');
    return json({ ...g, quizTitle: quiz.title, attemptedAt });
  } catch (e) {
    return json({ message: e instanceof Error ? e.message : 'Unable to grade quiz.' }, 400);
  }
}

async function lessonDuration(admin: any, lessonId: string) {
  const isUuid = /^[0-9a-f-]{36}$/i.test(lessonId);
  if (isUuid) {
    const { data } = await admin.from('course_lessons').select('duration_minutes').eq('id', lessonId).maybeSingle();
    if (data) return data.duration_minutes as number;
  }
  const { data } = await admin.from('lessons').select('duration_minutes').eq('id', lessonId).maybeSingle();
  return (data?.duration_minutes as number | undefined) ?? null;
}

export async function startLessonWatch(request: Request) {
  try {
    const c = await caller(request);
    if (!c.paid) return json({ message: 'An active membership is required.' }, 403);
    const { lessonId } = z.object({ lessonId: z.string().min(1).max(100) }).parse(await request.json());
    // Keep the first start time so reopening a lesson never resets the clock.
    await c.admin.from('lesson_watch_sessions').upsert({ user_id: c.user.id, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id', ignoreDuplicates: true });
    return json({ success: true });
  } catch (e) {
    return json({ message: e instanceof Error ? e.message : 'Unable to start lesson.' }, 400);
  }
}

export async function completeLesson(request: Request) {
  try {
    const c = await caller(request);
    if (!c.paid) return json({ message: 'An active membership is required.' }, 403);
    if (!c.student || !c.user.email) return json({ message: 'Student profile not found.' }, 403);
    const input = z.object({ lessonId: z.string().min(1).max(100), courseId: z.string().min(1).max(100) }).parse(await request.json());
    const { data: course } = await c.admin.from('courses').select('id').eq('id', input.courseId).maybeSingle();
    if (!course) return json({ message: 'Course not found.' }, 404);
    const { data: watch } = await c.admin.from('lesson_watch_sessions').select('started_at').eq('user_id', c.user.id).eq('lesson_id', input.lessonId).maybeSingle();
    const duration = await lessonDuration(c.admin, input.lessonId);
    const needed = requiredWatchMinutes(duration);
    const watched = watch ? (Date.now() - new Date(watch.started_at).getTime()) / 60000 : 0;
    if (watched < needed) {
      return json({ success: false, message: `Keep watching — this lesson can be completed after ${needed} minute${needed === 1 ? '' : 's'} (${Math.max(1, Math.ceil(needed - watched))} left).` }, 409);
    }
    const { error } = await c.admin.from('student_lesson_progress').upsert({
      student_id: c.student.id, student_email: c.user.email.toLowerCase(), course_id: input.courseId, lesson_id: input.lessonId,
      completed: true, watch_minutes: Math.round(watched), completed_at: new Date().toISOString(),
    }, { onConflict: 'student_email,lesson_id' });
    if (error) throw new Error('Unable to save lesson progress.');
    return json({ success: true });
  } catch (e) {
    return json({ message: e instanceof Error ? e.message : 'Unable to complete lesson.' }, 400);
  }
}
