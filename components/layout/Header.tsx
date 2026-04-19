"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, GraduationCap } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isApplicationPage = pathname === '/apply' || pathname?.startsWith('/counselling/apply');

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
            : 'bg-white/40 backdrop-blur-md h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          {/* LEFT: Logo - Positioned on the left side of the ribbon */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-[24px] text-brand-navy flex items-baseline leading-none pt-1">
                CounselPro<span className="text-brand-blue font-bold text-3xl leading-[0] transition-transform group-hover:scale-125 duration-300 ml-0.5">.</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-[28px] absolute left-1/2 -translate-x-1/2">
            <div className="relative group flex items-center h-full">
              <span className="text-[14px] font-medium cursor-pointer text-text-primary hover:text-brand-blue flex items-center transition-colors">
                Counselling
              </span>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 mt-1 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-border rounded-xl shadow-xl p-6 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3">Engineering</h4>
                  <div className="flex flex-col gap-1">
                    <Link href="/counselling/josaa" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">JoSAA Support</Link>
                    <Link href="/counselling/csab" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">CSAB Special Rounds</Link>
                    <Link href="/counselling/mht-cet" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">MHT-CET (Engineering)</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3">Medical & Others</h4>
                  <div className="flex flex-col gap-1">
                    <Link href="/counselling/mcc-all-india" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">MCC All India Quota</Link>
                    <Link href="/counselling/mht-state-neet" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">MHT State NEET</Link>
                    <div className="h-px bg-border my-1 mx-3" />
                    <Link href="/counselling/nursing" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">MHT-CET (Nursing)</Link>
                    <Link href="/counselling/agri" className="px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors font-medium">MHT-CET (Agriculture)</Link>
                  </div>
                </div>
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

          <div className="hidden md:flex items-center gap-[24px]">
            <Link href="/updates" className="relative text-text-secondary hover:text-brand-blue transition-colors group/bell p-1">
              <Bell className="w-[18px] h-[18px] transition-transform group-hover/bell:rotate-[15deg]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-teal rounded-full border-2 border-white shadow-sm" />
            </Link>

            {!isApplicationPage && (
              <Link 
                href="/apply" 
                className="h-10 flex items-center bg-brand-blue text-white font-ui font-semibold text-sm px-6 rounded-xl hover:bg-[#1648c0] active:scale-[0.98] transition-all duration-150 shadow-md shadow-brand-blue/10"
              >
                Apply Now
              </Link>
            )}
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
