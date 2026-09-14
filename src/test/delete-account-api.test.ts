import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const auth = vi.hoisted(() => ({
  getUser: vi.fn(),
  deleteUser: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: (_url: string, key: string) => key === 'test-service-role'
    ? { auth: { admin: { deleteUser: auth.deleteUser } } }
    : { auth: { getUser: auth.getUser } },
}));

import handler from '../../api/delete-account';

function request(token = 'valid-token', body = '{}') {
  return new Request('https://example.test/api/delete-account', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body,
  });
}

describe('secure permanent account deletion endpoint', () => {
  beforeEach(() => {
    vi.stubEnv('SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_PUBLISHABLE_KEY', 'test-publishable');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role');
    auth.getUser.mockReset().mockResolvedValue({ data: { user: { id: 'verified-user' } }, error: null });
    auth.deleteUser.mockReset().mockResolvedValue({ data: {}, error: null });
  });

  afterEach(() => vi.unstubAllEnvs());

  it('rejects missing or invalid sessions without deleting anything', async () => {
    expect((await handler(new Request('https://example.test/api/delete-account', { method: 'POST' }))).status).toBe(401);
    auth.getUser.mockResolvedValueOnce({ data: { user: null }, error: new Error('expired') });
    expect((await handler(request('expired-token'))).status).toBe(401);
    expect(auth.deleteUser).not.toHaveBeenCalled();
  });

  it('deletes only the user ID derived from the verified token', async () => {
    const response = await handler(request('valid-token', JSON.stringify({ userId: 'attacker-selected-user' })));
    expect(response.status).toBe(200);
    expect(auth.getUser).toHaveBeenCalledWith('valid-token');
    expect(auth.deleteUser).toHaveBeenCalledWith('verified-user', false);
    expect(auth.deleteUser).not.toHaveBeenCalledWith('attacker-selected-user');
  });

  it('fails safely when server configuration or deletion is unavailable', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    expect((await handler(request())).status).toBe(503);
    expect(auth.deleteUser).not.toHaveBeenCalled();

    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role');
    auth.deleteUser.mockResolvedValueOnce({ data: null, error: new Error('internal private database detail') });
    const response = await handler(request());
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain('internal private database detail');
    expect((await handler(new Request('https://example.test/api/delete-account'))).status).toBe(405);
  });
});
