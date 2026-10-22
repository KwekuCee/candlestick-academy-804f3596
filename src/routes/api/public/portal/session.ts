import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/portal/session')({ server: { handlers: {
  GET: async ({ request }) => (await import('@/server/portal-session')).portalSession(request),
  POST: async ({ request }) => (await import('@/server/portal-session')).portalSession(request),
  DELETE: async ({ request }) => (await import('@/server/portal-session')).portalSession(request),
} } });