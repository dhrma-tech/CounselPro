"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenCheck, Loader2, Printer, RotateCcw, Share2, Swords } from 'lucide-react';
import Dialog from '../terminal/Dialog';

interface ResultActionsProps {
  attemptId: string;
  testId: string;
  slug: string | null;
  title: string;
  scoreText: string;
  canReattempt: boolean;
  signedIn: boolean;
  canChallenge: boolean;
  canRevise: boolean;
}

async function post(url: string, body: unknown) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
  const json = await res?.json().catch(() => ({}));
  return { ok: !!res?.ok, status: res?.status ?? 0, json: json ?? {} };
}

async function shareLink(url: string, title: string, text: string) {
  if (navigator.share) {
    await navigator.share({ title, text, url }).catch(() => null);
    return;
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank', 'noopener,noreferrer');
}

export default function ResultActions(props: ResultActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [hideName, setHideName] = useState(false);
  const [hideRank, setHideRank] = useState(false);
  const loginNext = `/login?next=${encodeURIComponent(`/tests/results/${props.attemptId}`)}`;

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key);
    setMessage('');
    try {
      await fn();
    } finally {
      setBusy(null);
    }
  };

  const reattempt = () => run('again', async () => {
    const r = await post('/api/attempts', { testId: props.testId });
    if (r.status === 401 && props.slug) return router.push(`/login?next=${encodeURIComponent(`/tests/${props.slug}`)}`);
    if (!r.ok) return setMessage(r.json.error ?? 'Could not start a new attempt.');
    router.push(`/tests/attempt/${r.json.attemptId}`);
  });

  const revise = () => run('revise', async () => {
    if (!props.signedIn) return router.push(loginNext);
    const r = await post('/api/revision/from-attempt', { attemptId: props.attemptId });
    if (!r.ok) return setMessage(r.json.error ?? 'Could not build a revision set.');
    router.push(`/tests/attempt/${r.json.attemptId}`);
  });

  const share = () => run('share', async () => {
    const r = await post('/api/share', { attemptId: props.attemptId, hideName, hideRank });
    if (!r.ok) return setMessage(r.json.error ?? 'Could not create a share link.');
    setShareOpen(false);
    await shareLink(`${window.location.origin}${r.json.path}`, props.title, `I scored ${props.scoreText} on "${props.title}" at CounselPro. Try it free:`);
  });

  const challenge = () => run('challenge', async () => {
    if (!props.signedIn) return router.push(loginNext);
    const r = await post('/api/challenges', { attemptId: props.attemptId });
    if (!r.ok) return setMessage(r.json.error ?? 'Could not create a challenge.');
    await shareLink(`${window.location.origin}${r.json.path}`, props.title, `I scored ${props.scoreText} on "${props.title}". Can you beat me? Take the same test free:`);
  });

  const btn = 'inline-flex items-center gap-2 h-10 px-4 rounded-xl font-ui font-semibold text-[13px] disabled:opacity-60';
  const secondary = `${btn} bg-white border border-border text-text-primary hover:bg-surface-light`;
  const spin = (key: string, Icon: typeof RotateCcw) => (busy === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />);

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      {props.canReattempt && (
        <button onClick={reattempt} disabled={!!busy} className={`${btn} bg-brand-blue text-white hover:bg-[#1648c0]`}>
          {spin('again', RotateCcw)} Re-attempt
        </button>
      )}
      {props.canRevise && (
        <button onClick={revise} disabled={!!busy} className={secondary}>{spin('revise', BookOpenCheck)} Revise mistakes</button>
      )}
      {props.signedIn ? (
        <button onClick={() => setShareOpen(true)} disabled={!!busy} className={secondary}>{spin('share', Share2)} Share score</button>
      ) : (
        <button onClick={() => router.push(loginNext)} className={secondary}><Share2 className="w-4 h-4" /> Share score</button>
      )}
      {props.canChallenge && (
        <button onClick={challenge} disabled={!!busy} className={secondary}>{spin('challenge', Swords)} Challenge a friend</button>
      )}
      <button onClick={() => window.print()} className={secondary}><Printer className="w-4 h-4" /> Download PDF</button>
      {message && <p className="w-full text-[13px] text-red-600">{message}</p>}

      <Dialog open={shareOpen} onClose={() => setShareOpen(false)} title="Share your score card">
        <div className="space-y-4 text-[14px] text-text-secondary">
          <p>Friends who open your link see your score card and can take the same test free.</p>
          <label className="flex items-center gap-2"><input type="checkbox" checked={hideName} onChange={(e) => setHideName(e.target.checked)} className="accent-[#1A56DB]" /> Hide my name</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={hideRank} onChange={(e) => setHideRank(e.target.checked)} className="accent-[#1A56DB]" /> Hide my percentile</label>
          <button onClick={share} disabled={!!busy} className="w-full h-11 rounded-xl bg-[#16A34A] text-white font-bold text-[14px] flex items-center justify-center gap-2">
            {spin('share', Share2)} Share on WhatsApp / apps
          </button>
        </div>
      </Dialog>
    </div>
  );
}
