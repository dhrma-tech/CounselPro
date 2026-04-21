"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { colleges } from '@/data/colleges';
import CollegeCard from '@/components/shared/CollegeCard';
import { Search, X, GitCompare, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const TYPE_FILTERS = ['All', 'IIT', 'NIT', 'IIIT', 'Government', 'State', 'Autonomous', 'Private'];
const SORT_OPTIONS = [
  { value: 'nirf', label: 'NIRF Rank' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'fees-asc', label: 'Fees: Low → High' },
  { value: 'fees-desc', label: 'Fees: High → Low' },
];

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('nirf');
  const [compareList, setCompareList] = useState<string[]>([]); // slugs
  const [showCompareBar, setShowCompareBar] = useState(false);

  // Persist compare list in sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('cp_compare');
    if (stored) setCompareList(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cp_compare', JSON.stringify(compareList));
    setShowCompareBar(compareList.length > 0);
  }, [compareList]);

  const toggleCompare = (slug: string) => {
    setCompareList(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 3) {
        alert('You can compare up to 3 colleges at once.');
        return prev;
      }
      return [...prev, slug];
    });
  };

  const filteredAndSorted = useMemo(() => {
    let result = colleges.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = activeFilter === 'All' || c.type.toLowerCase() === activeFilter.toLowerCase();
      return matchSearch && matchType;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'nirf':
          const ra = a.nirf ?? 999;
          const rb = b.nirf ?? 999;
          return ra - rb;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'fees-asc': {
          const fa = a.fees?.[0]?.annualFees ?? Infinity;
          const fb = b.fees?.[0]?.annualFees ?? Infinity;
          return fa - fb;
        }
        case 'fees-desc': {
          const fa = a.fees?.[0]?.annualFees ?? 0;
          const fb = b.fees?.[0]?.annualFees ?? 0;
          return fb - fa;
        }
        default: return 0;
      }
    });

    return result;
  }, [searchTerm, activeFilter, sortBy]);

  const compareColleges = colleges.filter(c => compareList.includes(c.slug));

  return (
    <div className="min-h-screen bg-surface-white">
      {/* PAGE HEADER */}
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="label text-brand-blue mb-3 inline-block"
        >
          Engineering Colleges Directory
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="heading-xl mb-4"
        >
          Find Your Right College
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="body-lg max-w-2xl mx-auto"
        >
          {colleges.length} colleges with branch-wise cutoffs, fees, and placement data for Engineering, Medical and more.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 inline-flex items-center gap-2 text-[13px] text-text-muted bg-brand-blue/5 px-3 py-1.5 rounded-full"
        >
          <GitCompare className="w-3.5 h-3.5 text-brand-blue" />
          Select up to 3 colleges to compare side-by-side
        </motion.div>
      </div>

      {/* STICKY FILTER BAR */}
      <div 
        className="sticky z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300 ease-in-out"
        style={{ top: 'var(--header-offset)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col md:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search colleges, cities..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-border bg-surface-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar flex-1">
            {TYPE_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all border ${
                  activeFilter === f
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-surface-white text-text-secondary border-border hover:border-brand-blue/40'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="h-10 pl-3 pr-8 rounded-xl border border-border bg-surface-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 shrink-0 cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RESULTS + GRID */}
      <div className="max-w-6xl mx-auto px-6 py-6 pb-32">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[14px] text-text-muted font-ui">
            Showing <span className="font-semibold text-text-primary">{filteredAndSorted.length}</span> colleges
            {activeFilter !== 'All' && <> · <span className="text-brand-blue">{activeFilter}</span></>}
          </p>
          {(activeFilter !== 'All' || searchTerm) && (
            <button
              onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
              className="text-[13px] text-brand-blue hover:underline font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredAndSorted.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((college, idx) => (
                <motion.div
                  key={college.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.25) }}
                >
                  <CollegeCard
                    college={college}
                    isInCompare={compareList.includes(college.slug)}
                    onToggleCompare={() => toggleCompare(college.slug)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-surface-light rounded-2xl border border-dashed border-border"
            >
              <Search className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="font-ui font-semibold text-text-primary">No colleges found</p>
              <p className="text-sm text-text-muted mt-1">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                className="mt-4 text-brand-blue text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING COMPARE BAR */}
      <AnimatePresence>
        {showCompareBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
              <GitCompare className="w-5 h-5 text-brand-blue shrink-0" />
              <span className="text-sm font-semibold text-text-primary shrink-0">
                Comparing {compareList.length} / 3
              </span>
              <div className="flex gap-3 flex-1 flex-wrap">
                {compareColleges.map(c => (
                  <div key={c.slug} className="flex items-center gap-2 bg-surface-light border border-border rounded-lg px-3 py-1.5 text-sm">
                    <span className="font-medium text-text-primary">{c.shortName}</span>
                    <button
                      onClick={() => toggleCompare(c.slug)}
                      className="text-text-muted hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setCompareList([])}
                  className="text-sm text-text-muted hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
                {compareList.length >= 2 && (
                  <Link
                    href={`/colleges/compare?slugs=${compareList.join(',')}`}
                    className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1648c0] transition-all"
                  >
                    Compare Now <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
