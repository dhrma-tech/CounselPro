import { getCurrentUser, getOrCreateGuestToken } from '@/lib/auth';
import { AttemptError, startAttempt } from '@/lib/tests/server/attempts';
import { clientIp, handle, readJson } from '@/lib/tests/server/http';
import type { Language } from '@/lib/tests/types';

export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<{ testId?: string; language?: Language; challengeToken?: string }>(request);
    if (!body.testId) throw new AttemptError(400, 'INVALID', 'testId is required');
    const user = await getCurrentUser();
    const guestToken = user ? null : await getOrCreateGuestToken();
    const attemptId = await startAttempt({
      testId: body.testId,
      viewer: { user, guestToken },
      ip: clientIp(request),
      language: body.language,
      challengeToken: body.challengeToken ? String(body.challengeToken) : null,
    });
    return { attemptId };
  });
}
