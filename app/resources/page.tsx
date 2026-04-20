"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  BookOpen, 
  Award, 
  GraduationCap, 
  ChevronRight, 
  ClipboardCheck, 
  Calendar,
  HelpCircle,
  Clock,
  Users,
  ShieldCheck,
  Archive
} from 'lucide-react';

export default function ResourceHubPage() {
  const categories = [
    {
      title: "College Directory",
      desc: "Exhaustive database of 500+ Engineering Colleges with branch-wise cutoffs, NIRF rankings, and location filtering.",
      icon: <Building2 className="w-10 h-10 text-brand-blue" />,
      link: "/colleges",
      stats: "500+ Colleges",
      type: "Database"
    },
    {
      title: "Branch Explorer",
      desc: "Scientific deep-dive into 80+ engineering disciplines. Explore curriculum pillars, specialized tracks, and career trajectories.",
      icon: <BookOpen className="w-10 h-10 text-brand-teal" />,
      link: "/branches",
      stats: "80+ Disciplines",
      type: "Academic"
    },
    {
      title: "Scholarship Finder",
      desc: "Centralized tool to identify government and private financial aid schemes based on your category and academic score.",
      icon: <Award className="w-10 h-10 text-brand-violet" />,
      link: "/scholarships",
      stats: "Maharashtra Focused",
      type: "Finance"
    },
    {
      title: "Detailed Syllabus",
      desc: "Comprehensive first-year and core-subject syllabus for major technical universities to help you prep ahead.",
      icon: <GraduationCap className="w-10 h-10 text-brand-navy" />,
      link: "/syllabus",
      stats: "Uni-Wise",
      type: "Academic"
    },
    {
      title: "Admission Checklist",
      desc: "Complete, step-by-step document checklist and verification guide for CAP rounds and institutional rounds.",
      icon: <ClipboardCheck className="w-10 h-10 text-green-600" />,
      link: "/resources/checklist",
      stats: "Essential",
      type: "Guide"
    },
    {
      title: "Exam Calendar",
      desc: "Stay updated with important dates for MHT-CET, JEE Mains, JEE Advanced, and various institute-specific exams.",
      icon: <Calendar className="w-10 h-10 text-rose-600" />,
      link: "/resources/calendar",
      stats: "Live Updates",
      type: "Alerts"
    },
    {
      title: "Admission Libraries",
      desc: "Complete archive of official documents: seat matrices, multi-year cutoff PDFs, and historical admission datasets.",
      icon: <Archive className="w-10 h-10 text-brand-blue" />,
      link: "/libraries",
      stats: "Archive Hub",
      type: "Data"
    }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      {/* PREMIUM HERO SECTION */}
      <div className="pt-32 pb-24 bg-surface-light border-b border-border px-6 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-teal/5 blur-3xl rounded-full -ml-20 -mb-20"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
             className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full mb-6 text-[12px] font-bold tracking-widest uppercase border border-brand-blue/20">
              Technical Research & Analytics
            </span>
            <h1 className="heading-xl text-text-primary mb-6">Student Resource Hub</h1>
            <p className="body-lg text-text-secondary max-w-2xl leading-relaxed">
              CounselPro's centralized intelligence dashboard. Access verified institutional data, 
              academic frameworks, and strategic financial aid tools designed for the modern engineering aspirant.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RESOURCE GRID */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="heading-md mb-2">Available Intelligence Modules</h2>
            <p className="body-md text-text-muted">Select a category to begin your academic research.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-text-muted text-sm font-medium pr-2">
            <Clock className="w-4 h-4" />
            Last Updated: April 2024
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                href={cat.link}
                className="group flex flex-col h-full bg-white border border-border rounded-3xl p-8 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual Type Tag */}
                <div className="absolute top-0 right-0 pt-4 pr-6">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-text-muted/50 group-hover:text-brand-blue/40 transition-colors">
                    {cat.type}
                  </span>
                </div>

                <div className="w-16 h-16 bg-surface-light rounded-2xl flex items-center justify-center shrink-0 mb-6 group-hover:bg-brand-blue/5 transition-colors duration-300">
                  {cat.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[18px] font-bold text-text-primary group-hover:text-brand-blue transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-text-secondary mb-6 line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-[12px] font-bold text-text-muted uppercase">
                    {cat.stats}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* INFORMATIONAL BACKPAGES SECTION */}
        <div className="mt-28">
          <div className="mb-12 text-center md:text-left">
            <h2 className="heading-md mb-2">Platform Knowledge & Support</h2>
            <p className="body-md text-text-muted">Explore our institutional background and reaching our support desk.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Our Story', href: '/about', desc: 'The mission behind CounselPro.', icon: <Users className="w-5 h-5" /> },
              { label: 'Help Center', href: '/faq', desc: 'Frequently asked questions.', icon: <HelpCircle className="w-5 h-5" /> },
              { label: 'Contact Us', href: '/contact', desc: 'Speak with our advisors.', icon: <Users className="w-5 h-5" /> }, // Reusing Users icon or I'll use Lucide icons logic
              { label: 'Legal & Privacy', href: '/privacy', desc: 'Our data commitments.', icon: <ShieldCheck className="w-5 h-5" /> }
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="group p-8 bg-white border border-border rounded-[32px] hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-surface-light rounded-xl flex items-center justify-center text-text-muted group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-all mb-6">
                   <ChevronRight className="w-5 h-5" />
                </div>
                <h4 className="text-[17px] font-bold text-text-primary mb-2 group-hover:text-brand-blue transition-colors">
                  {link.label}
                </h4>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* GUIDANCE CALLOUT */}
        <div className="mt-20 p-1 bg-gradient-to-r from-brand-blue/20 to-brand-teal/20 rounded-[36px]">
          <div className="p-8 md:p-12 bg-white rounded-[34px] relative overflow-hidden shadow-sm">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
                  <HelpCircle className="w-5 h-5" />
                  Still feeling overwhelmed?
                </span>
                <h2 className="heading-lg mb-4">Let experts navigate the complexity for you.</h2>
                <p className="body-lg text-text-secondary">
                  Data provides the map, but expert counselling provides the compass. 
                  Our advisors help you translate these resources into a strategic admission sequence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link 
                  href="/apply" 
                  className="bg-brand-blue text-white px-10 py-5 rounded-2xl font-bold text-[16px] shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:-translate-y-1 transition-all whitespace-nowrap text-center"
                >
                  Start Counselling
                </Link>
                <Link 
                  href="/faq" 
                  className="bg-surface-light text-text-primary border border-border px-10 py-5 rounded-2xl font-bold text-[16px] hover:bg-white transition-all text-center"
                >
                  Read FAQs
                </Link>
              </div>
            </div>
            {/* Background Accents */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mb-32 -mr-32 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

