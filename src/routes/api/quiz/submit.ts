import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/quiz/submit')({ server: { handlers: { POST: async ({ request }) => (await import('@/server/learning')).submitQuiz(request) } } });
