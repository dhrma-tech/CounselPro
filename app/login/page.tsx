import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { safeNext } from '@/lib/safeNext';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in | CounselPro',
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const target = safeNext(next);
  if (await getCurrentUser()) redirect(target);

  return (
    <div className="min-h-[80vh] bg-surface-white flex items-center justify-center px-4 py-16">
      <LoginForm next={target} initialError={error ? 'Sign-in link expired or was opened in another browser. Please try again.' : ''} />
    </div>
  );
}
