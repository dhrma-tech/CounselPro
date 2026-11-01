"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Flag, Loader2, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import MathHtml from '../MathHtml';
import { aiTextToHtml } from '@/lib/tests/client/aiText';
import { AI_LANGUAGE_LABELS, ASK_MODES, type AiLanguage, type AskMode } from '@/lib/tests/aiTypes';

interface AskAiProps {
  attemptId: string;
  questionId: string;
  modes: AskMode[];
  signedIn: boolean;
  loginNext: string;
  defaultLanguage?: AiLanguage;
  compact?: boolean;
}

export default function AskAi({ attemptId, questionId, modes, signedIn, loginNext, defaultLanguage = 'en', compact = false }: AskAiProps) {
  const [language, setLanguage] = useState<AiLanguage>(defaultLanguage);
  const [mode, setMode] = useState<AskMode | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [messageId, setMessageId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<1 | -1 | null>(null);
  const [reported, setReported] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  if (!signedIn) {
    return (
      <p className="text-[13px] text-text-secondary flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-violet" />
        <Link href={`/login?next=${encodeURIComponent(loginNext)}`} className="font-semibold text-brand-blue hover:underline">Sign in</Link>
        to ask AI to explain this question.
      </p>
    );
  }

  const ask = async (m: AskMode) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setMode(m);
    setText('');
    setError('');
    setFeedback(null);
    setReported(false);
    setBusy(true);
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, questionId, mode: m, language }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Could not reach the AI. Please try again.');
      }
      setMessageId(Number(res.headers.get('X-Message-Id')) || null);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setText(full);
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const sendFeedback = async (payload: { feedback?: 1 | -1; report?: boolean }) => {
    if (!messageId) return;
    if (payload.feedback) setFeedback(payload.feedback);
    if (payload.report) setReported(true);
    await fetch('/api/ai/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, ...payload }),
    }).catch(() => null);
  };

  return (
    <div className={`rounded-xl border border-brand-violet/20 bg-violet-50/40 ${compact ? 'p-3' : 'p-4'} space-y-3`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-brand-violet">
          <Sparkles className="w-3.5 h-3.5" /> Ask AI
        </span>
        {ASK_MODES.filter((m) => modes.includes(m.id)).map((m) => (
          <button
            key={m.id}
            onClick={() => ask(m.id)}
            disabled={busy}
            className={`px-2.5 py-1 rounded-lg text-[12px] font-semibold border transition-all disabled:opacity-60 ${
              mode === m.id ? 'bg-brand-violet text-white border-brand-violet' : 'bg-white text-text-secondary border-border hover:border-brand-violet/40'
            }`}
          >
            {m.label}
          </button>
        ))}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as AiLanguage)}
          className="ml-auto h-7 rounded-lg border border-border bg-white px-1.5 text-[12px]"
          aria-label="AI reply language"
        >
          {(Object.keys(AI_LANGUAGE_LABELS) as AiLanguage[]).map((l) => <option key={l} value={l}>{AI_LANGUAGE_LABELS[l]}</option>)}
        </select>
      </div>

      {busy && !text && <p className="flex items-center gap-2 text-[13px] text-text-muted"><Loader2 className="w-4 h-4 animate-spin" /> Thinking…</p>}
      {text && (busy
        ? <p className="text-[14px] text-text-secondary whitespace-pre-wrap leading-relaxed">{text}</p>
        : <MathHtml html={aiTextToHtml(text)} className="text-[14px] text-text-secondary leading-relaxed space-y-2" />)}
      {error && <p className="text-[13px] text-red-600">{error}</p>}

      {text && !busy && messageId && (
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <span>Was this helpful?</span>
          <button onClick={() => sendFeedback({ feedback: 1 })} className={`p-1 rounded ${feedback === 1 ? 'text-green-600' : 'hover:text-text-primary'}`} aria-label="Helpful"><ThumbsUp className="w-3.5 h-3.5" /></button>
          <button onClick={() => sendFeedback({ feedback: -1 })} className={`p-1 rounded ${feedback === -1 ? 'text-red-600' : 'hover:text-text-primary'}`} aria-label="Not helpful"><ThumbsDown className="w-3.5 h-3.5" /></button>
          <button onClick={() => sendFeedback({ report: true })} disabled={reported} className="ml-auto flex items-center gap-1 hover:text-red-600 disabled:text-red-600">
            <Flag className="w-3.5 h-3.5" /> {reported ? 'Reported. Thank you!' : 'Report wrong explanation'}
          </button>
        </div>
      )}
      <p className="text-[11px] text-text-muted">AI can make mistakes. Check with the official solution.</p>
    </div>
  );
}
