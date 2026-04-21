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

  const hasDedicatedQuotaStep = counsellingType === 'MHTCET_Engineering' || counsellingType === 'MHTCET_Medical';
  const showDomicile = counsellingType !== 'JEE_JoSAA_Advanced';

  const handleNext = () => {
    if (!formData.gender || !formData.category) {
      alert("Please fill all required fields");
      return;
    }

    if (showDomicile && !formData.domicileState) {
      alert("Please select your domicile state");
      return;
    }

    if (!formData.seatType || formData.seatType.length === 0) {
      alert("Please select at least one Seat Type");
      return;
    }

    if (!hasDedicatedQuotaStep) {
      if (!formData.isMinority) {
        alert("Please answer the Minority question");
        return;
      }
      if (formData.isMinority === 'Yes' && !formData.minorityDetails) {
        alert("Please specify your minority details");
        return;
      }
    }

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
          onChange={(v: string) => updateField('gender', v)}
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
          onChange={(v: string) => updateField('category', v)}
        />

        {showDomicile && (
          <SearchableSelect
            label="Domicile State"
            required
            options={INDIAN_STATES}
            value={formData.domicileState}
            onChange={(v: string) => updateField('domicileState', v)}
          />
        )}

        <MultiSelectChips
          label="Seat Type"
          sublabel="Select all that apply to you"
          required
          options={['General', 'EWS', 'OBC-NCL', 'SC', 'ST', 'PwD', 'Defence', 'Kashmiri Migrant', 'Others*']}
          value={formData.seatType || []}
          onChange={(v: string[]) => updateField('seatType', v)}
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
              onChange={(v: string) => updateField('isMinority', v)}
            />

            <ConditionalSection isVisible={formData.isMinority === 'Yes'}>
              <TextInput
                label="Minority Type / Name"
                required
                sublabel="Example: Linguistic (Hindi/Gujarati/etc), Religious (Muslim/Christian/etc), etc*"
                placeholder="Specify your minority category"
                value={formData.minorityDetails}
                onChange={(e) => updateField('minorityDetails', e.target.value)}
              />
            </ConditionalSection>
          </>
        )}
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
