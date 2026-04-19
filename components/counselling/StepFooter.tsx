"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

export const StepFooter = ({ onNext, isNextDisabled, isSubmitting }: any) => {
  const { currentStep, totalSteps, prevStep, currentStage } = useApplicationStore();

  const isReviewStep = currentStep === totalSteps;

  return (
    <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5 transition-all font-ui font-medium text-[14px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="hidden sm:block font-mono text-[12px] text-text-muted">
          STEP {currentStep} OF {totalSteps}
        </div>

        <button
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-ui font-bold text-[15px] transition-all shadow-md
            ${(isNextDisabled || isSubmitting)
              ? 'bg-surface-light text-text-muted cursor-not-allowed opacity-50 shadow-none'
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
            <>Next Step <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      

    </div>
  );
};
