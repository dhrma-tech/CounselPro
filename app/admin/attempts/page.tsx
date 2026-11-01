import Link from 'next/link';
import { recentAttempts } from '@/lib/tests/server/admin';

export default async function AdminAttempts() {
  const rows = await recentAttempts(150);
  return (
    <div className="space-y-4">
      <h2 className="heading-sm">Recent attempts</h2>
      <p className="text-[13px] text-text-muted">Integrity counts (tab switches, copy attempts) are informational only and never shown to students.</p>
      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-[13px] min-w-[900px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border bg-surface-light">
              <th className="py-2.5 px-4 font-semibold">When</th>
              <th className="py-2.5 px-3 font-semibold">Student</th>
              <th className="py-2.5 px-3 font-semibold">Test</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">Score</th>
              <th className="py-2.5 px-3 font-semibold">Percentile</th>
              <th className="py-2.5 px-4 font-semibold">Integrity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const integrity = Object.entries((a.integrity ?? {}) as Record<string, number>).filter(([, v]) => v > 0);
              return (
                <tr key={a.id as string} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 px-4 whitespace-nowrap">{new Date(a.created_at as string).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                  <td className="py-2.5 px-3">{a.email}</td>
                  <td className="py-2.5 px-3">{a.testTitle}{(a.attempt_number as number) > 1 ? ` (#${a.attempt_number})` : ''}</td>
                  <td className="py-2.5 px-3">{a.status as string}</td>
                  <td className="py-2.5 px-3">
                    {a.score_raw != null ? <Link href={`/tests/results/${a.id}`} className="text-brand-blue hover:underline">{Number(a.score_raw)} / {Number(a.max_score)}</Link> : '—'}
                  </td>
                  <td className="py-2.5 px-3">{a.percentile_est != null ? Number(a.percentile_est).toFixed(2) : '—'}</td>
                  <td className="py-2.5 px-4 text-[12px] text-text-muted">{integrity.length ? integrity.map(([k, v]) => `${k}: ${v}`).join(', ') : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
