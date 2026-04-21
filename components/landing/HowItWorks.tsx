"use client";

import { FileText, Users, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      icon: <FileText className="w-6 h-6 text-brand-blue" />,
      title: "Apply",
      desc: "Fill out our quick application. Tell us your exam, rank, category, and preferences."
    },
    {
      num: "2",
      icon: <Users className="w-6 h-6 text-brand-blue" />,
      title: "Get Guided",
      desc: "Our counsellors review your profile and build a shortlist of Ambitious, Target, Safe, and Backup colleges."
    },
    {
      num: "3",
      icon: <CheckCircle className="w-6 h-6 text-brand-blue" />,
      title: "Choose Confidently",
      desc: "Make round-by-round decisions with expert support by your side."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">How CounselPro Works</h2>
          <p className="body-lg max-w-2xl mx-auto">Three clear steps from confusion to confirmation.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left pt-6"
        >
          <div className="hidden md:block absolute top-[45px] left-[16%] right-[16%] border-t-2 border-dashed border-brand-blue/20 z-0"></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="relative z-10 flex flex-col items-center md:items-start group"
            >
              <div className="absolute -top-10 -left-6 md:-left-8 font-display text-[72px] text-brand-blue/10 leading-none pointer-events-none transition-transform group-hover:-translate-y-2">
                {step.num}
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center mb-6 relative hover:shadow-md transition-shadow">
                {step.icon}
              </div>
              <h3 className="heading-sm mb-3">{step.title}</h3>
              <p className="body-md md:pr-4">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
