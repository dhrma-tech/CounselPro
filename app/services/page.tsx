"use client";

import { motion } from 'framer-motion';
import { Target, Search, FileCheck, PhoneCall, PieChart, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import PageCTA from '@/components/shared/PageCTA';

export default function ServicesPage() {
  const serviceItems = [
    {
      icon: <Target className="w-8 h-8 text-brand-blue" />,
      title: "Personalized Choice Filling",
      desc: "Our core service. We build a strictly ordered list of 100+ colleges based on your rank, branch preference, and institutional quality to ensure you never miss a betterment opportunity."
    },
    {
      icon: <FileCheck className="w-8 h-8 text-brand-blue" />,
      title: "Document Scrutiny",
      desc: "Avoid rejection at the ARC/FC level. We verify your category certificates (NCL, EWS, Caste), Domicile, and Marksheets before you upload them to the portal."
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-brand-blue" />,
      title: "Round-by-Round Calls",
      desc: "After every allotment, we jump on a call. We analyze your result and tell you exactly whether to Freeze, Float, or Slide based on the vacancy data of the next round."
    },
    {
      icon: <PieChart className="w-8 h-8 text-brand-blue" />,
      title: "Merit Analytics",
      desc: "We use data from the last 5 years of JoSAA/CAP rounds to predict cut-off shifts, ensuring we include 'Ambitious' colleges that others might tell you to ignore."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-blue" />,
      title: "Candidature Expert",
      desc: "Specialized help for Maharashtra State Candidature (Type A-E), Home University vs OTH University allocation, and TFWS/Minority quota claims."
    },
    {
      icon: <Search className="w-8 h-8 text-brand-blue" />,
      title: "Institutional Research",
      desc: "Beyond just rank, we help you understand the ground reality: campus life, placement cell efficiency, and faculty reputation of your target colleges."
    }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="label bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full mb-6 inline-block tracking-widest font-bold">What we do</span>
          <h1 className="heading-xl mb-6">Expert Counselling Services</h1>
          <p className="body-lg max-w-2xl mx-auto">
            We don't just fill forms. We engineer your admission journey with data, 
            strategy, and personalized support until you are on campus.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {serviceItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group p-8 rounded-3xl hover:bg-surface-light transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="heading-sm mb-3 group-hover:text-brand-blue transition-colors">{item.title}</h3>
              <p className="body-md text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The Process */}
        <div className="mt-32 pt-20 border-t border-border">
          <SectionHeading 
            centered 
            title="Our Mentorship Timeline" 
            subtitle="Counselling is a marathon, not a sprint. We stay with you through the entire season."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mt-16">
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-border -z-10"></div>
            
            {[
              { title: "Pre-Counselling", date: "Rank Analysis", desc: "Understanding your options post-results." },
              { title: "Registration", date: "Portal Mastery", desc: "Correct category selection and verification." },
              { title: "Option Form", date: "Strategic Choice", desc: "Building the perfect preference list." },
              { title: "Reporting", date: "Seat Locking", desc: "Transitioning from aspirant to college student." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white border-4 border-brand-blue rounded-full mx-auto flex items-center justify-center font-display text-lg text-brand-navy mb-4 z-10 relative shadow-sm">
                  {i + 1}
                </div>
                <h4 className="font-ui font-bold text-text-primary mb-1">{step.title}</h4>
                <div className="text-[12px] uppercase tracking-tighter text-brand-blue font-bold mb-2">{step.date}</div>
                <p className="text-sm text-text-secondary px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageCTA title="Ready for a stress-free admission?" ctaText="Apply for Expert Mentorship" />
    </div>
  );
}
