import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Medal, Swords } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { getChallenge } from '@/lib/tests/server/social';
import Badge from '@/components/shared/Badge';
import RefTracker from '@/components/tests/RefTracker';
import ShareLinkButton from '@/components/tests/ShareLinkButton';

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const challenge = await getChallenge(token, { user: null, guestToken: null });
  if (!challenge) return { title: 'Challenge not found | CounselPro', robots: { index: false } };
  const title = `Can you beat ${challenge.challenger.name}? | CounselPro`;
  const description = `${challenge.challenger.name} scored ${challenge.challenger.score}/${challenge.challenger.maxScore} on "${challenge.test.title}". Take the same test free and compare.`;
  return { title, description, robots: { index: false }, openGraph: { title, description } };
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

function duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  return m > 0 ? `${m}m ${seconds % 60}s` : `${seconds}s`;
}

export default async function ChallengePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const viewer = await getViewer();
  const challenge = await getChallenge(token, viewer);
  if (!challenge) notFound();
  const { challenger, takers, test } = challenge;

  const board = [{ ...challenger, isChallenger: true }, ...takers.map((t) => ({ ...t, isChallenger: false }))]
    .sort((a, b) => b.score - a.score || a.timeUsedSeconds - b.timeUsedSeconds);
  const yours = takers.find((t) => t.isYou);
  const beat = yours ? yours.score > challenger.score : false;
  const shareText = `I scored ${fmt(challenger.score)}/${fmt(challenger.maxScore)} on "${test.title}". Can you beat me? Take the same test free:`;

  return (
    <div className="min-h-screen bg-surface-white">
      <RefTracker code={challenger.isYou ? null : challenge.refCode} />
      <div className="pt-10 sm:pt-14 pb-10 bg-surface-light border-b border-border px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-brand-blue mb-3">
            <Swords className="w-4 h-4" /> Friend challenge
          </span>
          <h1 className="heading-lg mb-2">
            {challenger.isYou ? 'Your challenge' : `${challenger.name} challenged you`}
          </h1>
          <p className="body-md mb-6">{test.title}</p>
          <div className="inline-flex flex-col items-center bg-white border border-border rounded-[24px] px-10 py-6 shadow-sm">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-1">{challenger.isYou ? 'Your score' : `${challenger.name}'s score`}</p>
            <p className="font-display text-[52px] leading-none text-brand-navy">{fmt(challenger.score)}<span className="text-[20px] text-text-muted font-ui"> / {fmt(challenger.maxScore)}</span></p>
            <p className="text-[13px] text-text-muted mt-2 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {duration(challenger.timeUsedSeconds)}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {challenger.isYou ? (
              <ShareLinkButton path={`/c/${token}`} title={test.title} text={shareText} label="Send to friends" />
            ) : yours ? (
              <>
                <p className={`text-[15px] font-semibold ${beat ? 'text-green-700' : 'text-text-secondary'}`}>
                  You scored {fmt(yours.score)}. {beat ? 'You won! 🏆' : yours.score === challenger.score ? 'It’s a tie!' : 'So close. Try another test to sharpen up.'}
                </p>
                {challenge.yourAttemptId && (
                  <Link href={`/tests/results/${challenge.yourAttemptId}`} className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline">
                    See your result <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </>
            ) : (
              <Link
                href={`/tests/${test.slug}?challenge=${token}`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-blue text-white font-ui font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20"
              >
                Take the same test free <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          {!challenger.isYou && !yours && (
            <p className="text-[12px] text-text-muted mt-3">
              {test.guest_allowed ? 'No sign-up needed.' : 'Free sign-in needed.'}
              {test.duration_seconds > 0 && ` Takes ${Math.round(test.duration_seconds / 60)} minutes.`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="heading-sm mb-4">Scoreboard</h2>
        {board.length === 1 ? (
          <p className="body-sm text-text-secondary bg-white border border-border rounded-2xl p-6">
            {challenger.isYou ? 'No one has taken your challenge yet. Send the link to your friends.' : 'Be the first to take this challenge.'}
          </p>
        ) : (
          <ol className="bg-white border border-border rounded-2xl overflow-hidden">
            {board.map((r, i) => (
              <li key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-border/60 last:border-0 ${r.isYou ? 'bg-blue-50' : ''}`}>
                <span className="w-8 shrink-0 font-ui font-bold text-[15px] text-text-primary flex items-center">
                  {i === 0 ? <Medal className="w-4 h-4 text-amber-500" /> : i + 1}
                </span>
                <span className="flex-1 min-w-0 truncate text-[14px] font-semibold text-text-primary">
                  {r.name}
                  {r.isYou && <span className="ml-2 text-[11px] font-bold text-brand-blue">YOU</span>}
                  {r.isChallenger && <span className="ml-2"><Badge>Challenger</Badge></span>}
                </span>
                <span className="hidden sm:flex items-center gap-1 text-[12px] text-text-muted w-20 justify-end"><Clock className="w-3 h-3" /> {duration(r.timeUsedSeconds)}</span>
                <span className="w-24 text-right font-ui font-bold text-[15px] text-brand-navy">{fmt(r.score)}<span className="text-[12px] text-text-muted font-normal"> / {fmt(r.maxScore)}</span></span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
