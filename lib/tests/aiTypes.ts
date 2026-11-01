export type AiLanguage = 'en' | 'hi' | 'mr';
export type AskMode = 'EXPLAIN' | 'WHY_WRONG' | 'HINT' | 'STUCK';

export const AI_LANGUAGE_LABELS: Record<AiLanguage, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' };

export const ASK_MODES: { id: AskMode; label: string }[] = [
  { id: 'EXPLAIN', label: 'Explain the solution' },
  { id: 'WHY_WRONG', label: 'Why is my answer wrong?' },
  { id: 'STUCK', label: "Explain like I'm stuck" },
  { id: 'HINT', label: 'Give me a hint' },
];

export interface AiPlan {
  language: AiLanguage;
  fixes: { title: string; detail: string }[];
  week: { day: number; task: string }[];
  model: string;
}
