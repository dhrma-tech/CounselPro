"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Bell } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Update scrolled state for background
      const isScrolled = currentScroll > 50;
      setScrolled(isScrolled);

      // Smart hide/show logic with 10px threshold
      let isVisible = true;
      if (currentScroll <= 100) {
        isVisible = true;
      } else if (currentScroll > lastScroll + 10) {
        isVisible = false; // Scrolling down
      } else if (currentScroll < lastScroll - 10) {
        isVisible = true; // Scrolling up
      }
      
      setVisible(isVisible);
      lastScroll = currentScroll;

      // Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(progress);

      // Sync CSS Variables for sub-headers
      const height = isScrolled ? 64 : 80;
      const offset = isVisible ? height : 0;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      document.documentElement.style.setProperty('--header-offset', `${offset}px`);
    };

    // Initial set
    document.documentElement.style.setProperty('--header-height', '80px');
    document.documentElement.style.setProperty('--header-offset', '80px');

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
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display text-[22px] text-brand-navy flex items-baseline group">
              CounselPro<span className="text-brand-blue font-bold text-3xl leading-[0] transition-transform group-hover:scale-125 duration-300">.</span>
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-[28px] absolute left-1/2 -translate-x-1/2">
            <div className="relative group flex items-center h-full">
              <span className="text-[14px] font-medium cursor-pointer text-text-primary hover:text-brand-blue flex items-center transition-colors">
                Counselling
              </span>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-border rounded-xl shadow-lg p-2 flex flex-col">
                <Link href="/counselling/josaa" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">JoSAA Counselling</Link>
                <Link href="/counselling/mht-cet" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">MHT CET Counselling</Link>
              </div>
            </div>
            
            <Link href="/colleges" className="text-[14px] font-medium text-text-primary hover:text-brand-blue transition-colors">Colleges</Link>
            <Link href="/branches" className="text-[14px] font-medium text-text-primary hover:text-brand-blue transition-colors">Branches</Link>
            <Link href="/scholarships" className="text-[14px] font-medium text-text-primary hover:text-brand-blue transition-colors">Scholarships</Link>

            <div className="relative group flex items-center h-full">
              <span className="text-[14px] font-medium cursor-pointer text-text-primary hover:text-brand-blue flex items-center transition-colors">
                Resources
              </span>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-border rounded-xl shadow-lg p-2 flex flex-col">
                <Link href="/syllabus" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">Syllabus</Link>
                <Link href="/faq" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg">FAQ</Link>
              </div>
            </div>

            <Link href="/about" className="text-[14px] font-medium text-text-primary hover:text-brand-blue transition-colors">About</Link>
          </nav>

          {/* RIGHT: Actions */}
          <div className="hidden md:flex items-center gap-[24px]">
            <Link href="/updates" className="relative text-text-secondary hover:text-brand-blue transition-colors group/bell p-1">
              <Bell className="w-[18px] h-[18px] transition-transform group-hover/bell:rotate-[15deg]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-teal rounded-full border-2 border-white shadow-sm" />
            </Link>

            <Link 
              href="/apply" 
              className="h-10 flex items-center bg-brand-blue text-white font-ui font-semibold text-sm px-6 rounded-xl hover:bg-[#1648c0] active:scale-[0.98] transition-all duration-150 shadow-md shadow-brand-blue/10"
            >
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

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-border/10 overflow-hidden">
          <div 
            className="h-full bg-brand-blue transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
