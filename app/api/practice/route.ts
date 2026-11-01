import { getCurrentUser, getOrCreateGuestToken } from '@/lib/auth';
import { startAttempt } from '@/lib/tests/server/attempts';
import { clientIp, handle, readJson } from '@/lib/tests/server/http';
import { createPracticeTest, type PracticeRequest } from '@/lib/tests/server/practice';

export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<PracticeRequest>(request);
    const user = await getCurrentUser();
    const guestToken = user ? null : await getOrCreateGuestToken();
    const testId = await createPracticeTest({
      presetId: String(body.presetId ?? ''),
      sectionIds: Array.isArray(body.sectionIds) ? body.sectionIds.map(String) : [],
      chapters: Array.isArray(body.chapters) ? body.chapters.map(String) : [],
      count: Number(body.count) || 10,
      timed: !!body.timed,
    });
    const attemptId = await startAttempt({ testId, viewer: { user, guestToken }, ip: clientIp(request) });
    return { attemptId };
  });
}
