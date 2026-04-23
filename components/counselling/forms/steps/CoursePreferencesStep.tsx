"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { MEDICAL_COURSES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const CoursePreferencesStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();

  const handleNext = () => {
    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      alert("Please select at least one course");
      return;
    }
    if (!formData.instituteTypes || formData.instituteTypes.length === 0) {
      alert("Please select at least one Institute Type");
      return;
    }
    if (!formData.quotas || formData.quotas.length === 0) {
      alert("Please select at least one Quota Interest");
      return;
    }
    nextStep();
  };

  const medicalOptions = (counsellingType === 'NEET_MCC_AllIndia' || counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical')
    ? (counsellingType === 'NEET_MCC_AllIndia' ? ['MBBS', 'BDS', 'B.Sc. Nursing'] : MEDICAL_COURSES)
    : MEDICAL_COURSES;

  const quotaOptions = React.useMemo(() => {
    const base = [
      '15% All India Quota', '85% State Quota', 'NRI Quota', 'Management Quota', 
      'Trust/Minority Quota', 'HA (Hilly Area)', 'D1 DEF1', 'D2 DEF2', 
      'D3 DEF3', 'Orphan C', 'Others*'
    ];
    if (counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical') {
      return base.filter(q => q !== '15% All India Quota');
    }
    if (counsellingType === 'NEET_MCC_AllIndia') {
      // Remove 85% State and also state-specific quotas like HA, D1-D3, Orphan
      return base.filter(q => ![
        '85% State Quota', 'HA (Hilly Area)', 'D1 DEF1', 
        'D2 DEF2', 'D3 DEF3', 'Orphan C'
      ].includes(q));
    }
    return base;
  }, [counsellingType]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Course Preferences" />
      
      <div className="space-y-8">
        <MultiSelectChips
          label="Preferred Medical Courses"
          sublabel="Select all programs you're interested in"
          options={medicalOptions}
          value={formData.preferredBranches || []}
          onChange={(v: string[]) => updateField('preferredBranches', v)}
          required
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={['Central Universities (AIIMS/JIPMER)', 'Government Medical Colleges', 'Deemed Universities', 'Private Colleges', 'Others*']}
          value={formData.instituteTypes || []}
          onChange={(v: string[]) => updateField('instituteTypes', v)}
          required
        />
        
        <MultiSelectChips
          label="Quota Interest"
          required
          options={quotaOptions}
          value={formData.quotas || []}
          onChange={(v: string[]) => updateField('quotas', v)}
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
