"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { MEDICAL_COURSES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const CoursePreferencesStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      newErrors.preferredBranches = "Please select at least one course of interest";
    }
    if (!formData.instituteTypes || formData.instituteTypes.length === 0) {
      newErrors.instituteTypes = "Please select at least one preferred institute type";
    }
    if (!formData.quotas || formData.quotas.length === 0) {
      newErrors.quotas = "Please select at least one quota you are interested in";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  const hasNEET = formData.hasNEETScore === 'Yes';

  const medicalOptions = React.useMemo(() => {
    let options = (counsellingType === 'NEET_MCC_AllIndia' || counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical')
      ? (counsellingType === 'NEET_MCC_AllIndia' ? ['MBBS', 'BDS', 'B.Sc. Nursing'] : MEDICAL_COURSES)
      : MEDICAL_COURSES;

    if (!hasNEET) {
      const neetMandatory = ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BVSc'];
      options = options.filter(p => !neetMandatory.some(m => p.includes(m)));
    }
    return options;
  }, [counsellingType, hasNEET]);

  const quotaOptions = React.useMemo(() => {
    const base = [
      '15% All India Quota', '85% State Quota', 'NRI Quota', 'Management Quota', 
      'Trust/Minority Quota', 'HA (Hilly Area)', 'D1 DEF1', 'D2 DEF2', 
      'D3 DEF3', 'Orphan C', 'Others*'
    ];
    
    let filtered = base;

    if (!hasNEET) {
      // 15% AIQ and AIQ-based NRI quotas are definitely out
      filtered = filtered.filter(q => !q.includes('All India Quota'));
    }

    if (counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical') {
      filtered = filtered.filter(q => q !== '15% All India Quota');
    }

    if (counsellingType === 'NEET_MCC_AllIndia') {
      filtered = filtered.filter(q => ![
        '85% State Quota', 'HA (Hilly Area)', 'D1 DEF1', 
        'D2 DEF2', 'D3 DEF3', 'Orphan C'
      ].includes(q));
    }
    
    return filtered;
  }, [counsellingType, hasNEET]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Course Preferences" />
      
      <div className="space-y-8">
        <MultiSelectChips
          label="Preferred Medical Courses"
          sublabel="Select all programs you're interested in"
          options={medicalOptions}
          value={formData.preferredBranches || []}
          error={errors.preferredBranches}
          onChange={(v: string[]) => {
            updateField('preferredBranches', v);
            if (errors.preferredBranches) setErrors(prev => ({ ...prev, preferredBranches: '' }));
          }}
          required
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={['Central Universities (AIIMS/JIPMER)', 'Government Medical Colleges', 'Deemed Universities', 'Private Colleges', 'Others*']}
          value={formData.instituteTypes || []}
          error={errors.instituteTypes}
          onChange={(v: string[]) => {
            updateField('instituteTypes', v);
            if (errors.instituteTypes) setErrors(prev => ({ ...prev, instituteTypes: '' }));
          }}
          required
        />
        
        <MultiSelectChips
          label="Quota Interest"
          required
          options={quotaOptions}
          value={formData.quotas || []}
          error={errors.quotas}
          onChange={(v: string[]) => {
            updateField('quotas', v);
            if (errors.quotas) setErrors(prev => ({ ...prev, quotas: '' }));
          }}
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
