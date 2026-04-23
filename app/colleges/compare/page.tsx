"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { colleges } from '@/data/colleges';
import Link from 'next/link';
import { Check, X, ArrowLeft, ExternalLink } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const slugsParam = searchParams.get('slugs') || '';
  const slugs = slugsParam.split(',').filter(Boolean).slice(0, 3);
  const selectedColleges = slugs.map(s => colleges.find(c => c.slug === s)).filter(Boolean) as typeof colleges;

  if (selectedColleges.length < 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-white px-6">
        <p className="text-text-muted mb-4">Select at least 2 colleges to compare.</p>
        <Link href="/colleges" className="text-brand-blue font-semibold hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
      </div>
    );
  }

  // Collect all unique branches across compared colleges
  const allBranches = Array.from(new Set(selectedColleges.flatMap(c => c.branches.map(b => b.branch))));

  const formatFees = (amount?: number) => amount ? `₹${(amount / 100000).toFixed(1)}L/yr` : '—';

  const rows = [
    { label: 'Type', render: (c: typeof colleges[0]) => c.type },
    { label: 'Location', render: (c: typeof colleges[0]) => `${c.location}, ${c.state}` },
    { label: 'NIRF Rank', render: (c: typeof colleges[0]) => c.nirf ? `#${c.nirf}` : 'Unranked' },
    { label: 'Established', render: (c: typeof colleges[0]) => c.established?.toString() ?? '—' },
    { label: 'Annual Fees', render: (c: typeof colleges[0]) => formatFees(c.fees?.[0]?.annualFees) },
    { label: 'Total Fees (4yr)', render: (c: typeof colleges[0]) => c.fees?.[0]?.totalFees ? `₹${(c.fees[0].totalFees / 100000).toFixed(1)}L` : '—' },
    { label: 'Hostel Fees', render: (c: typeof colleges[0]) => c.fees?.[0]?.hostelFees ? formatFees(c.fees[0].hostelFees) : '—' },
    { label: 'Hostel', render: (c: typeof colleges[0]) => c.hostelAvailable ? '✓ Available' : '✗ Not Available' },
    { label: 'Avg Package', render: (c: typeof colleges[0]) => c.placements?.avgPackage ?? '—' },
    { label: 'Highest Package', render: (c: typeof colleges[0]) => c.placements?.highestPackage ?? '—' },
    { label: 'Accreditation', render: (c: typeof colleges[0]) => c.accreditation?.join(', ') || '—' },
    { label: 'Entrance Exams', render: (c: typeof colleges[0]) => c.entranceExams?.join(', ') ?? '—' },
  ];

  const typeColors: Record<string, string> = {
    IIT: 'bg-blue-50 text-blue-700', NIT: 'bg-teal-50 text-teal-700',
    IIIT: 'bg-violet-50 text-violet-700', State: 'bg-green-50 text-green-700',
    Autonomous: 'bg-orange-50 text-orange-700', Private: 'bg-surface-light text-text-secondary',
  };

  const gridClass = selectedColleges.length === 3 
    ? 'grid-cols-[150px_repeat(3,minmax(200px,1fr))] md:grid-cols-[200px_repeat(3,1fr)]' 
    : 'grid-cols-[150px_repeat(2,minmax(200px,1fr))] md:grid-cols-[200px_repeat(2,1fr)]';

  return (
    <div className="min-h-screen bg-surface-white">
      {/* HEADER */}
      <div className="bg-surface-light border-b border-border py-8 sm:py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/colleges" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-blue mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Colleges
          </Link>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">College Comparison</h1>
          <p className="body-md">Side-by-side comparison of {selectedColleges.length} colleges.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6">
        <div className="overflow-x-auto hide-scrollbar overscroll-x-contain">
          <div className="min-w-max px-6">
        {/* COLLEGE HEADER ROW */}
        <div 
          className={`grid ${gridClass} gap-0 mb-4 sticky z-30 transition-all duration-300 ease-in-out py-4 bg-white/95 backdrop-blur-md border-b border-border shadow-sm -mx-6 px-6`}
          style={{ top: 'var(--header-offset)' }}
        >
          <div className="sticky left-0 z-20 bg-white/95 -ml-6 pl-6 border-r border-border/50" />
          {selectedColleges.map(c => (
            <div key={c.slug} className="px-4">
              <div className="bg-white border border-border rounded-xl p-4 sm:p-5 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 ${typeColors[c.type] || ''}`}>
                    {c.type}
                  </span>
                  <h2 className="font-ui font-bold text-[13px] sm:text-[16px] leading-tight text-text-primary mb-1 line-clamp-3 min-h-[3.8em]">{c.name}</h2>
                  <p className="text-[10px] sm:text-[11px] text-text-muted mb-3 line-clamp-1">{c.location}, {c.state}</p>
                </div>
                <Link
                  href={`/colleges/${c.slug}`}
                  className="text-[11px] font-semibold text-brand-blue hover:underline flex items-center gap-1 mt-auto"
                >
                  Full Profile <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-surface-white border border-border rounded-2xl">
          {/* Section: General Info */}
          <div className="bg-brand-navy/5 border-b border-border py-3 sticky left-0 z-20 w-full min-w-max -ml-6 pl-6">
            <span className="label text-brand-navy">General Information</span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid ${gridClass} gap-0 border-b border-border ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}
            >
              <div className={`text-[12px] sm:text-[13px] font-bold text-text-secondary flex items-center sticky left-0 z-20 py-4 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r border-border/50 -ml-6 pl-6 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}>
                {row.label}
              </div>
              {selectedColleges.map(c => (
                <div key={c.slug} className="text-[13px] sm:text-[14px] text-text-primary font-ui flex items-center py-4 px-4">
                  {row.render(c)}
                </div>
              ))}
            </div>
          ))}

          {/* Section: Branch Cutoffs */}
          <div className="bg-brand-navy/5 border-b border-border py-3 mt-2 sticky left-0 z-20 w-full min-w-max -ml-6 pl-6">
            <span className="label text-brand-navy">Branch Cutoffs (General Category)</span>
          </div>
          {allBranches.map((branch, i) => (
            <div
              key={branch}
              className={`grid ${gridClass} gap-0 border-b border-border ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}
            >
              <div className={`text-[12px] sm:text-[13px] font-medium text-text-secondary flex items-center sticky left-0 z-20 py-4 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r border-border/50 -ml-6 pl-6 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}>
                {branch}
              </div>
              {selectedColleges.map(c => {
                const branchData = c.branches.find(b => b.branch === branch && b.category === 'General');
                return (
                  <div key={c.slug} className="text-[13px] font-ui py-4 px-4">
                    {branchData ? (
                      <span className="text-text-primary">
                        {branchData.openRank ? `${branchData.openRank} – ${branchData.closeRank}` : '—'}
                      </span>
                    ) : (
                      <span className="text-text-muted italic text-[12px]">Not offered</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Section: Top Recruiters */}
          <div className="bg-brand-navy/5 border-b border-y border-border py-3 sticky left-0 z-20 w-full min-w-max -ml-6 pl-6">
            <span className="label text-brand-navy">Top Recruiters</span>
          </div>
          <div className={`grid ${gridClass} gap-0`}>
            <div className="text-[12px] sm:text-[13px] font-bold text-text-secondary flex items-start pt-5 sticky left-0 z-20 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r border-border/50 -ml-6 pl-6 min-h-[80px]">Companies</div>
            {selectedColleges.map(c => (
              <div key={c.slug} className="flex flex-wrap gap-1.5 py-5 px-4">
                {c.placements?.topRecruiters.map(r => (
                  <span key={r} className="text-[10px] bg-surface-light border border-border px-2 py-0.5 rounded-full text-text-secondary whitespace-nowrap">
                    {r}
                  </span>
                )) ?? <span className="text-text-muted text-[13px]">—</span>}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* CTA */}
        <div className="px-6">
          <div className="mt-10 bg-brand-navy text-white rounded-2xl p-8 text-center">
            <h3 className="font-display text-[24px] mb-2">Not sure which one to pick?</h3>
            <p className="text-white/70 mb-6">Our counsellors will help you shortlist based on your rank, category, and goals.</p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-brand-navy font-semibold px-8 py-3 rounded-xl hover:bg-surface-light transition-colors"
            >
              Apply for Counselling →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
