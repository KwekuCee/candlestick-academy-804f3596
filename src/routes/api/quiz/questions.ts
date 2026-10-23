import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/quiz/questions')({ server: { handlers: { POST: async ({ request }) => (await import('@/server/learning')).quizQuestions(request) } } });
