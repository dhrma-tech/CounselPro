import { getViewer } from '@/lib/auth';
import { saveResponse, type ResponseWrite } from '@/lib/tests/server/attempts';
import { handle, readJson } from '@/lib/tests/server/http';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ attemptId: string; questionId: string }> },
) {
  return handle(async () => {
    const { attemptId, questionId } = await params;
    const body = await readJson<ResponseWrite>(request);
    return saveResponse(attemptId, questionId, await getViewer(), body);
  });
}
