"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const MHT_CET_ScoreStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.mhtcetPercentile) newErrors.mhtcetPercentile = "Please enter your MHT-CET percentile score";
    if (!formData.mhtcetAllStateMeritRank) newErrors.mhtcetAllStateMeritRank = "All State Merit Rank is required for analysis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
          error={errors.mhtcetPercentile}
          onChange={(e: any) => {
            updateField('mhtcetPercentile', e.target.value);
            if (errors.mhtcetPercentile) setErrors(prev => ({ ...prev, mhtcetPercentile: '' }));
          }}
        />
        <NumberInput
          label="All State / Merit Rank"
          placeholder="e.g. 15230"
          required
          value={formData.mhtcetAllStateMeritRank || ''}
          error={errors.mhtcetAllStateMeritRank}
          onChange={(e: any) => {
            updateField('mhtcetAllStateMeritRank', e.target.value);
            if (errors.mhtcetAllStateMeritRank) setErrors(prev => ({ ...prev, mhtcetAllStateMeritRank: '' }));
          }}
        />
        <NumberInput
          label="Category Rank"
          value={formData.mhtcetCategoryRank || ''}
          onChange={(e: any) => updateField('mhtcetCategoryRank', e.target.value)}
        />
      </div>

      <div className="mt-10">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
