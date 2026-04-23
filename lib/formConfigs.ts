import { CounsellingType } from "@/store/applicationStore";

export interface FormConfig {
  steps: {
    id: string;
    title: string;
    component: string;
  }[];
}

export const FORM_CONFIGS: Record<CounsellingType, FormConfig> = {
  JEE_JoSAA_Mains: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'rank', title: 'Rank & Score', component: 'RankScoreStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  JEE_JoSAA_Advanced: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'rank', title: 'Rank & Score', component: 'RankScoreStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  JEE_CSAB: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'rank', title: 'Rank & Score', component: 'RankScoreStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  NEET_MCC_AllIndia: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'rank', title: 'Rank & Score', component: 'RankScoreStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Course Preferences', component: 'CoursePreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  NEET_MHT_State: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'rank', title: 'Rank & Score', component: 'RankScoreStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Course Preferences', component: 'CoursePreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  MHT_CET_Engineering: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'scores', title: 'MHT-CET Score', component: 'MHT_CET_ScoreStep' },
      { id: 'jee_optional', title: 'JEE Score (Optional)', component: 'JEE_OptionalStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'quota', title: 'Reservation & Quota', component: 'QuotaStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  MHT_CET_Medical: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'scores', title: 'MHT-CET Score', component: 'MHT_CET_ScoreStep' },
      { id: 'neet_optional', title: 'NEET Score (Optional)', component: 'NEET_OptionalStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'quota', title: 'Reservation & Quota', component: 'QuotaStep' },
      { id: 'preferences', title: 'Course Preferences', component: 'CoursePreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  MHT_CET_BSc_Nursing: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'scores', title: 'MHT-CET Score', component: 'MHT_CET_ScoreStep' },
      { id: 'neet_optional', title: 'NEET Score (Optional)', component: 'NEET_OptionalStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  },
  MHT_CET_BSc_Agriculture: {
    steps: [
      { id: 'global', title: 'Contact Information', component: 'GlobalStep' },
      { id: 'scores', title: 'MHT-CET Score', component: 'MHT_CET_ScoreStep' },
      { id: 'neet_optional', title: 'NEET Score (Optional)', component: 'NEET_OptionalStep' },
      { id: 'personal', title: 'Personal Details', component: 'PersonalDetailsStep' },
      { id: 'preferences', title: 'Academic Preferences', component: 'AcademicPreferencesStep' },
      { id: 'review', title: 'Review & Submit', component: 'ReviewStep' },
    ]
  }
};
