"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { StageIndicator } from './StageIndicator';
import { Stage1_ExamSelect } from './stages/Stage1_ExamSelect';
import { Stage2_CounsellingSelect } from './stages/Stage2_CounsellingSelect';
import { Stage4_Contact } from './stages/Stage4_Contact';
import { FormRouter } from './forms/FormRouter';

export const ApplicationShell = () => {
  const { currentStage } = useApplicationStore();

  return (
    <div className="min-h-screen bg-surface-page pt-20 sm:pt-24 pb-12 px-3 sm:px-5">
      <div className="max-w-[680px] mx-auto w-full">
        <StageIndicator />

        <div className="bg-white border border-border rounded-2xl sm:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-sm min-h-[400px]">
          {currentStage === 1 && <Stage1_ExamSelect />}
          {currentStage === 2 && <Stage2_CounsellingSelect />}
          {currentStage === 3 && <FormRouter />}
          {currentStage === 4 && <Stage4_Contact />}
        </div>
        
        <p className="mt-8 text-center text-[12px] text-text-muted font-ui">
          &copy; 2026 CounselPro. Secure Academic Guidance System.
        </p>
      </div>
    </div>
  );
};
