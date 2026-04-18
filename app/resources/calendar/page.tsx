"use client";

import { motion } from 'framer-motion';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { 
  Calendar, 
  ExternalLink, 
  Clock, 
  MapPin, 
  BellRing,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function ExamCalendarPage() {
  const upcomingExams = [
    {
      name: "MHT-CET 2024 (PCM)",
      dates: "May 2 - May 17, 2024",
      status: "Registration Closed",
      intensity: "High (State Level)",
      officialLink: "https://cetcell.mahacet.org/",
      important: true,
      phase: "Pre-Exam"
    },
    {
      name: "JEE Advanced 2024",
      dates: "May 26, 2024",
      status: "Registration Ongoing",
      intensity: "Extreme (National Level)",
      officialLink: "https://jeeadv.ac.in/",
      important: true,
      phase: "Registration"
    },
    {
      name: "BITSAT 2024 (Session 1)",
      dates: "May 19 - May 24, 2024",
      status: "Hall Tickets Out",
      intensity: "High (University Level)",
      officialLink: "https://www.bitsadmission.com/",
      important: false,
      phase: "Admit Card"
    },
    {
      name: "COMEDK UGET 2024",
      dates: "May 12, 2024",
      status: "Registration Closed",
      intensity: "Medium (Other State)",
      officialLink: "https://www.comedk.org/",
      important: false,
      phase: "Pre-Exam"
    }
  ];

  const milestones = [
    { title: "Result Declaration (MHT-CET)", date: "June Mid, 2024", type: "Result" },
    { title: "Option Form Filling - CAP 1", date: "July First Week, 2024", type: "Process" },
    { title: "Institution Joining Deadline", date: "August 15, 2024", type: "Admission" }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6 relative overflow-hidden">
        {/* Abstractbg */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'Exam Calendar', href: '/resources/calendar' }
            ]} 
          />
          
          <div className="mt-8">
             <Link 
              href="/resources" 
              className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-navy mb-6 group transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Resource Hub
            </Link>
             <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="label text-rose-600 mb-3 inline-flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100"
              >
                <BellRing className="w-3.5 h-3.5" />
                Live Entrance Tracker
              </motion.span>
              <h1 className="heading-xl mb-4">Maharashtra Entrance Calendar 2024</h1>
              <p className="body-lg text-text-secondary max-w-2xl leading-relaxed">
                Stay synchronized with the critical dates of national and state-level engineering 
                entrances. Timelines updated as per official SC/DTE circulars.
              </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-text-primary" />
              <h2 className="heading-sm">Active Examination Cycle</h2>
            </div>
            
            {upcomingExams.map((exam, idx) => (
              <motion.div 
                key={exam.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 bg-white border rounded-3xl group hover:shadow-lg transition-all ${
                  exam.important ? 'border-brand-blue/30 shadow-sm' : 'border-border'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <h3 className="text-[18px] font-bold text-text-primary">{exam.name}</h3>
                       {exam.important && (
                          <span className="px-2 py-0.5 bg-brand-blue text-white text-[10px] font-bold rounded-full uppercase">Priority</span>
                       )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-text-secondary text-[13px] font-medium">
                      <div className="flex items-center gap-1.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <Clock className="w-4 h-4 text-brand-blue" />
                        {exam.dates}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-text-muted" />
                        {exam.intensity}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <div className="text-right hidden sm:block">
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">Current Phase</span>
                        <span className={`px-3 py-1 rounded-lg text-[12px] font-bold ${
                           exam.phase === 'Registration' ? 'bg-green-50 text-green-600 border border-green-100' :
                           exam.phase === 'Admit Card' ? 'bg-violet-50 text-violet-600 border border-amber-100' :
                           'bg-surface-light text-text-muted border border-border'
                        }`}>
                          {exam.phase}
                        </span>
                     </div>
                     <a 
                      href={exam.officialLink} 
                      target="_blank" 
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-light hover:bg-brand-blue hover:text-white transition-all text-text-muted"
                     >
                       <ExternalLink className="w-5 h-5" />
                     </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Milestones */}
          <aside className="space-y-8">
            <div className="p-8 bg-surface-light rounded-3xl border border-border">
              <h4 className="font-bold text-text-primary mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                Admission Roadmap
              </h4>
              <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border"></div>
                
                {milestones.map((ms, i) => (
                   <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-blue z-10"></div>
                      <span className="text-[11px] font-bold text-brand-blue uppercase tracking-widest">{ms.type}</span>
                      <p className="text-[14px] font-bold text-text-primary leading-tight mt-1">{ms.title}</p>
                      <p className="text-[12px] text-text-secondary mt-1">{ms.date}</p>
                   </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-[12px] text-rose-800 font-medium">
                Dates are based on currently released academic schedules. Always verify with official CET 
                cell notifications before taking action.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
