import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, LogIn } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { listSavedQuestions, revisionSummary } from '@/lib/tests/server/revision';
import { REVIEW_LADDER } from '@/lib/tests/spacedRepetition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import RevisionBoard from '@/components/tests/RevisionBoard';

export const metadata: Metadata = {
  title: 'My revision | CounselPro',
  robots: { index: false },
};

export default async function RevisionPage() {
  const user = await getCurrentUser();
  const [summary, saved] = user
    ? await Promise.all([revisionSummary(user.id), listSavedQuestions(user.id)])
    : [[], []];

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: 'My revision' }]} />
          <h1 className="heading-lg mb-2 flex items-center gap-3"><BookOpenCheck className="w-8 h-8 text-brand-blue" /> My revision</h1>
          <p className="body-md max-w-2xl">
            Questions you got wrong, skipped or saved come back for practice after {REVIEW_LADDER.slice(0, 4).join(', ')} days and so on.
            Get one right and it comes back later; get it wrong and it comes back tomorrow.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {user ? (
          <RevisionBoard summary={summary} saved={saved} />
        ) : (
          <div className="text-center py-14 bg-white border border-border rounded-[24px]">
            <p className="body-md mb-5 max-w-md mx-auto">Sign in for free to keep a revision list of your mistakes and saved questions.</p>
            <Link href="/login?next=/tests/revision" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0]">
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
