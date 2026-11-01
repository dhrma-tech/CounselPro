import { getViewer } from '@/lib/auth';
import { submitAttempt } from '@/lib/tests/server/attempts';
import { handle } from '@/lib/tests/server/http';

export async function POST(_request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  return handle(async () => {
    const { attemptId } = await params;
    return submitAttempt(attemptId, await getViewer());
  });
}
