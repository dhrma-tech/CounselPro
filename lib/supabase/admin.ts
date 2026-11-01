import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let adminClient: SupabaseClient | null = null;

/**
 * Service-role client. Bypasses RLS, so it must only ever run on the server and every caller
 * is responsible for its own ownership / admin checks.
 */
export function supabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        // Next.js memoizes identical GET fetches within one render; a fresh signal opts out so a
        // read after a write (e.g. auto-submit then show results) never returns the stale row.
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: init?.signal ?? new AbortController().signal }),
      },
    });
  }
  return adminClient;
}
