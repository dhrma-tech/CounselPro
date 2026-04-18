import Link from 'next/link';
import { College } from '@/lib/types';

export default function CollegeCard({ college }: { college: College }) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'IIT': return 'bg-blue-50 text-blue-700';
      case 'NIT': return 'bg-teal-50 text-teal-700';
      case 'GFTI': return 'bg-amber-50 text-amber-700';
      default: return 'bg-surface-light text-text-secondary';
    }
  };

  return (
    <div className="bg-surface-white border border-border rounded-xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[0.34,1.56,0.64,1] flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-ui font-medium ${getBadgeColor(college.type)} group-hover:scale-105 transition-transform`}>
          {college.type}
        </span>
        {college.nirf && <span className="text-[12px] font-medium text-text-muted">NIRF #{college.nirf}</span>}
      </div>
      
      <h3 className="heading-sm mb-1 group-hover:text-brand-blue transition-colors duration-300">{college.name}</h3>
      <p className="text-sm text-text-secondary mb-4 flex-1">{college.location}, {college.state}</p>
      
      {/* Entrance Exams */}
      {college.entranceExams && college.entranceExams.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {college.entranceExams.map(exam => (
            <span key={exam} className="text-[10px] bg-brand-navy/5 text-brand-navy px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {exam}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-6 pointer-events-none">
        <div className="bg-surface-light group-hover:bg-brand-blue/5 rounded-lg p-3 text-center transition-colors duration-500">
          <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Branches</div>
          <div className="font-ui font-bold text-brand-navy group-hover:text-brand-blue">{college.branches.length}</div>
        </div>
        <div className="bg-surface-light group-hover:bg-brand-blue/5 rounded-lg p-3 text-center transition-colors duration-500 flex flex-col justify-center">
          <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Hostel</div>
          <div className="font-ui font-bold text-brand-navy group-hover:text-brand-blue text-[13px]">
            {college.hostelAvailable ? 'Available' : 'Contact'}
          </div>
        </div>
      </div>
      
      <Link href={`/colleges/${college.slug}`} className="block w-full text-center text-brand-blue border border-brand-blue/30 rounded-lg py-2.5 font-semibold text-[14px] group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300">
        View Details &rarr;
      </Link>
    </div>
  );
}
