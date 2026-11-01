// Exam presets. Values follow the cofounder spec cross-checked with public 2026 pattern reports
// (see docs/mock-tests/exam-analysis). Nothing is marked verified until checked against the
// official brochure: NTA (JEE Main, NEET UG), JEE Advanced organising IIT, State CET Cell.

const COMMON_INSTRUCTIONS = `
<ul>
  <li>The clock is set on our server. The countdown at the top right shows the time left. When it reaches zero, the test is submitted automatically.</li>
  <li>Your answers are saved as you go. If you close the tab or lose internet, open the test again from <b>My Tests</b> to continue.</li>
  <li><b>Save &amp; Next</b> saves your answer and moves on. <b>Mark for Review &amp; Next</b> flags the question (an answered and marked question is still evaluated).</li>
  <li>If you select an option and jump to another question without saving, that selection is <b>not</b> saved.</li>
</ul>`;

const single = (correct, wrong) => ({ correct, wrong, unattempted: 0 });

export const presets = [
  {
    id: 'MHT_CET_PCM',
    name: 'MHT-CET (PCM)',
    exam_family: 'MHTCET',
    duration_seconds: 10800,
    total_marks: 200,
    languages: ['en', 'mr', 'ur'],
    registrations_count: 450000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 50, languages: ['en', 'mr', 'ur'] },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 50, languages: ['en', 'mr', 'ur'] },
      { id: 'mathematics', name: 'Mathematics', subject: 'Mathematics', order: 3, questionCount: 50, languages: ['en'], marking: { SINGLE_MCQ: single(2, 0) } },
    ],
    sectional_lock: { firstPhaseSections: ['physics', 'chemistry'], secondPhaseSections: ['mathematics'], switchAtRemainingSeconds: 5400 },
    marking: { SINGLE_MCQ: single(1, 0) },
    instructions_html: `<p>Physics and Chemistry are open for the first half of the test. Mathematics is locked until then. At the halfway mark, Physics and Chemistry lock for good and Mathematics opens. There is no negative marking. Physics and Chemistry carry 1 mark each and Mathematics carries 2 marks each.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://cetcell.mahacet.org/'],
  },
  {
    id: 'MHT_CET_PCB',
    name: 'MHT-CET (PCB)',
    exam_family: 'MHTCET',
    duration_seconds: 10800,
    total_marks: 200,
    languages: ['en', 'mr', 'ur'],
    registrations_count: 300000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 50, languages: ['en', 'mr', 'ur'] },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 50, languages: ['en', 'mr', 'ur'] },
      { id: 'biology', name: 'Biology', subject: 'Biology', order: 3, questionCount: 100, languages: ['en', 'mr', 'ur'] },
    ],
    sectional_lock: { firstPhaseSections: ['physics', 'chemistry'], secondPhaseSections: ['biology'], switchAtRemainingSeconds: 5400 },
    marking: { SINGLE_MCQ: single(1, 0) },
    instructions_html: `<p>Physics and Chemistry are open for the first half of the test. Biology is locked until then. At the halfway mark, Physics and Chemistry lock for good and Biology opens. Every question carries 1 mark and there is no negative marking.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://cetcell.mahacet.org/'],
  },
  {
    id: 'JEE_MAIN',
    name: 'JEE Main (Paper 1)',
    exam_family: 'JEE',
    duration_seconds: 10800,
    total_marks: 300,
    languages: ['en', 'hi', 'mr', 'gu'],
    registrations_count: 1400000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 25 },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 25 },
      { id: 'mathematics', name: 'Mathematics', subject: 'Mathematics', order: 3, questionCount: 25 },
    ],
    sectional_lock: null,
    marking: { SINGLE_MCQ: single(4, -1), NUMERICAL: single(4, -1) },
    instructions_html: `<p>You can move freely between Physics, Chemistry and Mathematics for the whole test. Each subject has MCQs (Section A) and numerical-answer questions (Section B). A correct answer gets +4 and a wrong answer gets −1.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://jeemain.nta.nic.in/'],
  },
  {
    id: 'JEE_ADV_P1',
    name: 'JEE Advanced (Paper 1)',
    exam_family: 'JEE',
    duration_seconds: 10800,
    total_marks: 180,
    languages: ['en', 'hi'],
    registrations_count: 190000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 17 },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 17 },
      { id: 'mathematics', name: 'Mathematics', subject: 'Mathematics', order: 3, questionCount: 17 },
    ],
    sectional_lock: null,
    marking: {
      SINGLE_MCQ: single(3, -1),
      MULTI_MCQ: { correct: 4, wrong: -2, unattempted: 0, partialPerOption: 1 },
      NUMERICAL: single(3, 0),
      PARAGRAPH: single(3, -1),
      MATRIX_MATCH: single(3, -1),
    },
    instructions_html: `<p>Different question types carry different marks. Single-correct: +3 / −1. Multiple-correct: +4 if all correct options are chosen, +1 for each correct option chosen when no wrong option is ticked, and −2 if any wrong option is ticked. Numerical: +3, no negative marking. Match-the-list: +3 / −1.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://jeeadv.ac.in/'],
  },
  {
    id: 'JEE_ADV_P2',
    name: 'JEE Advanced (Paper 2)',
    exam_family: 'JEE',
    duration_seconds: 10800,
    total_marks: 180,
    languages: ['en', 'hi'],
    registrations_count: 190000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 17 },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 17 },
      { id: 'mathematics', name: 'Mathematics', subject: 'Mathematics', order: 3, questionCount: 17 },
    ],
    sectional_lock: null,
    marking: {
      SINGLE_MCQ: single(3, -1),
      MULTI_MCQ: { correct: 4, wrong: -2, unattempted: 0, partialPerOption: 1 },
      NUMERICAL: single(3, 0),
      PARAGRAPH: single(3, -1),
      MATRIX_MATCH: single(3, -1),
    },
    instructions_html: `<p>Different question types carry different marks. Single-correct: +3 / −1. Multiple-correct: +4 if all correct options are chosen, +1 for each correct option chosen when no wrong option is ticked, and −2 if any wrong option is ticked. Numerical: +3, no negative marking. Match-the-list: +3 / −1.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://jeeadv.ac.in/'],
  },
  {
    id: 'NEET_UG',
    name: 'NEET (UG)',
    exam_family: 'NEET',
    duration_seconds: 10800,
    total_marks: 720,
    languages: ['en', 'hi', 'mr', 'gu', 'ur'],
    registrations_count: 2200000,
    sections: [
      { id: 'physics', name: 'Physics', subject: 'Physics', order: 1, questionCount: 45 },
      { id: 'chemistry', name: 'Chemistry', subject: 'Chemistry', order: 2, questionCount: 45 },
      { id: 'botany', name: 'Botany', subject: 'Botany', order: 3, questionCount: 45 },
      { id: 'zoology', name: 'Zoology', subject: 'Zoology', order: 4, questionCount: 45 },
    ],
    sectional_lock: null,
    marking: { SINGLE_MCQ: single(4, -1) },
    instructions_html: `<p>All questions are compulsory. A correct answer gets +4 and a wrong answer gets −1. You can move freely between subjects.</p>${COMMON_INSTRUCTIONS}`,
    verified_sources: ['https://neet.nta.nic.in/'],
  },
];

// Illustrative marks → percentile curves. NOT official data: flagged is_sample and labelled in the UI
// until the owners upload real reference tables from /admin.
const SAMPLE_SOURCE = 'Illustrative sample curve for development. Not official data.';
export const rankReferences = [
  { preset_id: 'JEE_MAIN', year: 2026, rows: [[0, 10], [30, 50], [50, 75], [70, 89], [100, 96.5], [150, 99.3], [200, 99.9], [250, 99.99], [300, 100]] },
  { preset_id: 'NEET_UG', year: 2026, rows: [[0, 5], [150, 50], [300, 80], [450, 93], [550, 97.5], [600, 98.8], [650, 99.6], [700, 99.99], [720, 100]] },
  { preset_id: 'MHT_CET_PCM', year: 2026, rows: [[0, 5], [40, 40], [60, 65], [80, 85], [100, 94], [130, 98.5], [160, 99.7], [200, 100]] },
  { preset_id: 'MHT_CET_PCB', year: 2026, rows: [[0, 5], [50, 40], [75, 65], [100, 85], [120, 94], [150, 98.5], [175, 99.7], [200, 100]] },
  { preset_id: 'JEE_ADV_P1', year: 2026, rows: [[0, 5], [20, 40], [40, 70], [60, 88], [90, 97], [120, 99.5], [150, 99.95], [180, 100]] },
  { preset_id: 'JEE_ADV_P2', year: 2026, rows: [[0, 5], [20, 40], [40, 70], [60, 88], [90, 97], [120, 99.5], [150, 99.95], [180, 100]] },
].map((r) => ({
  ...r,
  rows: r.rows.map(([marks, percentile]) => ({ marks, percentile })),
  source: SAMPLE_SOURCE,
  is_sample: true,
}));
