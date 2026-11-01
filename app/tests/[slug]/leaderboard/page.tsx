import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, LogIn, Medal, Trophy, Users } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { INDIAN_STATES } from '@/lib/fieldMaps';
import { getPublishedTestBySlug } from '@/lib/tests/server/content';
import { serverNow } from '@/lib/tests/server/attempts';
import { getLeaderboard, type LeaderboardScope } from '@/lib/tests/server/leaderboard';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Badge from '@/components/shared/Badge';
import { saveLeaderboardSettings } from './actions';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await getPublishedTestBySlug(slug);
  return { title: bundle ? `Leaderboard: ${bundle.test.title} | CounselPro` : 'Leaderboard | CounselPro', robots: { index: false } };
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' });

function duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  return m > 0 ? `${m}m ${seconds % 60}s` : `${seconds}s`;
}

const MEDAL = ['text-amber-500', 'text-slate-400', 'text-orange-700'];

export default async function LeaderboardPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ scope?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const bundle = await getPublishedTestBySlug(slug);
  if (!bundle || bundle.test.is_practice || bundle.test.kind !== 'FULL_MOCK') notFound();
  const { test, preset } = bundle;
  const viewer = await getViewer();

  const scope: LeaderboardScope = query.scope === 'state' ? { type: 'state' } : { type: 'all' };
  const [profile, board] = await Promise.all([
    viewer.user
      ? supabaseAdmin().from('profiles').select('home_state, leaderboard_name').eq('user_id', viewer.user.id).maybeSingle().then((r) => r.data)
      : Promise.resolve(null),
    getLeaderboard(test, scope, viewer),
  ]);

  const base = `/tests/${slug}/leaderboard`;
  const tabs = [
    { href: base, label: 'All students', active: scope.type === 'all' },
    { href: `${base}?scope=state`, label: (profile?.home_state as string | null) ?? 'My state', active: scope.type === 'state' },
  ];

  const now = serverNow();
  const closesAt = test.window_end_at && new Date(test.window_end_at).getTime() > now ? test.window_end_at : null;
  const closed = !!test.window_end_at && !closesAt;
  const youInTable = board.rows.some((r) => r.isYou);

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: test.title, href: `/tests/${slug}` }, { label: 'Leaderboard' }]} />
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="blue">{preset.name}</Badge>
            {test.is_weekly && <Badge variant="teal">Weekly open mock</Badge>}
            {closesAt && <Badge variant="amber">Live</Badge>}
            {closed && <Badge>Final</Badge>}
          </div>
          <h1 className="heading-lg mb-2 flex items-center gap-3"><Trophy className="w-8 h-8 text-amber-500" /> Leaderboard</h1>
          <p className="body-md">
            {test.title}
            {closesAt && <> · Closes {when(closesAt)}. Ranks can change until then.</>}
            {closed && <> · Closed {when(test.window_end_at!)}.</>}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold border transition-all shrink-0 ${t.active ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-secondary border-border hover:border-brand-blue/40'}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {board.you && !youInTable && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <Medal className="w-6 h-6 text-brand-blue shrink-0" />
            <p className="text-[14px] text-text-secondary">
              {board.you.virtual
                ? <>Your score of <b className="text-text-primary">{fmt(board.you.score)}</b> would place you <b className="text-text-primary">#{board.you.rank.toLocaleString('en-IN')}</b>. It isn&apos;t on the board because only first attempts taken while the mock was open are counted.</>
                : <>You are <b className="text-text-primary">#{board.you.rank.toLocaleString('en-IN')}</b> of {board.total.toLocaleString('en-IN')} with a score of <b className="text-text-primary">{fmt(board.you.score)}</b>.</>}
            </p>
          </div>
        )}

        {board.needsState ? (
          <p className="bg-white border border-border rounded-2xl p-6 body-sm text-text-secondary">
            {viewer.user ? 'Choose your home state below to see how you rank against students from your state.' : 'Sign in and choose your home state to see the state leaderboard.'}
          </p>
        ) : board.rows.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-8 text-center">
            <p className="body-md mb-4">No one is on this board yet. Be the first!</p>
            <Link href={`/tests/${slug}`} className="text-brand-blue font-semibold hover:underline">Take the test</Link>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-light text-[12px] text-text-muted font-semibold">
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {board.scopeLabel} · {board.total.toLocaleString('en-IN')} student{board.total === 1 ? '' : 's'}</span>
              {board.total > board.rows.length && <span>Top {board.rows.length}</span>}
            </div>
            <ol>
              {board.rows.map((r, i) => (
                <li key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-border/60 last:border-0 ${r.isYou ? 'bg-blue-50' : ''}`}>
                  <span className="w-10 shrink-0 font-ui font-bold text-[15px] text-text-primary flex items-center gap-1">
                    {r.rank <= 3 ? <Medal className={`w-4 h-4 ${MEDAL[r.rank - 1]}`} /> : null}{r.rank}
                  </span>
                  <span className="flex-1 min-w-0 truncate text-[14px] font-semibold text-text-primary">
                    {r.name}{r.isYou && <span className="ml-2 text-[11px] font-bold text-brand-blue">YOU</span>}
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-[12px] text-text-muted w-20 justify-end"><Clock className="w-3 h-3" /> {duration(r.timeUsedSeconds)}</span>
                  <span className="w-24 text-right font-ui font-bold text-[15px] text-brand-navy">{fmt(r.score)}<span className="text-[12px] text-text-muted font-normal"> / {fmt(r.maxScore)}</span></span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-[12px] text-text-muted">
          Only each student&apos;s first attempt counts{test.is_weekly ? ', and only if it was taken while the mock was open' : ''}. Equal scores are ordered by time taken.
          Guest attempts are not shown.
        </p>

        {viewer.user ? (
          <form action={saveLeaderboardSettings.bind(null, slug)} className="bg-white border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-end gap-4">
            <label className="flex-1 text-[13px] font-semibold text-text-secondary">
              Home state
              <select name="home_state" defaultValue={(profile?.home_state as string | null) ?? ''} className="mt-1 w-full h-10 rounded-lg border border-border bg-white px-2 text-[14px] font-normal text-text-primary">
                <option value="" disabled>Choose your state</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-[13px] text-text-secondary sm:pb-2.5">
              <input type="checkbox" name="hide_name" defaultChecked={profile?.leaderboard_name === 'HIDDEN'} className="w-4 h-4 accent-brand-blue" />
              Hide my name (show &quot;Student #1234&quot;)
            </label>
            <button type="submit" className="h-10 px-5 rounded-lg bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0]">Save</button>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-border rounded-2xl p-5">
            <p className="flex-1 text-[14px] text-text-secondary">Sign in for free so your score shows up on the leaderboard.</p>
            <Link href={`/login?next=${encodeURIComponent(base)}`} className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-brand-blue text-white font-ui font-semibold text-[14px]">
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
