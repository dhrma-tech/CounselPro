import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { listPublishedTests } from '@/lib/tests/server/content';
import { currentWeeklyMock } from '@/lib/tests/server/leaderboard';
import TestsHub from '@/components/tests/TestsHub';

export const metadata: Metadata = {
  title: 'Free Mock Tests for JEE, NEET & MHT-CET | CounselPro',
  description: 'Take free JEE Main, JEE Advanced, NEET and MHT-CET mock tests in a real exam-style interface. Get your score, a rank estimate and a clear next step for counselling.',
};

export default async function TestsPage() {
  const [tests, user, weekly] = await Promise.all([listPublishedTests(), getCurrentUser(), currentWeeklyMock().catch(() => null)]);
  return <TestsHub tests={tests} signedIn={!!user} weekly={weekly} />;
}
