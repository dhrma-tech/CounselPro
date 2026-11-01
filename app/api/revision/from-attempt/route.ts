import { getViewer } from '@/lib/auth';
import { AttemptError } from '@/lib/tests/server/errors';
import { startAttempt } from '@/lib/tests/server/attempts';
import { clientIp, handle, readJson } from '@/lib/tests/server/http';
import { addAttemptToRevision, buildRevisionQuiz } from '@/lib/tests/server/revision';

// "Build revision set": wrong, skipped and marked questions → revision list → quiz right away
export async function POST(request: Request) {
  return handle(async () => {
    const viewer = await getViewer();
    if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to build revision sets.');
    const body = await readJson<{ attemptId?: string }>(request);
    const ids = await addAttemptToRevision(viewer.user.id, String(body.attemptId ?? ''));
    if (ids.length === 0) throw new AttemptError(404, 'NOTHING_DUE', 'Nothing to revise: you got everything right!');
    const testId = await buildRevisionQuiz(viewer.user.id, { questionIds: ids, title: 'Revision: mistakes from your test' });
    return { attemptId: await startAttempt({ testId, viewer, ip: clientIp(request) }), added: ids.length };
  });
}
