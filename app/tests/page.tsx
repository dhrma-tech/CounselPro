import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { listPublishedTests } from '@/lib/tests/server/content';
import { currentWeeklyMock } from '@/lib/tests/server/leaderboard';
import { EXAM_TABS } from '@/lib/tests/presetExams';
import TestsHub from '@/components/tests/TestsHub';
import { connection } from 'next/server';

export const metadata: Metadata = {
  title: 'Free Mock Tests for JEE, NEET & MHT-CET | CounselPro',
  description: 'Take free JEE Main, JEE Advanced, NEET and MHT-CET mock tests in a real exam-style interface. Get your score, a rank estimate and a clear next step for counselling.',
};

export default async function TestsPage({ searchParams }: { searchParams: Promise<{ exam?: string }> }) {
  // Per-student and live data: render on each request, never at build time
  await connection();
  const [tests, user, weekly, { exam }] = await Promise.all([listPublishedTests(), getCurrentUser(), currentWeeklyMock().catch(() => null), searchParams]);
  const initialTab = EXAM_TABS.some((t) => t.id === exam) ? exam! : 'all';
  // key: picking another exam from the header menu while on /tests resets the tab
  return <TestsHub key={initialTab} tests={tests} signedIn={!!user} weekly={weekly} initialTab={initialTab} />;
}
