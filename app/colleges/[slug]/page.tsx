import { College } from '@/lib/types';
import { colleges } from '@/data/colleges';
import Link from 'next/link';

export function generateStaticParams() {
  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const college = colleges.find(c => c.slug === params.slug);
  if (!college) return { title: 'College Not Found' };
  
  return {
    title: `${college.name} — Cutoffs, Branches, Fees | CounselPro`,
    description: `Complete admission details, cutoff ranks, fee structure, and placements for ${college.name}.`,
  };
}

export default function CollegeDetailPage({ params }: { params: { slug: string } }) {
  const college = colleges.find(c => c.slug === params.slug);

  if (!college) {
    return <div className="py-40 text-center">College Not Found</div>;
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'IIT': return 'bg-blue-50 text-blue-700';
      case 'NIT': return 'bg-teal-50 text-teal-700';
      case 'GFTI': return 'bg-amber-50 text-amber-700';
      default: return 'bg-surface-light text-text-secondary';
    }
  };

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8 font-ui">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/colleges" className="hover:text-brand-blue transition-colors">Colleges</Link>
          <span>/</span>
          <span className="text-text-primary capitalize">{college.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[70%]">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="heading-xl mb-4">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-text-secondary font-medium">{college.location}, {college.state}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${getBadgeColor(college.type)}`}>{college.type}</span>
                {college.nirf && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-light text-text-secondary font-medium outline outline-1 outline-border">NIRF Rank #{college.nirf}</span>
                  </>
                )}
                {college.established && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                    <span className="text-text-muted">Est. {college.established}</span>
                  </>
                )}
              </div>
            </div>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="heading-md mb-4 border-b border-border pb-2">Overview</h2>
              <p className="body-md text-text-secondary leading-relaxed">
                {college.description || `${college.name} is a renowned institution offering various engineering disciplines.`}
              </p>
              {college.affiliation && (
                <p className="body-md text-text-secondary mt-4">
                  <strong>Affiliation:</strong> {college.affiliation}
                </p>
              )}
            </section>

            {/* Branches & Cutoffs */}
            <section className="mb-12">
              <h2 className="heading-md mb-4 border-b border-border pb-2">Branches & Cutoffs</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-surface-light text-text-muted font-medium uppercase tracking-wider text-[12px]">
                    <tr>
                      <th className="px-4 py-3 border-b border-border">Branch</th>
                      <th className="px-4 py-3 border-b border-border">Counselling</th>
                      <th className="px-4 py-3 border-b border-border">Category</th>
                      <th className="px-4 py-3 border-b border-border">Open Rank</th>
                      <th className="px-4 py-3 border-b border-border">Close Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-ui">
                    {college.branches.map((b, i) => (
                      <tr key={i} className="hover:bg-surface-light/30">
                        <td className="px-4 py-3 font-medium text-text-primary">{b.branch}</td>
                        <td className="px-4 py-3 text-text-secondary">{b.counselling}</td>
                        <td className="px-4 py-3 text-text-secondary">{b.category}</td>
                        <td className="px-4 py-3 text-text-secondary">{b.openRank || '-'}</td>
                        <td className="px-4 py-3 text-brand-navy font-semibold">{b.closeRank || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Fees */}
            {college.fees && (
              <section className="mb-12">
                <h2 className="heading-md mb-4 border-b border-border pb-2">Fee Structure</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {college.fees.map((fee, i) => (
                    <div key={i} className="bg-surface-light p-5 rounded-xl border border-border">
                      <div className="text-sm text-text-muted font-medium mb-1">{fee.branch}</div>
                      <div className="font-display text-[24px] text-brand-navy mb-3">₹{fee.annualFees.toLocaleString()}/yr</div>
                      <div className="space-y-1 text-[13px] text-text-secondary">
                        <div className="flex justify-between"><span>Total (4 yrs)</span><span className="font-medium text-text-primary">₹{fee.totalFees.toLocaleString()}</span></div>
                        {fee.hostelFees && <div className="flex justify-between"><span>Hostel (yr)</span><span className="font-medium text-text-primary">₹{fee.hostelFees.toLocaleString()}</span></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Placements */}
            {college.placements && (
              <section className="mb-12">
                <h2 className="heading-md mb-4 border-b border-border pb-2">Placements</h2>
                <div className="bg-brand-navy text-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                  <div className="text-center md:text-left">
                    <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Highest Package</div>
                    <div className="font-display text-4xl">{college.placements.highestPackage}</div>
                  </div>
                  <div className="w-px h-16 bg-white/20 hidden md:block"></div>
                  <div className="text-center md:text-left">
                    <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Average Package</div>
                    <div className="font-display text-4xl">{college.placements.avgPackage}</div>
                  </div>
                  <div className="w-px h-16 bg-white/20 hidden md:block"></div>
                  <div className="text-center md:text-left w-full md:w-auto flex-1">
                    <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Top Recruiters</div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {college.placements.topRecruiters.map(r => (
                        <span key={r} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>

          <div className="w-full lg:w-[30%]">
            <div className="sticky top-28 bg-surface-white border border-border p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-2xl text-brand-navy mb-2">Need help with {college.shortName}?</h3>
              <p className="body-sm mb-6 text-text-secondary leading-relaxed">
                Our counsellors can help you build your options list, manage rounds, and secure your admission efficiently.
              </p>
              <Link 
                href="/apply" 
                className="w-full block text-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all duration-150"
              >
                Apply for Guidance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
