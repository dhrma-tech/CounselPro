import { cookies } from 'next/headers';
import { handle, readJson } from '@/lib/tests/server/http';
import { REF_COOKIE } from '@/lib/tests/server/social';

// Remembers which student's link brought a visitor here (credited after they sign up)
export async function POST(request: Request) {
  return handle(async () => {
    const body = await readJson<{ code?: string }>(request);
    const code = String(body.code ?? '').toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(code)) return { ok: false };
    const cookieStore = await cookies();
    if (!cookieStore.get(REF_COOKIE)) {
      cookieStore.set(REF_COOKIE, code, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30 });
    }
    return { ok: true };
  });
}
