import { getViewer } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { AttemptError } from '@/lib/tests/server/errors';
import { handle, readJson } from '@/lib/tests/server/http';
import { attemptHasQuestion, setBookmark } from '@/lib/tests/server/revision';
import type { AttemptRow } from '@/lib/tests/server/rows';

export async function POST(request: Request) {
  return handle(async () => {
    const viewer = await getViewer();
    if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to save questions.');
    const body = await readJson<{ attemptId?: string; questionId?: string; on?: boolean }>(request);
    const questionId = String(body.questionId ?? '');
    await setBookmark(viewer.user.id, questionId, !!body.on, async () => {
      const { data } = await supabaseAdmin().from('attempts').select('user_id, status, paper_order').eq('id', String(body.attemptId ?? '')).maybeSingle();
      const a = data as Pick<AttemptRow, 'user_id' | 'status' | 'paper_order'> | null;
      return !!a && a.user_id === viewer.user!.id && attemptHasQuestion(a, questionId);
    });
    return { ok: true, on: !!body.on };
  });
}
