"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { RadioCards } from '../../fields/RadioCards';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';
import { TextInput } from '../../fields/TextInput';
import { ConditionalSection } from '../../fields/ConditionalSection';

export const QuotaStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['isPwd', 'isDefence', 'isOMS', 'isTFWS', 'isMinority', 'isOrphan'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This selection is mandatory";
      }
    });

    if (formData.isDefence === 'Yes' && !formData.defenceType) {
      newErrors.defenceType = "Please select your defence category";
    }

    if (formData.isMinority === 'Yes' && !formData.minorityDetails) {
      newErrors.minorityDetails = "Please specify your minority type/name";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
        {/* Row 1: PwD & Defence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Person with Disability (PwD)"
            required
            options={YES_NO}
            value={formData.isPwd}
            error={errors.isPwd}
            onChange={(v: string) => {
              updateField('isPwd', v);
              if (errors.isPwd) setErrors(prev => ({ ...prev, isPwd: '' }));
            }}
            gridCols={2}
          />
          <div className="space-y-4">
            <RadioCards
              label="Defence Quota"
              required
              options={YES_NO}
              value={formData.isDefence}
              error={errors.isDefence}
              onChange={(v: string) => {
                updateField('isDefence', v);
                if (errors.isDefence) setErrors(prev => ({ ...prev, isDefence: '' }));
              }}
              gridCols={2}
            />
            <ConditionalSection isVisible={formData.isDefence === 'Yes'}>
              <RadioCards
                label="Select Defence Category"
                required
                options={['DEF-1', 'DEF-2', 'DEF-3']}
                value={formData.defenceType}
                error={errors.defenceType}
                onChange={(v: string) => {
                  updateField('defenceType', v);
                  if (errors.defenceType) setErrors(prev => ({ ...prev, defenceType: '' }));
                }}
                gridCols={3}
              />
            </ConditionalSection>
          </div>
        </div>

        {/* Row 2: OMS & TFWS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Outside Maharashtra (OMS)"
            required
            options={YES_NO}
            value={formData.isOMS}
            error={errors.isOMS}
            onChange={(v: string) => {
              updateField('isOMS', v);
              if (errors.isOMS) setErrors(prev => ({ ...prev, isOMS: '' }));
            }}
            gridCols={2}
          />
          <RadioCards
            label="Tuition Fee Waiver (TFWS)"
            required
            options={YES_NO}
            value={formData.isTFWS}
            error={errors.isTFWS}
            onChange={(v: string) => {
              updateField('isTFWS', v);
              if (errors.isTFWS) setErrors(prev => ({ ...prev, isTFWS: '' }));
            }}
            gridCols={2}
          />
        </div>

        {/* Row 3: Orphan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RadioCards
            label="Are you an Orphan?"
            required
            options={YES_NO}
            value={formData.isOrphan}
            error={errors.isOrphan}
            onChange={(v: string) => {
              updateField('isOrphan', v);
              if (errors.isOrphan) setErrors(prev => ({ ...prev, isOrphan: '' }));
            }}
            gridCols={2}
          />
        </div>



        {/* Minority */}
        <div className="space-y-6 pt-4 border-t border-border/50">
          <RadioCards
            label="Are you a Minority?"
            required
            options={YES_NO}
            value={formData.isMinority}
            error={errors.isMinority}
            onChange={(v: string) => {
              updateField('isMinority', v);
              if (errors.isMinority) setErrors(prev => ({ ...prev, isMinority: '' }));
            }}
            gridCols={2}
          />

          <ConditionalSection isVisible={formData.isMinority === 'Yes'}>
            <TextInput
              label="Minority Type / Name"
              required
              sublabel="Example: Linguistic (Hindi/Gujarati/etc), Religious (Muslim/Christian/etc), etc*"
              placeholder="Specify your minority category"
              value={formData.minorityDetails}
              error={errors.minorityDetails}
              onChange={(e) => {
                updateField('minorityDetails', e.target.value);
                if (errors.minorityDetails) setErrors(prev => ({ ...prev, minorityDetails: '' }));
              }}
            />
          </ConditionalSection>
        </div>

      </div>

      <StepFooter onNext={handleNext} />
    </div>
  );
};
