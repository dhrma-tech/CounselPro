"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { RadioCards } from '../../fields/RadioCards';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';
import { TextInput } from '../../fields/TextInput';
import { ConditionalSection } from '../../fields/ConditionalSection';

export const QuotaStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const handleNext = () => {
    const requiredFields = ['isPwd', 'isDefence', 'isOMS', 'isTFWS', 'isMinority'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert("Please answer all compulsory questions");
      return;
    }

    if (!formData.mahSeatType || formData.mahSeatType.length === 0) {
      alert("Please select at least one Seat Type");
      return;
    }

    if (formData.isMinority === 'Yes' && !formData.minorityDetails) {
      alert("Please specify your minority details");
      return;
    }

    nextStep();
  };

  const YES_NO = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Reservation & Quota" />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Person with Disability (PwD)"
            required
            options={YES_NO}
            value={formData.isPwd}
            onChange={(v: string) => updateField('isPwd', v)}
            gridCols={2}
          />
          <RadioCards
            label="Defence Quota"
            required
            options={YES_NO}
            value={formData.isDefence}
            onChange={(v: string) => updateField('isDefence', v)}
            gridCols={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Outside Maharashtra (OMS)"
            required
            options={YES_NO}
            value={formData.isOMS}
            onChange={(v: string) => updateField('isOMS', v)}
            gridCols={2}
          />
          <RadioCards
            label="Tuition Fee Waiver (TFWS)"
            required
            options={YES_NO}
            value={formData.isTFWS}
            onChange={(v: string) => updateField('isTFWS', v)}
            gridCols={2}
          />
        </div>

        <MultiSelectChips
          label="Seat Type Applicable"
          sublabel="Select all that apply to you"
          required
          options={[
            'Home University', 'Other Than Home University', 'State Level', 
            'Ladies', 'VJ-DT', 'NT-B', 'NT-C', 'NT-D', 'SBC', 'Defence', 
            'TFWS', 'PwD', 'EWS', 'MI', 'HA (Hilly Area)', 'D1 DEF1', 
            'D2 DEF2', 'D3 DEF3', 'Orphan C', 'Others*'
          ]}
          value={formData.mahSeatType || []}
          onChange={(v: string[]) => updateField('mahSeatType', v)}
        />

        <RadioCards
          label="Are you a Minority?"
          required
          options={YES_NO}
          value={formData.isMinority}
          onChange={(v: string) => updateField('isMinority', v)}
          gridCols={2}
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
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
