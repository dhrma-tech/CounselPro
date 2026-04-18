import { Scholarship } from '@/lib/types';

export const scholarships: Scholarship[] = [
  {
    slug: 'post-matric-scholarship-sc',
    name: 'Post Matric Scholarship (SC/ST)',
    provider: 'Government of India',
    amount: '₹50,000 / year',
    category: ['SC', 'ST'],
    eligibility: ['Annual family income below ₹2.5 Lakhs', 'Belong to SC/ST category', 'Admitted to recognized institution'],
    deadline: 'October 31st',
    renewable: true,
    applyLink: 'https://scholarships.gov.in',
    documents: ['Caste Certificate', 'Income Certificate', 'Aadhaar Card', 'Fee Receipt']
  },
  {
    slug: 'pragati-scholarship',
    name: 'Pragati Scholarship',
    provider: 'AICTE',
    amount: '₹50,000 / year',
    category: ['Girls'],
    eligibility: ['Girl child taking admission in 1st year of Degree/Diploma course', 'Max 2 girls per family', 'Annual family income under ₹8 Lakhs'],
    deadline: 'October 31st',
    renewable: true,
    applyLink: 'https://scholarships.gov.in',
    documents: ['Aadhaar Card', 'Admission Letter', 'Income Certificate', '10th/12th Marksheet']
  },
  {
    slug: 'maharashtra-ebc',
    name: 'Rajarshi Chhatrapati Shahu Maharaj Sikshan Shulkh Shishyavrutti Yojna (EBC)',
    provider: 'Government of Maharashtra',
    amount: '50% Tuition Fees',
    category: ['General', 'EWS'],
    eligibility: ['Domicile of Maharashtra', 'Admitted through CAP rounds', 'Annual family income under ₹8 Lakhs'],
    deadline: 'February 28th',
    renewable: true,
    applyLink: 'https://mahadbt.maharashtra.gov.in/',
    documents: ['Domicile Certificate', 'Income Certificate', 'CAP Allotment Letter', 'Fee Receipt']
  }
];
