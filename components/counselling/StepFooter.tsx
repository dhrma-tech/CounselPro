"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

export const StepFooter = ({ onNext, isNextDisabled, isSubmitting }: any) => {
  const { currentStep, totalSteps, prevStep, currentStage } = useApplicationStore();

  const isReviewStep = currentStep === totalSteps;

  return (
    <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
      <button
        onClick={prevStep}
        className="flex-shrink-0 flex items-center gap-1.5 px-4 h-12 rounded-xl text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5 active:scale-95 transition-all font-ui font-medium text-[14px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <button
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className={`
          flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-ui font-bold text-[15px] transition-all shadow-md active:scale-[0.98]
          ${(isNextDisabled || isSubmitting)
            ? 'bg-surface-light text-text-muted cursor-not-allowed opacity-60 shadow-none'
            : isReviewStep 
              ? 'bg-[#059669] text-white hover:bg-[#047857] shadow-[#059669]/20'
              : 'bg-brand-blue text-white hover:bg-[#1648c0] shadow-brand-blue/20 hover:-translate-y-0.5'}
        `}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : isReviewStep ? (
          <>Submit Application <Send className="w-4 h-4" /></>
        ) : (
          <>Continue <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </div>
  );
};
