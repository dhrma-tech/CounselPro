"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Update scrolled state for background
      setScrolled(currentScroll > 50);

      // Smart hide/show logic with 10px threshold
      if (currentScroll <= 100) {
        setVisible(true);
      } else if (currentScroll > lastScroll + 10) {
        setVisible(false); // Scrolling down
      } else if (currentScroll < lastScroll - 10) {
        setVisible(true); // Scrolling up
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-lg h-16 shadow-sm border-b border-border' 
            : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-[22px] text-brand-navy flex items-baseline group">
            CounselPro<span className="text-brand-blue font-bold text-3xl leading-[0] transition-transform group-hover:scale-125 duration-300">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group p-2">
              <span className="body-sm font-medium cursor-pointer text-text-primary hover:text-brand-blue flex items-center gap-1">
                Counselling
              </span>
              <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-border rounded-xl shadow-lg p-2 flex flex-col">
                <Link href="/counselling/josaa" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">JoSAA Counselling</Link>
                <Link href="/counselling/mht-cet" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">MHT CET Counselling</Link>
              </div>
            </div>
            
            <Link href="/colleges" className="body-sm font-medium text-text-primary hover:text-brand-blue">Colleges</Link>
            <Link href="/branches" className="body-sm font-medium text-text-primary hover:text-brand-blue">Branches</Link>
            <Link href="/scholarships" className="body-sm font-medium text-text-primary hover:text-brand-blue">Scholarships</Link>

            <div className="relative group p-2">
              <span className="body-sm font-medium cursor-pointer text-text-primary hover:text-brand-blue flex items-center gap-1">
                Resources
              </span>
              <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-border rounded-xl shadow-lg p-2 flex flex-col">
                <Link href="/syllabus" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">Syllabus</Link>
                <Link href="/faq" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">FAQ</Link>
              </div>
            </div>

            <Link href="/about" className="body-sm font-medium text-text-primary hover:text-brand-blue">About</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/apply" className="bg-brand-blue text-white font-ui font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all duration-150">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
