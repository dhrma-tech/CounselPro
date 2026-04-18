"use client";

import { useState, useMemo } from 'react';
import { scholarships } from '@/data/scholarships';
import ScholarshipCard from '@/components/shared/ScholarshipCard';
import EligibilityChecker from '@/components/scholarships/EligibilityChecker';
import { Search, X, SlidersHorizontal, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_FILTERS = ['All', 'SC/ST', 'OBC', 'Girls', 'PwD', 'General/EWS', 'Merit-based', 'Maharashtra'];
const PROVIDER_FILTERS = ['All', 'Central Government', 'State Government', 'Private/PSU'];

function matchesCategory(scholarship: typeof scholarships[0], filter: string): boolean {
  if (filter === 'All') return true;
  const cats = scholarship.category.map(c => c.toLowerCase());
  switch (filter) {
    case 'SC/ST': return cats.some(c => c === 'sc' || c === 'st');
    case 'OBC': return cats.some(c => c.includes('obc') || c.includes('vjnt') || c.includes('nt') || c.includes('sbc'));
    case 'Girls': return cats.includes('girls');
    case 'PwD': return cats.some(c => c.includes('pwd') || c.includes('differently'));
    case 'General/EWS': return cats.some(c => c === 'general' || c === 'ews');
    case 'Merit-based': return cats.includes('merit-based');
    case 'Maharashtra': return cats.includes('maharashtra');
    default: return true;
  }
}

function matchesProvider(scholarship: typeof scholarships[0], filter: string): boolean {
  if (filter === 'All') return true;
  const p = scholarship.provider.toLowerCase();
  switch (filter) {
    case 'Central Government': return p.includes('government of india') || p.includes('ministry') || p.includes('aicte') || p.includes('dst');
    case 'State Government': return p.includes('maharashtra') && !p.includes('government of india');
    case 'Private/PSU': return !p.includes('government') && !p.includes('ministry') && !p.includes('aicte') && !p.includes('dst');
    default: return true;
  }
}

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [providerFilter, setProviderFilter] = useState('All');
  const [showChecker, setShowChecker] = useState(false);

  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch && matchesCategory(s, categoryFilter) && matchesProvider(s, providerFilter);
    });
  }, [searchTerm, categoryFilter, providerFilter]);

  return (
    <div className="min-h-screen bg-surface-white">
      {/* HEADER */}
      <div className="py-20 bg-surface-light border-b border-border px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label text-brand-amber mb-3 inline-block">
            Financial Aid Directory
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl mb-4">
            Scholarships for Engineering Students
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="body-lg max-w-2xl mx-auto mb-8">
            {scholarships.length} scholarships from government and private providers. Find what you're eligible for.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowChecker(true)}
            className="inline-flex items-center gap-2 bg-brand-amber text-white font-ui font-semibold px-6 py-3 rounded-xl hover:bg-[#b45309] transition-all shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            Check My Eligibility
          </motion.button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 space-y-3">
          <div className="flex gap-3 flex-col sm:flex-row items-center">
            {/* Search */}
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl border border-border bg-surface-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Provider filter */}
            <div className="flex gap-1.5 flex-wrap">
              {PROVIDER_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setProviderFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
                    providerFilter === f
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : 'bg-white border-border text-text-secondary hover:border-brand-blue/40'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORY_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setCategoryFilter(f)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  categoryFilter === f
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-surface-light border-border text-text-secondary hover:border-brand-blue/40'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[14px] text-text-muted">
            <span className="font-semibold text-text-primary">{filtered.length}</span> scholarships found
          </p>
          {(searchTerm || categoryFilter !== 'All' || providerFilter !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setProviderFilter('All'); }}
              className="text-[13px] text-brand-blue hover:underline font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, idx) => (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.2) }}
                >
                  <ScholarshipCard scholarship={s} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-surface-light rounded-2xl border border-dashed border-border">
              <p className="font-semibold text-text-primary">No scholarships match your criteria</p>
              <button onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setProviderFilter('All'); }} className="mt-3 text-brand-blue text-sm hover:underline">Clear filters</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ELIGIBILITY CHECKER MODAL */}
      <AnimatePresence>
        {showChecker && <EligibilityChecker onClose={() => setShowChecker(false)} />}
      </AnimatePresence>
    </div>
  );
}
