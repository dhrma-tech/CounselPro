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
import { MHT_CET_ScoreStep } from './steps/MHT_CET_ScoreStep';
import { JEE_OptionalStep } from './steps/JEE_OptionalStep';
import { CoursePreferencesStep } from './steps/CoursePreferencesStep';
import { NEET_OptionalStep } from './steps/NEET_OptionalStep';
import { CombinedOptionalExamsStep } from './steps/CombinedOptionalExamsStep';
import { ArmedForcesStep } from './steps/ArmedForcesStep';

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
  const { counsellingType, setCounsellingType, currentStep, setTotalSteps } = useApplicationStore();

  // Self-healing: Migrate old counselling types to new format
  useEffect(() => {
    if (counsellingType && (counsellingType as string).startsWith('MHTCET_')) {
      const newType = (counsellingType as string).replace('MHTCET_', 'MHT_CET_') as any;
      setCounsellingType(newType);
    }
  }, [counsellingType, setCounsellingType]);

  const config = counsellingType ? FORM_CONFIGS[counsellingType as keyof typeof FORM_CONFIGS] : null;

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
    case 'MHT_CET_ScoreStep':
      return <MHT_CET_ScoreStep />;
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
    case 'CombinedOptionalExamsStep':
      return <CombinedOptionalExamsStep />;
    case 'ArmedForcesStep':
      return <ArmedForcesStep />;
    case 'ReviewStep':
      return <ReviewStep />;
    default:
      return <PlaceholderStep title={currentStepConfig.title} />;
  }
};
