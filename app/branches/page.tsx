"use client";

import { useState, useMemo } from 'react';
import { branches } from '@/data/branches';
import BranchCard from '@/components/shared/BranchCard';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';

export default function BranchesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Engineering', 'Medical', 'Pharmacy', 'Nursing', 'Agriculture'];

  const filteredBranches = useMemo(() => {
    return branches.filter(b => {
      const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
      const matchesSearch = 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedBranches = useMemo(() => {
    const groups: Record<string, typeof branches> = {};
    filteredBranches.forEach(b => {
      if (!groups[b.category]) groups[b.category] = [];
      groups[b.category].push(b);
    });
    return groups;
  }, [filteredBranches]);

  const displayCategories = activeCategory === 'All' 
    ? categories.filter(c => c !== 'All' && groupedBranches[c]?.length > 0)
    : [activeCategory];

  return (
    <div className="min-h-screen bg-surface-white">
      {/* HEADER SECTION */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Academic Branches', href: '/branches' }
            ]} 
          />
          
          <div className="mt-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="label text-brand-blue mb-3 inline-block"
            >
              Academic Directory
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-xl mb-4"
            >
              Explore Academic Branches
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="body-lg max-w-2xl text-text-secondary"
            >
              Choosing the right path is as important as choosing the right college. 
              Explore the scope, core subjects, and career evolution for each discipline.
            </motion.p>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR - STICKY */}
      <div 
        className="sticky z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300 ease-in-out"
        style={{ top: 'var(--header-offset)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Filter Chips */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 sm:pb-0 grow">
              <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider shrink-0 mr-2">Category:</span>
              <div className="flex gap-2">
                {categories.map((c, idx) => (
                  <button 
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 border whitespace-nowrap
                      ${activeCategory === c 
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                        : 'bg-white text-text-secondary border-border hover:border-brand-blue/30 hover:bg-surface-light'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text"
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 flex justify-between items-end">
          <p className="text-[14px] text-text-muted">
            Found <span className="font-bold text-text-primary">{filteredBranches.length}</span> specialties
            {searchQuery && <span> for "<span className="text-text-primary font-medium">{searchQuery}</span>"</span>}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredBranches.length > 0 ? (
            <div className="space-y-20">
              {displayCategories.map((cat) => (
                <motion.section 
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="heading-md">{cat} Branches</h2>
                    <div className="h-px bg-border grow"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupedBranches[cat]?.map((branch, idx) => (
                      <motion.div
                        key={branch.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.2) }}
                      >
                        <BranchCard branch={branch} />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-surface-light rounded-3xl border border-dashed border-border"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-border mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="heading-sm text-text-primary mb-2">No results found</h3>
              <p className="text-text-secondary mb-6 max-w-xs mx-auto">
                We couldn't find any branches matching your current search or filter criteria.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

