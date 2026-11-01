import 'server-only';
import type { User } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function ensureProfile(user: User): Promise<void> {
  const name = (user.user_metadata?.full_name || user.user_metadata?.name || null) as string | null;
  await supabaseAdmin()
    .from('profiles')
    .upsert({ user_id: user.id, full_name: name }, { onConflict: 'user_id', ignoreDuplicates: true });
}
