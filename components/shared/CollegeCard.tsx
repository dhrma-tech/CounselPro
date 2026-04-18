import Link from 'next/link';
import { College } from '@/lib/types';
import { GitCompare, Check, MapPin, ExternalLink } from 'lucide-react';

interface CollegeCardProps {
  college: College;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
}

export default function CollegeCard({ college, isInCompare = false, onToggleCompare }: CollegeCardProps) {
  const typeColors: Record<string, string> = {
    IIT: 'bg-blue-50 text-blue-700',
    NIT: 'bg-teal-50 text-teal-700',
    IIIT: 'bg-violet-50 text-violet-700',
    GFTI: 'bg-amber-50 text-amber-700',
    State: 'bg-green-50 text-green-700',
    Autonomous: 'bg-orange-50 text-orange-700',
    Private: 'bg-surface-light text-text-secondary',
  };

  const annualFees = college.fees?.[0]?.annualFees;

  return (
    <div className={`relative bg-surface-white border rounded-xl p-5 transition-all duration-300 flex flex-col h-full group hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] ${
      isInCompare
        ? 'border-brand-blue shadow-[0_0_0_2px_rgba(26,86,219,0.2)]'
        : 'border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
    }`}>
      
      {/* Compare Toggle */}
      {onToggleCompare && (
        <button
          onClick={onToggleCompare}
          title={isInCompare ? 'Remove from compare' : 'Add to compare'}
          className={`absolute top-3 right-3 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 z-10 ${
            isInCompare
              ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
              : 'bg-white border-border text-text-muted hover:border-brand-blue hover:text-brand-blue'
          }`}
        >
          {isInCompare ? <Check className="w-3.5 h-3.5" /> : <GitCompare className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Top row: Type badge + NIRF */}
      <div className="flex items-center gap-2 mb-4 pr-8">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${typeColors[college.type] || typeColors['Private']}`}>
          {college.type}
        </span>
        {college.nirf && (
          <span className="text-[11px] text-text-muted font-medium">NIRF #{college.nirf}</span>
        )}
        {college.genderAdmission === 'Girls' && (
          <span className="text-[11px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full font-medium">Women Only</span>
        )}
      </div>

      {/* College Name */}
      <h3 className="font-ui font-semibold text-[16px] leading-snug text-text-primary mb-1 group-hover:text-brand-blue transition-colors pr-2">
        {college.name}
      </h3>
      
      {/* Location */}
      <div className="flex items-center gap-1 text-[13px] text-text-muted mb-4">
        <MapPin className="w-3 h-3 shrink-0" />
        {college.location}, {college.state}
      </div>

      {/* Entrance Exam Tags */}
      {college.entranceExams && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {college.entranceExams.map(exam => (
            <span key={exam} className="text-[10px] bg-brand-navy/6 text-brand-navy px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {exam}
            </span>
          ))}
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-surface-light rounded-lg p-2.5 text-center">
          <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Branches</div>
          <div className="font-semibold text-brand-navy text-[15px]">{college.branches.length}</div>
        </div>
        <div className="bg-surface-light rounded-lg p-2.5 text-center">
          <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Annual Fees</div>
          <div className="font-semibold text-brand-navy text-[13px]">
            {annualFees ? `₹${(annualFees / 100000).toFixed(1)}L` : '—'}
          </div>
        </div>
      </div>

      {/* Highlights */}
      {college.highlights && college.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
          {college.highlights.slice(0, 2).map((h, i) => (
            <span key={i} className="text-[11px] text-text-secondary bg-surface-light border border-border/60 px-2 py-0.5 rounded-full">
              {h}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/colleges/${college.slug}`}
        className="block w-full text-center text-brand-blue border border-brand-blue/30 rounded-lg py-2 font-semibold text-[13px] group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300 mt-auto"
      >
        View Details →
      </Link>
    </div>
  );
}
