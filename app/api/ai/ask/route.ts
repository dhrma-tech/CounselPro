import { getViewer } from '@/lib/auth';
import { AiUnavailableError, geminiStream } from '@/lib/ai/gemini';
import { finishAsk, prepareAsk, type PreparedAsk } from '@/lib/tests/server/ai';
import { handle, readJson } from '@/lib/tests/server/http';

export const maxDuration = 60;

// Streams a plain-text explanation. Errors before streaming come back as JSON with a status code.
export async function POST(request: Request) {
  let prepared: PreparedAsk | null = null;
  const early = await handle(async () => {
    const body = await readJson<{ attemptId?: string; questionId?: string; mode?: string; language?: string }>(request);
    prepared = await prepareAsk({
      attemptId: String(body.attemptId ?? ''),
      questionId: String(body.questionId ?? ''),
      mode: body.mode,
      language: body.language,
      viewer: await getViewer(),
    });
    return null;
  });
  if (!prepared) return early;
  const p: PreparedAsk = prepared;
  const headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Message-Id': String(p.messageId) };
  if (p.cached) return new Response(p.cached, { headers });

  let chunks: AsyncGenerator<string>;
  try {
    chunks = await geminiStream({ system: p.system, prompt: p.prompt, temperature: 0.3 });
  } catch (e) {
    if (e instanceof AiUnavailableError) console.error(e.message);
    return Response.json({ error: 'The AI is busy right now. Please try again in a minute.', code: 'AI_ERROR' }, { status: 503 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let full = '';
      try {
        for await (const chunk of chunks) {
          full += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch {
        const note = '\n\n(The answer was cut off. Please try again.)';
        full += note;
        controller.enqueue(encoder.encode(note));
      } finally {
        await finishAsk(p, full).catch(() => null);
        controller.close();
      }
    },
  });
  return new Response(stream, { headers });
}
