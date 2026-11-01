import Link from 'next/link';
import { listQuestionsForAdmin } from '@/lib/tests/server/admin';
import { setKeyVerified, setQuestionStatus } from '../actions';
import { EXAMS } from '@/lib/tests/importFormat';

const STATUS_STYLE: Record<string, string> = {
  APPROVED: 'bg-green-50 text-green-700',
  DRAFT: 'bg-surface-light text-text-secondary',
  RETIRED: 'bg-red-50 text-red-600',
};

export default async function AdminQuestions({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const { rows, total, page, pageSize } = await listQuestionsForAdmin({
    exam: sp.exam || undefined,
    subject: sp.subject || undefined,
    status: sp.status || undefined,
    search: sp.q || undefined,
    page: Number(sp.page) || 1,
  });
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const qs = (p: number) => new URLSearchParams({ ...Object.fromEntries(Object.entries(sp).filter(([, v]) => v)) as Record<string, string>, page: String(p) }).toString();

  return (
    <div className="space-y-5">
      <form className="flex flex-wrap gap-2 items-end">
        <select name="exam" defaultValue={sp.exam ?? ''} className="h-10 rounded-xl border border-border bg-white px-3 text-[13px]">
          <option value="">All exams</option>
          {EXAMS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <input name="subject" defaultValue={sp.subject ?? ''} placeholder="Subject" className="h-10 rounded-xl border border-border bg-white px-3 text-[13px] w-36" />
        <select name="status" defaultValue={sp.status ?? ''} className="h-10 rounded-xl border border-border bg-white px-3 text-[13px]">
          <option value="">Any status</option>
          <option value="DRAFT">Draft</option>
          <option value="APPROVED">Approved</option>
          <option value="RETIRED">Retired</option>
        </select>
        <input name="q" defaultValue={sp.q ?? ''} placeholder="Search key or chapter" className="h-10 rounded-xl border border-border bg-white px-3 text-[13px] w-56" />
        <button className="h-10 px-4 rounded-xl bg-brand-blue text-white text-[13px] font-semibold">Filter</button>
        <Link href="/admin/questions/import" className="ml-auto h-10 px-4 rounded-xl border border-border bg-white text-[13px] font-semibold flex items-center">Import questions</Link>
      </form>

      <p className="text-[13px] text-text-muted">{total} question{total === 1 ? '' : 's'}</p>

      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-[13px] min-w-[900px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border bg-surface-light">
              <th className="py-2.5 px-4 font-semibold">Key</th>
              <th className="py-2.5 px-3 font-semibold">Exam / subject / chapter</th>
              <th className="py-2.5 px-3 font-semibold">Type</th>
              <th className="py-2.5 px-3 font-semibold">Licence</th>
              <th className="py-2.5 px-3 font-semibold">Key checked</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr key={q.id} className="border-b border-border/60 last:border-0 align-top">
                <td className="py-2.5 px-4 font-mono text-[12px]">{q.external_key}</td>
                <td className="py-2.5 px-3">{q.exam} · {q.subject}<br /><span className="text-text-muted">{q.chapter}</span></td>
                <td className="py-2.5 px-3">{q.type}</td>
                <td className="py-2.5 px-3">{q.license_status === 'ORIGINAL_SAMPLE' ? 'Sample' : q.license_status === 'OWNED_OR_LICENSED' ? 'Owned' : 'Unknown'}</td>
                <td className="py-2.5 px-3">
                  <form action={setKeyVerified}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="verified" value={String(!q.key_verified)} />
                    <button className={`px-2 py-0.5 rounded-full text-[12px] font-semibold ${q.key_verified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {q.key_verified ? 'Yes' : 'No'}
                    </button>
                  </form>
                </td>
                <td className="py-2.5 px-3"><span className={`px-2 py-0.5 rounded-full text-[12px] font-semibold ${STATUS_STYLE[q.status]}`}>{q.status}</span></td>
                <td className="py-2.5 px-4">
                  <div className="flex gap-1.5">
                    {(['APPROVED', 'DRAFT', 'RETIRED'] as const).filter((s) => s !== q.status).map((s) => (
                      <form key={s} action={setQuestionStatus}>
                        <input type="hidden" name="id" value={q.id} />
                        <input type="hidden" name="status" value={s} />
                        <button className="px-2.5 py-1 rounded-lg border border-border text-[12px] font-semibold hover:bg-surface-light">
                          {s === 'APPROVED' ? 'Approve' : s === 'DRAFT' ? 'To draft' : 'Retire'}
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

      {pages > 1 && (
        <div className="flex gap-2 justify-center">
          {page > 1 && <Link href={`/admin/questions?${qs(page - 1)}`} className="px-3 py-1.5 rounded-lg border border-border text-[13px]">Previous</Link>}
          <span className="px-3 py-1.5 text-[13px] text-text-muted">Page {page} of {pages}</span>
          {page < pages && <Link href={`/admin/questions?${qs(page + 1)}`} className="px-3 py-1.5 rounded-lg border border-border text-[13px]">Next</Link>}
        </div>
      )}
    </div>
  );
}
