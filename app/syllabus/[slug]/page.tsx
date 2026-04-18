"use client";

import { syllabus } from '@/data/syllabus';
import Link from 'next/link';
import { 
  Download, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  Compass, 
  ChevronRight, 
  ExternalLink, 
  GraduationCap, 
  Info, 
  Layers, 
  Zap,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DetailTab = 'curriculum' | 'context' | 'database';

export default function SyllabusDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const uni = syllabus.find(s => s.slug === slug);
  const [activeSem, setActiveSem] = useState<'sem1' | 'sem2'>('sem1');
  const [activeTab, setActiveTab] = useState<DetailTab>('curriculum');

  if (!uni) {
    return notFound();
  }

  const currentSubjects = activeSem === 'sem1' ? uni.semester1 : uni.semester2;

  const tabs: { id: DetailTab; label: string; icon: any }[] = [
    { id: 'curriculum', label: 'FY Subjects', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'database', label: 'Full Archive', icon: <TableIcon className="w-4 h-4" /> },
    { id: 'context', label: 'Assessment & NEP', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* GLOSSY HEADER */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-[12px] font-bold text-text-muted mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-blue transition-colors text-brand-blue">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/syllabus" className="hover:text-brand-blue transition-colors">Syllabus</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">{uni.shortName}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[11px] font-black uppercase tracking-widest rounded-full border border-brand-blue/10">Official Core</span>
                <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-[11px] font-black uppercase tracking-widest rounded-full border border-brand-teal/10">{uni.latestPattern}</span>
              </div>
              <h1 className="heading-xl italic mb-3">{uni.name} <span className="text-brand-blue not-italic font-black">Portal.</span></h1>
              <p className="body-lg text-text-secondary max-w-2xl leading-relaxed">
                Comprehensive curriculum tracking for {uni.shortName} engineers, featuring {activeSem === 'sem1' ? 'First' : 'Second'} Semester modules and NEP-2024 compliance data.
              </p>
            </div>
            {uni.officialWebsite && (
              <a 
                href={`https://${uni.officialWebsite}`} 
                target="_blank" 
                className="flex items-center gap-3 px-6 py-3.5 bg-white border border-border rounded-2xl text-[14px] font-bold text-text-primary hover:border-brand-blue transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
                University Website
              </a>
            )}
          </div>
        </div>
        {/* Decorative mask */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 rounded-bl-[160px] pointer-events-none"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* MAIN NAVIGATION TABS */}
        <div className="flex items-center justify-center mb-12">
           <div className="inline-flex bg-surface-light p-1.5 rounded-[24px] border border-border gap-1 shadow-sm">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`relative px-8 py-3.5 rounded-[18px] text-[15px] font-bold flex items-center gap-3 transition-all duration-300 ${
                   activeTab === tab.id ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                 }`}
               >
                 {activeTab === tab.id && (
                   <motion.div
                     layoutId="primary-tab"
                     className="absolute inset-0 bg-brand-blue shadow-lg shadow-brand-blue/20"
                     initial={false}
                     style={{ borderRadius: 18 }}
                   />
                 )}
                 <span className="relative z-10 flex items-center gap-2.5">
                   {tab.icon}
                   {tab.label}
                 </span>
               </button>
             ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'curriculum' && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* SEMESTER TOGGLE */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-black uppercase text-brand-navy tracking-widest">Active Curriculum</h3>
                    <p className="text-[12px] text-text-muted">Currently viewing Year 1 framework</p>
                  </div>
                </div>
                
                <div className="flex bg-surface-light p-1 rounded-xl border border-border">
                   <button 
                     onClick={() => setActiveSem('sem1')}
                     className={`px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${activeSem === 'sem1' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
                   >
                     Semester I
                   </button>
                   <button 
                     onClick={() => setActiveSem('sem2')}
                     className={`px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${activeSem === 'sem2' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
                   >
                     Semester II
                   </button>
                </div>
              </div>

              {/* SUBJECT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-12 hidden md:grid grid-cols-12 px-8 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                    <div className="col-span-6">Subject / Core Module</div>
                    <div className="col-span-2 text-center">Format</div>
                    <div className="col-span-2 text-center">Credits</div>
                    <div className="col-span-2 text-right">Evaluation</div>
                </div>
                {currentSubjects.map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="col-span-12 group bg-white border border-border rounded-3xl p-6 md:px-8 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                      <div className="col-span-12 md:col-span-6">
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-border group-hover:bg-brand-blue/5 group-hover:border-brand-blue/20 transition-all ${
                            sub.type === 'Practical' ? 'text-brand-teal' : 'text-brand-blue'
                          }`}>
                            {sub.type === 'Practical' ? <Compass className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
                          </div>
                          <div>
                             <h4 className="text-[18px] font-black text-text-primary group-hover:text-brand-blue transition-colors mb-1 uppercase tracking-tight">{sub.name}</h4>
                             <span className="text-[12px] font-bold text-text-muted opacity-60 uppercase tracking-widest">ID: {uni.shortName}-FE-{activeSem === 'sem1' ? '101' : '201'}{i+1}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter border transition-colors ${
                          sub.type === 'Theory' 
                          ? 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-brand-blue group-hover:text-white' 
                          : 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-brand-teal group-hover:text-white'
                        }`}>
                          {sub.type}
                        </span>
                      </div>

                      <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                         <span className="text-[24px] font-black text-brand-navy leading-none mb-1">{sub.credits}</span>
                         <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Units</span>
                      </div>

                      <div className="col-span-1 md:col-span-2 text-right">
                         <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-text-primary font-bold text-lg">
                              <Clock className="w-4 h-4 text-brand-blue" />
                              {sub.examHours || '0'} Hrs
                            </div>
                            <span className="text-[11px] font-bold text-text-muted uppercase tracking-tighter">Univ. Assessment</span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'database' && (
             <motion.div
               key="database"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-8"
             >
               <div className="bg-brand-navy/5 p-8 rounded-[40px] border border-brand-blue/10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="heading-sm mb-2">Verified Syllabus Hub</h3>
                    <p className="body-md text-text-secondary">Direct access to the institutional archives for all years and branches.</p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-brand-blue opacity-20" />
               </div>

               <div className="bg-white border border-border rounded-[32px] overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                   <thead className="bg-surface-light border-b border-border">
                     <tr>
                       <th className="px-8 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-text-muted">Branch / Dept</th>
                       <th className="px-8 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-text-muted">Academic Year</th>
                       <th className="px-8 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-text-muted text-center">Pattern</th>
                       <th className="px-8 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Source</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/50">
                     {uni.detailedDatabase?.map((item, idx) => (
                       <tr key={idx} className="hover:bg-brand-blue/5 transition-colors group">
                         <td className="px-8 py-6 font-bold text-text-primary">{item.branch}</td>
                         <td className="px-8 py-6 text-text-secondary text-[14px]">{item.year}</td>
                         <td className="px-8 py-6 text-center">
                            <span className="px-3 py-1 bg-surface-light border border-border rounded-lg text-[12px] font-bold text-text-muted">{item.pattern}</span>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <a 
                              href={item.link} 
                              target="_blank" 
                              className="inline-flex items-center gap-2 text-brand-blue font-bold text-[13px] hover:underline"
                            >
                              Get PDF <Download className="w-4 h-4" />
                            </a>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </motion.div>
          )}

          {activeTab === 'context' && (
            <motion.div
              key="context"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN - EVO & PEDAGOGY */}
              <div className="lg:col-span-8 space-y-8">
                <section className="bg-white border border-border rounded-[40px] p-8 md:p-12">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                        <Layers className="w-6 h-6 text-brand-teal" />
                      </div>
                      <h3 className="heading-sm italic block">Curriculum <span className="text-brand-teal not-italic font-black">Evolution.</span></h3>
                   </div>
                   <p className="body-lg text-text-secondary leading-relaxed mb-10">
                      {uni.academicEvolution}
                   </p>

                   {uni.pedagogy && (
                     <div className="bg-surface-light rounded-[32px] p-8 border border-border">
                        <h4 className="text-[12px] font-black uppercase text-brand-blue tracking-[0.2em] mb-6">Evaluation Structure</h4>
                        <p className="text-[15px] text-text-secondary mb-8 leading-relaxed font-medium">
                          {uni.pedagogy.overview}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {uni.pedagogy.evaluationBreakdown?.map((ev, i) => (
                             <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <span className="text-[20px] font-black text-brand-navy block mb-1">{ev.marks}M</span>
                                <h5 className="font-bold text-[14px] text-text-primary mb-2">{ev.title}</h5>
                                <p className="text-[12px] text-text-muted leading-relaxed font-medium">{ev.desc}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </section>

                <section className="bg-brand-navy rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <GraduationCap className="w-8 h-8 text-brand-teal" />
                        <h3 className="heading-sm text-white italic">Technical <span className="text-brand-teal not-italic font-black">Insights.</span></h3>
                      </div>
                      <p className="text-white/80 leading-relaxed text-[17px] max-w-3xl">
                        {uni.technicalInsights}
                      </p>
                   </div>
                   {/* Glow */}
                   <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -mr-32 -mb-32"></div>
                </section>
              </div>

              {/* RIGHT COLUMN - SIDEBAR INFO */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white border border-border rounded-[32px] p-8">
                    <h3 className="text-[12px] font-black uppercase text-text-muted tracking-widest mb-6">Quick Framework</h3>
                    <div className="space-y-6">
                       <div className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Latest Pattern</span>
                            <span className="text-[15px] font-bold text-brand-navy">{uni.latestPattern}</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Core Framework</span>
                            <span className="text-[15px] font-bold text-brand-navy">{uni.keyFramework}</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Managed Colleges</span>
                            <span className="text-[15px] font-bold text-brand-navy">{uni.affiliatedColleges || 1} Institutional Bodies</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-brand-blue rounded-[32px] p-8 text-white">
                    <Info className="w-8 h-8 text-white/40 mb-4" />
                    <h4 className="font-bold mb-3">Academic Counseling</h4>
                    <p className="text-[13px] text-white/70 leading-relaxed mb-6 font-medium">
                       Navigating the {uni.shortName} NEP transition can be complex. Connect with our academic experts for personalized branch selection and admission strategy.
                    </p>
                    <Link href="/contact" className="w-full btn-primary bg-white text-brand-blue py-3 font-bold text-[13px] justify-center flex items-center gap-2 hover:bg-white/90">
                       Request Support <ChevronRight className="w-4 h-4" />
                    </Link>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER CALL TO ACTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 border-t border-surface-light">
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="heading-md mb-4">Strategic Engineering Planning</h2>
             <p className="body-md text-text-secondary leading-relaxed mb-10">
                Understanding the {uni.shortName} syllabus early gives you a significant advantage. Our proprietary counseling platform helps you navigate admissions for all {uni.affiliatedColleges || uni.shortName} institutions.
             </p>
             <Link href="/apply" className="px-12 py-5 bg-brand-navy text-white font-black uppercase text-[13px] tracking-[0.2em] rounded-2xl hover:bg-brand-blue transition-all shadow-xl hover:-translate-y-1">
                Start Counseling Journey
             </Link>
          </div>
      </div>
    </div>
  );
}
