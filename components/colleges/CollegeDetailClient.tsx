"use client";

import { useState } from 'react';
import Link from 'next/link';
import { College } from '@/lib/types';
import { MapPin, ExternalLink, Building2, GitCompare, Phone, Mail, Train, Plane, Layers, Users, Star } from 'lucide-react';
import CollegeCard from '@/components/shared/CollegeCard';

const TABS = ['Overview', 'Branches & Cutoffs', 'Fees', 'Placements', 'Contact'] as const;
type Tab = typeof TABS[number];

const CATEGORIES = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];

export default function CollegeDetailClient({ college, related }: { college: College; related: College[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [branchCategory, setBranchCategory] = useState('General');
  const [branchCounselling, setBranchCounselling] = useState<'All' | 'JoSAA' | 'MHT-CET'>('All');

  const typeColors: Record<string, string> = {
    IIT: 'bg-blue-50 text-blue-700', NIT: 'bg-teal-50 text-teal-700',
    IIIT: 'bg-violet-50 text-violet-700', State: 'bg-green-50 text-green-700',
    Autonomous: 'bg-orange-50 text-orange-700', Private: 'bg-surface-light text-text-secondary',
  };

  const filteredBranches = college.branches.filter(b => {
    const matchCat = b.category === branchCategory;
    const matchCounselling = branchCounselling === 'All' || b.counselling === branchCounselling;
    return matchCat && matchCounselling;
  });

  return (
    <div className="bg-surface-white min-h-screen">
      {/* COLLEGE HERO HEADER */}
      <div className="bg-surface-light border-b border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-text-muted mb-6 font-ui">
            <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/colleges" className="hover:text-brand-blue transition-colors">Colleges</Link>
            <span>/</span>
            <span className="text-text-primary">{college.shortName}</span>
          </div>

          <Link 
            href="/colleges" 
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-navy mb-8 group transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to all colleges
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${typeColors[college.type] || ''}`}>
                  {college.type}
                </span>
                {college.nirf && (
                  <span className="px-2.5 py-0.5 bg-white border border-border rounded-full text-[12px] text-text-secondary font-medium">
                    NIRF #{college.nirf}
                  </span>
                )}
                {college.accreditation?.map(a => (
                  <span key={a} className="px-2.5 py-0.5 bg-green-50 border border-green-100 rounded-full text-[12px] text-green-700 font-medium">{a}</span>
                ))}
              </div>
              <h1 className="heading-lg mb-3">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-[14px] text-text-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{college.location}, {college.state}</span>
                {college.established && <span>Est. {college.established}</span>}
                {college.affiliation && <span>{college.affiliation}</span>}
                {college.website && (
                  <a href={college.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-blue hover:underline">
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div 
        className="sticky z-40 bg-white border-b border-border shadow-sm transition-all duration-300 ease-in-out"
        style={{ top: 'var(--header-offset)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-4 text-[14px] font-semibold border-b-2 transition-all duration-150 ${
                  activeTab === tab
                    ? 'border-brand-blue text-brand-blue'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* CONTENT AREA */}
          <div className="flex-1 min-w-0">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div className="space-y-10">
                <section>
                  <h2 className="heading-md mb-4">About {college.shortName}</h2>
                  <p className="body-md leading-relaxed">
                    {college.description || `${college.name} is a reputed engineering institution offering various programs.`}
                  </p>
                </section>
                {/* Highlights grid */}
                {college.highlights && (
                  <section>
                    <h2 className="heading-md mb-4">Key Highlights</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {college.highlights.map((h, i) => (
                        <div key={i} className="bg-surface-light border border-border rounded-xl p-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-brand-blue" />
                          </div>
                          <span className="text-[14px] font-medium text-text-primary">{h}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {/* Quick stats */}
                <section>
                  <h2 className="heading-md mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-surface-light rounded-xl p-4 text-center border border-border">
                      <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Branches</div>
                      <div className="font-display text-[28px] text-brand-navy">{college.branches.length}</div>
                    </div>
                    {college.nirf && (
                      <div className="bg-surface-light rounded-xl p-4 text-center border border-border">
                        <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">NIRF Rank</div>
                        <div className="font-display text-[28px] text-brand-navy">#{college.nirf}</div>
                      </div>
                    )}
                    {college.fees?.[0]?.annualFees && (
                      <div className="bg-surface-light rounded-xl p-4 text-center border border-border">
                        <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Annual Fees</div>
                        <div className="font-display text-[24px] text-brand-navy">₹{(college.fees[0].annualFees / 100000).toFixed(1)}L</div>
                      </div>
                    )}
                    <div className="bg-surface-light rounded-xl p-4 text-center border border-border">
                      <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Hostel</div>
                      <div className="font-display text-[18px] text-brand-navy mt-1">{college.hostelAvailable ? '✓ Yes' : '✗ No'}</div>
                    </div>
                  </div>
                </section>

                {/* Facilities & Societies */}
                {(college.campusFacilities || college.studentSocieties) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {college.campusFacilities && (
                      <section>
                        <h2 className="heading-sm mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-brand-blue" /> Campus Facilities</h2>
                        <div className="flex flex-wrap gap-2">
                          {college.campusFacilities.map(f => (
                            <span key={f} className="text-[13px] bg-white border border-border px-3 py-1 rounded-lg font-medium text-text-secondary">{f}</span>
                          ))}
                        </div>
                      </section>
                    )}
                    {college.studentSocieties && (
                      <section>
                        <h2 className="heading-sm mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-brand-teal" /> Student Life</h2>
                        <div className="flex flex-wrap gap-2">
                          {college.studentSocieties.map(s => (
                            <span key={s} className="text-[13px] bg-white border border-border px-3 py-1 rounded-lg font-medium text-text-secondary">{s}</span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {/* Transportation */}
                {college.transportation && (
                  <section className="bg-surface-light border border-border rounded-2xl p-6 mt-12">
                    <h2 className="heading-sm mb-6">How to Reach</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {college.transportation.railway && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center shrink-0">
                            <Train className="w-5 h-5 text-brand-navy" />
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Railway Station</p>
                            <p className="text-[15px] font-semibold text-text-primary">{college.transportation.railway.name}</p>
                            <p className="text-[13px] text-text-secondary">{college.transportation.railway.distance} away</p>
                          </div>
                        </div>
                      )}
                      {college.transportation.airport && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-brand-blue/5 rounded-xl flex items-center justify-center shrink-0">
                            <Plane className="w-5 h-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Airport</p>
                            <p className="text-[15px] font-semibold text-text-primary">{college.transportation.airport.name}</p>
                            <p className="text-[13px] text-text-secondary">{college.transportation.airport.distance} away</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* BRANCHES TAB */}
            {activeTab === 'Branches & Cutoffs' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Category filter */}
                  <div>
                    <p className="label mb-2">Category</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setBranchCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
                            branchCategory === cat
                              ? 'bg-brand-navy text-white border-brand-navy'
                              : 'bg-white border-border text-text-secondary hover:border-brand-blue/40'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Counselling filter */}
                  <div>
                    <p className="label mb-2">Counselling</p>
                    <div className="flex gap-1 bg-surface-light rounded-xl p-1">
                      {(['All', 'JoSAA', 'MHT-CET'] as const).map(opt => (
                        <button
                          key={opt}
                          onClick={() => setBranchCounselling(opt)}
                          className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
                            branchCounselling === opt ? 'bg-white shadow-sm text-brand-navy' : 'text-text-muted'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {filteredBranches.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface-light">
                        <tr>
                          <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold border-b border-border">Branch</th>
                          <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold border-b border-border">Counselling</th>
                          <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold border-b border-border">Open Rank</th>
                          <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold border-b border-border">Close Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredBranches.map((b, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-white'}>
                            <td className="px-4 py-3 font-medium text-text-primary">{b.branch}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${b.counselling === 'JoSAA' ? 'bg-blue-50 text-blue-700' : 'bg-teal-50 text-teal-700'}`}>
                                {b.counselling}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-text-secondary">{b.openRank ?? '—'}</td>
                            <td className="px-4 py-3 font-semibold text-brand-navy">{b.closeRank ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-surface-light rounded-xl border border-dashed border-border">
                    <p className="text-text-muted">No cutoff data for <strong>{branchCategory}</strong> category{branchCounselling !== 'All' && ` via ${branchCounselling}`}.</p>
                    <button onClick={() => { setBranchCategory('General'); setBranchCounselling('All'); }} className="mt-3 text-brand-blue text-sm hover:underline">Reset filters</button>
                  </div>
                )}
              </div>
            )}

            {/* FEES TAB */}
            {activeTab === 'Fees' && (
              <div>
                <h2 className="heading-md mb-6">Fee Structure</h2>
                {college.fees && college.fees.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {college.fees.map((fee, i) => (
                      <div key={i} className="bg-surface-light border border-border rounded-xl p-6">
                        <p className="label mb-3">{fee.branch}</p>
                        {fee.annualFees && (
                          <div className="mb-4">
                            <div className="text-[12px] text-text-muted mb-1">Annual Tuition</div>
                            <div className="font-display text-[32px] text-brand-navy">₹{fee.annualFees.toLocaleString()}</div>
                          </div>
                        )}
                        <div className="space-y-2 text-[14px]">
                          {fee.totalFees && (
                            <div className="flex justify-between border-b border-border pb-2">
                              <span className="text-text-muted">Total (4 years)</span>
                              <span className="font-semibold text-text-primary">₹{fee.totalFees.toLocaleString()}</span>
                            </div>
                          )}
                          {fee.hostelFees && (
                            <div className="flex justify-between">
                              <span className="text-text-muted">Hostel (per year)</span>
                              <span className="font-semibold text-text-primary">₹{fee.hostelFees.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-surface-light rounded-xl border border-dashed border-border">
                    <p className="text-text-muted">Fee data not yet available. Contact us for details.</p>
                  </div>
                )}
              </div>
            )}

            {/* PLACEMENTS TAB */}
            {activeTab === 'Placements' && (
              <div>
                <h2 className="heading-md mb-6">Placement Statistics</h2>
                {college.placements ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-brand-navy text-white rounded-2xl p-8">
                        <div className="text-white/60 text-[11px] uppercase tracking-widest mb-2">Average Package</div>
                        <div className="font-display text-[40px]">{college.placements.avgPackage}</div>
                      </div>
                      <div className="bg-brand-blue text-white rounded-2xl p-8">
                        <div className="text-white/60 text-[11px] uppercase tracking-widest mb-2">Highest Package</div>
                        <div className="font-display text-[40px]">{college.placements.highestPackage}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="heading-sm mb-4">Top Recruiters</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.placements.topRecruiters.map(r => (
                          <span key={r} className="px-4 py-2 bg-surface-light border border-border rounded-full text-[14px] font-medium text-text-primary">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    {college.placementStats && (
                      <div className="mt-12">
                        <h3 className="heading-sm mb-6">Historical Trends</h3>
                        <div className="overflow-x-auto rounded-xl border border-border">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-surface-light">
                              <tr>
                                <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold">Year</th>
                                <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold">Avg Package</th>
                                <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold">Highest Package</th>
                                <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-bold">Placed %</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {college.placementStats.map((stat, i) => (
                                <tr key={i}>
                                  <td className="px-4 py-3 font-semibold text-text-primary">{stat.year}</td>
                                  <td className="px-4 py-3 text-brand-blue font-medium">{stat.avgPackage}</td>
                                  <td className="px-4 py-3 text-text-secondary">{stat.highestPackage}</td>
                                  <td className="px-4 py-3 text-text-secondary">{stat.placementRate}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-surface-light rounded-xl border border-dashed border-border">
                    <p className="text-text-muted">Placement data not yet available.</p>
                  </div>
                )}
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'Contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="bg-surface-light border border-border rounded-xl p-6">
                    <h3 className="heading-sm mb-6">Admission Enquiries</h3>
                    <div className="space-y-5">
                      {college.contact?.email && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Email Address</p>
                            <a href={`mailto:${college.contact.email}`} className="text-[15px] font-medium text-brand-blue hover:underline">{college.contact.email}</a>
                          </div>
                        </div>
                      )}
                      {college.contact?.phone && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-brand-teal" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Phone Number</p>
                            <a href={`tel:${college.contact.phone}`} className="text-[15px] font-medium text-text-primary hover:text-brand-blue">{college.contact.phone}</a>
                          </div>
                        </div>
                      )}
                      <div className="pt-4 border-t border-border/50">
                        <Link href={college.website || '#'} target="_blank" rel="noreferrer"
                          className="flex items-center gap-2 text-brand-blue font-semibold text-sm hover:underline">
                          <ExternalLink className="w-4 h-4" /> Visit Official Website
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-navy text-white rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-3xl -mr-16 -mt-16" />
                    <h3 className="heading-sm text-white mb-2 relative z-10">Need Expert Help?</h3>
                    <p className="text-white/70 text-sm mb-6 relative z-10">
                      Our senior counsellors provide personalized assistance for {college.shortName} admission process.
                    </p>
                    <Link href="/apply" className="inline-block bg-white text-brand-navy font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-all relative z-10">
                      Join Counselling Hub
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STICKY SIDEBAR */}
          <div className="w-full lg:w-72 shrink-0">
            <div 
              className="sticky space-y-4 transition-all duration-300 ease-in-out"
              style={{ top: 'calc(var(--header-offset) + 80px)' }}
            >
              {/* REVIEWS SECTION */}
              {college.reviews && (
                <div className="bg-surface-light border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="heading-sm mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> 
                    Student Ratings
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Overall', value: college.reviews.overall, color: 'bg-brand-blue' },
                      { label: 'Faculty', value: college.reviews.faculty, color: 'bg-brand-teal' },
                      { label: 'Placements', value: college.reviews.placements, color: 'bg-brand-navy' },
                      { label: 'Infrastructure', value: college.reviews.infrastructure, color: 'bg-orange-500' }
                    ].map(rating => (
                      <div key={rating.label}>
                        <div className="flex justify-between text-[13px] font-medium mb-1.5">
                          <span className="text-text-secondary">{rating.label}</span>
                          <span className="text-text-primary">{rating.value}/10</span>
                        </div>
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${rating.color} transition-all duration-1000`} 
                            style={{ width: `${rating.value * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-text-muted text-[12px] italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Verified Student Data 2024
                  </div>
                </div>
              )}

              {/* ACTION CARD */}
              <div className="bg-surface-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h3 className="font-display text-[20px] text-brand-navy mb-2">Secure your seat at {college.shortName}</h3>
                <p className="body-sm text-text-secondary mb-5 leading-relaxed">
                  Our counsellors build your shortlist, manage rounds, and guide you to the right choice.
                </p>
                <Link href="/apply" className="block w-full text-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#1648c0] transition-all">
                  Apply for Guidance →
                </Link>
                <Link href={`/colleges/compare?slugs=${college.slug}`} className="block w-full text-center text-text-secondary border border-border font-ui font-medium text-[14px] px-6 py-2.5 rounded-lg hover:border-brand-blue/40 transition-all mt-2 flex items-center justify-center gap-1">
                  <GitCompare className="w-3.5 h-3.5" /> Compare College
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED COLLEGES */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="heading-md mb-6">You might also consider</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(c => <CollegeCard key={c.slug} college={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
