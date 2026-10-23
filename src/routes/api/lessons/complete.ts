import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/lessons/complete')({ server: { handlers: { POST: async ({ request }) => (await import('@/server/learning')).completeLesson(request) } } });
