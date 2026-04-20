"use client";

import Link from 'next/link';
import { X, Bell, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const NAV_GROUPS = [
  {
    label: 'Counselling Services',
    links: [
      { href: '/counselling/josaa', label: 'JoSAA — IIT / NIT / IIIT' },
      { href: '/counselling/csab', label: 'CSAB Special Rounds' },
      { href: '/counselling/mht-cet', label: 'MHT-CET Engineering' },
      { href: '/counselling/mcc-all-india', label: 'MCC All India Quota' },
      { href: '/counselling/mht-state-neet', label: 'MHT State NEET' },
      { href: '/counselling/nursing', label: 'MHT-CET Nursing' },
      { href: '/counselling/agri', label: 'MHT-CET Agriculture' },
    ],
  },
  {
    label: 'Explore',
    links: [
      { href: '/colleges', label: 'Colleges' },
      { href: '/branches', label: 'Branches' },
      { href: '/scholarships', label: 'Scholarships' },
      { href: '/libraries', label: 'Libraries' },
      { href: '/syllabus', label: 'Syllabus' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export default function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-brand-navy/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[88vw] max-w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="CounselPro" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-display text-[20px] text-brand-navy leading-none">
              CounselPro<span className="text-brand-blue font-bold">.</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 -mr-1 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-light active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Content */}
        <div className="flex-1 overflow-y-auto py-4 overscroll-contain">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="px-4 mb-5">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-1.5 px-1">
                {group.label}
              </p>
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between h-12 px-3 rounded-xl text-[15px] font-medium text-text-primary hover:bg-surface-light hover:text-brand-blue active:bg-brand-blue/5 transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-brand-blue opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Updates */}
          <div className="px-4 mb-6">
            <Link
              href="/updates"
              onClick={onClose}
              className="flex items-center gap-3 h-12 px-3 rounded-xl text-[15px] font-medium text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 active:scale-[0.98] transition-all"
            >
              <div className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-teal rounded-full border border-white" />
              </div>
              Latest Updates
            </Link>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-4 border-t border-border flex-shrink-0 space-y-3">
          <Link
            href="/apply"
            onClick={onClose}
            className="flex items-center justify-center w-full bg-brand-blue text-white font-ui font-bold text-[15px] h-13 py-3.5 rounded-xl active:scale-[0.98] shadow-lg shadow-brand-blue/20 transition-all"
          >
            Apply for Expert Guidance
          </Link>
          <div className="flex gap-3">
            <a
              href="tel:+919373859534"
              className="flex-1 flex items-center justify-center gap-2 h-11 border border-border rounded-xl text-[13px] font-semibold text-text-primary hover:border-brand-blue/40 hover:bg-surface-light transition-all"
            >
              <Phone className="w-4 h-4 text-brand-blue" />
              Call Us
            </a>
            <a
              href="https://wa.me/917798635457"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-11 border border-green-200 bg-green-50 rounded-xl text-[13px] font-semibold text-green-700 hover:bg-green-100 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
