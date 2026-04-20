"use client";

import React, { useEffect } from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { FORM_CONFIGS } from '@/lib/formConfigs';
import { GlobalStep } from './GlobalStep';
import { ReviewStep } from './steps/ReviewStep';
import { PersonalDetailsStep } from './steps/PersonalDetailsStep';
import { RankScoreStep } from './steps/RankScoreStep';
import { QuotaStep } from './steps/QuotaStep';
import { AcademicPreferencesStep } from './steps/AcademicPreferencesStep';
import { MHTCET_ScoreStep } from './steps/MHTCET_ScoreStep';
import { JEE_OptionalStep } from './steps/JEE_OptionalStep';
import { CoursePreferencesStep } from './steps/CoursePreferencesStep';
import { NEET_OptionalStep } from './steps/NEET_OptionalStep';

// Placeholder common steps
const PlaceholderStep = ({ title }: { title: string }) => {
  const { nextStep } = useApplicationStore();
  return (
    <div className="py-12 text-center bg-surface-light rounded-3xl border-2 border-dashed border-border">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-text-muted mb-8 italic">Step component in development...</p>
      <button onClick={nextStep} className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold">Skip for now</button>
    </div>
  );
};

export const FormRouter = () => {
  const { counsellingType, currentStep, setTotalSteps } = useApplicationStore();

  const config = counsellingType ? FORM_CONFIGS[counsellingType] : null;

  useEffect(() => {
    if (config) {
      setTotalSteps(config.steps.length);
    }
  }, [config, setTotalSteps]);

  if (!config) return null;

  const currentStepConfig = config.steps[currentStep - 1];

  switch (currentStepConfig.component) {
    case 'GlobalStep':
      return <GlobalStep />;
    case 'RankScoreStep':
      return <RankScoreStep />;
    case 'MHTCET_ScoreStep':
      return <MHTCET_ScoreStep />;
    case 'JEE_OptionalStep':
      return <JEE_OptionalStep />;
    case 'PersonalDetailsStep':
      return <PersonalDetailsStep />;
    case 'QuotaStep':
      return <QuotaStep />;
    case 'AcademicPreferencesStep':
      return <AcademicPreferencesStep />;
    case 'CoursePreferencesStep':
      return <CoursePreferencesStep />;
    case 'NEET_OptionalStep':
      return <NEET_OptionalStep />;
    case 'ReviewStep':
      return <ReviewStep />;
    default:
      return <PlaceholderStep title={currentStepConfig.title} />;
  }
};
