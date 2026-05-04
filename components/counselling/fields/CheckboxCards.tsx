"use client";

import React from 'react';
import { Check } from 'lucide-react';

export const CheckboxCards = ({ 
  label, 
  sublabel, 
  options, 
  value = [], 
  onChange, 
  error, 
  required 
}: any) => {
  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((v: string) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label className="font-ui font-semibold text-[15px] text-text-primary flex items-center gap-1.5">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {sublabel && <p className="text-[13px] text-text-muted leading-relaxed">{sublabel}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option: string) => {
          const isSelected = value.includes(option);
          return (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`
                group relative flex items-start gap-4 p-5 cursor-pointer transition-all duration-300 rounded-2xl border-2
                ${isSelected 
                  ? 'bg-brand-blue/5 border-brand-blue shadow-lg shadow-brand-blue/5' 
                  : 'bg-white border-border/60 hover:border-brand-blue/40 hover:bg-surface-light'}
              `}
            >
              <div className={`
                mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                ${isSelected 
                  ? 'bg-brand-blue border-brand-blue' 
                  : 'bg-white border-border/80 group-hover:border-brand-blue/60'}
              `}>
                <Check className={`w-4 h-4 text-white transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              <div className="flex flex-col gap-1 pr-4">
                <span className={`
                  font-ui font-medium text-[15px] leading-snug transition-colors duration-300
                  ${isSelected ? 'text-brand-blue' : 'text-text-primary'}
                `}>
                  {option}
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 animate-in zoom-in-50 duration-300">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-[12px] text-red-500 font-medium ml-1 animate-in slide-in-from-top-1">{error}</p>}
    </div>
  );
};
