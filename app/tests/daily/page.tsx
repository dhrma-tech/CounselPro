import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Flame, Snowflake, Trophy } from 'lucide-react';
import { getViewer } from '@/lib/auth';
import { listPresets } from '@/lib/tests/server/content';
import { DAILY_DURATION_SECONDS, DAILY_PRESETS, DAILY_QUESTION_COUNT, getStreak, listTodayDaily } from '@/lib/tests/server/daily';
import { addDays, istDate, weekStart } from '@/lib/tests/istDate';
import { DAILY_PRESET_COOKIE } from '@/lib/tests/presetExams';
import Breadcrumb from '@/components/shared/Breadcrumb';
import DailyQuizPicker from '@/components/tests/DailyQuizPicker';
import { connection } from 'next/server';

export const metadata: Metadata = {
  title: 'Daily Quiz for JEE, NEET & MHT-CET | CounselPro',
  description: `A free ${DAILY_QUESTION_COUNT}-question quiz every day for JEE Main, NEET and MHT-CET. Keep your streak going and see the solutions right after.`,
};

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default async function DailyQuizPage() {
  // Per-student and live data: render on each request, never at build time
  await connection();
  const viewer = await getViewer();
  const today = istDate();
  const [presets, statuses, streak, cookieStore] = await Promise.all([
    listPresets(),
    listTodayDaily(viewer, today),
    viewer.user ? getStreak(viewer.user.id) : Promise.resolve(null),
    cookies(),
  ]);
  const presetName = new Map(presets.map((p) => [p.id, p.name]));
  const options = DAILY_PRESETS.filter((id) => presetName.has(id)).map((id) => ({ id, name: presetName.get(id)! }));
  const doneToday = streak?.lastDate === today;

  // Last five weeks, Monday first, ending today
  const done = new Set(streak?.history ?? []);
  const start = addDays(weekStart(today), -28);
  const days: string[] = [];
  for (let d = start; d <= today; d = addDays(d, 1)) days.push(d);

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: 'Daily Quiz' }]} />
          <h1 className="heading-lg mb-2">Daily Quiz</h1>
          <p className="body-md max-w-2xl">
            {DAILY_QUESTION_COUNT} questions, {Math.round(DAILY_DURATION_SECONDS / 60)} minutes, a new set every day at midnight (IST).
            Everyone gets the same questions, so you can compare with friends.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 items-start">
        <DailyQuizPicker presets={options} statuses={statuses} initialPresetId={cookieStore.get(DAILY_PRESET_COOKIE)?.value} />

        <div className="bg-white border border-border rounded-[24px] p-6">
          <h2 className="heading-sm mb-4 flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> Your streak</h2>
          {streak ? (
            <>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-display text-[48px] leading-none text-brand-navy">{streak.current}</span>
                <span className="text-[15px] text-text-muted font-ui mb-1">day{streak.current === 1 ? '' : 's'}</span>
              </div>
              <p className="text-[13px] text-text-secondary mb-4">
                {doneToday
                  ? 'Done for today. Come back tomorrow to keep it going.'
                  : streak.current > 0
                    ? 'Take today’s quiz to keep your streak alive.'
                    : 'Take today’s quiz to start a new streak.'}
              </p>
              <div className="grid grid-cols-7 gap-1.5 mb-4" role="img" aria-label={`Daily quizzes done in the last five weeks: ${days.filter((d) => done.has(d)).length}`}>
                {WEEKDAYS.map((w, i) => <span key={i} className="text-[10px] font-bold text-text-muted text-center">{w}</span>)}
                {days.map((d) => (
                  <span
                    key={d}
                    title={d}
                    className={`aspect-square rounded-md ${done.has(d) ? 'bg-orange-500' : 'bg-surface-light'} ${d === today ? 'ring-2 ring-brand-blue/50' : ''}`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-[12px] font-semibold">
                <span className="inline-flex items-center gap-1.5 bg-surface-light rounded-full px-3 py-1 text-text-secondary">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> Longest: {streak.longest}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface-light rounded-full px-3 py-1 text-text-secondary">
                  <Snowflake className="w-3.5 h-3.5 text-brand-blue" /> {streak.freezesLeft} freeze{streak.freezesLeft === 1 ? '' : 's'} left this week
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-3">Missed a day? One streak freeze each week saves it automatically.</p>
            </>
          ) : (
            <>
              <p className="text-[14px] text-text-secondary mb-4">You can play without an account. Sign in for free to start a streak and keep it across days and devices.</p>
              <Link href="/login?next=/tests/daily" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-orange-500 text-white font-ui font-semibold text-[14px]">
                Sign in to keep a streak
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
