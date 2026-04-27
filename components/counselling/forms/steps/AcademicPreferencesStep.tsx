"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSearchableSelect } from '../../fields/MultiSearchableSelect';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { ENGINEERING_BRANCHES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

const RECOMMENDED_BRANCHES = [
  "Computer Science and Engineering (CSE)",
  "CSE – Artificial Intelligence (AI)",
  "Information Technology (IT)",
  "Electronics and Communication Engineering (ECE)"
];

export const AcademicPreferencesStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      newErrors.preferredBranches = "Please select at least one branch of interest";
    }
    if (!formData.courseType || formData.courseType.length === 0) {
      newErrors.courseType = "Please select at least one desired course type";
    }
    if (!formData.instituteTypes || formData.instituteTypes.length === 0) {
      newErrors.instituteTypes = "Please select at least one preferred institute type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Academic Preferences" />
      
      <div className="space-y-8">
        <MultiSearchableSelect
          label="Preferred Academic Programs"
          sublabel="Search and select all programs you're interested in"
          options={ENGINEERING_BRANCHES}
          recommendations={RECOMMENDED_BRANCHES}
          value={formData.preferredBranches || []}
          error={errors.preferredBranches}
          onChange={(v: string[]) => {
            updateField('preferredBranches', v);
            if (errors.preferredBranches) setErrors(prev => ({ ...prev, preferredBranches: '' }));
          }}
          required
        />

        <MultiSelectChips
          label="Course Type"
          required
          options={['B.Tech', 'B.E.', 'B.Arch', 'B.Planning', 'B.Tech + M.Tech (Dual)', 'B.S.', 'Others*']}
          value={formData.courseType || []}
          error={errors.courseType}
          onChange={(v: string[]) => {
            updateField('courseType', v);
            if (errors.courseType) setErrors(prev => ({ ...prev, courseType: '' }));
          }}
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={['IIT', 'NIT', 'IIIT', 'GFTI', 'Others*']}
          value={formData.instituteTypes || []}
          error={errors.instituteTypes}
          onChange={(v: string[]) => {
            updateField('instituteTypes', v);
            if (errors.instituteTypes) setErrors(prev => ({ ...prev, instituteTypes: '' }));
          }}
          required
        />
      </div>

      <div className="mt-12">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
