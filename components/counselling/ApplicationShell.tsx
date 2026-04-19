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
    <div className="min-h-screen bg-surface-page pt-24 pb-10 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <StageIndicator />

        <div className="bg-white border border-border rounded-[24px] p-4 sm:p-7 shadow-sm min-h-[380px]">
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
