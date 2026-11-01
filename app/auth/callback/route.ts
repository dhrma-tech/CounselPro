import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getGuestToken } from '@/lib/auth';
import { claimGuestAttempts } from '@/lib/tests/server/attempts';
import { ensureProfile } from '@/lib/tests/server/profile';
import { applyReferral } from '@/lib/tests/server/social';
import { safeNext } from '@/lib/safeNext';

// Google sign-in and email magic links land here
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeNext(searchParams.get('next'));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      await ensureProfile(data.user);
      await applyReferral(data.user.id);
      const guestToken = await getGuestToken();
      if (guestToken) await claimGuestAttempts(data.user.id, guestToken);
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth&next=${encodeURIComponent(next)}`);
}
