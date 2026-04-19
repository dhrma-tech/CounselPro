"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { SearchableSelect } from '../../fields/SearchableSelect';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { INDIAN_STATES } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const PersonalDetailsStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();

  const handleNext = () => {
    if (!formData.gender || !formData.category) {
      alert("Please fill required fields");
      return;
    }
    nextStep();
  };

  const showDomicile = counsellingType !== 'JEE_JoSAA_Advanced';

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
          options={['General', 'EWS', 'OBC-NCL', 'SC', 'ST', 'PwD', 'Defence', 'Kashmiri Migrant', 'Others*']}
          value={formData.seatType || []}
          onChange={(v: string[]) => updateField('seatType', v)}
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
