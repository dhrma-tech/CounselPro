"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { NumberInput } from '../../fields/TextInput';
import { DecimalInput } from '../../fields/DecimalInput';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

import { RadioCards } from '../../fields/RadioCards';
import { ConditionalSection } from '../../fields/ConditionalSection';

const ScoreSection = ({ type, title, formData, updateField }: any) => {
  const hasGroup = formData[`has${type}`] === 'Yes';

  return (
    <div className="space-y-6">
      <RadioCards
        label={`Did you appear for MHT-CET ${type}?`}
        options={['Yes', 'No']}
        gridCols={2}
        value={formData[`has${type}`] || 'No'}
        onChange={(v: string) => updateField(`has${type}`, v)}
      />

      <ConditionalSection isVisible={hasGroup} label={`${type} Group Details`}>
        <div className="space-y-4 p-5 bg-surface-light/50 rounded-2xl border border-border/50">
          <h3 className="font-ui font-bold text-[14px] text-text-primary uppercase tracking-wider mb-2">{title}</h3>
          <div className="grid grid-cols-1 gap-5">
            <DecimalInput
              label={`MHT-CET Percentile (${type})`}
              placeholder="e.g. 87.45"
              value={formData[`mhtcetPercentile${type}`] || (type === 'PCM' ? formData.mhtcetPercentile : '') || ''}
              onChange={(e: any) => updateField(`mhtcetPercentile${type}`, e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label={`All State / Merit Rank (${type})`}
                placeholder="e.g. 15230"
                value={formData[`mhtcetMeritRank${type}`] || (type === 'PCM' ? formData.mhtcetAllStateMeritRank : '') || ''}
                onChange={(e: any) => updateField(`mhtcetMeritRank${type}`, e.target.value)}
              />
              <NumberInput
                label={`Category Rank (${type})`}
                placeholder="e.g. 4500"
                value={formData[`mhtcetCategoryRank${type}`] || (type === 'PCM' ? formData.mhtcetCategoryRank : '') || ''}
                onChange={(e: any) => updateField(`mhtcetCategoryRank${type}`, e.target.value)}
              />
            </div>
          </div>
        </div>
      </ConditionalSection>
    </div>
  );
};

export const MHT_CET_ScoreStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  
  const isNursing = counsellingType === 'MHT_CET_BSc_Nursing';
  const isAgri = counsellingType === 'MHT_CET_BSc_Agriculture';

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="MHT-CET Scores" />
      
      <div className="space-y-12">
        {isNursing ? (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-text-primary">B.Sc. Nursing CET Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-surface-light rounded-3xl border border-border/50">
              <NumberInput
                label="B.Sc. Nursing CET Marks"
                placeholder="e.g. 85"
                value={formData.nursingCetMarks || ''}
                onChange={(e: any) => updateField('nursingCetMarks', e.target.value)}
              />
              <DecimalInput
                label="B.Sc. Nursing CET Percentile"
                placeholder="e.g. 92.45"
                value={formData.nursingCetPercentile || ''}
                onChange={(e: any) => updateField('nursingCetPercentile', e.target.value)}
              />
              <NumberInput
                label="State Merit Rank"
                placeholder="e.g. 4230"
                value={formData.nursingCetStateRank || ''}
                onChange={(e: any) => updateField('nursingCetStateRank', e.target.value)}
              />
              <NumberInput
                label="Category Merit Rank"
                placeholder="e.g. 850"
                value={formData.nursingCetCategoryRank || ''}
                onChange={(e: any) => updateField('nursingCetCategoryRank', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            <ScoreSection 
              type="PCM" 
              title="PCM Group" 
              formData={formData} 
              updateField={updateField} 
            />
            <div className="h-px bg-border/50" />
            <ScoreSection 
              type="PCB" 
              title="PCB Group" 
              formData={formData} 
              updateField={updateField} 
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
