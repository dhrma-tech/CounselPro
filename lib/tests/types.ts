export type QuestionType = 'SINGLE_MCQ' | 'MULTI_MCQ' | 'NUMERICAL' | 'PARAGRAPH' | 'MATRIX_MATCH';

export type PaletteStatus =
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW'
  | 'ANSWERED_AND_MARKED';

export type Language = 'en' | 'hi' | 'mr' | 'ur' | 'gu';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  ur: 'اردو',
  gu: 'ગુજરાતી',
};

export type TestKind = 'FULL_MOCK' | 'SECTIONAL' | 'CHAPTER_TEST' | 'QUIZ';
export type AttemptMode = 'EXAM' | 'PRACTICE';
export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'AUTO_SUBMITTED';

// Maps a preset to the ExamType used by the counselling application store
export type ExamFamily = 'JEE' | 'NEET' | 'MHTCET';

export interface MarkingRule {
  correct: number;
  wrong: number;
  unattempted: number;
  // JEE Advanced style: marks per correct option when only correct options are ticked
  partialPerOption?: number;
}

export type MarkingRules = Partial<Record<QuestionType, MarkingRule>>;

export interface PresetSection {
  id: string;
  name: string;
  subject: string;
  order: number;
  questionCount: number;
  attemptLimit?: number | null;
  languages?: Language[];
  marking?: MarkingRules;
}

export interface SectionalLock {
  // Sections open from the start; they lock permanently at the switch point
  firstPhaseSections: string[];
  // Sections that stay locked until the switch point
  secondPhaseSections: string[];
  switchAtRemainingSeconds: number;
}

export interface ExamPreset {
  id: string;
  name: string;
  examFamily: ExamFamily;
  durationSeconds: number;
  totalMarks: number;
  sections: PresetSection[];
  sectionalLock: SectionalLock | null;
  marking: MarkingRules;
  languages: Language[];
  registrationsCount: number | null;
  instructionsHtml: string | null;
  verified: boolean;
  lastVerifiedAt: string | null;
  verifiedSources: string[];
}

export interface ResponseValue {
  selectedOptionIds: string[];
  numericalInput: string | null;
}

export interface AnswerKey {
  correctOptionIds: string[];
  numericalExact: number | null;
  numericalMin: number | null;
  numericalMax: number | null;
}

export type Outcome = 'CORRECT' | 'PARTIAL' | 'WRONG' | 'UNATTEMPTED';

export interface QuestionOption {
  id: string;
  html: string;
}

// Version snapshot stored on test_versions.sections
export interface VersionSection {
  id: string;
  name: string;
  subject: string;
  questionIds: string[];
  attemptLimit?: number | null;
  marking?: MarkingRules;
  languages?: Language[];
}

// What the browser receives: never contains keys or solutions of unsubmitted attempts
export interface PaperQuestion {
  id: string;
  sectionId: string;
  type: QuestionType;
  subject: string;
  chapter: string;
  marking: MarkingRule;
  languages: Language[];
  content: Partial<Record<Language, {
    passageHtml: string | null;
    stemHtml: string;
    options: QuestionOption[];
  }>>;
}

export interface PaperSection {
  id: string;
  name: string;
  subject: string;
  questionIds: string[];
  attemptLimit?: number | null;
}

export interface ResponseSnapshot extends ResponseValue {
  status: PaletteStatus;
}

export interface SectionBreakdown {
  id: string;
  name: string;
  subject: string;
  score: number;
  maxScore: number;
  correct: number;
  partial: number;
  wrong: number;
  unattempted: number;
  answered: number;
  notAnswered: number;
  markedForReview: number;
  answeredAndMarked: number;
  notVisited: number;
  timeSpentMs: number;
}

export interface ChapterBreakdown {
  subject: string;
  chapter: string;
  total: number;
  attempted: number;
  correct: number;
  marks: number;
  maxMarks: number;
}

export interface ScoreBreakdown {
  score: number;
  maxScore: number;
  attempted: number;
  correct: number;
  partial: number;
  wrong: number;
  unattempted: number;
  negativeMarksLost: number;
  timeUsedSeconds: number;
  sections: SectionBreakdown[];
  chapters: ChapterBreakdown[];
}
