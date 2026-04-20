"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { Check } from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Exam' },
  { id: 2, label: 'Counselling' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Done' },
];

export const StageIndicator = () => {
  const { currentStage } = useApplicationStore();

  return (
    <div className="w-full mb-5">
      {/* Mobile: compact linear progress */}
      <div className="flex items-center w-full gap-0">
        {STAGES.map((stage, idx) => {
          const isActive = currentStage === stage.id;
          const isCompleted = currentStage > stage.id;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage node */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 flex-shrink-0
                    ${isCompleted ? 'bg-[#059669] text-white' : ''}
                    ${isActive ? 'bg-brand-blue text-white ring-4 ring-brand-blue/15' : ''}
                    ${!isActive && !isCompleted ? 'bg-surface-light text-text-muted border border-border' : ''}
                  `}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : stage.id}
                </div>
                <span
                  className={`
                    mt-1.5 text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-colors
                    ${isActive ? 'text-brand-blue' : isCompleted ? 'text-[#059669]' : 'text-text-muted'}
                  `}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < STAGES.length - 1 && (
                <div className={`flex-1 h-[2px] mx-2 mb-5 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-[#059669]' : 'bg-border'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
