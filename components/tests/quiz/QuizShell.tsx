"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Loader2, SkipForward, XCircle, X } from 'lucide-react';
import QuestionBody, { type RevealInfo } from '../terminal/QuestionBody';
import MathHtml from '../MathHtml';
import { EMPTY_RESPONSE, hasValue, isScoredStatus } from '@/lib/tests/palette';
import { formatMinutes } from '@/lib/tests/sectionLock';
import { LANGUAGE_LABELS, type Language, type PaperQuestion, type ResponseValue } from '@/lib/tests/types';
import type { InitialResponse } from '../terminal/ExamTerminal';

interface QuizShellProps {
  attemptId: string;
  title: string;
  questions: PaperQuestion[];
  initialResponses: InitialResponse[];
  serverNow: number;
  endsAt: string | null;
  initialLanguage: Language;
}

interface Reveal extends RevealInfo {
  outcome: string;
  marks: number;
  solutionHtml: string | null;
}

export default function QuizShell(props: QuizShellProps) {
  const router = useRouter();
  const { attemptId, questions } = props;

  const doneIds = useMemo(
    () => new Set(props.initialResponses.filter((r) => isScoredStatus(r.status)).map((r) => r.question_id)),
    [props.initialResponses],
  );
  const [index, setIndex] = useState(() => {
    const i = questions.findIndex((q) => !doneIds.has(q.id));
    return i === -1 ? questions.length - 1 : i;
  });
  const [value, setValue] = useState<ResponseValue>(EMPTY_RESPONSE);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [checking, setChecking] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState({ correct: 0, answered: 0 });
  const [language, setLanguage] = useState<Language>(props.initialLanguage);
  const [now, setNow] = useState(() => Date.now());

  const seqRef = useRef(props.initialResponses.reduce((m, r) => Math.max(m, r.seq ?? 0), 0));
  const enteredAt = useRef(Date.now());
  const offset = useRef(props.serverNow - Date.now());
  const finishingRef = useRef(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const remaining = props.endsAt ? Math.max(0, Math.floor((new Date(props.endsAt).getTime() - (now + offset.current)) / 1000)) : null;

  const send = useCallback(async (questionId: string, body: Record<string, unknown>) => {
    seqRef.current += 1;
    const res = await fetch(`/api/attempts/${attemptId}/responses/${questionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq: seqRef.current, ...body }),
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, json };
  }, [attemptId]);

  const finish = useCallback(async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setFinishing(true);
    await fetch(`/api/attempts/${attemptId}/submit`, { method: 'POST' }).catch(() => null);
    router.replace(`/tests/results/${attemptId}`);
  }, [attemptId, router]);

  useEffect(() => {
    if (!props.endsAt) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [props.endsAt]);

  useEffect(() => {
    if (remaining === 0) void finish();
  }, [remaining, finish]);

  useEffect(() => {
    if (!question) return;
    enteredAt.current = Date.now();
    void send(question.id, { status: 'NOT_ANSWERED', selectedOptionIds: [], numericalInput: null, timeSpentDeltaMs: 0, visited: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id]);

  const check = async () => {
    if (!hasValue(question.type, value) || checking) return;
    setChecking(true);
    setError('');
    const { ok, json } = await send(question.id, {
      status: 'ANSWERED',
      selectedOptionIds: value.selectedOptionIds,
      numericalInput: value.numericalInput,
      timeSpentDeltaMs: Date.now() - enteredAt.current,
    }).catch(() => ({ ok: false, json: { error: 'You seem to be offline. Please check your connection and try again.' } }));
    setChecking(false);
    if (!ok) {
      if (json.code === 'EXPIRED' || json.code === 'SUBMITTED') return void finish();
      if (json.code === 'ALREADY_ANSWERED') return next();
      setError(json.error ?? 'Could not check your answer. Please try again.');
      return;
    }
    if (json.reveal) {
      setReveal(json.reveal);
      setScore((s) => ({ correct: s.correct + (json.reveal.outcome === 'CORRECT' ? 1 : 0), answered: s.answered + 1 }));
    }
  };

  const next = () => {
    if (isLast) return void finish();
    setIndex((i) => i + 1);
    setValue(EMPTY_RESPONSE);
    setReveal(null);
    setError('');
  };

  const skip = async () => {
    await send(question.id, { status: 'NOT_ANSWERED', selectedOptionIds: [], numericalInput: null, timeSpentDeltaMs: Date.now() - enteredAt.current }).catch(() => null);
    next();
  };

  if (!question) return null;
  const progress = ((index + (reveal ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-surface-page pb-16">
      <div className="max-w-[760px] mx-auto px-4 pt-6 sm:pt-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Link href="/tests" className="flex items-center gap-1.5 text-[13px] text-text-muted hover:text-brand-blue">
            <X className="w-4 h-4" /> Exit
          </Link>
          <h1 className="font-ui font-semibold text-[14px] text-text-primary truncate">{props.title}</h1>
          {remaining !== null ? (
            <span className={`flex items-center gap-1 font-mono font-bold text-[14px] px-2 py-1 rounded-lg ${remaining < 60 ? 'bg-red-50 text-red-600' : 'bg-white border border-border'}`}>
              <Clock className="w-3.5 h-3.5" /> {formatMinutes(remaining)}
            </span>
          ) : <span className="text-[12px] text-text-muted">No timer</span>}
        </div>

        <div className="h-2 bg-white border border-border rounded-full overflow-hidden mb-6" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full bg-brand-blue" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>

        <div className="bg-white border border-border rounded-2xl sm:rounded-[32px] p-5 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-5 text-[12px]">
            <span className="font-bold text-text-muted uppercase tracking-wider">
              Question {index + 1} of {questions.length} · {question.subject}
            </span>
            {question.languages.length > 1 && (
              <select
                value={question.languages.includes(language) ? language : 'en'}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="h-8 rounded-lg border border-border bg-white px-2 text-[12px] font-semibold"
                aria-label="Question language"
              >
                {question.languages.map((l) => <option key={l} value={l}>{LANGUAGE_LABELS[l]}</option>)}
              </select>
            )}
          </div>

          <div className="text-[17px]">
            <QuestionBody
              key={question.id}
              question={question}
              language={question.languages.includes(language) ? language : 'en'}
              value={value}
              onChange={setValue}
              disabled={!!reveal || checking}
              reveal={reveal}
            />
          </div>

          {reveal && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-3">
              <div className={`flex items-center gap-2 p-3 rounded-xl text-[14px] font-semibold ${
                reveal.outcome === 'CORRECT' ? 'bg-green-50 text-green-700' : reveal.outcome === 'PARTIAL' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'
              }`}>
                {reveal.outcome === 'CORRECT' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {reveal.outcome === 'CORRECT' ? 'Correct!' : reveal.outcome === 'PARTIAL' ? 'Partly correct' : 'Not quite.'}
                <span className="ml-auto font-mono">{reveal.marks > 0 ? `+${reveal.marks}` : reveal.marks}</span>
              </div>
              {reveal.solutionHtml && (
                <div className="p-4 bg-surface-light border border-border rounded-xl text-[15px]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Solution</p>
                  <MathHtml html={reveal.solutionHtml} className="text-text-secondary leading-relaxed" />
                </div>
              )}
            </motion.div>
          )}

          {error && <p className="mt-5 p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">{error}</p>}

          <div className="mt-8 pt-5 border-t border-border flex items-center gap-3">
            {!reveal && (
              <button onClick={skip} className="h-12 px-4 rounded-xl text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5 font-medium text-[14px] flex items-center gap-1.5">
                <SkipForward className="w-4 h-4" /> Skip
              </button>
            )}
            {reveal ? (
              <button onClick={next} className="flex-1 h-12 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2">
                {isLast ? 'See my results' : 'Next question'} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={check}
                disabled={!hasValue(question.type, value) || checking}
                className="flex-1 h-12 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
              >
                {checking ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check answer'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[12px] text-text-muted mt-4">
          {score.answered > 0 ? `${score.correct} correct out of ${score.answered} answered so far` : 'Pick an answer, then check it to see the solution.'}
        </p>
      </div>

      {finishing && (
        <div className="fixed inset-0 z-[95] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
          <p className="font-ui font-semibold text-text-primary">Preparing your results…</p>
        </div>
      )}
    </div>
  );
}
