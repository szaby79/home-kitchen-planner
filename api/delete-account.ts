import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  const authorization = request.headers.get('authorization') ?? '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  if (!accessToken) return json({ error: 'Sign in again.' }, 401);

  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !publishableKey || !serviceRoleKey) return json({ error: 'Service unavailable.' }, 503);

  try {
    const verifier = createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await verifier.auth.getUser(accessToken);
    if (error || !data.user) return json({ error: 'Sign in again.' }, 401);

    const admin = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id, false);
    if (deleteError) return json({ error: 'Account deletion failed.' }, 503);

    return json({ deleted: true }, 200);
  } catch {
    return json({ error: 'Account deletion failed.' }, 503);
  }
}
