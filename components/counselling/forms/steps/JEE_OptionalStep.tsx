"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { ConditionalSection } from '../../fields/ConditionalSection';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const JEE_OptionalStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const hasJEE = formData.hasJEEScore === 'Yes';

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="JEE Score (Optional)" />
      
      <div className="space-y-6">
        <RadioCards
          label="Did you appear for JEE Mains?"
          options={['Yes', 'No']}
          gridCols={2}
          value={formData.hasJEEScore || 'No'}
          onChange={(v: string) => updateField('hasJEEScore', v)}
        />

        <ConditionalSection isVisible={hasJEE} label="JEE Score Details">
          <DecimalInput
            label="JEE Mains Percentile"
            value={formData.jeePercentile || ''}
            onChange={(e: any) => updateField('jeePercentile', e.target.value)}
          />
          <NumberInput
            label="JEE All India Rank"
            value={formData.jeeAllIndiaRank || ''}
            onChange={(e: any) => updateField('jeeAllIndiaRank', e.target.value)}
          />
        </ConditionalSection>
      </div>

      <StepFooter onNext={nextStep} />
    </div>
  );
};
