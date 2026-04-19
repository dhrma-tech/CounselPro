"use client";

import React from 'react';

const GlobalBackground = () => {
  return (
    <div className="absolute inset-x-0 top-0 w-full pointer-events-none select-none -z-10 overflow-hidden" style={{ height: '6000px' }}>
      <svg
        viewBox="0 0 1440 6000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMin slice"
      >
        {/* 
          REFINED FOUR-CORNER RIBBON DESIGN: 
          - More visible, longer loops in all 4 corners of the viewport.
          - Strategic placement to avoid Logo (top-left), Actions (top-right), and Centered Hero Text.
        */}

        {/* 1. TOP-LEFT CORNER (Sweeping around Header Logo) */}
        <path
          id="ribbonTL"
          d="M-300,500 C100,450 350,150 150,-300"
          stroke="transparent"
          fill="transparent"
        />
        <path
          d="M-300,500 C100,450 350,150 150,-300"
          stroke="#1A56DB"
          strokeWidth="100"
          className="opacity-[0.15]"
        />
        <text className="font-display font-bold text-[20px] tracking-[0.25em] fill-brand-blue opacity-[0.4] uppercase">
          <textPath href="#ribbonTL" startOffset="0%">
            EXPERT GUIDANCE • JOSAA 2026 • COUNSELPRO • ADMISSIONS • SUCCESS •
          </textPath>
        </text>

        {/* 2. TOP-RIGHT CORNER (Sweeping far right edges) */}
        <path
          id="ribbonTR"
          d="M1100,-300 C1350,50 1650,300 1800,800"
          stroke="transparent"
          fill="transparent"
        />
        <path
          d="M1100,-300 C1350,50 1650,300 1800,800"
          stroke="#0694A2"
          strokeWidth="100"
          className="opacity-[0.14]"
        />
        <text className="font-display font-medium text-[19px] tracking-[0.4em] fill-brand-teal uppercase opacity-[0.45]">
          <textPath href="#ribbonTR" startOffset="5%">
            FUTURE READY • CAREER EXCELLENCE • SECURE YOUR DREAM COLLEGE •
          </textPath>
        </text>

        {/* 3. BOTTOM-LEFT CORNER (Viewport area) */}
        <path
          id="ribbonBL"
          d="M-400,600 Q150,900 400,1400"
          stroke="transparent"
          fill="transparent"
        />
        <path
          d="M-400,600 Q150,900 400,1400"
          stroke="#1A56DB"
          strokeWidth="90"
          className="opacity-[0.12]"
        />
        <text className="font-display font-bold text-[18px] tracking-[0.3em] fill-brand-blue opacity-[0.35] uppercase">
          <textPath href="#ribbonBL" startOffset="10%">
            MHT CET 2026 • RANK ANALYSIS • CUTOFFS • SCHOLARSHIPS •
          </textPath>
        </text>

        {/* 4. BOTTOM-RIGHT CORNER (Viewport area) */}
        <path
          id="ribbonBR"
          d="M1800,1100 Q1300,950 1000,500"
          stroke="transparent"
          fill="transparent"
        />
        <path
          d="M1800,1100 Q1300,950 1000,500"
          stroke="#0694A2"
          strokeWidth="90"
          className="opacity-[0.12]"
        />
        <text className="font-display font-medium text-[17px] tracking-[0.35em] fill-brand-teal uppercase opacity-[0.38]">
          <textPath href="#ribbonBR" startOffset="15%">
            ENGINEERING • ADMISSIONS 2026 • EXPERT CHOICE FILLING •
          </textPath>
        </text>

        {/* Dotted texture extended */}
        <pattern id="patternGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#E5E7EB" fillOpacity="0.4" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#patternGrid)" />
      </svg>
    </div>
  );
};

export default GlobalBackground;
