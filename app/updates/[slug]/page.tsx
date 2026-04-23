"use client";

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, ExternalLink, Globe, Rocket, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const UPDATE_DETAILS: Record<string, any> = {
  'beta-launch': {
    title: "Launch of Beta — Early User Access",
    category: "Platform",
    date: "April 24, 2046",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-4">The Future of Counselling is Here</h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            Today marks a historic milestone for CounselPro. We are thrilled to announce the official launch of our Beta version, opening doors to early users who are ready to transform their college admission journey.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Our platform is built on the foundation of transparency, accuracy, and personalized guidance. We've spent months refining our algorithms and design to ensure that every student has a reliable partner in their pursuit of higher education.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
            <Rocket className="w-8 h-8 text-brand-blue mb-4" />
            <h4 className="font-bold mb-2">Advanced Predictors</h4>
            <p className="text-sm text-text-muted">AI-driven college and branch predictors based on latest trends.</p>
          </div>
          <div className="p-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
            <Zap className="w-8 h-8 text-brand-teal mb-4" />
            <h4 className="font-bold mb-2">Real-time Alerts</h4>
            <p className="text-sm text-text-muted">Never miss a deadline with instant notifications on your device.</p>
          </div>
          <div className="p-6 bg-brand-navy/5 rounded-2xl border border-brand-navy/10">
            <ShieldCheck className="w-8 h-8 text-brand-navy mb-4" />
            <h4 className="font-bold mb-2">Verified Data</h4>
            <p className="text-sm text-text-muted">All information is sourced directly from official government portals.</p>
          </div>
          <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
            <Globe className="w-8 h-8 text-brand-blue mb-4" />
            <h4 className="font-bold mb-2">Centralized Hub</h4>
            <p className="text-sm text-text-muted">One dashboard for JEE, NEET, MHT-CET, and other major exams.</p>
          </div>
        </div>

        <section className="bg-surface-light p-8 rounded-3xl border border-border">
          <h3 className="text-lg font-bold mb-4">What to Expect in Beta?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-text-secondary text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
              Complete access to the MHT-CET 2026 Strategy Hub.
            </li>
            <li className="flex items-start gap-3 text-text-secondary text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
              Early preview of our Choice Filling Assistant tool.
            </li>
            <li className="flex items-start gap-3 text-text-secondary text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
              Direct feedback channel to influence the platform's final roadmap.
            </li>
          </ul>
        </section>
      </div>
    )
  },
  'mht-cet-2026-schedule': {
    title: "MHT-CET 2026 Official Exam Schedule Released",
    category: "Exams",
    date: "April 23, 2026",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-4">MHT-CET 2026 Comprehensive Schedule</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            The State Common Entrance Test Cell, Maharashtra has officially released the schedule for the MHT-CET 2026 examination. The exam will be conducted in multiple sessions for Engineering (PCM) and Medical/Pharmacy (PCB) groups.
          </p>
          
          <div className="overflow-hidden border border-border rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-light border-b border-border">
                  <th className="px-6 py-4 font-bold text-sm text-text-primary">Group</th>
                  <th className="px-6 py-4 font-bold text-sm text-text-primary">Session</th>
                  <th className="px-6 py-4 font-bold text-sm text-text-primary">Exam Dates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-brand-blue">PCM</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">Session 1</td>
                  <td className="px-6 py-4 text-sm text-text-primary">April 11 – April 20, 2026</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-brand-blue">PCM</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">Session 2</td>
                  <td className="px-6 py-4 text-sm text-text-primary">May 12 – May 16, 2026</td>
                </tr>
                <tr className="bg-brand-teal/5">
                  <td className="px-6 py-4 text-sm font-bold text-brand-teal">PCB</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">Session 1</td>
                  <td className="px-6 py-4 text-sm text-text-primary">April 21 – April 26, 2026</td>
                </tr>
                <tr className="bg-brand-teal/5">
                  <td className="px-6 py-4 text-sm font-bold text-brand-teal">PCB</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">Session 2</td>
                  <td className="px-6 py-4 text-sm text-text-primary">May 10 – May 11, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-brand-navy p-8 rounded-3xl text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-teal" /> Important Guidelines
          </h3>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex gap-3">
              <span className="font-bold text-brand-teal">Mode:</span>
              The examination will be a Computer-Based Test (CBT) held across various centers in Maharashtra and outside.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-teal">Admit Cards:</span>
              Tentatively expected 10 days before the commencement of each session.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-teal">Helpdesk:</span>
              For any registration issues, contact the CET Cell helpdesk at support@mahacet.org.
            </li>
          </ul>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">Official Source: mahacet.org</span>
            <Link 
              href="https://cetcell.mahacet.org" 
              target="_blank"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              Visit Official Portal <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </section>
      </div>
    )
  }
};

export default function UpdateDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const update = UPDATE_DETAILS[slug];

  if (!update) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="heading-xl mb-4">Update Not Found</h1>
      <Link href="/updates" className="text-brand-blue font-bold hover:underline flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Updates
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-white pt-32 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        {/* BACK BUTTON */}
        <Link 
          href="/updates" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-brand-blue mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Updates</span>
        </Link>

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/5 px-2.5 py-1 rounded-lg">
              <Tag className="w-3 h-3" />
              {update.category}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-text-muted font-medium">
              <Calendar className="w-3 h-3" />
              {update.date}
            </span>
          </div>
          <h1 className="heading-xl mb-6">{update.title}</h1>
          <div className="h-1 w-20 bg-brand-blue rounded-full" />
        </header>

        {/* CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-[32px] p-8 sm:p-12 shadow-sm"
        >
          {update.content}
        </motion.div>


      </article>
    </div>
  );
}
