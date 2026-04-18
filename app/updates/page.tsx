"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, ArrowRight, Tag, Info, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const UPDATE_CATEGORIES = ['All', 'Admissions', 'Exams', 'Scholarships', 'Counselling'];

const UPDATES = [
  {
    id: 1,
    title: "MHT CET 2026 CAP Round 1 Allotment List Released",
    category: "Admissions",
    date: "April 18, 2026",
    description: "The State Common Entrance Test Cell has published the provisional allotment for CAP Round 1. Students can now check their status using their application ID.",
    isNew: true,
    link: "/counselling/mht-cet"
  },
  {
    id: 2,
    title: "JoSAA 2026 Registration Begins for IIT/NIT Admissions",
    category: "Counselling",
    date: "April 15, 2026",
    description: "The registration process for JoSAA counselling for academic year 2026-27 has officially started. Eligible candidates can fill their choices by April 25.",
    isNew: false,
    link: "/counselling/josaa"
  },
  {
    id: 3,
    title: "Last Date for MahaDBT Scholarships Extended",
    category: "Scholarships",
    date: "April 10, 2026",
    description: "The Department of Higher Education has extended the deadline for the Rajarshi Chhatrapati Shahu Maharaj Fee Reimbursement Scheme.",
    isNew: false,
    link: "/scholarships"
  },
  {
    id: 4,
    title: "JEE Main Session 2 Results Announced",
    category: "Exams",
    date: "April 08, 2026",
    description: "NTA has declared the final results and cut-offs for JEE Main Session 2. Candidates can download their scorecard from the official portal.",
    isNew: false,
    link: "#"
  },
  {
    id: 5,
    title: "VJTI Mumbai to Introduce 3 New Specializations",
    category: "Admissions",
    date: "April 05, 2026",
    description: "VJTI has announced the introduction of AI & Data Science, Robotics, and IoT branches from the 2026-27 academic session.",
    isNew: false,
    link: "/colleges"
  }
];

export default function UpdatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredUpdates = useMemo(() => {
    if (activeCategory === 'All') return UPDATES;
    return UPDATES.filter(u => u.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-surface-white">
      {/* HEADER */}
      <div className="pt-32 pb-20 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Bell className="w-6 h-6 text-brand-blue" />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="label text-brand-blue mb-3 inline-block"
          >
            Live Announcements
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="heading-xl mb-4"
          >
            Latest Admission Updates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="body-lg max-w-2xl mx-auto"
          >
            Stay informed with real-time notifications about entrance exams, CAP rounds, seat allotments, and scholarship deadlines.
          </motion.p>
        </div>
      </div>

      {/* FILTERS */}
      <div 
        className="sticky z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300 ease-in-out"
        style={{ top: 'var(--header-offset)' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {UPDATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white border border-border text-text-secondary hover:border-brand-blue/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredUpdates.map((update, idx) => (
              <motion.div
                key={update.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white border border-border rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 relative overflow-hidden"
              >
                {update.isNew && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-brand-teal text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      New
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1.5 text-[12px] font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/5 px-2.5 py-1 rounded-lg">
                        <Tag className="w-3 h-3" />
                        {update.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-[12px] text-text-muted font-medium">
                        <Calendar className="w-3 h-3" />
                        {update.date}
                      </span>
                    </div>
                    
                    <h2 className="heading-md mb-2 group-hover:text-brand-blue transition-colors">
                      {update.title}
                    </h2>
                    
                    <p className="body-md text-text-secondary mb-6 line-clamp-2 sm:line-clamp-none">
                      {update.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <Link 
                        href={update.link}
                        className="inline-flex items-center gap-2 text-brand-blue font-ui font-semibold text-sm group/link"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                      
                      <div className="flex items-center gap-2 text-text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-border" />
                        <span className="text-[12px] font-medium">Source: Official Portal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredUpdates.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-surface-light rounded-3xl border border-dashed border-border"
            >
              <Info className="w-10 h-10 text-text-muted mx-auto mb-4" />
              <p className="font-semibold text-text-primary">No updates found in this category</p>
              <button 
                onClick={() => setActiveCategory('All')} 
                className="mt-2 text-brand-blue text-sm font-medium hover:underline"
              >
                Show all updates
              </button>
            </motion.div>
          )}
        </div>

        {/* SUBSCRIPTION BOX */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-brand-navy rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-lg mx-auto">
            <h3 className="heading-md text-white mb-4">Never Miss an Important Update</h3>
            <p className="text-white/70 text-sm mb-8">
              Join 5,000+ students receiving real-time admission alerts directly on their devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              />
              <button className="bg-brand-blue text-white font-ui font-bold px-8 py-3 rounded-xl hover:bg-brand-blue/90 transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-white/40 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
