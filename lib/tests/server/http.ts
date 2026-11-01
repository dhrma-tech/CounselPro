import 'server-only';
import { AttemptError } from './errors';

export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new AttemptError(400, 'INVALID', 'Invalid request body');
  }
}

export async function handle(fn: () => Promise<unknown>): Promise<Response> {
  try {
    const result = await fn();
    return Response.json(result ?? { ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AttemptError) {
      return Response.json({ error: error.message, code: error.code }, { status: error.status });
    }
    console.error('Mock test API error:', error);
    return Response.json({ error: 'Something went wrong. Please try again.', code: 'SERVER' }, { status: 500 });
  }
}
