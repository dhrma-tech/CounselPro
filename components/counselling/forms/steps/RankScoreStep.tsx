"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const RankScoreStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const isJEE = counsellingType?.startsWith('JEE');
    const isNEET = counsellingType?.startsWith('NEET');
    const newErrors: Record<string, string> = {};

    if (isJEE) {
      if (!formData.airRank) newErrors.airRank = "Please enter your All India Rank (AIR)";
      if (!formData.percentile) newErrors.percentile = "Percentile score is required for cut-off analysis";
    }

    if (isNEET) {
      if (!formData.airRank) newErrors.airRank = "Please enter your NEET All India Rank";
      if (!formData.marks) newErrors.marks = "Please provide your NEET marks (out of 720)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    nextStep();
  };

  const isJEE = counsellingType?.startsWith('JEE');
  const isNEET = counsellingType?.startsWith('NEET');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Rank & Score" />
      
      <div className="space-y-6">
        {isJEE && (
          <>
            <NumberInput
              label="All India Rank (AIR)"
              placeholder="e.g. 45230"
              required
              suffix="AIR"
              value={formData.airRank || ''}
              error={errors.airRank}
              onChange={(e: any) => {
                updateField('airRank', e.target.value);
                if (errors.airRank) setErrors(prev => ({ ...prev, airRank: '' }));
              }}
            />
            <NumberInput
              label="Category Rank"
              placeholder="e.g. 3210"
              suffix="Category"
              value={formData.categoryRank || ''}
              onChange={(e: any) => updateField('categoryRank', e.target.value)}
            />
            <DecimalInput
              label="Percentile Score"
              placeholder="e.g. 94.65"
              required
              value={formData.percentile || ''}
              error={errors.percentile}
              onChange={(e: any) => {
                updateField('percentile', e.target.value);
                if (errors.percentile) setErrors(prev => ({ ...prev, percentile: '' }));
              }}
            />
          </>
        )}

        {isNEET && (
          <>
            <NumberInput
              label="NEET All India Rank (AIR)"
              required
              suffix="AIR"
              value={formData.airRank || ''}
              error={errors.airRank}
              onChange={(e: any) => {
                updateField('airRank', e.target.value);
                if (errors.airRank) setErrors(prev => ({ ...prev, airRank: '' }));
              }}
            />
            <NumberInput
              label="NEET Marks (out of 720)"
              placeholder="e.g. 612"
              required
              suffix="/ 720"
              value={formData.marks || ''}
              error={errors.marks}
              onChange={(e: any) => {
                updateField('marks', e.target.value);
                if (errors.marks) setErrors(prev => ({ ...prev, marks: '' }));
              }}
            />
            <DecimalInput
              label="NEET Percentile"
              placeholder="(Optional)"
              value={formData.percentile || ''}
              onChange={(e: any) => updateField('percentile', e.target.value)}
            />
          </>
        )}
      </div>

      <div className="mt-10">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
