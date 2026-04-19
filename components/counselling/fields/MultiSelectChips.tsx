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
      <div className="flex flex-col">
        <label className="font-ui font-medium text-[13px] text-text-secondary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {sublabel && <p className="text-[12px] text-text-muted">{sublabel}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option: string) => {
          const isSelected = value.includes(option);
          return (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`
                px-4 py-2 rounded-full border text-[13px] font-medium cursor-pointer transition-all duration-150
                ${isSelected 
                  ? 'bg-brand-blue/5 border-brand-blue text-brand-blue font-semibold' 
                  : 'bg-surface-light border-border text-text-secondary hover:border-text-muted'}
              `}
            >
              {isSelected && <span className="mr-1.5">✓</span>}
              {option}
            </div>
          );
        })}
      </div>

      {showOtherInput && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <TextInput
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
