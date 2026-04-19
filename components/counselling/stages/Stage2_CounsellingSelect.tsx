"use client";

import React from 'react';
import { useApplicationStore, CounsellingType } from '@/store/applicationStore';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const COUNSELLING_MAP: Record<string, { id: CounsellingType; label: string; sub: string; short: string }[]> = {
  JEE: [
    { id: 'JEE_JoSAA_Mains', label: 'JoSAA — JEE Mains', sub: 'NITs, IIITs, GFTIs', short: 'JoSAA' },
    { id: 'JEE_JoSAA_Advanced', label: 'JoSAA — JEE Advanced', sub: 'IITs', short: 'IIT' },
    { id: 'JEE_CSAB', label: 'CSAB — Special Round', sub: 'Vacant Seats in NIT+ System', short: 'CSAB' },
  ],
  NEET: [
    { id: 'NEET_MCC_AllIndia', label: 'MCC All India Counselling', sub: '15% AIQ, Deemed, Central Uni', short: 'MCC' },
    { id: 'NEET_MHT_State', label: 'MHT State Counselling', sub: '85% State Quota (Maharashtra)', short: 'MHT' },
  ],
  MHTCET: [
    { id: 'MHTCET_Engineering', label: 'MHT-CET Engineering', sub: 'B.Tech / B.E.', short: 'ENGG' },
    { id: 'MHTCET_BSc_Nursing', label: 'MHT-CET B.Sc Nursing', sub: 'Paramedical Courses', short: 'NURSE' },
    { id: 'MHTCET_BSc_Agriculture', label: 'MHT-CET B.Sc Agriculture', sub: 'Agricultural Programs', short: 'AGRI' },
  ],
};

export const Stage2_CounsellingSelect = () => {
  const { examType, counsellingType, setCounsellingType, nextStage, prevStage } = useApplicationStore();

  const options = examType ? COUNSELLING_MAP[examType] || [] : [];

  const handleSelect = (id: CounsellingType) => {
    setCounsellingType(id);
    nextStage();
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <button 
        onClick={prevStage}
        className="flex items-center gap-2 text-text-muted hover:text-brand-blue mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Change Exam</span>
      </button>

      <div className="text-center mb-10">
        <h1 className="font-display text-3xl text-text-primary mb-3">Select Counselling Body</h1>
        <p className="text-text-muted">Choose where you are applying.</p>
      </div>

      <div className="space-y-4">
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`
              group min-h-[82px] bg-white border rounded-2xl flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-200
              ${counsellingType === opt.id ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg shadow-brand-blue/10 bg-brand-blue/5' : 'border-border hover:border-brand-blue/50 hover:shadow-md'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 bg-brand-blue/10 rounded-lg">
                <span className="font-mono text-[11px] font-bold text-brand-blue">{opt.short}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-ui font-medium text-[16px] text-text-primary">{opt.label}</span>
                <span className="text-[12px] text-text-muted">{opt.sub}</span>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 transition-all duration-300 ${counsellingType === opt.id ? 'text-brand-blue translate-x-1' : 'text-text-muted group-hover:text-brand-blue group-hover:translate-x-1'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
