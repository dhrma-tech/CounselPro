"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Award } from 'lucide-react';
import { scholarships } from '@/data/scholarships';
import Link from 'next/link';

interface Answers {
  category: string;
  gender: string;
  income: string;
  state: string;
  disability: string;
  institution: string;
}

export default function EligibilityChecker({ onClose }: { onClose: () => void }) {
  const [answers, setAnswers] = useState<Answers>({
    category: '', gender: '', income: '', state: '', disability: 'No', institution: '',
  });
  const [results, setResults] = useState<typeof scholarships | null>(null);

  const check = () => {
    const matched = scholarships.filter(s => {
      const cats = s.category.map(c => c.toLowerCase());
      
      // Category match
      if (answers.category === 'SC' && !cats.some(c => c === 'sc' || c === 'st')) return false;
      if (answers.category === 'ST' && !cats.some(c => c === 'sc' || c === 'st')) return false;
      if (answers.category === 'OBC' && !cats.some(c => c.includes('obc') || c.includes('all') || c.includes('merit'))) return false;
      
      // Gender
      if (answers.gender === 'Male' && cats.includes('girls')) return false;

      // Income filter
      const incomeNum = parseInt(answers.income) || 0;
      if (incomeNum > 800000 && !cats.includes('merit-based')) {
        // Most need-based scholarships require income < 8L
        const requiresLowIncome = s.eligibility.some(e => e.toLowerCase().includes('income') && e.includes('8'));
        if (requiresLowIncome) return false;
      }

      // Disability
      if (answers.disability === 'No' && cats.some(c => c.includes('pwd') || c.includes('differently'))) {
        return false;
      }

      return true;
    });
    setResults(matched);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-brand-amber" />
            <h2 className="font-ui font-bold text-[18px] text-text-primary">Eligibility Checker</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-light text-text-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!results ? (
            <>
              <p className="body-sm text-text-secondary">Answer a few quick questions to find scholarships you may be eligible for.</p>

              {/* Category */}
              <div>
                <label className="label mb-2 block">Your Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {['General', 'OBC', 'SC', 'ST', 'EWS', 'PwD'].map(c => (
                    <button
                      key={c}
                      onClick={() => setAnswers(a => ({ ...a, category: c }))}
                      className={`py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                        answers.category === c ? 'bg-brand-blue text-white border-brand-blue' : 'border-border text-text-secondary hover:border-brand-blue/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="label mb-2 block">Gender</label>
                <div className="flex gap-2">
                  {['Male', 'Female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setAnswers(a => ({ ...a, gender: g }))}
                      className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold border transition-all ${
                        answers.gender === g ? 'bg-brand-blue text-white border-brand-blue' : 'border-border text-text-secondary'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Annual Family Income */}
              <div>
                <label className="label mb-2 block">Annual Family Income (₹)</label>
                <select
                  value={answers.income}
                  onChange={e => setAnswers(a => ({ ...a, income: e.target.value }))}
                  className="w-full h-11 px-3 border border-border rounded-xl text-[14px] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                >
                  <option value="">Select income range</option>
                  <option value="150000">Below ₹1.5 Lakhs</option>
                  <option value="250000">₹1.5L – ₹2.5 Lakhs</option>
                  <option value="500000">₹2.5L – ₹5 Lakhs</option>
                  <option value="800000">₹5L – ₹8 Lakhs</option>
                  <option value="1500000">Above ₹8 Lakhs</option>
                </select>
              </div>

              {/* Disability */}
              <div>
                <label className="label mb-2 block">Do you have a disability certificate?</label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map(d => (
                    <button
                      key={d}
                      onClick={() => setAnswers(a => ({ ...a, disability: d }))}
                      className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold border transition-all ${
                        answers.disability === d ? 'bg-brand-blue text-white border-brand-blue' : 'border-border text-text-secondary'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={check}
                disabled={!answers.category || !answers.gender || !answers.income}
                className="w-full bg-brand-amber text-white font-semibold py-3 rounded-xl hover:bg-[#b45309] disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-2"
              >
                Find Matching Scholarships →
              </button>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-brand-amber" />
                <p className="font-semibold text-text-primary">
                  {results.length} scholarships you may be eligible for
                </p>
              </div>
              <div className="space-y-3">
                {results.map(s => (
                  <div key={s.slug} className="border border-border rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-[14px] text-text-primary">{s.name}</p>
                      <p className="text-[12px] text-text-muted">{s.provider}</p>
                      <p className="text-brand-amber font-bold text-[13px] mt-1">{s.amount}</p>
                    </div>
                    <Link href={`/scholarships/${s.slug}`} className="text-brand-blue text-[12px] hover:underline shrink-0">
                      View →
                    </Link>
                  </div>
                ))}
                {results.length === 0 && (
                  <p className="text-text-muted text-center py-8 text-[14px]">No exact matches. Consider applying for Merit-based scholarships or contact us for guidance.</p>
                )}
              </div>
              <button onClick={() => setResults(null)} className="mt-6 text-brand-blue text-sm hover:underline">← Try again</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
