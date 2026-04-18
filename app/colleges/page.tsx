"use client";

import { useState } from 'react';
import { colleges } from '@/data/colleges';
import CollegeCard from '@/components/shared/CollegeCard';
import { Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'IIT', 'NIT', 'State', 'Private'];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          college.shortName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || college.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="heading-xl mb-4"
        >
          Explore Engineering Colleges
        </motion.h1>
        <p className="body-lg max-w-2xl mx-auto">
          Browse colleges with cutoffs, fees, and branch data for JoSAA and MHT CET.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-white/70 backdrop-blur-md border-b border-border py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80 group">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchTerm ? 'text-brand-blue' : 'text-text-muted'}`} />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-xl border border-border bg-surface-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-light rounded-full text-text-muted transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {!searchTerm && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] font-bold text-text-muted p-1 border border-border rounded bg-surface-light">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${activeFilter === f ? 'bg-brand-navy text-white border-brand-navy shadow-md' : 'bg-surface-white text-text-secondary hover:border-brand-blue/30'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="popLayout">
          {filteredColleges.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredColleges.map((college, idx) => (
                <motion.div
                  key={college.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <CollegeCard college={college} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-surface-light rounded-3xl border border-dashed border-border"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                <Search className="text-text-muted w-6 h-6" />
              </div>
              <p className="text-lg font-ui font-medium text-text-primary">No colleges found matching your criteria.</p>
              <p className="text-sm text-text-secondary mt-1">Try adjusting your filters or search term.</p>
              <button onClick={() => {setSearchTerm(''); setActiveFilter('All');}} className="mt-6 text-brand-blue font-semibold text-sm hover:underline flex items-center gap-1 mx-auto transition-all">
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
