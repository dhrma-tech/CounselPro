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

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {COUNSELLING_DATA.slice(0, 3).map((item, idx) => (
            <CounselCard key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Row 2 — 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {COUNSELLING_DATA.slice(3).map((item, idx) => (
            <CounselCard key={item.id} item={item} idx={idx + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounselCard({ item, idx }: { item: typeof COUNSELLING_DATA[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className={`bg-surface-white border border-border rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 ${item.color} flex flex-col h-full group`}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-ui font-medium ${item.badgeBg} ${item.badgeText}`}>
          {item.category}
        </span>
        <item.icon className={`w-6 h-6 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <h3 className="heading-sm mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">{item.title}</h3>
      <p className="text-[14px] leading-relaxed mb-4 text-text-secondary line-clamp-2">
        {item.description}
      </p>
      <ul className="space-y-2 mb-6 flex-1">
        {item.points.map((point, pIdx) => (
          <li key={pIdx} className="flex items-center gap-2">
            <CheckCircle className={`w-3.5 h-3.5 ${item.iconColor}`} />
            <span className="text-[13px] font-ui text-text-secondary">{point}</span>
          </li>
        ))}
      </ul>
      <Link href={item.link} className="text-brand-blue font-ui font-medium text-[14px] inline-flex items-center gap-1 hover:gap-2 transition-all duration-150 mt-auto">
        Explore Support <span className="text-lg leading-none">&rarr;</span>
      </Link>
    </motion.div>
  );
}


const COUNSELLING_DATA = [
  {
    id: 'josaa',
    title: 'JoSAA Counselling',
    category: 'Engineering (IIT/NIT)',
    description: 'Joint Seat Allocation for IITs, NITs, IIITs, and GFTIs across India.',
    points: ['JEE Main/Advanced based', 'IITs & NITs coverage', 'Round-wise allocation'],
    link: '/counselling/josaa',
    icon: GraduationCap,
    color: 'border-brand-blue',
    iconColor: 'text-brand-blue',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700'
  },
  {
    id: 'csab',
    title: 'CSAB Special Rounds',
    category: 'Engineering (NIT+)',
    description: 'Spot rounds for vacant seats in NITs, IIITs, and GFTIs after JoSAA.',
    points: ['Final opportunity', 'Vacant seat focus', 'Strategic choice filling'],
    link: '/counselling/csab',
    icon: GraduationCap,
    color: 'border-brand-blue',
    iconColor: 'text-brand-blue',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700'
  },
  {
    id: 'mht-cet-eng',
    title: 'MHT-CET Engineering',
    category: 'Engineering (Maharashtra)',
    description: 'Maharashtra CAP rounds for admissions to top state engineering colleges.',
    points: ['MHT-CET based', 'Top MH colleges', 'DTE CAP rounds'],
    link: '/counselling/mht-cet',
    icon: BookOpen,
    color: 'border-brand-teal',
    iconColor: 'text-brand-teal',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700'
  },
  {
    id: 'mcc-all-india',
    title: 'MCC All India Quota',
    category: 'Medical (National)',
    description: 'MBBS/BDS admissions in 15% AIQ, Central and Deemed Universities.',
    points: ['NEET UG based', 'Central/Deemed Universities', '15% All India Quota'],
    link: '/counselling/mcc-all-india',
    icon: GraduationCap,
    color: 'border-brand-violet',
    iconColor: 'text-brand-violet',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700'
  },
  {
    id: 'mht-state-neet',
    title: 'MHT State NEET',
    category: 'Medical (Maharashtra)',
    description: 'Maharashtra state level admissions for 85% seats in medical colleges.',
    points: ['85% State Quota', 'MBBS/BDS/BAMS', 'State Merit List'],
    link: '/counselling/mht-state-neet',
    icon: BookOpen,
    color: 'border-brand-teal',
    iconColor: 'text-brand-teal',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700'
  },
  {
    id: 'mht-cet-nursing',
    title: 'MHT-CET Nursing',
    category: 'Medical (Nursing)',
    description: 'Specialized counselling for B.Sc Nursing admissions in Maharashtra.',
    points: ['B.Sc Nursing focus', 'State-wide colleges', 'Merit-based selection'],
    link: '/counselling/nursing',
    icon: BookOpen,
    color: 'border-brand-teal',
    iconColor: 'text-brand-teal',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700'
  },
  {
    id: 'mht-cet-agri',
    title: 'MHT-CET Agriculture',
    category: 'Agriculture',
    description: 'Admission to agricultural universities in Maharashtra for diverse courses.',
    points: ['Agriculture focus', 'Diverse agri-courses', 'CET/JEE/NEET base'],
    link: '/counselling/agri',
    icon: BookOpen,
    color: 'border-brand-teal',
    iconColor: 'text-brand-teal',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700'
  }
];
