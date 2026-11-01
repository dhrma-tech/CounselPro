import { getCurrentUser, getGuestToken } from '@/lib/auth';
import { AttemptError, claimGuestAttempts } from '@/lib/tests/server/attempts';
import { handle } from '@/lib/tests/server/http';
import { ensureProfile } from '@/lib/tests/server/profile';
import { applyReferral } from '@/lib/tests/server/social';

// Called after an email-code sign-in (Google and magic links go through /auth/callback)
export async function POST() {
  return handle(async () => {
    const user = await getCurrentUser();
    if (!user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Not signed in');
    await ensureProfile(user);
    await applyReferral(user.id);
    const guestToken = await getGuestToken();
    const claimed = guestToken ? await claimGuestAttempts(user.id, guestToken) : 0;
    return { claimed };
  });
}
