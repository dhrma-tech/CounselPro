import { getViewer } from '@/lib/auth';
import { handle, readJson } from '@/lib/tests/server/http';
import { createShareCard } from '@/lib/tests/server/social';

export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<{ attemptId?: string; hideName?: boolean; hideRank?: boolean }>(request);
    const card = await createShareCard(String(body.attemptId ?? ''), await getViewer(), { hideName: !!body.hideName, hideRank: !!body.hideRank });
    return { path: `/s/${card.id}?ref=${card.refCode}` };
  });
}
