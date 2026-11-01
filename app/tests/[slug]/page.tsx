import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Trophy } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { getPublishedTestBySlug, loadQuestions } from '@/lib/tests/server/content';
import { findOpenAttempt, modeForKind, serverNow } from '@/lib/tests/server/attempts';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Badge from '@/components/shared/Badge';
import TestLobby from '@/components/tests/TestLobby';
import type { QuestionType } from '@/lib/tests/types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await getPublishedTestBySlug(slug);
  return bundle
    ? { title: `${bundle.test.title} | CounselPro`, description: bundle.test.description ?? undefined }
    : { title: 'Test not found | CounselPro' };
}

const TYPE_LABEL: Record<QuestionType, string> = {
  SINGLE_MCQ: 'Single correct',
  MULTI_MCQ: 'Multiple correct',
  NUMERICAL: 'Numerical answer',
  PARAGRAPH: 'Paragraph based',
  MATRIX_MATCH: 'Match the list',
};

export default async function TestLobbyPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ challenge?: string }> }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  // Checked again on the server when the attempt starts
  const challengeToken = query.challenge && /^[A-Z0-9]{10}$/.test(query.challenge) ? query.challenge : null;
  const bundle = await getPublishedTestBySlug(slug);
  if (!bundle || bundle.test.is_practice) notFound();
  const { test, version, preset } = bundle;
  const viewer = await getViewer();

  // Marking table: only question types that actually appear, per section
  const { questions } = await loadQuestions(version.sections.flatMap((s) => s.questionIds));
  const typeById = new Map(questions.map((q) => [q.id, q.type]));
  const markingRows = version.sections.flatMap((s) => {
    const types = Array.from(new Set(s.questionIds.map((id) => typeById.get(id)).filter(Boolean))) as QuestionType[];
    return types.map((type) => {
      const rule = s.marking?.[type] ?? version.marking[type]
        ?? (type === 'PARAGRAPH' || type === 'MATRIX_MATCH' ? s.marking?.SINGLE_MCQ ?? version.marking.SINGLE_MCQ : undefined)
        ?? { correct: 1, wrong: 0, unattempted: 0 };
      return {
        section: s.name,
        type: TYPE_LABEL[type],
        count: s.questionIds.filter((id) => typeById.get(id) === type).length,
        correct: rule.correct,
        wrong: rule.wrong,
        partial: rule.partialPerOption ?? null,
      };
    });
  });

  const resumeAttemptId = await findOpenAttempt(test.id, viewer);

  const questionCount = version.sections.reduce((n, s) => n + s.questionIds.length, 0);
  const mode = modeForKind(test.kind);
  const now = serverNow();
  const opensAt = test.window_start_at && new Date(test.window_start_at).getTime() > now ? test.window_start_at : null;
  const closesAt = test.window_end_at && new Date(test.window_end_at).getTime() > now ? test.window_end_at : null;
  const closed = !!test.window_end_at && !closesAt;
  const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
  const hasLeaderboard = test.kind === 'FULL_MOCK';

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-16 pb-10 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: test.title }]} />
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="blue">{preset.name}</Badge>
            {test.guest_allowed && <Badge variant="teal">Free · No login</Badge>}
            {test.is_sample && <Badge variant="amber">Sample questions</Badge>}
            {test.is_weekly && <Badge variant="teal">Weekly open mock</Badge>}
            {challengeToken && <Badge variant="amber">Friend challenge</Badge>}
          </div>
          <h1 className="heading-lg mb-3">{test.title}</h1>
          {test.description && <p className="body-lg max-w-2xl">{test.description}</p>}
          {(test.window_start_at || test.window_end_at || hasLeaderboard) && (
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white border border-border text-[14px] text-text-secondary max-w-2xl">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="flex-1">
                {opensAt && <>Opens {when(opensAt)}{test.window_end_at && <>, closes {when(test.window_end_at)}</>}. </>}
                {!opensAt && closesAt && <>Open now until {when(closesAt)}. Answers and solutions unlock after it closes. </>}
                {closed && <>This mock closed on {when(test.window_end_at!)}. You can still take it for practice, but it won&apos;t count on the leaderboard. </>}
                {!test.window_end_at && 'Your first attempt counts on the leaderboard.'}
              </p>
              {hasLeaderboard && (
                <Link href={`/tests/${test.slug}/leaderboard`} className="shrink-0 inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline">
                  Leaderboard <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
            {[
              ['Questions', String(questionCount)],
              ['Duration', test.duration_seconds > 0 ? `${Math.round(test.duration_seconds / 60)} min` : 'No timer'],
              ['Total marks', String(Number(version.total_marks))],
            ].map(([label, value]) => (
              <div key={label} className="bg-white border border-border rounded-xl p-3 text-center">
                <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold">{label}</p>
                <p className="font-ui font-bold text-[18px] text-text-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TestLobby
        testId={test.id}
        slug={test.slug}
        mode={mode}
        guestAllowed={test.guest_allowed}
        signedIn={!!viewer.user}
        resumeAttemptId={resumeAttemptId}
        languages={preset.languages}
        instructionsHtml={preset.instructionsHtml}
        markingRows={markingRows}
        presetVerified={preset.verified}
        hasSectionLock={!!version.sectional_lock}
        opensAt={resumeAttemptId ? null : opensAt}
        challengeToken={challengeToken}
      />
    </div>
  );
}
