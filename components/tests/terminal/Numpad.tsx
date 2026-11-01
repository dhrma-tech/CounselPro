"use client";

import { Delete } from 'lucide-react';

const KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'];

export default function Numpad({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const press = (key: string) => {
    if (disabled) return;
    if (key === '-') {
      onChange(value.startsWith('-') ? value.slice(1) : `-${value}`);
      return;
    }
    if (key === '.' && value.includes('.')) return;
    if (value.replace(/[-.]/g, '').length >= 12) return;
    onChange(value + key);
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] select-none">
      {KEYS.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => press(k)}
          disabled={disabled}
          className="h-11 rounded-xl border border-border bg-white font-ui font-semibold text-[16px] text-text-primary hover:bg-surface-light active:scale-95 transition-all disabled:opacity-50"
          aria-label={k === '-' ? 'Toggle minus sign' : k === '.' ? 'Decimal point' : k}
        >
          {k === '-' ? '±' : k}
        </button>
      ))}
      <button
        type="button"
        onClick={() => !disabled && onChange(value.slice(0, -1))}
        disabled={disabled}
        className="h-11 col-span-2 rounded-xl border border-border bg-surface-light flex items-center justify-center gap-1.5 font-ui font-semibold text-[13px] text-text-secondary hover:bg-border/60 active:scale-95 transition-all disabled:opacity-50"
      >
        <Delete className="w-4 h-4" /> Backspace
      </button>
      <button
        type="button"
        onClick={() => !disabled && onChange('')}
        disabled={disabled}
        className="h-11 rounded-xl border border-border bg-surface-light font-ui font-semibold text-[13px] text-text-secondary hover:bg-border/60 active:scale-95 transition-all disabled:opacity-50"
      >
        Clear
      </button>
    </div>
  );
}
