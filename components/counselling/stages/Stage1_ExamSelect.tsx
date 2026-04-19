"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { ChevronRight } from 'lucide-react';

const EXAMS = [
  { id: 'JEE', name: 'Joint Entrance Examination', short: 'JEE' },
  { id: 'NEET', name: 'National Eligibility cum Entrance Test', short: 'NEET' },
  { id: 'MHTCET', name: 'Maharashtra Common Entrance Test', short: 'MHT-CET' },
];

export const Stage1_ExamSelect = () => {
  const { examType, setExamType, nextStage } = useApplicationStore();

  const handleSelect = (id: any) => {
    setExamType(id);
    nextStage();
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl text-text-primary mb-3">Which exam did you appear for?</h1>
        <p className="text-text-muted">We will guide your counselling journey from here.</p>
      </div>

      <div className="space-y-4">
        {EXAMS.map((exam) => (
          <div
            key={exam.id}
            onClick={() => handleSelect(exam.id)}
            className={`
              group h-[72px] bg-white border rounded-2xl flex items-center justify-between px-6 cursor-pointer transition-all duration-200
              ${examType === exam.id ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg shadow-brand-blue/10 bg-brand-blue/5' : 'border-border hover:border-brand-blue/50 hover:shadow-md'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 bg-brand-blue/10 rounded-lg">
                <span className="font-mono text-[13px] font-bold text-brand-blue">{exam.short}</span>
              </div>
              <span className="font-ui font-medium text-[16px] text-text-primary">{exam.name}</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-all duration-300 ${examType === exam.id ? 'text-brand-blue translate-x-1' : 'text-text-muted group-hover:text-brand-blue group-hover:translate-x-1'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
