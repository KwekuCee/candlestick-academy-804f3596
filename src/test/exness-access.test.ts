import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getUser, maybeSingle, eq, select, from } = vi.hoisted(() => {
  const maybeSingle = vi.fn();
  const eq = vi.fn();
  const select = vi.fn();
  const from = vi.fn();
  return { getUser: vi.fn(), maybeSingle, eq, select, from };
});
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ auth: { getUser }, from }) }));
import { authorizeExnessRequest } from '@/server/exnessAccess';

describe('Exness server authorization', () => {
  beforeEach(() => {
    vi.stubEnv('SUPABASE_URL', 'https://database.example');
    vi.stubEnv('SUPABASE_PUBLISHABLE_KEY', 'public-test-key');
    getUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null });
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ eq, maybeSingle });
  });
  it('rejects requests without a bearer session', async () => {
    expect((await authorizeExnessRequest(new Request('https://app.example'), true))?.status).toBe(401);
  });
  it('rejects a signed-in non-admin from partner-wide syncs', async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });
    expect((await authorizeExnessRequest(new Request('https://app.example', { headers: { Authorization: 'Bearer test-session' } }), true))?.status).toBe(403);
  });
  it('accepts only a trusted administrator role for syncs', async () => {
    maybeSingle.mockResolvedValue({ data: { role: 'admin' }, error: null });
    expect(await authorizeExnessRequest(new Request('https://app.example', { headers: { Authorization: 'Bearer test-session' } }), true)).toBeNull();
    expect(eq).toHaveBeenCalledWith('user_id', 'user-1');
    expect(eq).toHaveBeenCalledWith('role', 'admin');
  });
});