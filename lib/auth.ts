import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';
import type { User } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const GUEST_COOKIE = 'cp_guest';

export async function getCurrentUser(): Promise<User | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}

/** For admin pages: redirects anyone who is not on the ADMIN_EMAILS allow-list. */
export async function requireAdminPage(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect('/login?next=/admin');
  if (!isAdminEmail(user.email)) redirect('/');
  return user;
}

/** For admin route handlers / server actions: returns the admin user or null. */
export async function getAdminUser(): Promise<User | null> {
  const user = await getCurrentUser();
  return user && isAdminEmail(user.email) ? user : null;
}

export async function getGuestToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(GUEST_COOKIE)?.value ?? null;
}

/** Only callable from route handlers / server actions (sets a cookie). */
export async function getOrCreateGuestToken(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(GUEST_COOKIE)?.value;
  if (existing) return existing;
  const token = randomUUID();
  cookieStore.set(GUEST_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return token;
}

export interface Viewer {
  user: User | null;
  guestToken: string | null;
}

export async function getViewer(): Promise<Viewer> {
  const [user, guestToken] = await Promise.all([getCurrentUser(), getGuestToken()]);
  return { user, guestToken };
}
