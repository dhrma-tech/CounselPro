"use client";

import Link from 'next/link';
import { Building2, BookOpen, Award } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 1.02, 0.73, 1] } 
  }
};

import { scholarships } from '@/data/scholarships';

export default function ResourcePreview() {
  const resources = [
    {
      icon: Building2, color: 'text-brand-blue', bg: 'bg-blue-50',
      title: "Colleges", desc: "500+ colleges with branch-wise cutoffs, fees, and placement data.",
      link: "/colleges", linkText: "Browse Colleges"
    },
    {
      icon: BookOpen, color: 'text-brand-teal', bg: 'bg-teal-50',
      title: "Branches", desc: "Understand each engineering branch — scope, careers, and top colleges offering it.",
      link: "/branches", linkText: "Explore Branches"
    },
    {
      icon: Award, color: 'text-brand-violet', bg: 'bg-violet-50',
      title: "Scholarships", count: `${scholarships.length} scholarships`,
      desc: "Government and private scholarships you may be eligible for.",
      link: "/scholarships", linkText: "Find Scholarships"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Explore our student resources</h2>
          <p className="body-lg max-w-2xl mx-auto">Useful information to make better decisions.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {resources.map((res, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-surface-white border border-border rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              <div className={`w-12 h-12 ${res.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <res.icon className={`w-6 h-6 ${res.color}`} />
              </div>
              <h3 className="heading-sm mb-1 group-hover:text-brand-blue transition-colors">{res.title}</h3>
              {res.count && <p className="text-[12px] font-bold text-brand-violet mb-2 uppercase tracking-tight">{res.count}</p>}
              <p className="body-md flex-1 mb-6 text-text-secondary">{res.desc}</p>
              <Link href={res.link} className="text-brand-blue font-ui font-medium text-[15px] inline-flex items-center gap-1 hover:gap-2 transition-all">
                {res.linkText} &rarr;
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
