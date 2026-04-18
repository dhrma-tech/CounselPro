"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-surface-white">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 -z-10 rounded-bl-[200px] hidden md:block"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
            <span className="text-brand-blue font-ui font-semibold text-[13px] uppercase tracking-wider">Admissions Open 2024-25</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-xl mb-6">
            Your Dream College is <br />
            <span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal font-display">Within Reach.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="body-lg mb-10 max-w-2xl text-text-secondary">
            Expert JoSAA and MHT CET counselling to help you navigate rounds, build your shortlist, and secure the best engineering seat for your rank.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/apply" 
              className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-bold text-[16px] px-8 py-4 rounded-xl hover:bg-[#1648c0] hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              Start Free Counselling &rarr;
            </Link>
            <Link 
              href="/colleges" 
              className="inline-flex items-center justify-center bg-white text-text-primary border-2 border-border font-ui font-bold text-[16px] px-8 py-4 rounded-xl hover:border-brand-blue/30 hover:bg-surface-light transition-all duration-300 shadow-sm"
            >
              Explore Colleges
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface-light flex items-center justify-center overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-[10px] font-bold">ST</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-text-secondary">
              <span className="font-bold text-text-primary">2,000+</span> students guided this year
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
