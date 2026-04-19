"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { CONTACT_CONFIG } from '@/config/contact';
import { CheckCircle2, MessageSquare, Users, Mail, Download, ArrowRight, LayoutDashboard, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export const Stage4_Contact = () => {
  const { submissionId, resetForm } = useApplicationStore();

  const ContactCard = ({ icon: Icon, color, label, value, action, link }: any) => (
    <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[12px] text-text-muted font-bold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-[16px] text-text-primary font-semibold">{value}</p>
      </div>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full h-10 flex items-center justify-center gap-2 bg-surface-light hover:bg-border transition-colors rounded-lg text-[13px] font-bold text-text-primary mt-2"
      >
        {action}
      </a>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="font-display text-4xl text-text-primary mb-4">You&apos;re in! We&apos;ll be in touch.</h1>
        <p className="text-text-secondary body-md max-w-lg mx-auto">
          Your application has been received. Our counselling team reviews every profile personally. Expect to hear from us within 24–48 hours.
        </p>
        
        <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-surface-light rounded-2xl font-mono text-sm text-text-primary border border-border">
          <span className="text-text-muted text-[11px] font-bold uppercase tracking-tighter">Reference ID</span>
          <span className="font-bold tracking-tight">{submissionId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <ContactCard 
          icon={MessageSquare} 
          color="bg-green-500/10 text-green-600" 
          label="WhatsApp"
          value={CONTACT_CONFIG.phone}
          action="Message Us"
          link={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=Hi, my reference ID is ${submissionId}`}
        />
        <ContactCard 
          icon={Users} 
          color="bg-brand-blue/10 text-brand-blue" 
          label="Community"
          value="Student Group"
          action="Join Group"
          link={CONTACT_CONFIG.whatsappGroupLink}
        />
        <ContactCard 
          icon={Mail} 
          color="bg-orange-500/10 text-orange-600" 
          label="Email Support"
          value="Admission Help"
          action="Send Email"
          link={`mailto:${CONTACT_CONFIG.email}?subject=Application Support: ${submissionId}`}
        />
      </div>

      <div className="bg-surface-light rounded-3xl p-10 border border-border/50">
        <h3 className="font-ui font-bold text-[18px] text-text-primary mb-8 text-center">What happens next?</h3>
        <div className="space-y-8 relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-border" />
          
          {[
            { title: 'Application Received', status: 'completed', desc: 'Securely stored in our system.' },
            { title: 'Profile Review', status: 'pending', desc: 'A senior counsellor scans your rank and preferences.' },
            { title: 'Counsellor Assigned', status: 'pending', desc: 'You get a dedicated guide for choice filling.' },
            { title: 'College List Finalized', status: 'pending', desc: 'Strategic preference list sent to your WhatsApp.' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === 'completed' ? 'bg-green-500 text-white' : 'bg-white border-2 border-border text-text-muted'}`}>
                {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4 p-0.5" /> : <div className="w-2 h-2 bg-current rounded-full" />}
              </div>
              <div>
                <p className={`font-ui font-bold text-[15px] ${item.status === 'completed' ? 'text-text-primary' : 'text-text-muted'}`}>{item.title}</p>
                <p className="text-[13px] text-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-text-muted hover:text-brand-blue font-ui font-semibold transition-colors">
          <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
        </Link>
        <div className="w-1.5 h-1.5 rounded-full bg-border hidden sm:block" />
        <button 
          onClick={resetForm}
          className="flex items-center gap-2 text-text-muted hover:text-brand-blue font-ui font-semibold transition-colors"
        >
          <RefreshCcw className="w-0.5 h-0.5" /> Start New Application
        </button>
      </div>
    </div>
  );
};
