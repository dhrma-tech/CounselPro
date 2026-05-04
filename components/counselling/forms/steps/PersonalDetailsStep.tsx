"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { SearchableSelect } from '../../fields/SearchableSelect';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { INDIAN_STATES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';
import { TextInput } from '../../fields/TextInput';
import { ConditionalSection } from '../../fields/ConditionalSection';

export const PersonalDetailsStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const hasDedicatedQuotaStep = counsellingType === 'MHT_CET_Engineering' || counsellingType === 'MHT_CET_Medical';
  const showDomicile = counsellingType !== 'JEE_JoSAA_Advanced';

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (formData.gender === 'Other' && !formData.genderOtherDetails) newErrors.genderOtherDetails = "Please specify your gender";
    if (!formData.category || formData.category.length === 0) newErrors.category = "Category selection is required for reservation benefits";
    if (showDomicile && !formData.domicileState) {
      // Domicile is now optional as per user request
    }

    if (formData.isForeignNational === 'Yes' && !formData.foreignNationalDetails) {
      newErrors.foreignNationalDetails = "Please provide details about your nationality";
    }

    if (!formData.religion) newErrors.religion = "Please select your religion";
    if (formData.religion === 'Others' && !formData.religionOtherDetails) newErrors.religionOtherDetails = "Please specify your religion";

    if (hasDedicatedQuotaStep && !formData.homeUniversity) {
      newErrors.homeUniversity = "Please specify your home university";
    }

    if (!formData.passedDelhi) {
      newErrors.passedDelhi = "Please answer this question";
    }

    if (!formData.isPWD) {
      newErrors.isPWD = "Please answer this question";
    }

    if (!formData.isOrphan) {
      newErrors.isOrphan = "Please answer this question";
    }

    if (counsellingType === 'NEET_MHT_State' && !formData.isMinority) {
      newErrors.isMinority = "Please select your minority status";
    }

    if (formData.isMinority === 'Yes' && (!formData.minorityType || formData.minorityType.length === 0)) {
      newErrors.minorityType = "Please select at least one type of minority";
    }

    if (formData.isMinority === 'Yes' && !formData.minorityDetails) {
      newErrors.minorityDetails = "Please provide your minority details as per LC";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  const getCategoryOptions = () => {
    if (counsellingType === 'NEET_MCC_AllIndia') {
      return ['Open', 'Open EWS', 'SC', 'ST', 'OBC', 'NCL', 'Others*'];
    }
    return [
      'Open', 'Open EWS', 'SC', 'ST', 'OBC', 
      'SBC', 'SEBC', 'DT/VJ', 'NT1(NT-B)', 
      'NT2(NT-C)', 'NT3(NT-D)', 'NCL'
    ];
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Personal Details" />
      
      <div className="space-y-8">
        <div className="space-y-4">
          <RadioCards
            label="Gender"
            required
            options={['Male', 'Female', 'Other']}
            gridCols={3}
            value={formData.gender}
            error={errors.gender}
            onChange={(v: string) => {
              updateField('gender', v);
              if (errors.gender) setErrors(prev => ({ ...prev, gender: '' }));
            }}
          />
          <ConditionalSection isVisible={formData.gender === 'Other'}>
            <TextInput
              label="Please Specify Gender"
              required
              placeholder="e.g. Non-binary, Transgender, etc."
              value={formData.genderOtherDetails || ''}
              error={errors.genderOtherDetails}
              onChange={(e: any) => {
                updateField('genderOtherDetails', e.target.value);
                if (errors.genderOtherDetails) setErrors(prev => ({ ...prev, genderOtherDetails: '' }));
              }}
            />
          </ConditionalSection>
        </div>

        <MultiSelectChips
          label="Category"
          required
          options={getCategoryOptions()}
          value={Array.isArray(formData.category) ? formData.category : []}
          error={errors.category}
          onChange={(v: string[]) => {
            updateField('category', v);
            if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
          }}
        />

        <RadioCards
          label="Have you passed 11th and 12th from New Delhi?"
          required
          options={['Yes', 'No']}
          gridCols={2}
          value={formData.passedDelhi}
          error={errors.passedDelhi}
          onChange={(v: string) => {
            updateField('passedDelhi', v);
            if (errors.passedDelhi) setErrors(prev => ({ ...prev, passedDelhi: '' }));
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Are you a Person with Disability (PWD)?"
            required
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.isPWD}
            error={errors.isPWD}
            onChange={(v: string) => {
              updateField('isPWD', v);
              if (errors.isPWD) setErrors(prev => ({ ...prev, isPWD: '' }));
            }}
          />
          <RadioCards
            label="Are you an Orphan?"
            required
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.isOrphan}
            error={errors.isOrphan}
            onChange={(v: string) => {
              updateField('isOrphan', v);
              if (errors.isOrphan) setErrors(prev => ({ ...prev, isOrphan: '' }));
            }}
          />
        </div>

        {showDomicile && (
          <div className="space-y-6">
            <SearchableSelect
              label="Domicile State"
              options={INDIAN_STATES}
              value={formData.domicileState}
              error={errors.domicileState}
              onChange={(v: string) => {
                updateField('domicileState', v);
                if (errors.domicileState) setErrors(prev => ({ ...prev, domicileState: '' }));
              }}
            />

            <div className="space-y-4">
              <RadioCards
                label="Are you a Foreign National?"
                options={['Yes', 'No']}
                gridCols={2}
                value={formData.isForeignNational || 'No'}
                onChange={(v: string) => updateField('isForeignNational', v)}
              />
              <ConditionalSection isVisible={formData.isForeignNational === 'Yes'}>
                <TextInput
                  label="Passport / Nationality Details"
                  required
                  placeholder="Specify country and passport details"
                  value={formData.foreignNationalDetails || ''}
                  error={errors.foreignNationalDetails}
                  onChange={(e: any) => {
                    updateField('foreignNationalDetails', e.target.value);
                    if (errors.foreignNationalDetails) setErrors(prev => ({ ...prev, foreignNationalDetails: '' }));
                  }}
                />
              </ConditionalSection>
            </div>
          </div>
        )}
        {hasDedicatedQuotaStep && (
          <div className="pt-4 border-t border-border/50">
            <TextInput
              label="Student Home University"
              required
              placeholder="e.g. Mumbai University, SPPU Pune, etc."
              value={formData.homeUniversity || ''}
              error={errors.homeUniversity}
              onChange={(e: any) => {
                updateField('homeUniversity', e.target.value);
                if (errors.homeUniversity) setErrors(prev => ({ ...prev, homeUniversity: '' }));
              }}
            />
          </div>
        )}

        {counsellingType === 'NEET_MHT_State' && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            <RadioCards
              label="Do you belong to a Minority?"
              required
              options={['Yes', 'No']}
              gridCols={2}
              value={formData.isMinority}
              error={errors.isMinority}
              onChange={(v: string) => {
                updateField('isMinority', v);
                if (errors.isMinority) setErrors(prev => ({ ...prev, isMinority: '' }));
              }}
            />
            <ConditionalSection isVisible={formData.isMinority === 'Yes'}>
              <div className="space-y-4 pt-2">
                <MultiSelectChips
                  label="Select Minority Type"
                  required
                  options={['Religious Minority', 'Linguistic Minority']}
                  value={Array.isArray(formData.minorityType) ? formData.minorityType : []}
                  onChange={(v: string[]) => {
                    updateField('minorityType', v);
                    if (errors.minorityType) setErrors(prev => ({ ...prev, minorityType: '' }));
                  }}
                />
                <TextInput
                  label="Minority Details"
                  sublabel="Type what is written on your 12 LC"
                  required
                  placeholder="e.g. Muslim, Christian, Gujarati, etc."
                  value={formData.minorityDetails || ''}
                  error={errors.minorityDetails}
                  onChange={(e: any) => {
                    updateField('minorityDetails', e.target.value);
                    if (errors.minorityDetails) setErrors(prev => ({ ...prev, minorityDetails: '' }));
                  }}
                />
              </div>
            </ConditionalSection>
          </div>
        )}

        <div className="space-y-4">
          <RadioCards
            label="Religion"
            required
            options={['Hindu', 'Muslim', 'Buddhist', 'Christian', 'Sikh', 'Jain', 'Parsi', 'Others']}
            gridCols={3}
            value={formData.religion}
            error={errors.religion}
            onChange={(v: string) => {
              updateField('religion', v);
              if (errors.religion) setErrors(prev => ({ ...prev, religion: '' }));
            }}
          />
          <ConditionalSection isVisible={formData.religion === 'Others'}>
            <TextInput
              label="Specify Religion"
              required
              placeholder="Please specify your religion"
              value={formData.religionOtherDetails || ''}
              error={errors.religionOtherDetails}
              onChange={(e: any) => {
                updateField('religionOtherDetails', e.target.value);
                if (errors.religionOtherDetails) setErrors(prev => ({ ...prev, religionOtherDetails: '' }));
              }}
            />
          </ConditionalSection>
        </div>
      </div>

      <div className="mt-12">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
