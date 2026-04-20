"use client";

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sublabel?: string;
  error?: string;
}

export const TextInput = ({ label, sublabel, error, className, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-ui font-medium text-[13px] text-text-secondary">
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {sublabel && <p className="text-[12px] text-text-muted mb-1">{sublabel}</p>}
      <input
        className={cn(
          "h-11 sm:h-12 w-full bg-surface-light border border-border rounded-xl px-4 font-ui text-[16px] text-text-primary transition-all duration-200 outline-none",
          "focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/5",
          className
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

interface NumberInputProps extends TextInputProps {
  suffix?: string;
}

export const NumberInput = ({ label, suffix, ...props }: NumberInputProps) => {
  return (
    <div className="relative w-full">
      <TextInput label={label} type="number" {...props} />
      {suffix && (
        <span className="absolute right-4 bottom-3 text-[12px] text-text-muted pointer-events-none uppercase font-medium">
          {suffix}
        </span>
      )}
    </div>
  );
};
