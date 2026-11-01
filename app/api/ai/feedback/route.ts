import { getCurrentUser } from '@/lib/auth';
import { AttemptError } from '@/lib/tests/server/errors';
import { recordFeedback } from '@/lib/tests/server/ai';
import { handle, readJson } from '@/lib/tests/server/http';

export async function POST(request: Request) {
  return handle(async () => {
    const user = await getCurrentUser();
    if (!user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in first');
    const body = await readJson<{ messageId?: number; feedback?: number; report?: boolean; note?: string }>(request);
    const feedback = body.feedback === 1 || body.feedback === -1 ? body.feedback : null;
    await recordFeedback(user.id, Number(body.messageId), feedback, !!body.report, body.note ?? null);
    return { ok: true };
  });
}
