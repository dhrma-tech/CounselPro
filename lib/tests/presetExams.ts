import type { ExamFamily } from './types';

// Question bank exam code used for each preset
export const PRESET_QUESTION_EXAM: Record<string, string> = {
  MHT_CET_PCM: 'MHT_CET',
  MHT_CET_PCB: 'MHT_CET',
  JEE_MAIN: 'JEE_MAIN',
  JEE_ADV_P1: 'JEE_ADV',
  JEE_ADV_P2: 'JEE_ADV',
  NEET_UG: 'NEET_UG',
};

export const QUESTION_EXAM_LABEL: Record<string, string> = {
  MHT_CET: 'MHT-CET',
  JEE_MAIN: 'JEE Main',
  JEE_ADV: 'JEE Advanced',
  NEET_UG: 'NEET',
};

/** Remembers which exam the student last picked on the daily quiz page. */
export const DAILY_PRESET_COOKIE = 'cp_daily_preset';

export const EXAM_TABS: { id: string; label: string; presetIds: string[] }[] = [
  { id: 'jee-main', label: 'JEE Main', presetIds: ['JEE_MAIN'] },
  { id: 'jee-advanced', label: 'JEE Advanced', presetIds: ['JEE_ADV_P1', 'JEE_ADV_P2'] },
  { id: 'neet', label: 'NEET', presetIds: ['NEET_UG'] },
  { id: 'mht-cet-pcm', label: 'MHT-CET PCM', presetIds: ['MHT_CET_PCM'] },
  { id: 'mht-cet-pcb', label: 'MHT-CET PCB', presetIds: ['MHT_CET_PCB'] },
];

export const EXAM_FAMILY_LABEL: Record<ExamFamily, string> = {
  JEE: 'JEE',
  NEET: 'NEET',
  MHTCET: 'MHT-CET',
};
