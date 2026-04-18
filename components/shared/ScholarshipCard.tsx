import Link from 'next/link';
import { Scholarship } from '@/lib/types';
import { Clock, ArrowRight, RefreshCw } from 'lucide-react';

export default function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const catColors: Record<string, string> = {
    'SC': 'bg-blue-50 text-blue-700',
    'ST': 'bg-blue-50 text-blue-700',
    'OBC': 'bg-orange-50 text-orange-700',
    'Girls': 'bg-pink-50 text-pink-700',
    'PwD': 'bg-purple-50 text-purple-700',
    'General': 'bg-surface-light text-text-secondary',
    'EWS': 'bg-green-50 text-green-700',
    'Merit-based': 'bg-amber-50 text-amber-700',
    'Maharashtra': 'bg-teal-50 text-teal-700',
  };

  const getCatColor = (cat: string) => catColors[cat] || 'bg-surface-light text-text-secondary';

  return (
    <div className="bg-surface-white border border-border rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.09)] transition-all duration-200 flex flex-col h-full group">
      
      {/* Category badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {scholarship.category.slice(0, 2).map((cat, i) => (
          <span key={i} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getCatColor(cat)}`}>
            {cat}
          </span>
        ))}
      </div>

      {/* Name + provider */}
      <h3 className="font-ui font-semibold text-[15px] leading-snug text-text-primary mb-1 group-hover:text-brand-blue transition-colors">
        {scholarship.name}
      </h3>
      <p className="text-[11px] text-text-muted mb-4 uppercase tracking-wider font-semibold">{scholarship.provider}</p>

      {/* Amount */}
      <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-brand-amber text-[13px] font-bold py-1.5 px-3 rounded-lg mb-4 self-start">
        {scholarship.amount}
      </div>

      {/* First eligibility line */}
      <p className="text-[13px] text-text-secondary mb-4 flex-1 line-clamp-2 leading-relaxed">
        {scholarship.eligibility[0]}
      </p>

      {/* Footer */}
      <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {scholarship.deadline && (
            <div className="flex items-center gap-1 text-[11px] text-text-muted font-medium">
              <Clock className="w-3 h-3" /> {scholarship.deadline}
            </div>
          )}
          {scholarship.renewable && (
            <div className="flex items-center gap-1 text-[11px] text-green-600 font-medium">
              <RefreshCw className="w-3 h-3" /> Renewable
            </div>
          )}
        </div>
        <Link href={`/scholarships/${scholarship.slug}`} className="text-brand-blue font-semibold text-[13px] flex items-center gap-1 hover:gap-2 transition-all">
          Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
