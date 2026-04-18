"use client";

import Link from 'next/link';
import { GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CounsellingTypes() {
  return (
    <section className="py-16 md:py-24 bg-surface-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg">Which counselling do you need?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* JoSAA Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-surface-white border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:shadow-2xl transition-all duration-300 border-l-4 border-brand-blue flex flex-col h-full group"
          >
            <div className="mb-6 flex items-start justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-ui font-medium bg-blue-50 text-blue-700">
                JoSAA Counselling
              </span>
              <GraduationCap className="w-8 h-8 text-brand-blue group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="heading-md mb-3 group-hover:text-brand-blue transition-colors">Joint Seat Allocation Authority</h3>
            <p className="body-md mb-6 text-text-secondary">
              For JEE Main and JEE Advanced qualifiers seeking admission to IITs, NITs, IIITs, and GFTIs across India.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /><span className="text-[15px] font-ui text-text-secondary">IIT / NIT / IIIT / GFTI colleges</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /><span className="text-[15px] font-ui text-text-secondary">All-India seat allocation</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /><span className="text-[15px] font-ui text-text-secondary">JEE Main / Advanced based</span></li>
            </ul>
            <Link href="/apply" className="text-brand-blue font-ui font-medium text-[15px] inline-flex items-center gap-1 hover:gap-2 transition-all duration-150">
              Apply for JoSAA <span className="text-xl leading-none">&rarr;</span>
            </Link>
          </motion.div>

          {/* MHT CET Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-surface-white border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:shadow-2xl transition-all duration-300 border-l-4 border-brand-teal flex flex-col h-full group"
          >
            <div className="mb-6 flex items-start justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-ui font-medium bg-teal-50 text-teal-700">
                MHT CET Counselling
              </span>
              <BookOpen className="w-8 h-8 text-brand-teal group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="heading-md mb-3 group-hover:text-brand-teal transition-colors">Maharashtra Common Entrance Test</h3>
            <p className="body-md mb-6 text-text-secondary">
              For MHT CET qualifiers seeking admission to engineering colleges in Maharashtra through the CAP process.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-teal" /><span className="text-[15px] font-ui text-text-secondary">Maharashtra state colleges</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-teal" /><span className="text-[15px] font-ui text-text-secondary">Home University / OTH candidature</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-teal" /><span className="text-[15px] font-ui text-text-secondary">CAP rounds by DTE</span></li>
            </ul>
            <Link href="/apply" className="text-brand-blue font-ui font-medium text-[15px] inline-flex items-center gap-1 hover:gap-2 transition-all duration-150">
              Apply for MHT CET <span className="text-xl leading-none">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
