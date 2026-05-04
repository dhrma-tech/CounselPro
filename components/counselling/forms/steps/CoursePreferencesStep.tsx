"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSearchableSelect } from '../../fields/MultiSearchableSelect';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { CheckboxCards } from '../../fields/CheckboxCards';
import { TextInput } from '../../fields/TextInput';
import { ConditionalSection } from '../../fields/ConditionalSection';
import { MEDICAL_COURSES, MAHARASHTRA_DISTRICTS } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const CoursePreferencesStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const isPharmacyOrMedical = counsellingType === 'MHT_CET_Medical';

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    const isMCC = counsellingType === 'NEET_MCC_AllIndia';

    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      newErrors.preferredBranches = "Please select at least one course of interest";
    }

    if (counsellingType === 'NEET_MHT_State' && formData.preferredBranches?.length > 0 && !formData.preferredBranchesDetails) {
      newErrors.preferredBranchesDetails = "Please specify your preferred courses in detail";
    }
    
    if (isMCC) {
      if (!formData.applicationSelection || formData.applicationSelection.length === 0) {
        newErrors.applicationSelection = "Please select at least one application category";
      }
    } else {
      if (!formData.instituteTypes || formData.instituteTypes.length === 0) {
        newErrors.instituteTypes = "Please select at least one preferred institute type";
      }

      if (isPharmacyOrMedical) {
        if (!formData.preferredLocations || formData.preferredLocations.length === 0) {
          newErrors.preferredLocations = "Please select at least one preferred location (Priority-wise)";
        }
      } else {
        if (!formData.quotas || formData.quotas.length === 0) {
          newErrors.quotas = "Please select at least one quota you are interested in";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  const mccApplicationOptions = [
    'All India Quota 15%',
    'Open Seat (AIIMS (As per AIIMS eligibility), BHU OPEN, AMU OPEN, JIPMER OPEN, JAMIA OPEN)',
    'Bsc. Nursing Central Institute (Open seat)',
    'Deemed University AMU Self-financed and NRI seat, Jamia NRI seat, AIIMS Foreign Seats, Deemed/NRI/Minority seats',
    'Armed forces Medical College'
  ];

  const hasNEET = formData.hasNEETScore === 'Yes';

  const medicalOptions = React.useMemo(() => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['MBBS', 'BDS', 'B.Sc. Nursing (Central Institutes)'];
    }
    if (counsellingType === 'NEET_MHT_State') {
      return ['MBBS/BDS (GROUP A)', 'AYUSH (GROUP B)', 'ALLIED (GROUP C)'];
    }
    if (counsellingType === 'MHT_CET_Medical') {
      return ['B.Pharm (Bachelor of Pharmacy)', 'Pharm.D (Doctor of Pharmacy)', 'B.Tech (Pharmaceuticals)'];
    }
    return MEDICAL_COURSES;
  }, [counsellingType]);

  const instituteOptions = React.useMemo(() => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['AIIMS (All India Institutes)', 'JIPMER', 'Central Universities (AMU/BHU)', 'Deemed Universities', 'ESIC Medical Colleges'];
    }
    if (counsellingType === 'NEET_MHT_State') {
      return ['Only State Quota', 'Only Institute Quota', 'Both State and Institute Quota', 'Others*'];
    }
    if (counsellingType === 'MHT_CET_Medical') {
      return ['Government Medical/Pharmacy College', 'Government Aided College', 'Private (Unaided) College', 'Deemed University (State Level)', 'Others*'];
    }
    return ['Government Colleges', 'Private Colleges', 'Others*'];
  }, [counsellingType]);

  const quotaOptions = React.useMemo(() => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['15% All India Quota', 'Deemed University Seats', 'Central University Quota', 'ESIC Management Quota', 'Others*'];
    }
    
    const baseStateQuotas = [
      '85% State Quota', '15% Institutional Quota', 'NRI Quota', 'Management Quota', 
      'Trust/Minority Quota', 'Hilly Area (HA)', 'Defense (D1/D2/D3)', 'Orphan C', 
      'MKB (Maharashtra Karnataka Border)', 'Others*'
    ];

    if (counsellingType === 'NEET_MHT_State') {
      return ['Defence 1', 'Defence 2', 'MKB (Maharashtra Karnatak Border)', 'Hilly Area', 'Others*'];
    }

    if (counsellingType === 'MHT_CET_Medical') {
      return baseStateQuotas;
    }
    
    return baseStateQuotas;
  }, [counsellingType]);

  const isMCC = counsellingType === 'NEET_MCC_AllIndia';

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Course Preferences" />
      
      <div className="space-y-8">
        <MultiSelectChips
          label={isPharmacyOrMedical ? "Preferred Pharmacy Courses" : "Preferred Medical Courses"}
          sublabel="Select all programs you're interested in"
          options={medicalOptions}
          value={formData.preferredBranches || []}
          error={errors.preferredBranches}
          onChange={(v: string[]) => {
            updateField('preferredBranches', v);
            if (errors.preferredBranches) setErrors(prev => ({ ...prev, preferredBranches: '' }));
          }}
          required
          disableOthers={counsellingType === 'NEET_MHT_State'}
        />

        <ConditionalSection isVisible={counsellingType === 'NEET_MHT_State' && formData.preferredBranches?.length > 0}>
          <TextInput
            label="Specific Course Interests"
            sublabel="Please type the specific courses you are interested in (e.g. MBBS, BAMS, PT, etc.)"
            required
            placeholder="Type your preferred courses here..."
            value={formData.preferredBranchesDetails || ''}
            error={errors.preferredBranchesDetails}
            onChange={(e: any) => {
              updateField('preferredBranchesDetails', e.target.value);
              if (errors.preferredBranchesDetails) setErrors(prev => ({ ...prev, preferredBranchesDetails: '' }));
            }}
          />
        </ConditionalSection>

        {isMCC && (
          <CheckboxCards
            label="Application for selection"
            sublabel="Select all categories you wish to apply for"
            required
            options={mccApplicationOptions}
            value={formData.applicationSelection || []}
            error={errors.applicationSelection}
            onChange={(v: string[]) => {
              updateField('applicationSelection', v);
              if (errors.applicationSelection) setErrors(prev => ({ ...prev, applicationSelection: '' }));
            }}
          />
        )}

        {!isMCC && (
          <>
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
            
            {isPharmacyOrMedical ? (
              <MultiSearchableSelect
                label="Preferred Locations (Maharashtra Districts)"
                sublabel="Search and select districts in order of your preference (Priority-wise)"
                placeholder="Search and add districts..."
                options={MAHARASHTRA_DISTRICTS}
                value={formData.preferredLocations || []}
                error={errors.preferredLocations}
                onChange={(v: string[]) => {
                  updateField('preferredLocations', v);
                  if (errors.preferredLocations) setErrors(prev => ({ ...prev, preferredLocations: '' }));
                }}
                required
              />
            ) : (
              <MultiSelectChips
                label={counsellingType === 'NEET_MHT_State' ? "Specific Reservation Quota" : "Quota Interest"}
                required
                options={quotaOptions}
                value={formData.quotas || []}
                error={errors.quotas}
                onChange={(v: string[]) => {
                  updateField('quotas', v);
                  if (errors.quotas) setErrors(prev => ({ ...prev, quotas: '' }));
                }}
              />
            )}
          </>
        )}
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
