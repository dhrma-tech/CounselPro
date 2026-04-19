"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { Check } from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Exam' },
  { id: 2, label: 'Counselling' },
  { id: 3, label: 'Your Info' },
  { id: 4, label: 'Done' },
];

export const StageIndicator = () => {
  const { currentStage } = useApplicationStore();

  return (
    <div className="w-full mb-4 overflow-x-auto hide-scrollbar">
      <div className="flex items-center justify-center gap-2 min-w-max px-2">
        {STAGES.map((stage, idx) => {
          const isActive = currentStage === stage.id;
          const isCompleted = currentStage > stage.id;
          const isUpcoming = currentStage < stage.id;

          return (
            <React.Fragment key={stage.id}>
              <div 
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-full font-ui text-[13px] font-semibold transition-all duration-300
                  ${isActive ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' : ''}
                  ${isCompleted ? 'bg-[#D1FAE5] text-[#065F46]' : ''}
                  ${isUpcoming ? 'bg-surface-light text-text-muted' : ''}
                `}
              >
                {isCompleted && <Check className="w-3.5 h-3.5" />}
                {stage.label}
              </div>
              {idx < STAGES.length - 1 && (
                <div className={`h-[1px] flex-1 min-w-[20px] max-w-[40px] ${isCompleted ? 'bg-[#065F46]/20' : 'bg-border'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
