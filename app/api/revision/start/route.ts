import { getViewer } from '@/lib/auth';
import { AttemptError } from '@/lib/tests/server/errors';
import { startAttempt } from '@/lib/tests/server/attempts';
import { clientIp, handle, readJson } from '@/lib/tests/server/http';
import { buildRevisionQuiz, savedQuestionIds } from '@/lib/tests/server/revision';

export async function POST(request: Request) {
  return handle(async () => {
    const viewer = await getViewer();
    if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to revise.');
    const body = await readJson<{ exam?: string; saved?: boolean }>(request);
    const exam = body.exam ? String(body.exam) : undefined;
    const testId = body.saved
      ? await buildRevisionQuiz(viewer.user.id, { exam, questionIds: await savedQuestionIds(viewer.user.id, exam), title: 'Revision: your saved questions' })
      : await buildRevisionQuiz(viewer.user.id, { exam, title: "Revision: today's due questions" });
    return { attemptId: await startAttempt({ testId, viewer, ip: clientIp(request) }) };
  });
}
