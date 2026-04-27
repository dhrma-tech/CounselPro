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
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['MBBS', 'BDS', 'B.Sc. Nursing (Central Institutes)'];
    }
    if (counsellingType === 'NEET_MHT_State') {
      return MEDICAL_COURSES; // Full list: MBBS, BDS, BAMS, BHMS, BPTh, etc.
    }
    if (counsellingType === 'MHT_CET_Medical') {
      return ['B.Pharm (Bachelor of Pharmacy)', 'Pharm.D (Doctor of Pharmacy)', 'B.Tech (Pharmaceuticals)'];
    }
    return MEDICAL_COURSES;
  }, [counsellingType]);

  const instituteOptions = React.useMemo(() => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['AIIMS (All India Institutes)', 'JIPMER', 'Central Universities (AMU/BHU)', 'Deemed Universities', 'ESIC Medical Colleges', 'AFMC (Armed Forces)'];
    }
    if (counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical') {
      return ['Government Medical/Pharmacy College', 'Government Aided College', 'Private (Unaided) College', 'Deemed University (State Level)', 'Others*'];
    }
    return ['Government Colleges', 'Private Colleges', 'Others*'];
  }, [counsellingType]);

  const quotaOptions = React.useMemo(() => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['15% All India Quota', 'Deemed University Seats', 'Central University Quota', 'ESIC Management Quota', 'AFMC Seats', 'NRI Quota', 'Others*'];
    }
    
    const baseStateQuotas = [
      '85% State Quota', '15% Institutional Quota', 'NRI Quota', 'Management Quota', 
      'Trust/Minority Quota', 'Hilly Area (HA)', 'Defense (D1/D2/D3)', 'Orphan C', 
      'MKB (Maharashtra Karnataka Border)', 'Others*'
    ];

    if (counsellingType === 'NEET_MHT_State' || counsellingType === 'MHT_CET_Medical') {
      return baseStateQuotas;
    }
    
    return baseStateQuotas;
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
          error={errors.preferredBranches}
          onChange={(v: string[]) => {
            updateField('preferredBranches', v);
            if (errors.preferredBranches) setErrors(prev => ({ ...prev, preferredBranches: '' }));
          }}
          required
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={instituteOptions}
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
