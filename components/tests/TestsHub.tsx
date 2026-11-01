"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, FileQuestion, Flame, History, Layers, Lock, Sparkles, Target, Trophy } from 'lucide-react';
import Badge from '@/components/shared/Badge';
import { EXAM_TABS } from '@/lib/tests/presetExams';
import type { TestListItem } from '@/lib/tests/server/content';
import type { WeeklyMockInfo } from '@/lib/tests/server/leaderboard';

const KIND_LABEL: Record<TestListItem['kind'], string> = {
  FULL_MOCK: 'Full mock',
  SECTIONAL: 'Sectional test',
  CHAPTER_TEST: 'Chapter test',
  QUIZ: 'Quick quiz',
};

function minutes(seconds: number) {
  return seconds > 0 ? `${Math.round(seconds / 60)} min` : 'No timer';
}

const istWhen = (iso: string) => new Date(iso).toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

export default function TestsHub({ tests, signedIn, weekly, initialTab = 'all' }: { tests: TestListItem[]; signedIn: boolean; weekly: WeeklyMockInfo | null; initialTab?: string }) {
  const [tab, setTab] = useState(initialTab);
  const filtered = useMemo(() => {
    if (tab === 'all') return tests;
    const presetIds = EXAM_TABS.find((t) => t.id === tab)?.presetIds ?? [];
    return tests.filter((t) => presetIds.includes(t.presetId));
  }, [tab, tests]);

  const mocks = filtered.filter((t) => t.kind !== 'QUIZ');
  const quizzes = filtered.filter((t) => t.kind === 'QUIZ');

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="py-12 sm:py-20 bg-surface-light border-b border-border px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-brand-teal mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Free · No sign-up needed to start
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl mb-4">
            Mock Tests &amp; Quizzes
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="body-lg max-w-2xl mx-auto mb-8">
            Practise in an exam-style interface, get your score instantly with a rank estimate, and see what to fix next.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/tests/daily" className="inline-flex items-center gap-2 bg-brand-blue text-white font-ui font-semibold px-6 py-3 rounded-xl hover:bg-[#1648c0] transition-all shadow-md shadow-brand-blue/10">
              <Flame className="w-4 h-4" /> Today&apos;s daily quiz
            </Link>
            <Link href="/practice" className="inline-flex items-center gap-2 bg-white border border-border text-text-primary font-ui font-semibold px-6 py-3 rounded-xl hover:bg-surface-light transition-all">
              <Target className="w-4 h-4" /> Practise by chapter
            </Link>
            <Link href={signedIn ? '/my-tests' : '/login?next=/my-tests'} className="inline-flex items-center gap-2 bg-white border border-border text-text-primary font-ui font-semibold px-6 py-3 rounded-xl hover:bg-surface-light transition-all">
              <History className="w-4 h-4" /> My tests &amp; results
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="sticky z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm" style={{ top: 'var(--header-offset)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex gap-1.5 overflow-x-auto hide-scrollbar">
          {[{ id: 'all', label: 'All exams' }, ...EXAM_TABS].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold border transition-all shrink-0 ${
                tab === t.id ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-secondary border-border hover:border-brand-blue/40'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {weekly && (
          <Link
            href={`/tests/${weekly.slug}`}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 rounded-[24px] bg-gradient-to-r from-brand-navy to-brand-blue text-white shadow-md hover:shadow-lg transition-all"
          >
            <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0"><Trophy className="w-6 h-6" /></span>
            <span className="flex-1 min-w-0">
              <span className="block text-[12px] font-bold uppercase tracking-wider text-white/75 mb-0.5">
                Weekly open mock{weekly.presetName ? ` · ${weekly.presetName}` : ''} · {weekly.isOpen ? 'Live now' : 'Coming up'}
              </span>
              <span className="block font-ui font-bold text-[18px] truncate">{weekly.title}</span>
              <span className="block text-[13px] text-white/80">
                {weekly.isOpen
                  ? weekly.endsAt ? `Open until ${istWhen(weekly.endsAt)}. Take it and see your rank on the leaderboard.` : 'Take it and see your rank on the leaderboard.'
                  : weekly.startsAt ? `Opens ${istWhen(weekly.startsAt)}. Everyone takes the same paper, ranked together.` : ''}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[14px] shrink-0">{weekly.isOpen ? 'Take it now' : 'See details'} <ArrowRight className="w-4 h-4" /></span>
          </Link>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="body-md mb-4">New tests for this exam are coming soon.</p>
            <Link href="/practice" className="text-brand-blue font-semibold hover:underline">Try chapter practice instead</Link>
          </div>
        )}

        {mocks.length > 0 && (
          <section>
            <h2 className="heading-md mb-5 flex items-center gap-2"><Layers className="w-5 h-5 text-brand-blue" /> Mock tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mocks.map((t, i) => <TestCard key={t.id} test={t} signedIn={signedIn} index={i} />)}
            </div>
          </section>
        )}

        {quizzes.length > 0 && (
          <section>
            <h2 className="heading-md mb-5 flex items-center gap-2"><FileQuestion className="w-5 h-5 text-brand-teal" /> Quick quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {quizzes.map((t, i) => <TestCard key={t.id} test={t} signedIn={signedIn} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TestCard({ test, signedIn, index }: { test: TestListItem; signedIn: boolean; index: number }) {
  const needsLogin = !test.guestAllowed && !signedIn;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="bg-white border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all"
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="blue">{test.presetName}</Badge>
        <Badge>{KIND_LABEL[test.kind]}</Badge>
        {test.guestAllowed && <Badge variant="teal">Free · No login</Badge>}
        {test.isSample && <Badge variant="amber">Sample questions</Badge>}
      </div>
      <h3 className="heading-sm mb-2">{test.title}</h3>
      {test.description && <p className="body-sm text-text-secondary mb-5 flex-1">{test.description}</p>}
      <div className="flex items-center gap-4 text-[12px] text-text-muted font-ui mb-5">
        <span className="flex items-center gap-1"><FileQuestion className="w-3.5 h-3.5" /> {test.questionCount} Qs</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {minutes(test.durationSeconds)}</span>
        <span>{test.totalMarks} marks</span>
      </div>
      <Link
        href={`/tests/${test.slug}`}
        className="mt-auto inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0] transition-all"
      >
        {needsLogin && <Lock className="w-4 h-4" />}
        {test.kind === 'QUIZ' ? 'Start quiz' : 'Start test'} <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
