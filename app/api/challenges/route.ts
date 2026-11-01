import { getViewer } from '@/lib/auth';
import { handle, readJson } from '@/lib/tests/server/http';
import { createChallenge } from '@/lib/tests/server/social';

export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<{ attemptId?: string }>(request);
    const token = await createChallenge(String(body.attemptId ?? ''), await getViewer());
    return { path: `/c/${token}` };
  });
}
