import { connection } from 'next/server';
import { leads } from '@/lib/tests/server/admin';

export default async function AdminLeads() {
  // Admin data must be read per request, never at build time
  await connection();
  const rows = await leads();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="heading-sm">Leads ({rows.length})</h2>
        <a href="/api/admin/leads.csv" className="h-10 px-4 rounded-xl border border-border bg-white text-[13px] font-semibold flex items-center hover:bg-surface-light">Download CSV</a>
      </div>
      <p className="text-[13px] text-text-muted">Students who signed in. Only contact students who gave marketing consent for promotional messages.</p>
      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-[13px] min-w-[800px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border bg-surface-light">
              <th className="py-2.5 px-4 font-semibold">Student</th>
              <th className="py-2.5 px-3 font-semibold">Joined</th>
              <th className="py-2.5 px-3 font-semibold">Tests taken</th>
              <th className="py-2.5 px-3 font-semibold">Last test</th>
              <th className="py-2.5 px-3 font-semibold">Best percentile (est.)</th>
              <th className="py-2.5 px-4 font-semibold">Marketing consent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.userId} className="border-b border-border/60 last:border-0">
                <td className="py-2.5 px-4"><p className="font-semibold text-text-primary">{l.name || '—'}</p><p className="text-[12px] text-text-muted">{l.email}</p></td>
                <td className="py-2.5 px-3">{new Date(l.joined).toLocaleDateString('en-IN')}</td>
                <td className="py-2.5 px-3">{l.tests}</td>
                <td className="py-2.5 px-3">{l.lastTest ? new Date(l.lastTest).toLocaleDateString('en-IN') : '—'}</td>
                <td className="py-2.5 px-3">{l.bestPercentile != null ? l.bestPercentile.toFixed(2) : '—'}</td>
                <td className="py-2.5 px-4">{l.marketingConsent ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
