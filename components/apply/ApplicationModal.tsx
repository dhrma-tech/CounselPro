"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationData } from '@/lib/types';
import { submitToSheets } from '@/lib/submitToSheets';
import { X, Loader2 } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { Step1CounsellingType, Step2PersonalDetails, Step3ExamDetails, Step4Preferences, Step5Review } from './Steps';

const initialData: ApplicationData = {
  counsellingType: '',
  name: '',
  phone: '',
  email: '',
  city: '',
  state: 'Maharashtra',
  examDetails: {},
  branches: [],
  collegeTypes: [],
  feeBudget: '',
  specificColleges: '',
  consent: false,
  submittedAt: ''
};

export default function ApplicationModal({ isPage = false, onClose }: { isPage?: boolean, onClose?: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [isError, setIsError] = useState(false);
  const triggerError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 500);
  };

  const nextStep = () => {
    if (step === 2 && (!data.name || !data.phone || !data.email || !data.city)) {
       triggerError();
       return;
    }
    if (step === 3 && data.counsellingType === 'JoSAA' && !data.examDetails.jeePercentile) {
       triggerError();
       return;
    }
    setStep((s) => Math.min(s + 1, 5));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const handleClose = () => {
    if (onClose) onClose();
    else router.push('/');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await submitToSheets(data);
      if (onClose) onClose();
      router.push('/thank-you');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalClasses = isPage 
    ? "w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden" 
    : "relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8";

  const progress = (step / 5) * 100;

  const content = (
    <motion.div 
      className={modalClasses}
      animate={{ 
        x: isError ? [0, -10, 10, -10, 10, 0] : 0
      }}
      transition={{ x: { duration: 0.4 } }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-surface-light z-[1]">
        <motion.div 
          className="h-full bg-brand-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="font-display text-[20px] text-brand-navy flex items-baseline">
          CounselPro<span className="text-brand-blue font-bold text-2xl leading-[0]">.</span>
        </div>
        <button onClick={handleClose} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-surface-light transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="pt-8 px-8 hidden sm:block">
        <StepIndicator currentStep={step} />
      </div>

      {/* Form Area pb-0 for buttons later */}
      <div className="p-6 sm:p-8 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {step === 1 && <Step1CounsellingType data={data} setData={setData} />}
            {step === 2 && <Step2PersonalDetails data={data} setData={setData} />}
            {step === 3 && <Step3ExamDetails data={data} setData={setData} />}
            {step === 4 && <Step4Preferences data={data} setData={setData} />}
            {step === 5 && <Step5Review data={data} setData={setData} onEdit={setStep} />}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-surface-light border-t border-border flex items-center justify-between gap-4">
        {step > 1 ? (
          <button 
            onClick={prevStep}
            className="px-6 py-2.5 rounded-lg border border-border bg-white text-text-secondary font-medium text-sm hover:bg-surface-light hover:text-text-primary"
          >
            &larr; Back
          </button>
        ) : <div />}

        {step < 5 ? (
          <button 
            onClick={nextStep}
            className="px-8 py-2.5 rounded-lg bg-brand-blue text-white font-medium text-sm hover:bg-[#1648c0] disabled:opacity-50 transition-colors"
          >
            Next Step
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={!data.consent || isSubmitting}
            className="flex-1 max-w-[240px] px-8 py-3 rounded-lg bg-brand-blue text-white font-medium text-[15px] hover:bg-[#1648c0] disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </motion.div>
  );

  if (isPage) return content;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {content}
      </div>
    </div>
  );
}
