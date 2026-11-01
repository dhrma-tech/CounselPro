import 'server-only';

// Google Gemini REST API (free tier via Google AI Studio key). Server-side only.
const API = 'https://generativelanguage.googleapis.com/v1beta/models';

export function geminiModel(): string {
  return process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
}

export function aiEnabled(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

export class AiUnavailableError extends Error {}

interface GenerateInput {
  system: string;
  prompt: string;
  json?: boolean;
  temperature?: number;
  maxOutputTokens?: number;
}

function body(input: GenerateInput) {
  return JSON.stringify({
    systemInstruction: { parts: [{ text: input.system }] },
    contents: [{ role: 'user', parts: [{ text: input.prompt }] }],
    generationConfig: {
      temperature: input.temperature ?? 0.4,
      maxOutputTokens: input.maxOutputTokens ?? 4096,
      ...(input.json ? { responseMimeType: 'application/json' } : {}),
    },
  });
}

function headers() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiUnavailableError('GEMINI_API_KEY is not set');
  return { 'Content-Type': 'application/json', 'x-goog-api-key': key };
}

function textOf(payload: unknown): string {
  const candidates = (payload as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] })?.candidates;
  return (candidates?.[0]?.content?.parts ?? []).filter((p) => !p.thought).map((p) => p.text ?? '').join('');
}

export async function geminiGenerate(input: GenerateInput): Promise<string> {
  const res = await fetch(`${API}/${geminiModel()}:generateContent`, { method: 'POST', headers: headers(), body: body(input), cache: 'no-store' });
  if (!res.ok) throw new AiUnavailableError(`Gemini error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const text = textOf(await res.json());
  if (!text) throw new AiUnavailableError('Gemini returned no text');
  return text;
}

/** Streams plain text chunks. */
export async function geminiStream(input: GenerateInput): Promise<AsyncGenerator<string>> {
  const res = await fetch(`${API}/${geminiModel()}:streamGenerateContent?alt=sse`, { method: 'POST', headers: headers(), body: body(input), cache: 'no-store' });
  if (!res.ok || !res.body) throw new AiUnavailableError(`Gemini error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return (async function* () {
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const chunk = textOf(JSON.parse(data));
          if (chunk) yield chunk;
        } catch {
          // ignore keep-alive / partial lines
        }
      }
    }
  })();
}

/** Question HTML → plain text for prompts (keeps LaTeX, flattens tables and lists). */
export function htmlToText(html: string | null | undefined): string {
  if (!html) return '';
  return html
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|tr)>/gi, '\n')
    .replace(/<\/(td|th)>/gi, ' | ')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
