"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ClipboardCheck, Compass } from 'lucide-react';

const STEPS = [
  { icon: ClipboardCheck, title: 'Take a free mock', desc: 'JEE Main, JEE Advanced, NEET and MHT-CET in a real exam-style interface. No sign-up needed.' },
  { icon: BarChart3, title: 'See your score and rank estimate', desc: 'Instant score, percentile estimate, weak chapters and where you lost marks.' },
  { icon: Compass, title: 'Plan your counselling', desc: 'Turn your result into a smart college and branch preference list with our counsellors.' },
];

export default function MockTestHook() {
  return (
    <section className="py-16 md:py-24 bg-surface-light border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-brand-teal mb-3">Free mock tests</span>
          <h2 className="heading-lg mb-4">Know where you stand before counselling starts</h2>
          <p className="body-lg mb-8">Practise with exam-style mock tests and quick chapter quizzes, then use your result to plan the right college choices.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/tests" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-brand-blue text-white font-ui font-semibold hover:bg-[#1648c0] transition-all shadow-md shadow-brand-blue/10">
              Take a free mock test <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/practice" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white border border-border text-text-primary font-ui font-semibold hover:bg-white/60 transition-all">
              Practise by chapter
            </Link>
          </div>
        </motion.div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 bg-white border border-border rounded-2xl p-5 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="heading-sm mb-1">{s.title}</p>
                <p className="body-sm text-text-secondary">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
