"use client";

import { Target, Map, Users, Shield, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function WhyCounselPro() {
  const reasons = [
    {
      icon: <Target className="w-6 h-6 text-brand-blue" />,
      title: "Rank-based Shortlisting",
      desc: "Your college list is built around your exact rank and category."
    },
    {
      icon: <Map className="w-6 h-6 text-brand-blue" />,
      title: "Round-by-Round Strategy",
      desc: "We guide you through every JoSAA / CAP round, not just the first."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-blue" />,
      title: "Parent-Inclusive Process",
      desc: "We communicate with parents too, so the family decides together."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-blue" />,
      title: "No Spam, No Pressure",
      desc: "We never push you toward a college. Your preference is final."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-blue" />,
      title: "Deep Counselling Knowledge",
      desc: "We know the system: candidatures, TFWS, NCL, and more."
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-blue" />,
      title: "Time-Sensitive Support",
      desc: "Counselling rounds move fast. We're available when it matters."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="heading-lg">Why students choose us</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 text-left"
        >
          {reasons.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col group">
              <div className="w-12 h-12 bg-surface-white border border-border shadow-sm rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="heading-sm mb-2 group-hover:text-brand-blue transition-colors">{item.title}</h3>
              <p className="body-md leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
