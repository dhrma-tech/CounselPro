"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/data/faqs';

export default function FAQStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const topFaqs = faqs.slice(0, 5);

  return (
    <section className="py-16 md:py-24 bg-surface-light">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="heading-lg">Frequently asked questions</h2>
        </div>

        <div className="bg-surface-white border border-border rounded-2xl overflow-hidden shadow-sm">
          {topFaqs.map((faq, i) => (
            <div key={i} className="border-b border-border last:border-0">
              <button
                className="w-full flex items-center justify-between text-left p-6 hover:bg-surface-light/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-ui font-semibold text-[16px] text-text-primary pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-secondary body-md">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/faq" className="text-brand-blue font-ui font-medium text-[15px] inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all FAQs &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
