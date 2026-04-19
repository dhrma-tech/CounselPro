"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ExamType = 'JEE' | 'NEET' | 'MHTCET';
export type CounsellingType = 
  | 'JEE_JoSAA_Mains' | 'JEE_JoSAA_Advanced' | 'JEE_CSAB'
  | 'NEET_MCC_AllIndia' | 'NEET_MHT_State'
  | 'MHTCET_Engineering' | 'MHTCET_BSc_Nursing' | 'MHTCET_BSc_Agriculture';

interface ApplicationStore {
  // Pipeline stage
  currentStage: 1 | 2 | 3 | 4;
  currentStep: number;
  totalSteps: number;

  // Selections
  examType: ExamType | null;
  counsellingType: CounsellingType | null;

  // Form data
  formData: Record<string, any>;

  // Submission state
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  submissionId: string | null;
  errorMessage: string | null;

  // Actions
  setExamType: (exam: ExamType | null) => void;
  setCounsellingType: (type: CounsellingType | null) => void;
  updateField: (field: string, value: any) => void;
  setTotalSteps: (steps: number) => void;
  nextStage: () => void;
  prevStage: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setSubmissionStatus: (status: 'idle' | 'submitting' | 'success' | 'error') => void;
  setSubmissionId: (id: string | null) => void;
  setErrorMessage: (msg: string | null) => void;
  resetForm: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      currentStage: 1,
      currentStep: 1,
      totalSteps: 1,
      examType: null,
      counsellingType: null,
      formData: {},
      submissionStatus: 'idle',
      submissionId: null,
      errorMessage: null,

      setExamType: (exam) => set({ examType: exam, counsellingType: null, formData: {}, currentStep: 1 }),
      setCounsellingType: (type) => set({ counsellingType: type, currentStep: 1 }),
      updateField: (field, value) => set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
      setTotalSteps: (steps) => set({ totalSteps: steps }),

      nextStage: () => set((state) => ({ currentStage: (state.currentStage + 1) as any })),
      prevStage: () => set((state) => ({ currentStage: (state.currentStage - 1) as any })),

      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps) })),
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep === 1) {
          set({ currentStage: 2 });
        } else {
          set({ currentStep: currentStep - 1 });
        }
      },
      setStep: (step) => set({ currentStep: step }),

      setSubmissionStatus: (status) => set({ submissionStatus: status }),
      setSubmissionId: (id) => set({ submissionId: id }),
      setErrorMessage: (msg) => set({ errorMessage: msg }),

      resetForm: () => set({
        currentStage: 1,
        currentStep: 1,
        examType: null,
        counsellingType: null,
        formData: {},
        submissionStatus: 'idle',
        submissionId: null,
        errorMessage: null
      }),
    }),
    {
      name: 'counselpro-application-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
