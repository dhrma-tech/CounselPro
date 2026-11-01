import 'server-only';
import type {
  AttemptMode,
  AttemptStatus,
  ExamFamily,
  ExamPreset,
  Language,
  MarkingRules,
  PaletteStatus,
  QuestionOption,
  QuestionType,
  ScoreBreakdown,
  SectionalLock,
  TestKind,
  VersionSection,
} from '../types';
import type { PaperOrder } from '../shuffle';
import type { AttemptAnalysis, MistakeTag } from '../mistakes';
import type { AiPlan } from '../aiTypes';

export interface PresetRow {
  id: string;
  name: string;
  exam_family: ExamFamily;
  duration_seconds: number;
  total_marks: number;
  sections: ExamPreset['sections'];
  sectional_lock: SectionalLock | null;
  marking: MarkingRules;
  languages: Language[];
  registrations_count: number | null;
  instructions_html: string | null;
  verified: boolean;
  last_verified_at: string | null;
  verified_sources: string[];
}

export interface TestRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  kind: TestKind;
  preset_id: string;
  duration_seconds: number;
  guest_allowed: boolean;
  is_sample: boolean;
  is_practice: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  current_version_id: string | null;
  sort_order: number;
  created_at: string;
  window_start_at: string | null;
  window_end_at: string | null;
  is_weekly: boolean;
  is_daily: boolean;
  daily_date: string | null;
}

export interface VersionRow {
  id: string;
  test_id: string;
  version: number;
  sections: VersionSection[];
  marking: MarkingRules;
  sectional_lock: SectionalLock | null;
  duration_seconds: number;
  total_marks: number;
  published_at: string;
}

export interface QuestionRow {
  id: string;
  external_key: string | null;
  exam: string;
  subject: string;
  chapter: string;
  topic: string | null;
  type: QuestionType;
  difficulty: number;
  group_id: string | null;
  shuffle_options: boolean;
  pyq_year: number | null;
  pyq_shift: string | null;
  question_number: number | null;
  status: 'DRAFT' | 'APPROVED' | 'RETIRED';
  license_status: 'OWNED_OR_LICENSED' | 'ORIGINAL_SAMPLE' | 'UNKNOWN';
  source: string;
  key_verified: boolean;
}

export interface TranslationRow {
  question_id: string;
  language: Language;
  passage_html: string | null;
  stem_html: string;
  options: QuestionOption[];
  solution_html: string | null;
}

export interface KeyRow {
  question_id: string;
  correct_option_ids: string[];
  numerical_exact: number | string | null;
  numerical_min: number | string | null;
  numerical_max: number | string | null;
}

export interface AttemptRow {
  id: string;
  user_id: string | null;
  guest_token: string | null;
  test_id: string;
  test_version_id: string;
  attempt_number: number;
  mode: AttemptMode;
  status: AttemptStatus;
  language: Language;
  seed: string;
  paper_order: PaperOrder;
  started_at: string;
  ends_at: string | null;
  submitted_at: string | null;
  score_raw: number | null;
  max_score: number | null;
  score_breakdown: ScoreBreakdown | null;
  percentile_est: number | null;
  rank_low: number | null;
  rank_high: number | null;
  rank_confidence: string | null;
  rank_method: string | null;
  rank_is_sample: boolean | null;
  counts_as_rank: boolean;
  integrity: Record<string, number>;
  created_at: string;
  analysis: AttemptAnalysis | null;
  ai_plan: AiPlan | null;
  ai_plan_at: string | null;
  challenge_token: string | null;
}

export interface ResponseRow {
  attempt_id: string;
  question_id: string;
  status: PaletteStatus;
  selected_option_ids: string[];
  numerical_input: string | null;
  time_spent_ms: number;
  visit_count: number;
  answer_changes: number;
  seq: number;
  marks: number | null;
  outcome: string | null;
  mistake_tag: MistakeTag | null;
  updated_at: string;
}

export function presetFromRow(row: PresetRow): ExamPreset {
  return {
    id: row.id,
    name: row.name,
    examFamily: row.exam_family,
    durationSeconds: row.duration_seconds,
    totalMarks: Number(row.total_marks),
    sections: row.sections,
    sectionalLock: row.sectional_lock,
    marking: row.marking,
    languages: row.languages,
    registrationsCount: row.registrations_count,
    instructionsHtml: row.instructions_html,
    verified: row.verified,
    lastVerifiedAt: row.last_verified_at,
    verifiedSources: row.verified_sources,
  };
}

const toNum = (v: number | string | null) => (v == null ? null : Number(v));

export function keyFromRow(row: KeyRow) {
  return {
    correctOptionIds: row.correct_option_ids,
    numericalExact: toNum(row.numerical_exact),
    numericalMin: toNum(row.numerical_min),
    numericalMax: toNum(row.numerical_max),
  };
}
