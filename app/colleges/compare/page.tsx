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

  return (
    <div className="min-h-screen bg-surface-white">
      {/* HEADER */}
      <div className="bg-surface-light border-b border-border py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/colleges" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-blue mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Colleges
          </Link>
          <h1 className="heading-lg mb-2">College Comparison</h1>
          <p className="body-md">Side-by-side comparison of {selectedColleges.length} colleges.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 overflow-x-auto overflow-y-visible">
        {/* COLLEGE HEADER ROW */}
        <div 
          className={`grid gap-4 mb-4 sticky z-30 transition-all duration-300 ease-in-out py-4 ${
            selectedColleges.length === 3 ? 'grid-cols-4' : 'grid-cols-3'
          }`}
          style={{ top: 'var(--header-offset)' }}
        >
          <div className="hidden md:block bg-surface-white/50 backdrop-blur-sm rounded-xl" />
          {selectedColleges.map(c => (
            <div key={c.slug} className="bg-surface-white border border-border rounded-xl p-5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold mb-3 ${typeColors[c.type] || ''}`}>
                {c.type}
              </span>
              <h2 className="font-ui font-bold text-[16px] leading-snug text-text-primary mb-1">{c.name}</h2>
              <p className="text-[12px] text-text-muted mb-4">{c.location}, {c.state}</p>
              <Link
                href={`/colleges/${c.slug}`}
                className="text-[12px] text-brand-blue hover:underline flex items-center gap-1"
              >
                Full Profile <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-surface-white border border-border rounded-2xl overflow-hidden">
          {/* Section: General Info */}
          <div className="bg-brand-navy/5 border-b border-border px-6 py-3">
            <span className="label text-brand-navy">General Information</span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid gap-4 px-6 py-4 border-b border-border ${
                selectedColleges.length === 3 ? 'grid-cols-4' : 'grid-cols-3'
              } ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}
            >
              <div className="text-[13px] font-semibold text-text-secondary flex items-center">{row.label}</div>
              {selectedColleges.map(c => (
                <div key={c.slug} className="text-[14px] text-text-primary font-ui flex items-center">
                  {row.render(c)}
                </div>
              ))}
            </div>
          ))}

          {/* Section: Branch Cutoffs */}
          <div className="bg-brand-navy/5 border-b border-border px-6 py-3 mt-2">
            <span className="label text-brand-navy">Branch Cutoffs (General Category)</span>
          </div>
          {allBranches.map((branch, i) => (
            <div
              key={branch}
              className={`grid gap-4 px-6 py-4 border-b border-border ${
                selectedColleges.length === 3 ? 'grid-cols-4' : 'grid-cols-3'
              } ${i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}`}
            >
              <div className="text-[13px] font-medium text-text-secondary flex items-center">{branch}</div>
              {selectedColleges.map(c => {
                const branchData = c.branches.find(b => b.branch === branch && b.category === 'General');
                return (
                  <div key={c.slug} className="text-[13px] font-ui">
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
          <div className="bg-brand-navy/5 border-b border-border px-6 py-3">
            <span className="label text-brand-navy">Top Recruiters</span>
          </div>
          <div className={`grid gap-4 px-6 py-5 ${selectedColleges.length === 3 ? 'grid-cols-4' : 'grid-cols-3'}`}>
            <div className="text-[13px] font-semibold text-text-secondary flex items-start pt-1">Companies</div>
            {selectedColleges.map(c => (
              <div key={c.slug} className="flex flex-wrap gap-1.5">
                {c.placements?.topRecruiters.map(r => (
                  <span key={r} className="text-[11px] bg-surface-light border border-border px-2 py-0.5 rounded-full text-text-secondary">
                    {r}
                  </span>
                )) ?? <span className="text-text-muted text-[13px]">—</span>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
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
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
