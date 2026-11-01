import { getCurrentUser, getOrCreateGuestToken } from '@/lib/auth';
import { AttemptError } from '@/lib/tests/server/errors';
import { startAttempt } from '@/lib/tests/server/attempts';
import { clientIp, handle, readJson } from '@/lib/tests/server/http';
import { dailyAttemptFor, getOrCreateDailyQuiz } from '@/lib/tests/server/daily';

export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<{ presetId?: string }>(request);
    const test = await getOrCreateDailyQuiz(String(body.presetId ?? ''));
    if (!test) throw new AttemptError(404, 'NO_QUESTIONS', 'No daily quiz for this exam yet.');
    const user = await getCurrentUser();
    const guestToken = user ? null : await getOrCreateGuestToken();
    const viewer = { user, guestToken };
    const done = await dailyAttemptFor(test.id, viewer);
    if (done && done.status !== 'IN_PROGRESS') return { attemptId: done.id as string, done: true };
    return { attemptId: await startAttempt({ testId: test.id, viewer, ip: clientIp(request) }), done: false };
  });
}
