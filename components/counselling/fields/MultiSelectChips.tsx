"use client";

import React, { useState } from 'react';
import { TextInput } from './TextInput';

export const MultiSelectChips = ({ label, sublabel, options, value = [], onChange, required, error }: any) => {
  const [showOtherInput, setShowOtherInput] = useState(value.some((v: string) => !options.includes(v) && v !== 'Others*'));
  const hasOthers = options.includes('Others*');

  const toggleOption = (option: string) => {
    let newValue;
    if (value.includes(option)) {
      newValue = value.filter((v: string) => v !== option);
      if (option === 'Others*') setShowOtherInput(false);
    } else {
      newValue = [...value, option];
      if (option === 'Others*') setShowOtherInput(true);
    }
    onChange(newValue);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otherVal = e.target.value;
    const filtered = value.filter((v: string) => options.includes(v) || v === 'Others*');
    onChange([...filtered, otherVal]);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-0.5">
        <label className="font-ui font-semibold text-[14px] text-text-primary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {sublabel && <p className="text-[12px] text-text-muted leading-relaxed">{sublabel}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option: string) => {
          const isSelected = value.includes(option);
          return (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleOption(option)}
              className={`
                min-h-[40px] sm:min-h-[36px] px-4 py-2 rounded-full border text-[14px] font-medium cursor-pointer select-none
                transition-all duration-150 flex items-center gap-1.5 active:scale-95
                ${isSelected 
                  ? 'bg-brand-blue border-brand-blue text-white shadow-sm shadow-brand-blue/20 font-semibold' 
                  : 'bg-white border-border text-text-secondary hover:border-brand-blue/40 hover:bg-surface-light'}
              `}
            >
              {isSelected && <span className="text-[12px]">✓</span>}
              {option}
            </div>
          );
        })}
      </div>

      {showOtherInput && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <TextInput
            label="Specify Other"
            placeholder="Please specify..."
            onChange={handleOtherChange}
            value={value.find((v: string) => !options.includes(v)) || ''}
          />
        </div>
      )}
      
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
