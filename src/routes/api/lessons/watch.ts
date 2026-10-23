import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/lessons/watch')({ server: { handlers: { POST: async ({ request }) => (await import('@/server/learning')).startLessonWatch(request) } } });
