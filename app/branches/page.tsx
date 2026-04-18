"use client";

import { useState } from 'react';
import { branches } from '@/data/branches';
import BranchCard from '@/components/shared/BranchCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function BranchesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const domains = ['All', 'CS & IT', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'Electrical'];

  const filteredBranches = branches.filter(b => activeFilter === 'All' || b.domain === activeFilter);

  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-xl mb-4"
        >
          Engineering Branches Explained
        </motion.h1>
        <p className="body-lg max-w-2xl mx-auto">
          Understand the scope, core subjects, and career paths for every major branch.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-12 justify-center scroll-smooth">
          {domains.map((d, idx) => (
            <motion.button 
              key={d}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveFilter(d)}
              className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-300 border
                ${activeFilter === d ? 'bg-brand-navy text-white border-brand-navy shadow-lg' : 'bg-surface-white text-text-secondary hover:border-brand-blue/30'}`}
            >
              {d}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredBranches.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBranches.map((branch, idx) => (
                <motion.div
                  key={branch.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <BranchCard branch={branch} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-text-muted">
              <p className="text-lg">No branches found for this domain.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
