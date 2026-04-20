"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-[var(--header-height,80px)]">
      {/* Radial gradient background — subtle, centered */}
      <div
        className="absolute inset-x-0 top-0 h-screen pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 10%, rgba(26,86,219,0.07) 0%, transparent 65%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-xl mb-6"
        >
          Your college journey,{' '}
          <br className="hidden sm:block" />
          <span
            className="font-display"
            style={{
              background: 'linear-gradient(135deg, #1A56DB 0%, #0694A2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            guided at every step.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[17px] sm:text-[18px] md:text-[20px] font-ui leading-[1.65] text-text-secondary max-w-lg mx-auto mb-10"
        >
          Expert Engineering, Medical and more counselling — from choice-filling to seat confirmation. We guide 10,000+ students every year.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-ui font-bold text-[16px] px-8 py-4 rounded-xl hover:bg-[#1648c0] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-[0_2px_12px_rgba(26,86,219,0.3)]"
          >
            Start Counselling <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/colleges"
            className="inline-flex items-center justify-center bg-white text-text-primary border border-border font-ui font-semibold text-[16px] px-8 py-4 rounded-xl hover:border-brand-blue/40 hover:bg-surface-light transition-all duration-200 shadow-sm"
          >
            Explore Colleges
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[13px] sm:text-[14px] text-text-muted"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['A', 'B', 'M', 'R'].map((letter, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-blue/10 text-brand-blue flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {letter}
                </div>
              ))}
            </div>
            <span><strong className="text-text-primary">10,000+</strong> students guided</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span><strong className="text-text-primary">98%</strong> satisfaction rate</span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span><strong className="text-text-primary">4+ Yrs</strong> of experience</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-[11px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
