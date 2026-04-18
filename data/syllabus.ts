import { University } from '@/lib/types';

export const syllabus: University[] = [
  {
    slug: 'mumbai-university',
    name: 'Mumbai University',
    shortName: 'MU',
    affiliatedColleges: 66,
    semester1: [
      { name: 'Engineering Mathematics-I', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engineering Physics-I', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engineering Chemistry-I', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engineering Mechanics', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Basic Electrical Engineering', credits: 4, type: 'Theory', examHours: 3 },
    ],
    semester2: [
      { name: 'Engineering Mathematics-II', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engineering Physics-II', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engineering Chemistry-II', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engineering Graphics', credits: 4, type: 'Practical', examHours: 3 },
      { name: 'C Programming', credits: 4, type: 'Theory', examHours: 3 },
    ]
  },
  {
    slug: 'sppu',
    name: 'Savitribai Phule Pune University',
    shortName: 'SPPU',
    affiliatedColleges: 112,
    semester1: [
      { name: 'Engineering Mathematics-I', credits: 5, type: 'Theory', examHours: 3 },
      { name: 'Engineering Physics / Engineering Chemistry', credits: 5, type: 'Theory', examHours: 2 },
      { name: 'Systems in Mechanical Engineering', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Basic Electrical Engg / Basic Electronics Engg', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Programming and Problem Solving', credits: 4, type: 'Practical', examHours: 3 },
    ],
    semester2: [
      { name: 'Engineering Mathematics-II', credits: 5, type: 'Theory', examHours: 3 },
      { name: 'Engineering Chemistry / Engineering Physics', credits: 5, type: 'Theory', examHours: 2 },
      { name: 'Engineering Mechanics', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Basic Electronics Engg / Basic Electrical Engg', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engineering Graphics', credits: 3, type: 'Practical', examHours: 0 },
    ]
  }
];
