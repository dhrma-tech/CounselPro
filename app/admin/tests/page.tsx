import { connection } from 'next/server';
import Link from 'next/link';
import { listTestsForAdmin } from '@/lib/tests/server/admin';
import { setTestStatus } from '../actions';

export default async function AdminTests() {
  // Admin data must be read per request, never at build time
  await connection();
  const tests = await listTestsForAdmin();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="heading-sm">Tests</h2>
        <Link href="/admin/tests/new" className="h-10 px-4 rounded-xl bg-brand-blue text-white text-[13px] font-semibold flex items-center">New test</Link>
      </div>
      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-[13px] min-w-[800px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border bg-surface-light">
              <th className="py-2.5 px-4 font-semibold">Title</th>
              <th className="py-2.5 px-3 font-semibold">Preset / kind</th>
              <th className="py-2.5 px-3 font-semibold">Guest</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id} className="border-b border-border/60 last:border-0">
                <td className="py-2.5 px-4">
                  <p className="font-semibold text-text-primary">{t.title}</p>
                  <p className="text-[12px] text-text-muted">/tests/{t.slug}{t.is_sample ? ' · sample content' : ''}</p>
                </td>
                <td className="py-2.5 px-3">{t.preset_id}<br /><span className="text-text-muted">{t.kind}</span></td>
                <td className="py-2.5 px-3">{t.guest_allowed ? 'Yes' : 'No'}</td>
                <td className="py-2.5 px-3 font-semibold">{t.status}</td>
                <td className="py-2.5 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    <Link href={`/admin/tests/${t.id}`} className="px-2.5 py-1 rounded-lg border border-border text-[12px] font-semibold hover:bg-surface-light">Edit</Link>
                    {t.status === 'PUBLISHED' && <Link href={`/tests/${t.slug}`} className="px-2.5 py-1 rounded-lg border border-border text-[12px] font-semibold hover:bg-surface-light">View</Link>}
                    {(['PUBLISHED', 'DRAFT', 'ARCHIVED'] as const).filter((s) => s !== t.status).map((s) => (
                      <form key={s} action={setTestStatus}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="status" value={s} />
                        <button className="px-2.5 py-1 rounded-lg border border-border text-[12px] font-semibold hover:bg-surface-light">
                          {s === 'PUBLISHED' ? 'Publish' : s === 'DRAFT' ? 'Unpublish' : 'Archive'}
                        </button>
                      </form>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
