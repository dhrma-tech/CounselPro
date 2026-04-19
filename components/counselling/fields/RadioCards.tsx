"use client";

import React from 'react';

export const RadioCards = ({ label, sublabel, options, value, onChange, required, error, gridCols = 2 }: any) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <label className="font-ui font-medium text-[13px] text-text-secondary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {sublabel && <p className="text-[12px] text-text-muted">{sublabel}</p>}
      </div>
      
      <div className={`grid gap-3 grid-cols-1 sm:grid-cols-${gridCols}`}>
        {options.map((option: any) => {
          const optionValue = option.value || option;
          const optionLabel = option.label || option;
          const isSelected = value === optionValue;
          
          return (
            <div
              key={optionValue}
              onClick={() => onChange(optionValue)}
              className={`
                h-auto min-h-[56px] border rounded-xl flex items-center px-4 py-3 gap-3 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue' 
                  : 'border-border bg-white hover:border-text-muted'}
              `}
            >
              <div className={`
                flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                ${isSelected ? 'border-brand-blue' : 'border-text-muted'}
              `}>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}
              </div>
              <span className={`font-ui text-[14px] font-medium leading-tight ${isSelected ? 'text-brand-blue' : 'text-text-primary'}`}>
                {optionLabel}
              </span>
            </div>
          );
        })}
      </div>
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
