"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle, BookOpen, ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp, Cloud, CloudOff,
  FileText, Grid3X3, Keyboard, Loader2, Lock, Send, WifiOff,
} from 'lucide-react';
import PaletteBadge, { PaletteLegend } from '../PaletteBadge';
import MathHtml from '../MathHtml';
import QuestionBody, { questionContent } from './QuestionBody';
import Dialog from './Dialog';
import { WriteQueue, type SyncState } from '@/lib/tests/client/writeQueue';
import {
  EMPTY_RESPONSE, INITIAL_QUESTION_STATE, countStatuses, hasValue, isScoredStatus,
  transitionQuestionState, type PaletteAction, type QuestionState,
} from '@/lib/tests/palette';
import { formatClock, sectionAccess } from '@/lib/tests/sectionLock';
import {
  LANGUAGE_LABELS, type Language, type PaletteStatus, type PaperQuestion, type PaperSection,
  type ResponseValue, type SectionalLock,
} from '@/lib/tests/types';

export interface InitialResponse {
  question_id: string;
  status: PaletteStatus;
  selected_option_ids: string[];
  numerical_input: string | null;
  seq: number;
}

export interface ExamTerminalProps {
  attemptId: string;
  testTitle: string;
  examName: string;
  candidate: { name: string; shortId: string; contact: string };
  sections: PaperSection[];
  questions: PaperQuestion[];
  initialResponses: InitialResponse[];
  serverNow: number;
  endsAt: string;
  sectionalLock: SectionalLock | null;
  initialLanguage: Language;
  instructionsHtml: string | null;
}

type FontScale = 'sm' | 'md' | 'lg';
const FONT_CLASSES: Record<FontScale, string> = { sm: 'text-[15px]', md: 'text-[17px]', lg: 'text-[20px]' };
const HEARTBEAT_MS = 10_000;

export default function ExamTerminal(props: ExamTerminalProps) {
  const router = useRouter();
  const { attemptId, sections, questions, sectionalLock } = props;

  const questionById = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);
  const orderedIds = useMemo(() => sections.flatMap((s) => s.questionIds), [sections]);
  const numberOf = useMemo(() => new Map(orderedIds.map((id, i) => [id, i + 1])), [orderedIds]);
  const sectionOf = useMemo(() => {
    const m = new Map<string, string>();
    sections.forEach((s) => s.questionIds.forEach((id) => m.set(id, s.id)));
    return m;
  }, [sections]);
  const languages = useMemo(() => {
    const set = new Set<Language>();
    questions.forEach((q) => q.languages.forEach((l) => set.add(l)));
    return Array.from(set);
  }, [questions]);

  // ---------------------------------------------------------------- state
  const [states, setStates] = useState<Record<string, QuestionState>>(() => {
    const init: Record<string, QuestionState> = {};
    for (const id of orderedIds) init[id] = INITIAL_QUESTION_STATE;
    for (const r of props.initialResponses) {
      const value = { selectedOptionIds: r.selected_option_ids ?? [], numericalInput: r.numerical_input };
      init[r.question_id] = { status: r.status, committed: isScoredStatus(r.status) ? value : null };
    }
    return init;
  });
  const statesRef = useRef(states);
  statesRef.current = states;

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [buffer, setBuffer] = useState<ResponseValue>(EMPTY_RESPONSE);
  const [language, setLanguage] = useState<Language>(languages.includes(props.initialLanguage) ? props.initialLanguage : 'en');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [syncState, setSyncState] = useState<SyncState>('saved');
  const [connectionLost, setConnectionLost] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number>(Date.now());
  const [paneCollapsed, setPaneCollapsed] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);
  const [dialog, setDialog] = useState<'paper' | 'instructions' | 'submit' | 'switch' | 'shortcuts' | null>(null);
  const [submitting, setSubmitting] = useState<'manual' | 'auto' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const offsetRef = useRef(props.serverNow - Date.now());
  const endsAtMs = useMemo(() => new Date(props.endsAt).getTime(), [props.endsAt]);
  const remaining = Math.max(0, Math.floor((endsAtMs - (now + offsetRef.current)) / 1000));

  const enteredAtRef = useRef<number>(Date.now());
  const seqRef = useRef(0);
  const queueRef = useRef<WriteQueue | null>(null);
  const integrityRef = useRef<Record<string, number>>({});
  const viewportRef = useRef<HTMLDivElement>(null);
  const finishingRef = useRef(false);
  const lastSectionQuestion = useRef<Record<string, string>>({});
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const accessOf = useCallback(
    (sectionId: string, secondsLeft = remaining) => sectionAccess(sectionalLock, sectionId, secondsLeft),
    [sectionalLock, remaining],
  );

  // ---------------------------------------------------------------- finishing
  const goToResults = useCallback(() => {
    try { localStorage.removeItem(`cp_queue_${attemptId}`); } catch { /* ignore */ }
    router.replace(`/tests/results/${attemptId}`);
  }, [attemptId, router]);

  const finish = useCallback(async (kind: 'manual' | 'auto') => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setSubmitting(kind);
    setDialog(null);
    await queueRef.current?.whenIdle(kind === 'auto' ? 5000 : 10000);
    for (let i = 0; i < 3; i++) {
      try {
        const res = await fetch(`/api/attempts/${attemptId}/submit`, { method: 'POST' });
        if (res.ok || res.status === 404) break;
      } catch {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    goToResults();
  }, [attemptId, goToResults]);

  // ---------------------------------------------------------------- write queue
  useEffect(() => {
    const queue = new WriteQueue({
      attemptId,
      onState: (s) => {
        setSyncState(s);
        if (s === 'saved') setLastSyncedAt(Date.now());
      },
      onRejected: (_write, code, message) => {
        if (code === 'EXPIRED' || code === 'SUBMITTED') void finish('auto');
        else if (code !== 'SECTION_LOCKED') showToast(message);
      },
    });
    queueRef.current = queue;
    const serverMax = props.initialResponses.reduce((m, r) => Math.max(m, r.seq ?? 0), 0);
    seqRef.current = Math.max(serverMax, queue.maxSeq());

    // Answers saved locally but not yet synced win over the server copy
    const pending = queue.pendingByQuestion();
    if (pending.size > 0) {
      setStates((prev) => {
        const next = { ...prev };
        pending.forEach((w, qid) => {
          const value = { selectedOptionIds: w.selectedOptionIds, numericalInput: w.numericalInput };
          next[qid] = { status: w.status, committed: isScoredStatus(w.status) ? value : null };
        });
        return next;
      });
    }

    const onOnline = () => queue.retryNow();
    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
      queue.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const write = useCallback((questionId: string, state: QuestionState, extra: { visited?: boolean; deltaMs?: number } = {}) => {
    seqRef.current += 1;
    queueRef.current?.enqueue({
      questionId,
      seq: seqRef.current,
      status: state.status,
      selectedOptionIds: state.committed?.selectedOptionIds ?? [],
      numericalInput: state.committed?.numericalInput ?? null,
      timeSpentDeltaMs: extra.deltaMs ?? 0,
      visited: extra.visited,
    });
  }, []);

  // ---------------------------------------------------------------- navigation
  const takeDelta = () => {
    const delta = Date.now() - enteredAtRef.current;
    enteredAtRef.current = Date.now();
    return delta;
  };

  const enter = useCallback((questionId: string) => {
    const prev = statesRef.current[questionId] ?? INITIAL_QUESTION_STATE;
    const q = questionById.get(questionId);
    if (!q) return;
    const next = transitionQuestionState(q.type, prev, { type: 'OPEN' });
    if (next !== prev) {
      setStates((s) => ({ ...s, [questionId]: next }));
      write(questionId, next, { visited: true });
    } else {
      write(questionId, prev, { visited: true });
    }
    setBuffer(next.committed ?? EMPTY_RESPONSE);
    setCurrentId(questionId);
    lastSectionQuestion.current[sectionOf.get(questionId)!] = questionId;
    enteredAtRef.current = Date.now();
    viewportRef.current?.scrollTo({ top: 0 });
  }, [questionById, sectionOf, write]);

  /** Leave the current question without saving the on-screen buffer. */
  const leaveDiscarding = useCallback(() => {
    if (!currentId) return;
    const q = questionById.get(currentId)!;
    const prev = statesRef.current[currentId];
    const next = transitionQuestionState(q.type, prev, { type: 'NAVIGATE_AWAY' });
    if (next !== prev) setStates((s) => ({ ...s, [currentId]: next }));
    if (accessOf(sectionOf.get(currentId)!) === 'OPEN') write(currentId, next, { deltaMs: takeDelta() });
  }, [currentId, questionById, sectionOf, accessOf, write]);

  const firstOpenQuestion = useCallback((secondsLeft: number) => {
    for (const s of sections) {
      if (sectionAccess(sectionalLock, s.id, secondsLeft) === 'OPEN' && s.questionIds.length > 0) {
        return lastSectionQuestion.current[s.id] ?? s.questionIds[0];
      }
    }
    return orderedIds[0] ?? null;
  }, [sections, sectionalLock, orderedIds]);

  const nextQuestionId = useCallback((fromId: string) => {
    const sectionId = sectionOf.get(fromId)!;
    const section = sections.find((s) => s.id === sectionId)!;
    const idx = section.questionIds.indexOf(fromId);
    if (idx < section.questionIds.length - 1) return section.questionIds[idx + 1];
    const sIdx = sections.indexOf(section);
    for (let i = sIdx + 1; i < sections.length; i++) {
      if (accessOf(sections[i].id) === 'OPEN' && sections[i].questionIds.length > 0) return sections[i].questionIds[0];
    }
    return section.questionIds[0];
  }, [sections, sectionOf, accessOf]);

  const goTo = useCallback((questionId: string) => {
    if (questionId === currentId) return;
    if (accessOf(sectionOf.get(questionId)!) !== 'OPEN') return;
    leaveDiscarding();
    enter(questionId);
    setMobilePaletteOpen(false);
  }, [currentId, accessOf, sectionOf, leaveDiscarding, enter]);

  const goToSection = useCallback((sectionId: string) => {
    if (accessOf(sectionId) !== 'OPEN') return;
    const section = sections.find((s) => s.id === sectionId);
    if (!section || section.questionIds.length === 0) return;
    goTo(lastSectionQuestion.current[sectionId] ?? section.questionIds[0]);
  }, [accessOf, sections, goTo]);

  // First question once the queue is ready
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const first = firstOpenQuestion(remaining);
    if (first) enter(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------- actions
  const commitAction = (action: PaletteAction, moveNext: boolean) => {
    if (!currentId) return;
    const q = questionById.get(currentId)!;
    const prev = statesRef.current[currentId];
    const section = sections.find((s) => s.id === sectionOf.get(currentId));

    if ('value' in action && section?.attemptLimit && hasValue(q.type, action.value) && !isScoredStatus(prev.status)) {
      const answered = section.questionIds.filter((id) => isScoredStatus(statesRef.current[id]?.status)).length;
      if (answered >= section.attemptLimit) {
        showToast(`You can answer only ${section.attemptLimit} questions in ${section.name}. Clear another answer first.`);
        return;
      }
    }

    const next = transitionQuestionState(q.type, prev, action);
    setStates((s) => ({ ...s, [currentId]: next }));
    write(currentId, next, { deltaMs: takeDelta() });
    setBuffer(next.committed ?? EMPTY_RESPONSE);
    if (moveNext) {
      const target = nextQuestionId(currentId);
      if (target !== currentId) enter(target);
    }
  };

  const saveAndNext = () => commitAction({ type: 'SAVE_AND_NEXT', value: buffer }, true);
  const markAndNext = () => commitAction({ type: 'MARK_AND_NEXT', value: buffer }, true);
  const saveAndMark = () => commitAction({ type: 'SAVE_AND_MARK', value: buffer }, true);
  const clearResponse = () => commitAction({ type: 'CLEAR' }, false);

  // ---------------------------------------------------------------- clock, lock switch, heartbeat
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const warnedRef = useRef<Set<number>>(new Set());
  const switchedRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (!currentId) return;
    if (remaining <= 0) {
      void finish('auto');
      return;
    }
    for (const mark of [600, 300]) {
      if (remaining <= mark && remaining > mark - 5 && !warnedRef.current.has(mark) && endsAtMs - props.serverNow > mark * 2000) {
        warnedRef.current.add(mark);
        showToast(`${mark / 60} minutes left`);
      }
    }
    if (sectionalLock) {
      const switched = remaining <= sectionalLock.switchAtRemainingSeconds;
      if (switchedRef.current === false && switched) {
        // Sections switch: earlier answers are already saved; the open buffer is dropped
        const target = firstOpenQuestion(remaining);
        if (target && accessOf(sectionOf.get(currentId)!) !== 'OPEN') {
          enter(target);
          setDialog('switch');
        }
      }
      switchedRef.current = switched;
    }
  }, [remaining, currentId, sectionalLock, firstOpenQuestion, accessOf, sectionOf, enter, finish, showToast, endsAtMs, props.serverNow]);

  useEffect(() => {
    let failures = 0;
    const beat = async () => {
      const integrity = integrityRef.current;
      integrityRef.current = {};
      try {
        const res = await fetch(`/api/attempts/${attemptId}/heartbeat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ integrity }),
        });
        if (!res.ok) throw new Error('heartbeat');
        const body = await res.json();
        failures = 0;
        setConnectionLost(false);
        setLastSyncedAt(Date.now());
        if (body.status && body.status !== 'IN_PROGRESS') {
          goToResults();
          return;
        }
        if (typeof body.serverNow === 'number') {
          const offset = body.serverNow - Date.now();
          if (Math.abs(offset - offsetRef.current) > 2000) offsetRef.current = offset;
        }
      } catch {
        failures++;
        Object.entries(integrity).forEach(([k, v]) => { integrityRef.current[k] = (integrityRef.current[k] ?? 0) + v; });
        if (failures >= 2) setConnectionLost(true);
      }
    };
    const t = setInterval(beat, HEARTBEAT_MS);
    return () => clearInterval(t);
  }, [attemptId, goToResults]);

  // ---------------------------------------------------------------- integrity (soft) + shortcuts
  useEffect(() => {
    const bump = (k: string) => { integrityRef.current[k] = (integrityRef.current[k] ?? 0) + 1; };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        bump('tabBlur');
        showToast('Stay on the test tab for the most exam-like practice.');
      }
    };
    const onFullscreen = () => { if (!document.fullscreenElement) bump('fullscreenExit'); };
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'enter') {
        e.preventDefault();
        document.getElementById('cbt-save-next')?.click();
        return;
      }
      if (((e.ctrlKey || e.metaKey) && ['c', 'p', 'f', 's', 'u'].includes(key)) || key === 'f12') {
        e.preventDefault();
        bump(key === 'c' ? 'copyAttempt' : 'shortcutBlocked');
      }
    };
    const onCopy = (e: ClipboardEvent) => { e.preventDefault(); bump('copyAttempt'); };
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('keydown', onKey);
    document.addEventListener('copy', onCopy);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('copy', onCopy);
      document.body.style.overflow = prevOverflow;
    };
  }, [showToast]);

  // ---------------------------------------------------------------- derived
  const current = currentId ? questionById.get(currentId) ?? null : null;
  const currentSectionId = currentId ? sectionOf.get(currentId)! : sections[0]?.id;
  const currentSection = sections.find((s) => s.id === currentSectionId);
  const sectionCounts = (sectionId: string) => {
    const s = sections.find((x) => x.id === sectionId);
    return countStatuses((s?.questionIds ?? []).map((id) => states[id]?.status ?? 'NOT_VISITED'));
  };
  const lowTime = remaining <= 600;
  const switchLabel = sectionalLock ? formatClock(sectionalLock.switchAtRemainingSeconds).replace(/^00 : /, '').replace(/ /g, '') : '';

  const watermarkText = [props.candidate.name, props.candidate.shortId, props.candidate.contact].filter(Boolean).join(' · ');

  // ---------------------------------------------------------------- render helpers
  const palette = (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-surface-light rounded-2xl border border-border">
        <div className="w-11 h-11 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-ui font-bold text-[16px] shrink-0">
          {props.candidate.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-ui font-semibold text-[14px] text-text-primary truncate">{props.candidate.name}</p>
          <p className="text-[11px] text-text-muted font-mono">ID {props.candidate.shortId}</p>
        </div>
      </div>

      {currentSection && (() => {
        const c = sectionCounts(currentSection.id);
        return (
          <div className="grid grid-cols-2 gap-2 text-[11px] font-ui">
            {([['ANSWERED', c.answered], ['NOT_ANSWERED', c.notAnswered], ['NOT_VISITED', c.notVisited], ['MARKED_FOR_REVIEW', c.markedForReview], ['ANSWERED_AND_MARKED', c.answeredAndMarked]] as [PaletteStatus, number][]).map(([st, n]) => (
              <div key={st} className={`flex items-center gap-2 ${st === 'ANSWERED_AND_MARKED' ? 'col-span-2' : ''}`}>
                <PaletteBadge status={st} label={n} size={30} />
                <span className="text-text-secondary leading-tight">
                  {st === 'ANSWERED' ? 'Answered' : st === 'NOT_ANSWERED' ? 'Not Answered' : st === 'NOT_VISITED' ? 'Not Visited' : st === 'MARKED_FOR_REVIEW' ? 'Marked for Review' : 'Answered & Marked (will be evaluated)'}
                </span>
              </div>
            ))}
          </div>
        );
      })()}

      <div>
        <p className="px-1 mb-2 text-[12px] font-bold uppercase tracking-wider text-white bg-brand-navy rounded-lg py-1.5 text-center">
          {currentSection?.name}
        </p>
        <div className="grid grid-cols-5 gap-1.5 justify-items-center" role="grid" aria-label="Question palette">
          {currentSection?.questionIds.map((id) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
              aria-current={id === currentId}
            >
              <PaletteBadge status={states[id]?.status ?? 'NOT_VISITED'} label={String(numberOf.get(id)).padStart(2, '0')} active={id === currentId} />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setDialog('submit')}
        className="w-full h-11 rounded-xl bg-brand-blue text-white font-ui font-bold text-[14px] hover:bg-[#1648c0] transition-all flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" /> Submit Test
      </button>
    </div>
  );

  // ---------------------------------------------------------------- render
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-[100dvh] font-ui">
      {/* Top utility bar */}
      <div className="h-12 shrink-0 bg-brand-navy text-white flex items-center justify-between px-3 sm:px-4 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-bold tracking-wide">{props.examName}</span>
          <h1 className="text-[14px] font-semibold truncate">{props.testTitle}</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className={`hidden md:inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md ${syncState === 'offline' ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-white/80'}`}>
            {syncState === 'saving' ? <Loader2 className="w-3 h-3 animate-spin" /> : syncState === 'offline' ? <CloudOff className="w-3 h-3" /> : <Cloud className="w-3 h-3" />}
            {syncState === 'saving' ? 'Saving…' : syncState === 'offline' ? 'Offline, will sync' : 'Saved'}
          </span>
          <button onClick={() => setDialog('paper')} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 text-[12px] font-medium">
            <FileText className="w-4 h-4" /><span className="hidden lg:inline">Question Paper</span>
          </button>
          <button onClick={() => setDialog('instructions')} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 text-[12px] font-medium">
            <BookOpen className="w-4 h-4" /><span className="hidden lg:inline">Instructions</span>
          </button>
          <button onClick={() => setDialog('shortcuts')} className="hidden sm:flex p-1.5 rounded-lg hover:bg-white/10" aria-label="Keyboard shortcuts">
            <Keyboard className="w-4 h-4" />
          </button>
          <div className="flex items-center rounded-lg bg-white/10 overflow-hidden" role="group" aria-label="Text size">
            {(['sm', 'md', 'lg'] as FontScale[]).map((f, i) => (
              <button
                key={f}
                onClick={() => setFontScale(f)}
                className={`px-1.5 sm:px-2 py-1 text-[11px] font-bold ${fontScale === f ? 'bg-white text-brand-navy' : 'hover:bg-white/10'}`}
                aria-pressed={fontScale === f}
              >
                {['A-', 'A', 'A+'][i]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {connectionLost && (
        <div className="shrink-0 bg-amber-50 border-b border-amber-200 text-amber-800 text-[12px] px-4 py-1.5 flex items-center gap-2" role="status">
          <WifiOff className="w-3.5 h-3.5" />
          Connection lost. Reconnecting… Your answers are kept on this device and the timer keeps running. Last synced at {new Date(lastSyncedAt).toLocaleTimeString()}.
        </div>
      )}

      {/* Sections + timer */}
      <div className="shrink-0 border-b border-border bg-surface-light flex items-stretch justify-between gap-2 px-2 sm:px-4">
        <div className="flex overflow-x-auto hide-scrollbar">
          {sections.map((s) => {
            const access = accessOf(s.id);
            const c = sectionCounts(s.id);
            const active = s.id === currentSectionId;
            return (
              <div key={s.id} className="relative group">
                <button
                  onClick={() => goToSection(s.id)}
                  disabled={access !== 'OPEN'}
                  className={`h-11 px-3 sm:px-4 flex items-center gap-1.5 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-colors ${
                    active ? 'border-brand-blue text-brand-blue bg-white' : 'border-transparent text-text-secondary hover:text-text-primary'
                  } disabled:cursor-not-allowed disabled:text-text-muted`}
                >
                  {access !== 'OPEN' && <Lock className="w-3.5 h-3.5" />}
                  {s.name}
                  {access === 'LOCKED_UNTIL_SWITCH' && <span className="hidden sm:inline text-[11px] font-medium">(Opens at {switchLabel})</span>}
                </button>
                <div className="pointer-events-none absolute left-0 top-full z-20 hidden group-hover:block mt-1 w-56 rounded-xl border border-border bg-white shadow-xl p-3 text-[12px] text-text-secondary">
                  <p className="font-bold text-text-primary mb-1.5">{s.name}</p>
                  {access === 'LOCKED_AFTER_SWITCH' && <p className="mb-1.5 text-text-muted">Locked. Your answers are saved.</p>}
                  <p>Answered: {c.answered}</p>
                  <p>Not answered: {c.notAnswered}</p>
                  <p>Marked for review: {c.markedForReview}</p>
                  <p>Answered &amp; marked: {c.answeredAndMarked}</p>
                  <p>Not visited: {c.notVisited}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-[11px] text-text-muted uppercase tracking-wider font-bold">Time left</span>
          <span
            className={`font-mono font-bold text-[15px] sm:text-[17px] px-2.5 py-1 rounded-lg tabular-nums ${lowTime ? 'bg-red-50 text-red-600' : 'bg-white text-text-primary border border-border'}`}
            role="timer"
            aria-live="off"
          >
            {formatClock(remaining)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 min-w-0 flex flex-col">
          {current && (
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-border text-[12px]">
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="font-bold text-text-primary text-[14px]">Question {String(numberOf.get(current.id)).padStart(2, '0')}</span>
                <span className="hidden sm:inline">
                  {current.type === 'MULTI_MCQ' ? 'Multiple correct' : current.type === 'NUMERICAL' ? 'Numerical' : current.type === 'MATRIX_MATCH' ? 'Match the list' : current.type === 'PARAGRAPH' ? 'Paragraph' : 'Single correct'}
                </span>
                <span className="text-green-700 font-semibold">+{current.marking.correct}</span>
                <span className={current.marking.wrong < 0 ? 'text-red-600 font-semibold' : 'text-text-muted'}>{current.marking.wrong < 0 ? current.marking.wrong : '0'}</span>
              </div>
              <div className="flex items-center gap-2">
                {current.languages.length > 1 && (
                  <label className="flex items-center gap-1.5 text-text-secondary">
                    View in
                    <select
                      value={current.languages.includes(language) ? language : 'en'}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className="h-8 rounded-lg border border-border bg-white px-2 text-[12px] font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    >
                      {current.languages.map((l) => <option key={l} value={l}>{LANGUAGE_LABELS[l]}</option>)}
                    </select>
                  </label>
                )}
                <button onClick={() => viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' })} className="p-1.5 rounded-lg hover:bg-surface-light text-text-muted" aria-label="Scroll to bottom">
                  <ChevronsDown className="w-4 h-4" />
                </button>
                <button onClick={() => viewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} className="p-1.5 rounded-lg hover:bg-surface-light text-text-muted" aria-label="Scroll to top">
                  <ChevronsUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div
            ref={viewportRef}
            className={`question-viewport relative flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-6 select-none ${FONT_CLASSES[fontScale]}`}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0.08 }}>
              <div className="absolute -inset-1/2 flex flex-wrap content-start gap-x-16 gap-y-20" style={{ transform: 'rotate(-15deg)' }}>
                {Array.from({ length: 80 }).map((_, i) => (
                  <span key={i} className="text-[13px] font-semibold text-text-primary whitespace-nowrap">{watermarkText}</span>
                ))}
              </div>
            </div>
            <div className="relative max-w-3xl">
              {current && (
                <QuestionBody
                  key={`${current.id}-${language}`}
                  question={current}
                  language={current.languages.includes(language) ? language : 'en'}
                  value={buffer}
                  onChange={setBuffer}
                />
              )}
            </div>
          </div>

          {/* Action bar */}
          <div className="shrink-0 border-t border-border bg-white px-2 sm:px-4 py-2.5 flex flex-wrap items-center gap-2">
            <button onClick={markAndNext} className="h-10 px-3 rounded-xl border border-[#7E22CE]/40 text-[#7E22CE] bg-[#7E22CE]/5 font-semibold text-[12px] sm:text-[13px] hover:bg-[#7E22CE]/10 transition-all">
              Mark for Review &amp; Next
            </button>
            <button onClick={clearResponse} className="h-10 px-3 rounded-xl border border-border text-text-secondary font-semibold text-[12px] sm:text-[13px] hover:bg-surface-light transition-all">
              Clear Response
            </button>
            <button onClick={saveAndMark} className="hidden sm:block h-10 px-3 rounded-xl border border-border text-text-secondary font-semibold text-[13px] hover:bg-surface-light transition-all">
              Save &amp; Mark for Review
            </button>
            <button onClick={() => setMobilePaletteOpen(true)} className="lg:hidden h-10 px-3 rounded-xl border border-border text-text-secondary font-semibold text-[12px] flex items-center gap-1.5">
              <Grid3X3 className="w-4 h-4" /> Palette
            </button>
            <button
              id="cbt-save-next"
              onClick={saveAndNext}
              className="ml-auto h-10 px-5 rounded-xl bg-[#16A34A] text-white font-bold text-[13px] sm:text-[14px] hover:bg-[#15803D] transition-all shadow-md shadow-green-600/20 flex items-center gap-1.5"
            >
              Save &amp; Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right pane (desktop) */}
        <div className="hidden lg:flex shrink-0">
          <button
            onClick={() => setPaneCollapsed((c) => !c)}
            className="w-4 border-l border-border bg-surface-light hover:bg-border/60 flex items-center justify-center"
            aria-label={paneCollapsed ? 'Show question palette' : 'Hide question palette'}
          >
            {paneCollapsed ? <ChevronLeft className="w-3.5 h-3.5 text-text-muted" /> : <ChevronRight className="w-3.5 h-3.5 text-text-muted" />}
          </button>
          {!paneCollapsed && <aside className="w-[300px] xl:w-[25vw] xl:max-w-[340px] overflow-y-auto p-4 border-l border-border">{palette}</aside>}
        </div>
      </div>

      {/* Mobile palette sheet */}
      {mobilePaletteOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] bg-brand-navy/40" onClick={() => setMobilePaletteOpen(false)}>
          <div className="absolute bottom-0 inset-x-0 max-h-[80dvh] overflow-y-auto bg-white rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  disabled={accessOf(s.id) !== 'OPEN'}
                  onClick={() => goToSection(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border shrink-0 flex items-center gap-1 ${s.id === currentSectionId ? 'bg-brand-blue text-white border-brand-blue' : 'border-border text-text-secondary'} disabled:opacity-50`}
                >
                  {accessOf(s.id) !== 'OPEN' && <Lock className="w-3 h-3" />}{s.name}
                </button>
              ))}
            </div>
            {palette}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[90] px-4 py-2.5 rounded-xl bg-brand-navy text-white text-[13px] shadow-xl max-w-[90vw] text-center" role="status">
          {toast}
        </div>
      )}

      {submitting && (
        <div className="fixed inset-0 z-[95] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
          <p className="font-ui font-semibold text-text-primary">{submitting === 'auto' ? "Time's up. Submitting your test…" : 'Submitting your test…'}</p>
        </div>
      )}

      {/* Dialogs */}
      <Dialog open={dialog === 'paper'} onClose={() => setDialog(null)} title="Question Paper" wide>
        <div className="space-y-6">
          {sections.filter((s) => accessOf(s.id) === 'OPEN').map((s) => (
            <div key={s.id}>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-3">{s.name}</h3>
              <ol className="space-y-4">
                {s.questionIds.map((id) => {
                  const q = questionById.get(id)!;
                  return (
                    <li key={id} className="flex gap-3 text-[14px]">
                      <span className="font-bold text-text-primary shrink-0">{numberOf.get(id)}.</span>
                      <MathHtml html={questionContent(q, q.languages.includes(language) ? language : 'en').stemHtml} className="text-text-secondary" />
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog open={dialog === 'instructions'} onClose={() => setDialog(null)} title="Instructions" wide>
        <div className="space-y-5 text-[14px] text-text-secondary">
          {props.instructionsHtml && <div className="instructions-html" dangerouslySetInnerHTML={{ __html: props.instructionsHtml }} />}
          <PaletteLegend />
        </div>
      </Dialog>

      <Dialog open={dialog === 'shortcuts'} onClose={() => setDialog(null)} title="Keyboard shortcuts">
        <ul className="space-y-2 text-[14px] text-text-secondary">
          <li><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-light text-[12px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-light text-[12px]">Enter</kbd>: Save &amp; Next</li>
          <li><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-light text-[12px]">Tab</kbd>: move between options and buttons</li>
          <li><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-light text-[12px]">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-light text-[12px]">Enter</kbd>: choose the focused option</li>
        </ul>
      </Dialog>

      <Dialog open={dialog === 'switch'} onClose={() => setDialog(null)} title="Next section is open">
        <p className="text-[14px] text-text-secondary mb-5">
          Time for the first part is over. Your answers in {sectionalLock?.firstPhaseSections.map((id) => sections.find((s) => s.id === id)?.name).filter(Boolean).join(' and ')} are saved and that part is now locked.
          You can now answer {sectionalLock?.secondPhaseSections.map((id) => sections.find((s) => s.id === id)?.name).filter(Boolean).join(' and ')}.
        </p>
        <button onClick={() => setDialog(null)} className="w-full h-11 rounded-xl bg-brand-blue text-white font-bold text-[14px]">Continue</button>
      </Dialog>

      <Dialog open={dialog === 'submit'} onClose={() => setDialog(null)} title="Submit your test?" wide>
        <div className="space-y-5">
          <p className="text-[14px] text-text-secondary">
            Time left: <b className="text-text-primary font-mono">{formatClock(remaining)}</b>. After you submit, you can&apos;t change your answers.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="py-2 pr-3 font-semibold">Section</th>
                  <th className="py-2 px-2 font-semibold">Answered</th>
                  <th className="py-2 px-2 font-semibold">Not answered</th>
                  <th className="py-2 px-2 font-semibold">Marked</th>
                  <th className="py-2 px-2 font-semibold">Answered &amp; marked</th>
                  <th className="py-2 pl-2 font-semibold">Not visited</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((s) => {
                  const c = sectionCounts(s.id);
                  return (
                    <tr key={s.id} className="border-b border-border/60">
                      <td className="py-2 pr-3 font-semibold text-text-primary">{s.name}</td>
                      <td className="py-2 px-2">{c.answered}</td>
                      <td className="py-2 px-2">{c.notAnswered}</td>
                      <td className="py-2 px-2">{c.markedForReview}</td>
                      <td className="py-2 px-2">{c.answeredAndMarked}</td>
                      <td className="py-2 pl-2">{c.notVisited}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {currentId && hasValue(current!.type, buffer) && !isScoredStatus(states[currentId]?.status) && (
            <p className="flex items-start gap-2 text-[13px] text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              The answer on your screen for this question is not saved. Close this and press Save &amp; Next if you want to keep it.
            </p>
          )}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button onClick={() => setDialog(null)} className="flex-1 h-11 rounded-xl border border-border font-semibold text-[14px] text-text-secondary hover:bg-surface-light">
              Back to test
            </button>
            <button onClick={() => void finish('manual')} className="flex-1 h-11 rounded-xl bg-[#16A34A] text-white font-bold text-[14px] hover:bg-[#15803D]">
              Yes, submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
