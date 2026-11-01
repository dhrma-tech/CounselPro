"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, X } from 'lucide-react';
import { useApplicationStore, type ExamType } from '@/store/applicationStore';
import { useSessionFlag } from '@/lib/tests/client/hooks';

/**
 * Bridge from a test result into the existing counselling application (/apply).
 * Uses only the store's existing actions, and only pre-selects the exam when no
 * application draft is in progress.
 */
export default function BridgeCard({ examFamily, examLabel, percentile }: { examFamily: ExamType; examLabel: string; percentile: number | null }) {
  const router = useRouter();
  const [dismissed, dismiss] = useSessionFlag(`cp_bridge_dismissed_${examFamily}`, false);

  if (dismissed) return null;

  const open = () => {
    const state = useApplicationStore.getState();
    if (state.currentStage === 1 && !state.examType && Object.keys(state.formData).length === 0) {
      state.setExamType(examFamily);
      state.nextStage();
    }
    router.push('/apply');
  };

  return (
    <div className="relative bg-brand-navy text-white rounded-[24px] p-6 sm:p-8 overflow-hidden print:hidden">
      <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-brand-blue/30 blur-2xl" aria-hidden />
      <button onClick={dismiss} className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <Compass className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-[24px] leading-tight mb-1">Plan your {examLabel} counselling</h3>
          <p className="text-[14px] text-white/75 leading-relaxed">
            {percentile != null
              ? `At around the ${percentile.toFixed(1)} percentile, picking the right colleges and their order matters a lot. `
              : 'Your score is only half the story. Picking the right colleges and their order matters a lot. '}
            A CounselPro counsellor reviews your profile and helps you with choice filling.
          </p>
        </div>
        <button onClick={open} className="shrink-0 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-brand-navy font-ui font-bold text-[14px] hover:bg-blue-50 transition-all">
          Get counselling help <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
