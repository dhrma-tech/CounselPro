"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { StageIndicator } from './StageIndicator';
import { Stage1_ExamSelect } from './stages/Stage1_ExamSelect';
import { Stage2_CounsellingSelect } from './stages/Stage2_CounsellingSelect';
import { Stage4_Contact } from './stages/Stage4_Contact';
import { FormRouter } from './forms/FormRouter';

export const ApplicationShell = () => {
  const { currentStage, currentStep } = useApplicationStore();

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll to application part on stage or step change
  React.useEffect(() => {
    if (containerRef.current) {
      const yOffset = -100; // Account for fixed header
      const y = containerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentStage, currentStep]);

  return (
    <div className="min-h-[100dvh] bg-surface-page pt-20 sm:pt-28 pb-16 px-4">
      <div ref={containerRef} className="max-w-[720px] mx-auto w-full flex flex-col gap-6 sm:gap-8">
        <StageIndicator />

        <main className="bg-white border border-border rounded-2xl sm:rounded-[32px] p-5 sm:p-8 md:p-10 shadow-sm transition-all duration-300">
          {currentStage === 1 && <Stage1_ExamSelect />}
          {currentStage === 2 && <Stage2_CounsellingSelect />}
          {currentStage === 3 && <FormRouter />}
          {currentStage === 4 && <Stage4_Contact />}
        </main>
        
        <footer className="mt-4 text-center">
          <p className="text-[12px] text-text-muted font-ui tracking-wide">
            &copy; 2026 CounselPro &bull; Secure Academic Guidance System
          </p>
        </footer>
      </div>
    </div>
  );
};
