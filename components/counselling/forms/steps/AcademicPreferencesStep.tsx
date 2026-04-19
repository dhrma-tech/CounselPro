"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { ENGINEERING_BRANCHES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const AcademicPreferencesStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const handleNext = () => {
    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      alert("Please select at least one branch");
      return;
    }
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Academic Preferences" />
      
      <div className="space-y-8">
        <MultiSelectChips
          label="Preferred Academic Programs"
          sublabel="Select all programs you're interested in"
          options={ENGINEERING_BRANCHES}
          value={formData.preferredBranches || []}
          onChange={(v: string[]) => updateField('preferredBranches', v)}
          required
        />

        <MultiSelectChips
          label="Course Type"
          options={['B.Tech', 'B.E.', 'B.Arch', 'B.Planning', 'B.Tech + M.Tech (Dual)', 'B.S.', 'Others*']}
          value={formData.courseType || []}
          onChange={(v: string[]) => updateField('courseType', v)}
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={['IIT', 'NIT', 'IIIT', 'GFTI', 'Others*']}
          value={formData.instituteTypes || []}
          onChange={(v: string[]) => updateField('instituteTypes', v)}
          required
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
