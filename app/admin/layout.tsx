import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdminPage } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin | CounselPro',
  robots: { index: false },
};

const NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/questions', label: 'Questions' },
  { href: '/admin/questions/import', label: 'Import' },
  { href: '/admin/tests', label: 'Tests' },
  { href: '/admin/attempts', label: 'Attempts' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/presets', label: 'Presets & ranks' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminPage();
  return (
    <div className="min-h-screen bg-surface-white">
      <div className="bg-surface-light border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="heading-md">CounselPro Admin</h1>
            <span className="text-[12px] text-text-muted">{user.email}</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto hide-scrollbar">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="px-4 py-2.5 text-[14px] font-semibold text-text-secondary hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue/40 whitespace-nowrap">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
