import { getViewer } from '@/lib/auth';
import { heartbeat } from '@/lib/tests/server/attempts';
import { handle, readJson } from '@/lib/tests/server/http';

export async function POST(request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  return handle(async () => {
    const { attemptId } = await params;
    const body = await readJson<{ integrity?: Record<string, number> }>(request);
    return heartbeat(attemptId, await getViewer(), body.integrity ?? {});
  });
}
