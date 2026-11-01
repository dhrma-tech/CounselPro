import { getViewer } from '@/lib/auth';
import { getOrCreatePlan } from '@/lib/tests/server/ai';
import { handle, readJson } from '@/lib/tests/server/http';

export const maxDuration = 60;

export async function POST(request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  return handle(async () => {
    const { attemptId } = await params;
    const body = await readJson<{ language?: string }>(request);
    return { plan: await getOrCreatePlan(attemptId, await getViewer(), body.language) };
  });
}
