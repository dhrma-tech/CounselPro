"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Clock, Info, Loader2, LogIn, PlayCircle, Wifi } from 'lucide-react';
import { PaletteLegend } from './PaletteBadge';
import { LANGUAGE_LABELS, type AttemptMode, type Language } from '@/lib/tests/types';

interface MarkingRow {
  section: string;
  type: string;
  count: number;
  correct: number;
  wrong: number;
  partial: number | null;
}

interface TestLobbyProps {
  testId: string;
  slug: string;
  mode: AttemptMode;
  guestAllowed: boolean;
  signedIn: boolean;
  resumeAttemptId: string | null;
  languages: Language[];
  instructionsHtml: string | null;
  markingRows: MarkingRow[];
  presetVerified: boolean;
  hasSectionLock: boolean;
  /** Weekly mocks that have not opened yet */
  opensAt?: string | null;
  challengeToken?: string | null;
}

export default function TestLobby(props: TestLobbyProps) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');
  const isExam = props.mode === 'EXAM';
  const needsLogin = !props.guestAllowed && !props.signedIn;
  const loginHref = `/login?next=${encodeURIComponent(`/tests/${props.slug}${props.challengeToken ? `?challenge=${props.challengeToken}` : ''}`)}`;

  const start = async () => {
    setStarting(true);
    setError('');
    try {
      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId: props.testId, language, challengeToken: props.challengeToken ?? undefined }),
      });
      const body = await res.json();
      if (res.status === 401) {
        router.push(loginHref);
        return;
      }
      if (!res.ok) throw new Error(body.error);
      if (isExam && document.documentElement.requestFullscreen && window.matchMedia('(pointer: fine)').matches) {
        document.documentElement.requestFullscreen().catch(() => null);
      }
      router.push(`/tests/attempt/${body.attemptId}`);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'Could not start the test. Please check your internet and try again.');
      setStarting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div className="space-y-8">
        {!props.presetVerified && (
          <p className="flex items-start gap-2 text-[13px] text-text-secondary bg-blue-50 border border-blue-100 rounded-xl p-3">
            <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
            The pattern and marking follow the latest public information for this exam. Always check the official notice for the final rules.
          </p>
        )}

        <section>
          <h2 className="heading-sm mb-3">Marking scheme</h2>
          <div className="overflow-x-auto bg-white border border-border rounded-2xl">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-text-muted border-b border-border bg-surface-light">
                  <th className="py-2.5 px-4 font-semibold">Section</th>
                  <th className="py-2.5 px-3 font-semibold">Question type</th>
                  <th className="py-2.5 px-3 font-semibold">Qs</th>
                  <th className="py-2.5 px-3 font-semibold">Correct</th>
                  <th className="py-2.5 px-3 font-semibold">Wrong</th>
                </tr>
              </thead>
              <tbody>
                {props.markingRows.map((r, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 px-4 font-semibold text-text-primary">{r.section}</td>
                    <td className="py-2.5 px-3 text-text-secondary">{r.type}{r.partial ? ` (+${r.partial} per correct option if no wrong option)` : ''}</td>
                    <td className="py-2.5 px-3">{r.count}</td>
                    <td className="py-2.5 px-3 text-green-700 font-semibold">+{r.correct}</td>
                    <td className={`py-2.5 px-3 font-semibold ${r.wrong < 0 ? 'text-red-600' : 'text-text-muted'}`}>{r.wrong < 0 ? r.wrong : '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {isExam && (
          <>
            <section>
              <h2 className="heading-sm mb-3">Instructions</h2>
              <div className="instructions-html bg-white border border-border rounded-2xl p-5 text-[14px] text-text-secondary space-y-3" dangerouslySetInnerHTML={{ __html: props.instructionsHtml ?? '' }} />
            </section>
            <section>
              <h2 className="heading-sm mb-3">What the question palette colours mean</h2>
              <div className="bg-white border border-border rounded-2xl p-5"><PaletteLegend /></div>
            </section>
          </>
        )}
      </div>

      <aside className="lg:sticky lg:top-[calc(var(--header-offset,80px)+24px)] self-start bg-white border border-border rounded-[24px] p-6 shadow-sm space-y-5">
        {props.resumeAttemptId ? (
          <>
            <p className="body-sm text-text-secondary">You have an unfinished attempt. The timer kept running while you were away.</p>
            <Link href={`/tests/attempt/${props.resumeAttemptId}`} className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-[#1648c0]">
              <PlayCircle className="w-5 h-5" /> Resume test
            </Link>
          </>
        ) : props.opensAt ? (
          <>
            <p className="body-sm text-text-secondary">
              This weekly mock opens on <b className="text-text-primary">{new Date(props.opensAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</b>. Come back then to take it with everyone else.
            </p>
            <button disabled className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-bold text-[15px] opacity-50">
              <Clock className="w-5 h-5" /> Not open yet
            </button>
          </>
        ) : needsLogin ? (
          <>
            <p className="body-sm text-text-secondary">Sign in to take this test. It&apos;s free and takes a few seconds.</p>
            <Link href={loginHref} className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-[#1648c0]">
              <LogIn className="w-5 h-5" /> Sign in to start
            </Link>
          </>
        ) : (
          <>
            {props.languages.length > 1 && (
              <label className="block">
                <span className="font-ui font-medium text-[13px] text-text-secondary">Default question language</span>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="input-field mt-1 h-11">
                  {props.languages.map((l) => <option key={l} value={l}>{LANGUAGE_LABELS[l]}</option>)}
                </select>
                <span className="text-[11px] text-text-muted">You can switch language for any question during the test where a translation is available.</span>
              </label>
            )}

            {isExam && (
              <>
                <p className="flex items-center gap-2 text-[12px] text-text-muted"><Wifi className="w-3.5 h-3.5" /> Works on mobile. Answers are saved even if your internet drops.</p>
                {props.hasSectionLock && (
                  <p className="text-[12px] text-text-secondary bg-surface-light rounded-xl p-3">This test has two timed parts, just like the real exam. Read the instructions.</p>
                )}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-[#1A56DB]" />
                  <span className="text-[13px] text-text-secondary leading-relaxed">
                    I have read the instructions. I will attempt this test on my own, without outside help.
                  </span>
                </label>
              </>
            )}

            <button
              onClick={start}
              disabled={(isExam && !agreed) || starting}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20 disabled:opacity-50 disabled:pointer-events-none"
            >
              {starting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{isExam ? 'I am ready to begin' : 'Start quiz'} <ArrowRight className="w-4 h-4" /></>}
            </button>
            {!props.signedIn && (
              <p className="text-[12px] text-text-muted text-center">
                No login needed to start. <Link href={loginHref} className="text-brand-blue font-semibold hover:underline">Sign in</Link> to save your results.
              </p>
            )}
          </>
        )}
        {error && <p className="p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">{error}</p>}
      </aside>
    </div>
  );
}
