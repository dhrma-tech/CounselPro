"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

export default function CounsellingHubPage() {
  const counsellingTypes = [
    {
      id: 'josaa',
      title: 'JoSAA Counselling',
      subtitle: 'JEE Main & Advanced',
      icon: <GraduationCap className="w-8 h-8 text-brand-blue" />,
      desc: 'Admissions to IITs, NITs, IIITs and GFTIs across India.',
      features: ['23 IITs & 31 NITs', '6 Centralized Rounds', 'Multi-state allocation'],
      color: 'border-brand-blue',
      bgColor: 'bg-blue-50/50'
    },
    {
      id: 'mht-cet',
      title: 'MHT CET Counselling',
      subtitle: 'State CET Cell, Maharashtra',
      icon: <BookOpen className="w-8 h-8 text-brand-teal" />,
      desc: 'Admissions to Government and Private engineering colleges in Maharashtra.',
      features: ['CAP Round Management', 'Candidature (Type A-E) Help', 'TFWS & Minority seats'],
      color: 'border-brand-teal',
      bgColor: 'bg-teal-50/50'
    }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="label bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full mb-6 inline-block">Counselling Hub</span>
          <h1 className="heading-xl mb-6">Choose Your Admission Path</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Whether you are aiming for National Institutes or state-level powerhouses, 
            we provide the strategic guidance you need to secure your seat.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {counsellingTypes.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative bg-white border ${type.color} border-l-8 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${type.bgColor} -mr-10 -mt-10 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-surface-light rounded-2xl flex items-center justify-center mb-8 border border-border group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                
                <div className="mb-8">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">{type.subtitle}</div>
                  <h2 className="heading-lg text-brand-navy mb-4">{type.title}</h2>
                  <p className="body-md text-text-secondary">{type.desc}</p>
                </div>

                <div className="space-y-4 mb-10">
                  {type.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-text-primary font-ui font-medium">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${type.id === 'josaa' ? 'text-brand-blue' : 'text-brand-teal'}`} />
                      {f}
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/counselling/${type.id}`} 
                  className={`inline-flex items-center gap-2 font-ui font-bold text-[16px] px-8 py-4 rounded-xl text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1 ${type.id === 'josaa' ? 'bg-brand-blue' : 'bg-brand-teal'}`}
                >
                  Explore {type.title.split(' ')[0]} Guide
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-24 text-center">
            <SectionHeading 
                centered 
                title="Not sure which one applies to you?" 
                subtitle="Most students appear for both. Our holistic guidance covers overlapping schedules to ensure you don't lose a seat in both systems."
            />
            <Link href="/contact" className="text-brand-blue font-ui font-bold text-[17px] hover:underline decoration-2 underline-offset-4">
                Talk to an Expert Selection Strategist &rarr;
            </Link>
        </section>
      </div>
    </div>
  );
}
