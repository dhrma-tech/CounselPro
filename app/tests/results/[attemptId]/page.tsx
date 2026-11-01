import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AlertTriangle, ArrowRight, BarChart3, Clock, Lock, LogIn, Swords, Target, Trophy, TrendingDown, TrendingUp } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { AttemptError, getAttemptResult } from '@/lib/tests/server/attempts';
import { getStreak } from '@/lib/tests/server/daily';
import { getChallenge } from '@/lib/tests/server/social';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Badge from '@/components/shared/Badge';
import BridgeCard from '@/components/tests/results/BridgeCard';
import ResultActions from '@/components/tests/results/ResultActions';
import ResponseSheet from '@/components/tests/results/ResponseSheet';
import MistakeInsights from '@/components/tests/results/MistakeInsights';
import StreakCard from '@/components/tests/results/StreakCard';
import AiPlanCard from '@/components/tests/ai/AiPlanCard';
import { EXAM_FAMILY_LABEL } from '@/lib/tests/presetExams';
import { aiEnabled } from '@/lib/ai/gemini';
import type { AiLanguage } from '@/lib/tests/aiTypes';

export const metadata: Metadata = {
  title: 'Your result | CounselPro',
  robots: { index: false },
};

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

function duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const viewer = await getViewer();

  let result: Awaited<ReturnType<typeof getAttemptResult>>;
  try {
    result = await getAttemptResult(attemptId, viewer);
  } catch (error) {
    if (error instanceof AttemptError && error.status === 404) notFound();
    throw error;
  }
  if (result.inProgress) redirect(`/tests/attempt/${attemptId}`);

  const { attempt, bundle, items, previousScore, lockedUntil } = result;
  const b = attempt.score_breakdown;
  if (!b) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="heading-sm">We&apos;re still scoring your test</p>
        <Link href={`/tests/results/${attemptId}`} className="text-brand-blue font-semibold hover:underline">Refresh</Link>
      </div>
    );
  }
  const isGuest = !attempt.user_id;
  const loginHref = `/login?next=${encodeURIComponent(`/tests/results/${attempt.id}`)}`;
  const accuracy = b.attempted > 0 ? Math.round(((b.correct + b.partial * 0.5) / b.attempted) * 100) : 0;
  const delta = previousScore != null ? b.score - previousScore : null;

  // Weakest chapters (lowest share of marks scored), only where marks were available
  const weak = [...b.chapters]
    .filter((c) => c.maxMarks > 0 && c.marks < c.maxMarks)
    .sort((x, y) => x.marks / x.maxMarks - y.marks / y.maxMarks || y.maxMarks - x.maxMarks)
    .slice(0, 3);

  const wrongCount = items.filter((i) => i.outcome === 'WRONG').length;
  const maxSectionTime = Math.max(1, ...b.sections.map((s) => s.timeSpentMs));
  const sectionIdBySubject = new Map(bundle.version.sections.map((s) => [s.subject, s.id]));
  const signedIn = !!viewer.user;
  const isOwnAccountAttempt = signedIn && attempt.user_id === viewer.user!.id;

  const [streak, challenge, profile] = await Promise.all([
    bundle.test.is_daily && isOwnAccountAttempt ? getStreak(viewer.user!.id) : Promise.resolve(null),
    attempt.challenge_token ? getChallenge(attempt.challenge_token, viewer) : Promise.resolve(null),
    isOwnAccountAttempt
      ? supabaseAdmin().from('profiles').select('preferred_language').eq('user_id', viewer.user!.id).maybeSingle().then((r) => r.data)
      : Promise.resolve(null),
  ]);
  const aiLanguage = (['en', 'hi', 'mr'].includes(profile?.preferred_language as string) ? profile!.preferred_language : attempt.language === 'hi' || attempt.language === 'mr' ? attempt.language : 'en') as AiLanguage;
  const showLeaderboard = bundle.test.kind === 'FULL_MOCK' && !bundle.test.is_practice && bundle.test.status === 'PUBLISHED';
  const aiOn = aiEnabled();
  // Weekly mocks hide which questions went wrong until the window closes
  const analysis = lockedUntil ? null : attempt.analysis;
  const timeSinks = analysis?.timeSinks ?? [];
  const needsRevision = items.some((i) => i.outcome !== 'CORRECT' || i.status === 'MARKED_FOR_REVIEW' || i.status === 'ANSWERED_AND_MARKED');

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: 'Result' }]} />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="blue">{bundle.preset.name}</Badge>
                {attempt.status === 'AUTO_SUBMITTED' && <Badge>Auto-submitted when time ran out</Badge>}
                {attempt.attempt_number > 1 && <Badge>Attempt {attempt.attempt_number}</Badge>}
              </div>
              <h1 className="heading-lg">{bundle.test.title}</h1>
            </div>
            <ResultActions
              attemptId={attempt.id}
              testId={bundle.test.id}
              slug={bundle.test.is_practice ? null : bundle.test.slug}
              title={bundle.test.title}
              scoreText={`${fmt(b.score)}/${fmt(b.maxScore)}`}
              canReattempt={!bundle.test.is_practice && !bundle.test.is_daily}
              signedIn={signedIn}
              canChallenge={!bundle.test.is_practice && bundle.test.status === 'PUBLISHED'}
              canRevise={needsRevision && !lockedUntil}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Score + rank */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-5">
          <div className="bg-white border border-border rounded-[24px] p-6 sm:p-8 shadow-sm">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-2">Your score</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="font-display text-[56px] leading-none text-brand-navy">{fmt(b.score)}</span>
              <span className="text-[20px] text-text-muted font-ui mb-1.5">/ {fmt(b.maxScore)}</span>
              {delta != null && delta !== 0 && (
                <span className={`mb-2 inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded-full ${delta > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {delta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {delta > 0 ? '+' : ''}{fmt(delta)} vs last time
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['Accuracy', `${accuracy}%`],
                ['Attempted', `${b.attempted} / ${items.length}`],
                ['Correct', String(b.correct + b.partial)],
                ['Time used', duration(b.timeUsedSeconds)],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface-light rounded-xl p-3">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold">{label}</p>
                  <p className="font-ui font-bold text-[17px] text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> Rank estimate
            </p>
            {attempt.percentile_est != null ? (
              <>
                <p className="font-display text-[40px] leading-none text-brand-blue mb-1">{Number(attempt.percentile_est).toFixed(2)}<span className="text-[18px] text-text-muted font-ui"> percentile</span></p>
                {attempt.rank_low != null && (
                  <p className="text-[15px] text-text-primary font-semibold mb-3">
                    Rank about {attempt.rank_low.toLocaleString('en-IN')} to {attempt.rank_high!.toLocaleString('en-IN')}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge>Estimate</Badge>
                  <Badge variant={attempt.rank_confidence === 'High' ? 'teal' : 'gray'}>{attempt.rank_confidence} confidence</Badge>
                </div>
                <p className="text-[12px] text-text-muted mt-auto leading-relaxed">
                  Estimate only. Official ranks may differ.
                  {attempt.rank_is_sample && ' This estimate uses sample reference data, not official results, so treat it as a rough guide.'}
                  {!attempt.counts_as_rank && ' Re-attempts are not counted in the comparison group.'}
                </p>
              </>
            ) : (
              <p className="body-sm text-text-secondary">
                {bundle.test.kind === 'FULL_MOCK'
                  ? 'A rank estimate will appear once enough students have taken this test.'
                  : 'Rank estimates are shown for full mock tests. Take a full mock to see where you stand.'}
              </p>
            )}
          </div>
        </div>

        {bundle.test.is_daily && (streak || !signedIn) && (
          <StreakCard
            current={streak?.current ?? 0}
            longest={streak?.longest ?? 0}
            freezesLeft={streak?.freezesLeft ?? 0}
            signedIn={isOwnAccountAttempt}
            loginHref={loginHref}
          />
        )}

        {challenge && (
          <section className="bg-white border border-border rounded-[24px] p-6">
            <h2 className="heading-sm mb-4 flex items-center gap-2"><Swords className="w-5 h-5 text-brand-blue" /> Challenge result</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { label: challenge.challenger.name, score: challenge.challenger.score, max: challenge.challenger.maxScore, time: challenge.challenger.timeUsedSeconds },
                { label: 'You', score: b.score, max: b.maxScore, time: b.timeUsedSeconds },
              ].map((p, i) => {
                const other = i === 0 ? b.score : challenge.challenger.score;
                const won = p.score > other;
                return (
                  <div key={i} className={`rounded-2xl p-4 border ${won ? 'border-green-300 bg-green-50' : 'border-border bg-surface-light'}`}>
                    <p className="text-[13px] font-semibold text-text-secondary mb-1 truncate">{p.label}{won ? ' 🏆' : ''}</p>
                    <p className="font-display text-[34px] leading-none text-brand-navy">{fmt(p.score)}<span className="text-[15px] text-text-muted font-ui"> / {fmt(p.max)}</span></p>
                    <p className="text-[12px] text-text-muted mt-1">{duration(p.time)}</p>
                  </div>
                );
              })}
            </div>
            <Link href={`/c/${challenge.token}`} className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline">
              See everyone who took this challenge <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {(lockedUntil || showLeaderboard) && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-[14px] text-text-secondary print:hidden">
            <Trophy className="w-5 h-5 text-brand-blue shrink-0" />
            <p className="flex-1">
              {lockedUntil
                ? `Answers and solutions unlock when this weekly mock closes on ${new Date(lockedUntil).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}. Until then, see how you rank.`
                : 'See how you rank against other students on this test.'}
            </p>
            {showLeaderboard && (
              <Link href={`/tests/${bundle.test.slug}/leaderboard`} className="shrink-0 inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline">
                Leaderboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        <BridgeCard
          examFamily={bundle.preset.examFamily}
          examLabel={EXAM_FAMILY_LABEL[bundle.preset.examFamily]}
          percentile={attempt.percentile_est != null ? Number(attempt.percentile_est) : null}
        />

        {/* Section summary */}
        <section>
          <h2 className="heading-md mb-4">Section-wise summary</h2>
          <div className="overflow-x-auto bg-white border border-border rounded-2xl">
            <table className="w-full text-[13px] min-w-[640px]">
              <thead>
                <tr className="text-left text-text-muted border-b border-border bg-surface-light">
                  <th className="py-2.5 px-4 font-semibold">Section</th>
                  <th className="py-2.5 px-3 font-semibold">Score</th>
                  <th className="py-2.5 px-3 font-semibold">Answered</th>
                  <th className="py-2.5 px-3 font-semibold">Not answered</th>
                  <th className="py-2.5 px-3 font-semibold">Marked</th>
                  <th className="py-2.5 px-3 font-semibold">Answered &amp; marked</th>
                  <th className="py-2.5 px-3 font-semibold">Not visited</th>
                  <th className="py-2.5 px-4 font-semibold">Time spent</th>
                </tr>
              </thead>
              <tbody>
                {b.sections.map((s) => (
                  <tr key={s.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 px-4 font-semibold text-text-primary">{s.name}</td>
                    <td className="py-2.5 px-3 font-semibold">{fmt(s.score)} / {fmt(s.maxScore)}</td>
                    <td className="py-2.5 px-3">{s.answered}</td>
                    <td className="py-2.5 px-3">{s.notAnswered}</td>
                    <td className="py-2.5 px-3">{s.markedForReview}</td>
                    <td className="py-2.5 px-3">{s.answeredAndMarked}</td>
                    <td className="py-2.5 px-3">{s.notVisited}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-light rounded-full overflow-hidden">
                          <div className="h-full bg-brand-teal" style={{ width: `${(s.timeSpentMs / maxSectionTime) * 100}%` }} />
                        </div>
                        {duration(Math.round(s.timeSpentMs / 1000))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {isGuest ? (
          <div className="relative bg-white border border-border rounded-[24px] p-8 text-center overflow-hidden">
            <Lock className="w-8 h-8 text-brand-blue mx-auto mb-3" />
            <h2 className="heading-md mb-2">Save your result and see the full analysis</h2>
            <p className="body-sm text-text-secondary max-w-lg mx-auto mb-6">
              Sign in for free to keep this result and see your weakest chapters, where you lost marks, and the solution to every question.
            </p>
            <Link href={loginHref} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-blue text-white font-ui font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20">
              <LogIn className="w-5 h-5" /> Sign in to save
            </Link>
          </div>
        ) : (
          <>
            {/* Top things to fix */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-border rounded-[24px] p-6">
                <h2 className="heading-sm mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-brand-blue" /> Top things to fix</h2>
                {weak.length === 0 ? (
                  <p className="body-sm text-text-secondary">You scored full marks in every chapter in this test. Try a longer mock next.</p>
                ) : (
                  <ol className="space-y-3">
                    {weak.map((c, i) => {
                      const sectionId = sectionIdBySubject.get(c.subject);
                      const href = `/practice?preset=${bundle.preset.id}${sectionId ? `&section=${sectionId}` : ''}&chapter=${encodeURIComponent(c.chapter)}`;
                      return (
                        <li key={`${c.subject}-${c.chapter}`} className="flex items-center gap-3 p-3 bg-surface-light rounded-xl">
                          <span className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-[13px] flex items-center justify-center shrink-0">{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[14px] text-text-primary truncate">{c.chapter}</p>
                            <p className="text-[12px] text-text-muted">
                              {c.subject} · {c.correct} of {c.total} correct{c.attempted < c.total ? ` · ${c.total - c.attempted} skipped` : ''} · {fmt(c.marks)}/{fmt(c.maxMarks)} marks
                            </p>
                          </div>
                          <Link href={href} className="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-blue hover:underline">
                            Practise <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>

              <div className="bg-white border border-border rounded-[24px] p-6">
                <h2 className="heading-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Where marks were lost</h2>
                <ul className="space-y-3 text-[14px] text-text-secondary">
                  {b.negativeMarksLost > 0 ? (
                    <li>
                      You lost <b className="text-red-600">{fmt(b.negativeMarksLost)} marks</b> to negative marking on {wrongCount} wrong answer{wrongCount === 1 ? '' : 's'}.
                      If you had skipped them, your score would have been <b className="text-text-primary">{fmt(b.score + b.negativeMarksLost)}</b>. Only answer when you can rule out most options.
                    </li>
                  ) : wrongCount > 0 ? (
                    <li>{wrongCount} wrong answer{wrongCount === 1 ? '' : 's'}. There is no negative marking in this test, so attempting everything was the right call.</li>
                  ) : null}
                  {b.unattempted > 0 && (
                    <li>You left <b className="text-text-primary">{b.unattempted}</b> question{b.unattempted === 1 ? '' : 's'} unanswered. Check the solutions to see which ones you could have solved.</li>
                  )}
                  {timeSinks.length > 0 && (
                    <li className="flex gap-2">
                      <Clock className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                      <span>
                        Time sinks: question{timeSinks.length === 1 ? '' : 's'} {timeSinks.join(', ')} took more than twice your usual time and still went wrong. Next time, move on sooner and come back.
                      </span>
                    </li>
                  )}
                  {b.negativeMarksLost === 0 && wrongCount === 0 && b.unattempted === 0 && <li>No marks lost. Excellent work!</li>}
                </ul>
              </div>
            </section>

            <MistakeInsights analysis={analysis} items={items} />

            {aiOn && isOwnAccountAttempt && !lockedUntil && (
              <AiPlanCard attemptId={attempt.id} initialPlan={attempt.ai_plan} defaultLanguage={aiLanguage} />
            )}

            <section>
              <h2 className="heading-md mb-4">Question-wise review</h2>
              <ResponseSheet
                items={items}
                attemptId={attempt.id}
                signedIn={signedIn}
                solutionsLocked={!!lockedUntil}
                aiOn={aiOn}
                aiLanguage={aiLanguage}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
