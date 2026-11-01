"use server";

import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { INDIAN_STATES } from '@/lib/fieldMaps';

export async function saveLeaderboardSettings(slug: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return;
  const state = String(formData.get('home_state') ?? '');
  const hidden = formData.get('hide_name') === 'on';
  const update: Record<string, unknown> = {
    user_id: user.id,
    leaderboard_name: hidden ? 'HIDDEN' : 'INITIAL',
    updated_at: new Date().toISOString(),
  };
  if ((INDIAN_STATES as readonly string[]).includes(state)) update.home_state = state;
  await supabaseAdmin().from('profiles').upsert(update, { onConflict: 'user_id' });
  revalidatePath(`/tests/${slug}/leaderboard`);
}
