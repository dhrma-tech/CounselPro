"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const MHT_CET_ScoreStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  
  const handleNext = () => {
    if (!formData.mhtcetPercentile || !formData.mhtcetAllStateMeritRank) {
      alert("Please fill MHT-CET Percentile and Merit Rank");
      return;
    }
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="MHT-CET Score" />
      
      <div className="space-y-6">
        <DecimalInput
          label="MHT-CET Percentile"
          placeholder="e.g. 87.45"
          required
          value={formData.mhtcetPercentile || ''}
          onChange={(e: any) => updateField('mhtcetPercentile', e.target.value)}
        />
        <NumberInput
          label="All State / Merit Rank"
          placeholder="e.g. 15230"
          required
          value={formData.mhtcetAllStateMeritRank || ''}
          onChange={(e: any) => updateField('mhtcetAllStateMeritRank', e.target.value)}
        />
        <NumberInput
          label="Category Rank"
          value={formData.mhtcetCategoryRank || ''}
          onChange={(e: any) => updateField('mhtcetCategoryRank', e.target.value)}
        />
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
