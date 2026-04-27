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
    if (!formData.category) newErrors.category = "Category selection is required for reservation benefits";
    if (showDomicile && !formData.domicileState) newErrors.domicileState = "Please select your domicile state";
    if (!formData.seatType || formData.seatType.length === 0) newErrors.seatType = "Please select at least one seat type you are applying for";

    if (!hasDedicatedQuotaStep) {
      if (!formData.isMinority) newErrors.isMinority = "Please answer the minority status question";
      if (formData.isMinority === 'Yes' && !formData.minorityDetails) newErrors.minorityDetails = "Please specify your minority type";
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
      <StepProgress currentTitle="Personal Details" />
      
      <div className="space-y-8">
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

        <RadioCards
          label="Category"
          required
          options={[
            'General', 'General (PwD)', 
            'OBC-NCL', 'OBC-NCL (PwD)', 
            'SC', 'SC (PwD)', 
            'ST', 'ST (PwD)', 
            'EWS', 'EWS (PwD)'
          ]}
          value={formData.category}
          error={errors.category}
          onChange={(v: string) => {
            updateField('category', v);
            if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
          }}
        />

        {showDomicile && (
          <SearchableSelect
            label="Domicile State"
            required
            options={INDIAN_STATES}
            value={formData.domicileState}
            error={errors.domicileState}
            onChange={(v: string) => {
              updateField('domicileState', v);
              if (errors.domicileState) setErrors(prev => ({ ...prev, domicileState: '' }));
            }}
          />
        )}

        <MultiSelectChips
          label="Seat Type"
          sublabel="Select all that apply to you"
          required
          options={['General', 'EWS', 'OBC-NCL', 'SC', 'ST', 'PwD', 'Defence', 'Kashmiri Migrant', 'Others*']}
          value={formData.seatType || []}
          error={errors.seatType}
          onChange={(v: string[]) => {
            updateField('seatType', v);
            if (errors.seatType) setErrors(prev => ({ ...prev, seatType: '' }));
          }}
        />

        {/* Minority section only if not in dedicated quota step */}
        {!hasDedicatedQuotaStep && (
          <>
            <RadioCards
              label="Are you a Minority?"
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
              <TextInput
                label="Minority Type / Name"
                required
                sublabel="Example: Linguistic (Hindi/Gujarati/etc), Religious (Muslim/Christian/etc), etc*"
                placeholder="Specify your minority category"
                value={formData.minorityDetails}
                error={errors.minorityDetails}
                onChange={(e) => {
                  updateField('minorityDetails', e.target.value);
                  if (errors.minorityDetails) setErrors(prev => ({ ...prev, minorityDetails: '' }));
                }}
              />
            </ConditionalSection>
          </>
        )}
      </div>

      <div className="mt-12">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
