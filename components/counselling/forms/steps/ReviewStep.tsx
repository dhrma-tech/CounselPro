"use client";

import React, { useState } from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';
import { submitToGoogleSheets } from '@/lib/submission';
import { CheckCircle2, Edit3 } from 'lucide-react';

const SummarySection = ({ title, fields, stepIndex, setStep }: any) => (
  <div className="bg-white border border-border rounded-2xl overflow-hidden mb-6">
    <div className="bg-surface-light px-6 py-3 border-b border-border flex items-center justify-between">
      <h3 className="font-ui font-bold text-[14px] text-text-primary uppercase tracking-wider">{title}</h3>
      <button 
        onClick={() => setStep(stepIndex)}
        className="text-brand-blue hover:underline flex items-center gap-1.5 text-[12px] font-semibold"
      >
        <Edit3 className="w-3 h-3" /> Edit
      </button>
    </div>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
      {fields.map(([label, value]: any) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span className="text-[12px] text-text-muted font-medium uppercase tracking-tight">{label}</span>
          <span className="text-[14px] text-text-primary font-medium truncate">
            {Array.isArray(value) ? value.join(', ') : (value || '—')}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const ReviewStep = () => {
  const { 
    formData, 
    counsellingType, 
    nextStage, 
    submissionStatus,
    errorMessage,
    setSubmissionStatus, 
    setSubmissionId, 
    setErrorMessage, 
    setStep 
  } = useApplicationStore();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isConfirmed) return;
    
    setIsSubmitting(true);
    setSubmissionStatus('submitting');
    
    try {
      const result = await submitToGoogleSheets({
        counsellingType: counsellingType!,
        fields: formData
      });
      
      setSubmissionId(result.id);
      setSubmissionStatus('success');
      nextStage();
    } catch (error: any) {
      setSubmissionStatus('error');
      setErrorMessage(error.message || 'Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Review & Submit" />
      
      <div className="space-y-2 mb-8">
        <SummarySection 
          title="Contact Details" 
          stepIndex={1}
          setStep={setStep}
          fields={[
            ['Full Name', formData.candidateName],
            ['Phone', formData.phone],
            ['WhatsApp', formData.whatsappNumber],
            ['Email', formData.email],
            ['Referral Code', formData.referralCode || 'None'],
          ]} 
        />

        <SummarySection 
          title="Reservation & Minority" 
          stepIndex={3} // Approximate step index for personal/quota
          setStep={setStep}
          fields={[
            ['Category', formData.category],
            ['Minority Status', formData.isMinority || 'No'],
            ['Minority Details', formData.isMinority === 'Yes' ? formData.minorityDetails : 'N/A'],
            ['Seat Types', formData.seatType || formData.mahSeatType],
          ]} 
        />
        
        <SummarySection 
          title="Exam Scores" 
          stepIndex={2}
          setStep={setStep}
          fields={[
            ...(formData.hasPCM === 'Yes' ? [
              ['MHT-CET PCM Percentile', formData.mhtcetPercentilePCM || formData.mhtcetPercentile],
              ['PCM Merit Rank', formData.mhtcetMeritRankPCM || formData.mhtcetAllStateMeritRank],
              ['PCM Category Rank', formData.mhtcetCategoryRankPCM || formData.mhtcetCategoryRank]
            ] : []),
            ...(formData.hasPCB === 'Yes' ? [
              ['MHT-CET PCB Percentile', formData.mhtcetPercentilePCB],
              ['PCB Merit Rank', formData.mhtcetMeritRankPCB],
              ['PCB Category Rank', formData.mhtcetCategoryRankPCB]
            ] : []),
            ...(formData.hasJEEScore === 'Yes' ? [
              ['JEE Percentile', formData.jeePercentile],
              ['JEE AIR', formData.jeeAllIndiaRank]
            ] : []),
            ...(formData.hasNEETScore === 'Yes' ? [
              ['NEET Score', formData.neetScore],
              ['NEET AIR', formData.neetAllIndiaRank]
            ] : []),
          ]} 
        />
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 mb-10">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              checked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
            />
            <div className="w-5 h-5 border-2 border-border rounded-md peer-checked:bg-brand-blue peer-checked:border-brand-blue transition-all" />
            <CheckCircle2 className="absolute inset-0 w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform p-0.5" />
          </div>
          <span className="text-[14px] text-text-secondary leading-normal group-hover:text-text-primary transition-colors">
            By submitting this form, I confirm that all information provided is accurate to the best of my knowledge. CounselPro will use this to provide personalized counselling assistance.
          </span>
        </label>
      </div>

      {submissionStatus === 'error' && errorMessage && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[14px] text-red-600 font-medium text-center">
            {errorMessage}
          </p>
        </div>
      )}

      <StepFooter 
        onNext={handleSubmit} 
        isNextDisabled={!isConfirmed} 
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
