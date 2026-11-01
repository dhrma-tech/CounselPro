"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Dialog({
  open,
  onClose,
  title,
  children,
  wide = false,
  dismissible = true,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
  dismissible?: boolean;
}) {
  useEffect(() => {
    if (!open || !dismissible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismissible, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-brand-navy/40 backdrop-blur-sm p-0 sm:p-4" onClick={dismissible ? onClose : undefined}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'} max-h-[90dvh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl border border-border`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-ui font-bold text-[16px] text-text-primary">{title}</h2>
          {dismissible && (
            <button onClick={onClose} className="p-1.5 rounded-lg text-text-muted hover:bg-surface-light hover:text-text-primary" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
