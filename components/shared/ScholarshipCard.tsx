import Link from 'next/link';
import { Scholarship } from '@/lib/types';
import { Award, Clock, ArrowRight } from 'lucide-react';

export default function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <div className="bg-surface-white border border-border rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-all duration-200 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex flex-wrap gap-1.5">
          {scholarship.category.slice(0, 2).map((cat, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-ui font-medium bg-surface-light text-text-secondary border border-border">
              {cat}
            </span>
          ))}
        </div>
        <Award className="w-6 h-6 text-brand-blue opacity-50 shrink-0" />
      </div>

      <h3 className="heading-sm mb-1 leading-snug">{scholarship.name}</h3>
      <p className="text-[13px] text-text-muted mb-4 uppercase tracking-wider font-semibold">{scholarship.provider}</p>
      
      <div className="bg-amber-50 text-brand-amber text-sm font-semibold py-2 px-3 rounded-lg mb-4 inline-block self-start">
        {scholarship.amount}
      </div>

      <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-2">
        {scholarship.eligibility[0]}
      </p>

      <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
        {scholarship.deadline ? (
          <div className="flex items-center gap-1.5 text-[12px] text-text-muted font-medium">
            <Clock className="w-3.5 h-3.5" />
            Deadline: {scholarship.deadline}
          </div>
        ) : (
          <div />
        )}
        
        <Link href={`/scholarships/${scholarship.slug}`} className="text-brand-blue font-ui font-medium text-[13px] flex items-center gap-1 hover:underline">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
