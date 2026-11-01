import Link from 'next/link';
import { adminStats } from '@/lib/tests/server/admin';

export default async function AdminHome() {
  const s = await adminStats();
  const cards = [
    ['Approved questions', `${s.approved} / ${s.questions}`],
    ['Published tests', String(s.tests)],
    ['Attempts (7 days)', String(s.attemptsWeek)],
    ['Guest attempts (7 days)', String(s.guestAttemptsWeek)],
    ['Signed-up students', String(s.students)],
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map(([label, value]) => (
          <div key={label} className="bg-white border border-border rounded-2xl p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
            <p className="font-ui font-bold text-[24px] text-brand-navy">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['/admin/questions/import', 'Import questions', 'Upload your question bank as CSV or JSON. Check it first with a dry run.'],
          ['/admin/tests/new', 'Create a test', 'Pick a preset, choose questions and publish.'],
          ['/admin/leads', 'See leads', 'Students who signed up, their tests and best percentile.'],
        ].map(([href, title, body]) => (
          <Link key={href} href={href} className="bg-white border border-border rounded-2xl p-5 hover:border-brand-blue/40 hover:shadow-md transition-all">
            <p className="font-ui font-bold text-[15px] text-text-primary mb-1">{title}</p>
            <p className="text-[13px] text-text-secondary">{body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
