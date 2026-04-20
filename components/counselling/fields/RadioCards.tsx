"use client";

import React from 'react';

export const RadioCards = ({ label, sublabel, options, value, onChange, required, error, gridCols = 2 }: any) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-0.5">
        <label className="font-ui font-semibold text-[14px] text-text-primary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {sublabel && <p className="text-[12px] text-text-muted leading-relaxed">{sublabel}</p>}
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onChange(optionValue)}
              className={`
                min-h-[52px] border rounded-xl flex items-center px-4 py-3 gap-3 cursor-pointer select-none
                transition-all duration-200 active:scale-[0.99]
                ${isSelected 
                  ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20' 
                  : 'border-border bg-white hover:border-brand-blue/30 hover:bg-surface-light'}
              `}
            >
              <div className={`
                flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isSelected ? 'border-brand-blue bg-brand-blue' : 'border-text-muted/40'}
              `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className={`font-ui text-[15px] font-medium leading-tight ${isSelected ? 'text-brand-blue' : 'text-text-primary'}`}>
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
