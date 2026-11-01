import 'server-only';
import type { User } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export function maskEmail(email: string | null | undefined): string {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return '';
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function displayNameFor(user: User | null): Promise<string> {
  if (!user) return 'Guest';
  const { data } = await supabaseAdmin().from('profiles').select('full_name').eq('user_id', user.id).maybeSingle();
  const name = (data?.full_name as string | null) || (user.user_metadata?.full_name as string | undefined) || (user.user_metadata?.name as string | undefined);
  return name || user.email?.split('@')[0] || 'Student';
}
