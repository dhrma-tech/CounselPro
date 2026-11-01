import Papa from 'papaparse';
import { getAdminUser } from '@/lib/auth';
import { leads, logAdmin } from '@/lib/tests/server/admin';

export async function GET() {
  const admin = await getAdminUser();
  if (!admin?.email) return new Response('Not allowed', { status: 403 });
  const rows = await leads();
  await logAdmin(admin.email, 'leads.export', null, null, { rows: rows.length });
  const csv = Papa.unparse(rows.map((l) => ({
    name: l.name,
    email: l.email,
    phone: l.phone,
    target_exam: l.targetExam,
    joined: l.joined,
    tests_taken: l.tests,
    last_test: l.lastTest ?? '',
    best_percentile_estimate: l.bestPercentile ?? '',
    marketing_consent: l.marketingConsent ? 'yes' : 'no',
  })));
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="counselpro-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
