"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { RadioCards } from '../../fields/RadioCards';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const QuotaStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const handleNext = () => {
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
            options={YES_NO}
            value={formData.isPwd}
            onChange={(v: string) => updateField('isPwd', v)}
            gridCols={2}
          />
          <RadioCards
            label="Defence Quota"
            options={YES_NO}
            value={formData.isDefence}
            onChange={(v: string) => updateField('isDefence', v)}
            gridCols={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Outside Maharashtra (OMS)"
            options={YES_NO}
            value={formData.isOMS}
            onChange={(v: string) => updateField('isOMS', v)}
            gridCols={2}
          />
          <RadioCards
            label="Tuition Fee Waiver (TFWS)"
            options={YES_NO}
            value={formData.isTFWS}
            onChange={(v: string) => updateField('isTFWS', v)}
            gridCols={2}
          />
        </div>

        <MultiSelectChips
          label="Seat Type Applicable"
          sublabel="Select all that apply to you"
          options={[
            'Home University', 'Other Than Home University', 'State Level', 
            'Ladies', 'VJ-DT', 'NT-B', 'NT-C', 'NT-D', 'SBC', 'Defence', 
            'TFWS', 'PwD', 'EWS', 'MI', 'Others*'
          ]}
          value={formData.mahSeatType || []}
          onChange={(v: string[]) => updateField('mahSeatType', v)}
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
