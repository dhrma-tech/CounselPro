"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ items }: { items: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-surface-white border border-border rounded-xl overflow-hidden shadow-sm">
      {items.map((item, i) => (
        <div key={i} className="border-b border-border last:border-0">
          <button
            className="w-full flex items-center justify-between text-left p-5 hover:bg-surface-light/50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-ui font-semibold text-[15px] text-text-primary pr-8">{item.q}</span>
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
                <div className="p-5 pt-0 text-text-secondary text-[15px] leading-relaxed">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
