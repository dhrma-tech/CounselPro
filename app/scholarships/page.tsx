"use client";

import { useState } from 'react';
import { scholarships } from '@/data/scholarships';
import ScholarshipCard from '@/components/shared/ScholarshipCard';

export default function ScholarshipsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Government', 'Private', 'Merit-based', 'Category-based'];

  // Simplistic filter for demo purposes. 
  // In a real app we'd map these to the actual `scholarship.category` strings correctly.
  const filteredScholarships = scholarships; 

  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <h1 className="heading-xl mb-4">Scholarships for Engineering Students</h1>
        <p className="body-lg max-w-2xl mx-auto">
          Explore financial aid options to fund your engineering education.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-4 py-2 rounded-full text-[15px] font-medium transition-colors border border-border
                ${activeFilter === c ? 'bg-brand-navy text-white border-brand-navy' : 'bg-surface-light text-text-secondary hover:bg-border/50'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map(scholarship => (
              <ScholarshipCard key={scholarship.slug} scholarship={scholarship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-text-muted">
            <p className="text-lg">No scholarships found.</p>
          </div>
        )}
      </div>
    </>
  );
}
