"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const RankScoreStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();

  const handleNext = () => {
    // Basic validation logic
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
              onChange={(e: any) => updateField('airRank', e.target.value)}
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
              onChange={(e: any) => updateField('percentile', e.target.value)}
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
              onChange={(e: any) => updateField('airRank', e.target.value)}
            />
            <NumberInput
              label="NEET Marks (out of 720)"
              placeholder="e.g. 612"
              suffix="/ 720"
              value={formData.marks || ''}
              onChange={(e: any) => updateField('marks', e.target.value)}
            />
            <DecimalInput
              label="NEET Percentile"
              required
              value={formData.percentile || ''}
              onChange={(e: any) => updateField('percentile', e.target.value)}
            />
          </>
        )}
      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
