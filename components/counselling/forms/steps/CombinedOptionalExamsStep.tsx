"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { ConditionalSection } from '../../fields/ConditionalSection';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const CombinedOptionalExamsStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const hasJEE = formData.hasJEEScore === 'Yes';
  const hasNEET = formData.hasNEETScore === 'Yes';

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Optional Exam Scores" />
      
      <div className="space-y-10">
        {/* JEE Section */}
        <div className="space-y-6">
          <RadioCards
            label="Did you appear for JEE Mains?"
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.hasJEEScore || 'No'}
            onChange={(v: string) => updateField('hasJEEScore', v)}
          />

          <ConditionalSection isVisible={hasJEE} label="JEE Score Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DecimalInput
                label="JEE Mains Percentile"
                placeholder="e.g. 98.5"
                value={formData.jeePercentile || ''}
                onChange={(e: any) => updateField('jeePercentile', e.target.value)}
              />
              <NumberInput
                label="JEE All India Rank"
                placeholder="e.g. 25000"
                value={formData.jeeAllIndiaRank || ''}
                onChange={(e: any) => updateField('jeeAllIndiaRank', e.target.value)}
              />
            </div>
          </ConditionalSection>
        </div>

        <div className="h-px bg-border/50" />

        {/* NEET Section */}
        <div className="space-y-6">
          <RadioCards
            label="Did you appear for NEET?"
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.hasNEETScore || 'No'}
            onChange={(v: string) => updateField('hasNEETScore', v)}
          />

          <ConditionalSection isVisible={hasNEET} label="NEET Score Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="NEET Score (/720)"
                placeholder="e.g. 620"
                value={formData.neetScore || ''}
                onChange={(e: any) => updateField('neetScore', e.target.value)}
              />
              <NumberInput
                label="NEET All India Rank"
                placeholder="e.g. 15000"
                value={formData.neetAllIndiaRank || ''}
                onChange={(e: any) => updateField('neetAllIndiaRank', e.target.value)}
              />
            </div>
          </ConditionalSection>
        </div>
      </div>

      <div className="mt-12">
        <StepFooter onNext={nextStep} />
      </div>
    </div>
  );
};
