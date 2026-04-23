"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, ArrowRight, Tag, Info, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const UPDATE_CATEGORIES = ['All', 'Platform', 'Exams', 'Admissions', 'Scholarships', 'Counselling'];

const UPDATES = [
  {
    id: 'beta-launch',
    title: "Launch of Beta — Early User Access",
    category: "Platform",
    date: "April 24, 2046",
    description: "CounselPro is officially launching its Beta version for early users. Experience the future of academic guidance with our advanced counselling tools and real-time updates.",
    isNew: true,
    link: "/updates/beta-launch"
  },
  {
    id: 'mht-cet-2026-schedule',
    title: "MHT-CET 2026 Official Exam Schedule Released",
    category: "Exams",
    date: "April 23, 2026",
    description: "The State CET Cell Maharashtra has announced the comprehensive schedule for MHT-CET 2026 PCM and PCB sessions. Check the important dates here.",
    isNew: true,
    link: "/updates/mht-cet-2026-schedule"
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


      </div>
    </div>
  );
}
