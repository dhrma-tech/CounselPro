"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-white flex items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-[120px] md:text-[180px] leading-none text-brand-blue/10">404</h1>
          <div className="-mt-12 md:-mt-20">
            <h2 className="heading-xl mb-6">Lost in the round?</h2>
            <p className="body-lg text-text-secondary mb-10">
              The page you are looking for doesn't exist. Maybe it was withdrawn in Round 2, 
              or the URL was never valid to begin with.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-xl font-ui font-bold text-[16px] shadow-lg hover:bg-brand-blue transition-all"
              >
                <Home className="w-5 h-5" />
                Return Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 bg-surface-light text-text-primary px-8 py-4 rounded-xl font-ui font-bold text-[16px] border border-border hover:bg-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="mt-20 flex justify-center items-center gap-12 opacity-30">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent"></div>
            <div className="font-display text-text-muted">CounselPro</div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-teal to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
