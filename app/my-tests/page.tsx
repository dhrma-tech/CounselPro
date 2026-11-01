import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Flame, LogIn, PlayCircle } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { listMyAttempts } from '@/lib/tests/server/attempts';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Badge from '@/components/shared/Badge';
import SignOutButton from '@/components/auth/SignOutButton';
import { connection } from 'next/server';

export const metadata: Metadata = {
  title: 'My tests | CounselPro',
  robots: { index: false },
};

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export default async function MyTestsPage() {
  // Per-student and live data: render on each request, never at build time
  await connection();
  const viewer = await getViewer();
  const attempts = await listMyAttempts(viewer);

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: 'My tests' }]} />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="heading-lg mb-2">My tests</h1>
              <p className="body-md">
                {viewer.user ? `Signed in as ${viewer.user.email}` : 'You are not signed in. Results below are saved on this device only.'}
              </p>
            </div>
            {viewer.user ? <SignOutButton /> : (
              <Link href="/login?next=/my-tests" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0]">
                <LogIn className="w-4 h-4" /> Sign in to save results
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            { href: '/tests/revision', icon: BookOpenCheck, title: 'My revision', text: 'Mistakes and saved questions, due for practice' },
            { href: '/tests/daily', icon: Flame, title: 'Daily quiz', text: '10 questions a day to keep your streak going' },
          ].map(({ href, icon: Icon, title, text }) => (
            <Link key={href} href={href} className="flex items-center gap-3 bg-surface-light border border-border rounded-2xl p-4 hover:border-brand-blue/30 transition-all">
              <Icon className="w-6 h-6 text-brand-blue shrink-0" />
              <span className="flex-1 min-w-0">
                <span className="block font-ui font-semibold text-[15px] text-text-primary">{title}</span>
                <span className="block text-[12px] text-text-muted">{text}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
            </Link>
          ))}
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-border rounded-[24px]">
            <p className="body-md mb-5">You haven&apos;t taken any tests yet.</p>
            <Link href="/tests" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0]">
              Take a free mock test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {attempts.map((a) => {
              const inProgress = a.status === 'IN_PROGRESS' && !a.expired;
              const href = inProgress ? `/tests/attempt/${a.id}` : `/tests/results/${a.id}`;
              return (
                <li key={a.id}>
                  <Link href={href} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-border rounded-2xl p-5 hover:border-brand-blue/30 hover:shadow-md transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-1.5">
                        {inProgress ? <Badge variant="teal">In progress</Badge> : <Badge>{a.mode === 'PRACTICE' ? 'Practice' : 'Completed'}</Badge>}
                        {a.attempt_number > 1 && <Badge>Attempt {a.attempt_number}</Badge>}
                      </div>
                      <p className="font-ui font-semibold text-[15px] text-text-primary truncate">{a.test?.title ?? 'Test'}</p>
                      <p className="text-[12px] text-text-muted">{new Date(a.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                    {inProgress ? (
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue">
                        <PlayCircle className="w-4 h-4" /> Resume{a.remainingSeconds != null ? ` · ${Math.ceil(a.remainingSeconds / 60)} min left` : ''}
                      </span>
                    ) : (
                      <div className="text-right">
                        <p className="font-ui font-bold text-[18px] text-brand-navy">{a.score_raw != null ? `${fmt(Number(a.score_raw))} / ${fmt(Number(a.max_score))}` : 'Scoring…'}</p>
                        {a.percentile_est != null && <p className="text-[12px] text-text-muted">~{Number(a.percentile_est).toFixed(1)} percentile (estimate)</p>}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
