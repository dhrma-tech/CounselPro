"use client";

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import MathHtml from '../MathHtml';
import Numpad from './Numpad';
import { useMediaQuery } from '@/lib/tests/client/hooks';
import type { Language, PaperQuestion, ResponseValue } from '@/lib/tests/types';

export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export interface RevealInfo {
  correctOptionIds: string[];
  numericalAnswer: string | null;
}

interface QuestionBodyProps {
  question: PaperQuestion;
  language: Language;
  value: ResponseValue;
  onChange: (value: ResponseValue) => void;
  disabled?: boolean;
  reveal?: RevealInfo | null;
}

export function questionContent(question: PaperQuestion, language: Language) {
  return question.content[language] ?? question.content.en ?? Object.values(question.content)[0]!;
}

export default function QuestionBody({ question, language, value, onChange, disabled, reveal }: QuestionBodyProps) {
  const content = questionContent(question, language);
  // Keypad shown by default on touch screens; the student can toggle it either way
  const isTouch = useMediaQuery('(pointer: coarse)');
  const [numpadToggle, setNumpadToggle] = useState<boolean | null>(null);
  const showNumpad = numpadToggle ?? isTouch;
  const setShowNumpad = (fn: (s: boolean) => boolean) => setNumpadToggle(fn(showNumpad));

  const toggleOption = (id: string) => {
    if (disabled) return;
    if (question.type === 'MULTI_MCQ') {
      const has = value.selectedOptionIds.includes(id);
      onChange({ selectedOptionIds: has ? value.selectedOptionIds.filter((x) => x !== id) : [...value.selectedOptionIds, id], numericalInput: null });
    } else {
      onChange({ selectedOptionIds: [id], numericalInput: null });
    }
  };

  return (
    <div className="space-y-6">
      {content.passageHtml && (
        <div className="p-4 sm:p-5 bg-surface-light border border-border rounded-2xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Read the passage</p>
          <MathHtml html={content.passageHtml} className="leading-relaxed" />
        </div>
      )}

      <MathHtml html={content.stemHtml} className="leading-relaxed text-text-primary question-stem" />

      {question.type === 'MULTI_MCQ' && (
        <p className="text-[12px] font-semibold text-brand-violet">One or more options may be correct.</p>
      )}

      {question.type === 'NUMERICAL' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              inputMode="decimal"
              aria-label="Your numerical answer"
              placeholder="Type your answer"
              value={value.numericalInput ?? ''}
              disabled={disabled}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9.\-]/g, '').slice(0, 14);
                onChange({ selectedOptionIds: [], numericalInput: v });
              }}
              className="input-field max-w-[260px] font-semibold text-[18px]"
            />
            <button
              type="button"
              onClick={() => setShowNumpad((s) => !s)}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline self-start sm:self-auto"
            >
              {showNumpad ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showNumpad ? 'Hide' : 'Show'} on-screen keypad
            </button>
          </div>
          {showNumpad && (
            <Numpad value={value.numericalInput ?? ''} disabled={disabled} onChange={(v) => onChange({ selectedOptionIds: [], numericalInput: v })} />
          )}
          {reveal?.numericalAnswer && (
            <p className="text-[14px] font-semibold text-green-700">Correct answer: {reveal.numericalAnswer}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3" role={question.type === 'MULTI_MCQ' ? 'group' : 'radiogroup'}>
          {content.options.map((opt, i) => {
            const selected = value.selectedOptionIds.includes(opt.id);
            const isCorrect = reveal?.correctOptionIds.includes(opt.id);
            const revealClass = reveal
              ? isCorrect
                ? 'border-green-500 bg-green-50'
                : selected
                  ? 'border-red-400 bg-red-50'
                  : 'border-border opacity-80'
              : selected
                ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue'
                : 'border-border hover:border-brand-blue/50 hover:bg-surface-light';
            return (
              <button
                key={opt.id}
                type="button"
                role={question.type === 'MULTI_MCQ' ? 'checkbox' : 'radio'}
                aria-checked={selected}
                onClick={() => toggleOption(opt.id)}
                disabled={disabled}
                className={`w-full flex items-start gap-3 text-left p-3.5 sm:p-4 rounded-xl border transition-all disabled:cursor-default ${revealClass}`}
              >
                <span
                  className={`shrink-0 w-8 h-8 flex items-center justify-center font-ui font-bold text-[13px] border transition-all ${
                    question.type === 'MULTI_MCQ' ? 'rounded-md' : 'rounded-full'
                  } ${selected ? 'bg-brand-blue border-brand-blue text-white' : 'bg-white border-border text-text-secondary'}`}
                >
                  {OPTION_LETTERS[i]}
                </span>
                <MathHtml html={opt.html} className="flex-1 pt-1 leading-relaxed" />
                {reveal && isCorrect && <Check className="w-5 h-5 text-green-600 shrink-0 mt-1" />}
                {reveal && selected && !isCorrect && <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
