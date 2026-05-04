"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { RadioCards } from '../../fields/RadioCards';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';
import { ConditionalSection } from '../../fields/ConditionalSection';

export const ArmedForcesStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.isArmedForces) {
      newErrors.isArmedForces = "Please answer this question";
    }

    if (formData.isArmedForces === 'Yes' && !formData.armedForcesBranch) {
      newErrors.armedForcesBranch = "Please select the service branch";
    }

    if (!formData.applyAFMC) {
      newErrors.applyAFMC = "Please answer this question";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Armed Forces Details" />
      
      <div className="space-y-8">
        <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
          <RadioCards
            label="Are your Parents retired or serving in the Indian Armed Forces?"
            required
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.isArmedForces}
            error={errors.isArmedForces}
            onChange={(v: string) => {
              updateField('isArmedForces', v);
              if (errors.isArmedForces) setErrors(prev => ({ ...prev, isArmedForces: '' }));
            }}
          />
        </div>

        <ConditionalSection isVisible={formData.isArmedForces === 'Yes'}>
          <div className="pt-4">
            <RadioCards
              label="Select Service Branch"
              required
              options={['Army', 'Navy', 'Air Force']}
              gridCols={3}
              value={formData.armedForcesBranch}
              error={errors.armedForcesBranch}
              onChange={(v: string) => {
                updateField('armedForcesBranch', v);
                if (errors.armedForcesBranch) setErrors(prev => ({ ...prev, armedForcesBranch: '' }));
              }}
            />
          </div>
        </ConditionalSection>

        <div className="pt-8 border-t border-border/50">
          <RadioCards
            label="Do you want to apply for Armed Forces Medical College (AFMC)?"
            required
            options={['Yes', 'No']}
            gridCols={2}
            value={formData.applyAFMC}
            error={errors.applyAFMC}
            onChange={(v: string) => {
              updateField('applyAFMC', v);
              if (errors.applyAFMC) setErrors(prev => ({ ...prev, applyAFMC: '' }));
            }}
          />
        </div>
      </div>

      <div className="mt-12">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
