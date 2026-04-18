"use client";

import { useState } from 'react';
import Link from 'next/link';
import { syllabus } from '@/data/syllabus';
import { BookOpen, MapPin, Building2, Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyllabusPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSyllabus = syllabus.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    uni.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-24 pb-16 bg-surface-light border-b border-border text-center px-6">
        <h1 className="heading-xl mb-4 italic">First Year Engineering <span className="text-brand-blue not-italic font-bold">Syllabus.</span></h1>
        <p className="body-lg max-w-2xl mx-auto text-text-secondary">
          University-wise curriculum for Semester 1 & 2 to help you prepare ahead of the curve.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* SEARCH & FILTERS */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <h2 className="heading-md mb-2">University Specific Syllabus</h2>
            <p className="body-md text-text-muted">Access official frameworks for your campus.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text"
              placeholder="Search University..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSyllabus.map(uni => (
              <motion.div 
                key={uni.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="w-14 h-14 bg-surface-light border border-border rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-all text-text-muted">
                  <Building2 className="w-6 h-6" />
                </div>
                
                <h3 className="text-[18px] font-bold text-text-primary mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {uni.name}
                </h3>
                
                <div className="flex gap-4 mb-8 text-[12px] font-bold text-text-muted uppercase tracking-wider mt-auto pt-4 border-t border-surface-light">
                  {uni.affiliatedColleges && uni.affiliatedColleges > 1 ? (
                    <span className="flex items-center gap-1.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      <MapPin className="w-3.5 h-3.5" /> {uni.affiliatedColleges} Colleges
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-brand-teal">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Autonomous Uni
                    </span>
                  )}
                </div>

                <Link 
                  href={`/syllabus/${uni.slug}`} 
                  className="mt-auto group/btn relative flex items-center justify-center gap-2 w-full py-4 bg-surface-light border border-border rounded-xl font-bold text-[14px] text-text-primary hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/20 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Check Syllabus</span>
                  <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  
                  {/* Subtle hover background sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-navy opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredSyllabus.length === 0 && (
          <div className="text-center py-20 bg-surface-light rounded-3xl border border-dashed border-border mt-10">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="heading-sm mb-2">No University Found</h3>
            <p className="text-text-secondary">We couldn't find any results for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-24 bg-brand-navy rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="heading-lg mb-6 text-white">Why check the syllabus now?</h2>
            <p className="body-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              First-year engineering introduces completely new subjects like Engineering Mechanics and Graphics. 
              Getting a head start before college begins gives you a competitive advantage during the first internals.
            </p>
            <Link href="/apply" className="inline-block bg-white text-brand-blue py-4 px-10 rounded-2xl font-bold text-[16px] hover:bg-surface-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Connect for Guidance
            </Link>
          </div>
          {/* Abstract glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
}
