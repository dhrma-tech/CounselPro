"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';

export const StepProgress = ({ currentTitle }: { currentTitle: string }) => {
  const { currentStep, totalSteps } = useApplicationStore();
  
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-2">
        <div>
          <p className="text-[11px] font-mono font-bold text-brand-blue uppercase tracking-widest mb-1">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-[20px] font-display font-semibold text-text-primary leading-tight">
            {currentTitle}
          </h2>
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-surface-light rounded-full overflow-hidden border border-border/10">
        <div 
          className="h-full bg-brand-blue transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
