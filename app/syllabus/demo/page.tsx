"use client";

import { motion } from 'framer-motion';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { 
  BookOpen, 
  BrainCircuit, 
  Binary, 
  Lightbulb, 
  Microscope,
  Compass,
  Download,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SyllabusDemoPage() {
  const [selectedSubject, setSelectedSubject] = useState(0);

  const demoSubjects = [
    {
      name: "Engineering Mathematics",
      code: "FE101",
      credits: 4,
      icon: <Binary className="w-8 h-8" />,
      theme: "from-blue-600 to-indigo-600",
      overview: "The foundation of engineering logic. Focuses on Calculus, Matrices, and Differential Equations used in structural and algorithmic analysis.",
      modules: ["Multivariable Calculus", "Linear Algebra & Matrices", "Complex Numbers", "Differential Equations"],
      preRequisites: "Strong grasp of 12th Grade Derivatives & Integration.",
      outcome: "Ability to model physical systems into mathematical equations."
    },
    {
      name: "Engineering Mechanics",
      code: "FE102",
      credits: 4,
      icon: <BrainCircuit className="w-8 h-8" />,
      theme: "from-rose-600 to-orange-600",
      overview: "Study of forces on physical bodies at rest (Statics) and in motion (Dynamics). Fundamental for Civil and Mechanical branches.",
      modules: ["Equilibrium of Coplanar Forces", "Analysis of Trusses", "Friction & Centroids", "Kinematics & Kinetics of Particles"],
      preRequisites: "Basic Physics (Newton's Laws) and Geometry.",
      outcome: "Proficiency in calculating load distributions in real-world structures."
    },
    {
      name: "Basic Electrical",
      code: "FE103",
      credits: 3,
      icon: <Lightbulb className="w-8 h-8" />,
      theme: "from-amber-500 to-yellow-600",
      overview: "Introduction to the invisible logic of power. Covers AC/DC circuits, transformer principles, and electromagnetic induction.",
      modules: ["DC Circuit Analysis (KCL/KVL)", "AC Fundamentals (Phasors)", "Single Phase Transformers", "Electrical Machines Fundamentals"],
      preRequisites: "Knowledge of Ohms Law and basic magnetism.",
      outcome: "Designing and troubleshooting fundamental electrical circuits."
    },
    {
      name: "Engineering Graphics",
      code: "FE104",
      credits: 4,
      icon: <Compass className="w-8 h-8" />,
      theme: "from-teal-500 to-emerald-600",
      overview: "The language of engineers. Learn to communicate 3D machine parts and building layouts through 2D technical drawings.",
      modules: ["Projection of Points & Lines", "Orthographic Projections", "Isometric Drawings", "AutoCAD Fundamentals"],
      preRequisites: "Spatial visualization and geometric accuracy.",
      outcome: "Reading and creating industrial standard blueprints."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* GLOSSY HEADER */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Syllabus Hub', href: '/syllabus' },
              { label: 'Curriculum Demo', href: '/syllabus/demo' }
            ]} 
          />
          
          <div className="mt-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-1 rounded-full text-[12px] font-bold bg-brand-blue/10 text-brand-blue uppercase tracking-widest border border-brand-blue/10 mb-4 inline-block"
            >
              Academic Preview
            </motion.span>
            <h1 className="heading-xl mb-4 italic">First Year Engineering <span className="text-brand-blue not-italic font-bold">Demo.</span></h1>
            <p className="body-lg text-text-secondary max-w-2xl">
              Engineering isn't just about formulas; it's about solving the world's most complex challenges. 
              Explore the core modules that form the DNA of a world-class engineer.
            </p>
          </div>
        </div>
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 rounded-bl-[200px] pointer-events-none"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* NAVIGATION RAIL */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <h3 className="text-[12px] font-black uppercase text-text-muted tracking-widest mb-6">Subject Rail</h3>
            <div className="space-y-3">
              {demoSubjects.map((sub, idx) => (
                <button
                  key={sub.code}
                  onClick={() => setSelectedSubject(idx)}
                  className={`w-full text-left p-5 rounded-3xl transition-all flex items-center gap-5 border ${
                    selectedSubject === idx 
                    ? 'bg-white border-brand-blue shadow-lg scale-[1.02]' 
                    : 'bg-surface-light border-transparent hover:border-border text-text-secondary'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${sub.theme} text-white shadow-md`}>
                    {sub.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold opacity-60 block uppercase">{sub.code}</span>
                    <span className={`text-[16px] font-bold ${selectedSubject === idx ? 'text-brand-navy' : 'text-text-primary'}`}>
                      {sub.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-brand-navy rounded-[32px] text-white overflow-hidden relative">
               <h4 className="font-bold mb-2">Want the full university PDF?</h4>
               <p className="text-[13px] text-white/70 mb-6">Connect with our team to get the specific Mumbai or Pune University syllabus bank.</p>
               <Link href="/contact" className="w-full btn-primary bg-white text-brand-blue text-[13px] py-3 flex items-center justify-center gap-2 hover:bg-white/90">
                 Request Syllabus <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </div>

          {/* MAIN DATA VIEW */}
          <div className="lg:col-span-8">
            <motion.div
              key={selectedSubject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-border rounded-[40px] p-8 md:p-12 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-border">
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${demoSubjects[selectedSubject].theme} flex items-center justify-center text-white shadow-xl`}>
                    {demoSubjects[selectedSubject].icon}
                  </div>
                  <div>
                    <h2 className="heading-lg mb-1">{demoSubjects[selectedSubject].name}</h2>
                    <div className="flex gap-4">
                      <span className="text-[14px] font-bold text-text-muted">{demoSubjects[selectedSubject].code}</span>
                      <span className="text-[14px] font-bold text-brand-blue border-l border-border pl-4">{demoSubjects[selectedSubject].credits} Credits</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[14px] font-bold text-brand-blue px-6 py-3 bg-brand-blue/5 rounded-2xl hover:bg-brand-blue/10 transition-all">
                  <Download className="w-4 h-4" />
                  Learning Path
                </button>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[12px] font-black uppercase text-brand-blue tracking-[0.2em] mb-4">Academic Narrative</h3>
                  <p className="body-lg text-text-secondary leading-relaxed">
                    {demoSubjects[selectedSubject].overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-[12px] font-black uppercase text-brand-blue tracking-[0.2em] mb-4">Core Knowledge Units</h3>
                    <ul className="space-y-4">
                      {demoSubjects[selectedSubject].modules.map(mod => (
                        <li key={mod} className="flex items-center gap-3 text-[15px] font-bold text-text-primary">
                          <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-surface-light rounded-[32px] border border-border">
                    <h4 className="text-[12px] font-black uppercase text-text-muted tracking-widest mb-4">Preparation Anchor</h4>
                    <p className="text-[14px] font-medium text-text-secondary leading-relaxed mb-6">
                      {demoSubjects[selectedSubject].preRequisites}
                    </p>
                    <div className="pt-6 border-t border-border/50">
                      <h4 className="text-[12px] font-black uppercase text-text-muted tracking-widest mb-4">Learning Outcome</h4>
                      <p className="text-[14px] font-bold text-brand-navy">
                        {demoSubjects[selectedSubject].outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADVANCED MODULES BLOCKED ACCENT */}
                <div className="p-10 bg-brand-navy rounded-[36px] text-white relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex-1">
                        <Lock className="w-8 h-8 text-brand-teal mb-4" />
                        <h4 className="heading-sm text-white mb-2">Second Year Deep-Dive Available</h4>
                        <p className="text-[14px] text-white opacity-70">
                          Branch-specific subjects like Data Structures or Machine Design are available for our registered students.
                        </p>
                     </div>
                     <Link href="/apply" className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-2xl hover:scale-105 transition-all">
                        Unlock Advanced Syllabus
                     </Link>
                   </div>
                   {/* Glow */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
