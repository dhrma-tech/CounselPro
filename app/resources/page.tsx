"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, BookOpen, Award, GraduationCap, ChevronRight } from 'lucide-react';

export default function ResourceHubPage() {
  const categories = [
    {
      title: "College Directory",
      desc: "500+ Engineering Colleges with branch-wise cutoffs, NIRF rankings, and location filtering.",
      icon: <Building2 className="w-10 h-10 text-brand-blue" />,
      link: "/colleges",
      stats: "500+ Colleges"
    },
    {
      title: "Branch Explorer",
      desc: "Deep dive into every engineering discipline. Core subjects, career paths, and best NITs/IITs for each.",
      icon: <BookOpen className="w-10 h-10 text-brand-teal" />,
      link: "/branches",
      stats: "15+ Branches"
    },
    {
      title: "Scholarship Finder",
      desc: "Financial aid tools to identify government and private scholarships you are eligible to apply for.",
      icon: <Award className="w-10 h-10 text-brand-amber" />,
      link: "/scholarships",
      stats: "20+ Schemes"
    },
    {
      title: "Detailed Syllabus",
      desc: "First-year engineering syllabus for major universities. Prep ahead of your peers.",
      icon: <GraduationCap className="w-10 h-10 text-brand-navy" />,
      link: "/syllabus",
      stats: "University-wise"
    }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="py-20 bg-brand-navy text-white text-center px-6 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10"
        >
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full mb-6 text-sm font-semibold tracking-widest uppercase">Academic Research</span>
          <h1 className="heading-xl text-white mb-6">Student Resource Hub</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            All the data you need to research colleges, compare branches, 
            and find financial aid in one centralized dashboard.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.link}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={cat.link}
                className="group flex flex-col md:flex-row items-center gap-8 bg-white border border-border rounded-3xl p-8 hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-surface-light rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue/5 transition-colors duration-300">
                  {cat.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="heading-md group-hover:text-brand-blue transition-colors">{cat.title}</h3>
                    <span className="px-2 py-0.5 bg-surface-light text-text-muted text-[11px] font-bold rounded uppercase">{cat.stats}</span>
                  </div>
                  <p className="body-md text-text-secondary pr-4 mb-4">{cat.desc}</p>
                  <span className="text-brand-blue font-ui font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Access Tool <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-surface-light rounded-3xl border border-border relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="heading-md mb-3">Looking for specialized insights?</h2>
              <p className="body-md text-text-secondary">
                Data is just the starting point. Our expert counselling adds the layer of strategy 
                needed to convert this data into an actual college seat.
              </p>
            </div>
            <Link 
              href="/apply" 
              className="bg-brand-blue text-white px-10 py-4 rounded-xl font-ui font-bold text-[16px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all whitespace-nowrap"
            >
              Get Expert Guidance
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 -mr-20 -mt-20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
