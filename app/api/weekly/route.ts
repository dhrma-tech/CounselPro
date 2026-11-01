import { currentWeeklyMock } from '@/lib/tests/server/leaderboard';

export async function GET() {
  try {
    const weekly = await currentWeeklyMock();
    return Response.json({ weekly }, { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } });
  } catch {
    return Response.json({ weekly: null });
  }
}
