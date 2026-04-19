"use client";

import Link from 'next/link';
import { X, Bell } from 'lucide-react';
import { useEffect } from 'react';

export default function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link href="/" onClick={onClose} className="font-display text-[22px] text-brand-navy flex items-baseline">
          CounselPro<span className="text-brand-blue font-bold text-3xl leading-[0]">.</span>
        </Link>
        <button onClick={onClose} className="p-2 -mr-2 text-text-primary" aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-2">
        <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-4 mb-2">Counselling Services</h4>
        <Link href="/counselling/josaa" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">JoSAA (IIT/NIT)</Link>
        <Link href="/counselling/csab" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">CSAB Special Rounds</Link>
        <Link href="/counselling/mht-cet" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">MHT-CET (Engineering)</Link>
        <Link href="/counselling/mcc-all-india" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">MCC All India Quota</Link>
        <Link href="/counselling/mht-state-neet" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">MHT State NEET</Link>
        <Link href="/counselling/nursing" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">MHT-CET (Nursing)</Link>
        <Link href="/counselling/agri" onClick={onClose} className="flex items-center h-10 text-[15px] font-medium text-text-primary px-2 hover:bg-surface-light rounded-lg">MHT-CET (Agriculture)</Link>
        
        <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-4 mb-2">Explore</h4>
        <Link href="/colleges" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">Colleges</Link>
        <Link href="/branches" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">Branches</Link>
        <Link href="/scholarships" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">Scholarships</Link>
        <Link href="/syllabus" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">Syllabus</Link>
        <Link href="/faq" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">FAQ</Link>
        <Link href="/about" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50">About</Link>
        <Link href="/updates" onClick={onClose} className="flex items-center h-12 text-[16px] font-medium text-text-primary border-b border-border/50 gap-2">
          <div className="relative">
            <Bell className="w-5 h-5 text-brand-blue" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-teal rounded-full border-2 border-white" />
          </div>
          Latest Updates
        </Link>
      </div>

      <div className="p-6 border-t border-border mt-auto">
        <Link href="/apply" onClick={onClose} className="flex items-center justify-center w-full bg-brand-blue text-white font-ui font-semibold text-[15px] h-12 rounded-lg active:scale-[0.98] transition-all">
          Apply Now
        </Link>
      </div>
    </div>
  );
}
