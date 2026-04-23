"use client";

import React from 'react';

export const PhoneInput = ({ label, required, error, ...props }: any) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-ui font-medium text-[13px] text-text-secondary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className={`
        flex items-center bg-surface-light border rounded-lg overflow-hidden transition-all duration-200
        ${error ? 'border-red-500 ring-4 ring-red-500/5' : 'border-border focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-brand-blue/5'}
      `}>
        <div className="bg-surface-light px-3 py-2 border-r border-border font-ui text-[14px] text-text-muted font-medium">
          +91
        </div>
        <input
          type="tel"
          pattern="[0-9]{10}"
          className="flex-1 h-11 bg-transparent px-4 font-ui text-[14px] text-text-primary outline-none"
          {...props}
        />
      </div>
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
