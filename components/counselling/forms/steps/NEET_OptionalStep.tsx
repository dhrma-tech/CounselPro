"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { NumberInput } from '../../fields/TextInput';
import { ConditionalSection } from '../../fields/ConditionalSection';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const NEET_OptionalStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const hasNEET = formData.hasNEETScore === 'Yes';

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="NEET Score (Optional)" />
      
      <div className="space-y-6">
        <RadioCards
          label="Did you appear for NEET?"
          options={['Yes', 'No']}
          gridCols={2}
          value={formData.hasNEETScore || 'No'}
          onChange={(v: string) => updateField('hasNEETScore', v)}
        />

        <ConditionalSection isVisible={hasNEET} label="NEET Score Details">
          <NumberInput
            label="NEET Score (/720)"
            placeholder="Score out of 720"
            value={formData.neetScore || ''}
            onChange={(e: any) => updateField('neetScore', e.target.value)}
          />
          <NumberInput
            label="NEET All India Rank"
            value={formData.neetAllIndiaRank || ''}
            onChange={(e: any) => updateField('neetAllIndiaRank', e.target.value)}
          />
        </ConditionalSection>
      </div>

      <StepFooter onNext={nextStep} />
    </div>
  );
};
