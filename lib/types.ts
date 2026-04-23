export interface College {
  slug: string;
  name: string;
  shortName: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'GFTI' | 'State' | 'Private' | 'Autonomous';
  location: string;
  city?: string;
  state: string;
  nirf?: number;
  established?: number;
  affiliation?: string;
  branches: BranchCutoff[];
  fees?: FeeStructure[];
  placements?: PlacementData;
  description?: string;
  website?: string;
  entranceExams?: string[];
  hostelAvailable?: boolean;
  accreditation?: string[];
  campusSize?: string;
  genderAdmission?: 'Co-ed' | 'Boys' | 'Girls' | 'Co-educational';
  ranking?: {
    nirf?: number;
    outlook?: number;
    year?: number;
    category?: string;
  };
  highlights?: string[];
  tags?: string[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  transportation?: {
    railway?: { name: string; distance: string };
    airport?: { name: string; distance: string };
  };
  campusFacilities?: string[];
  studentSocieties?: string[];
  placementStats?: Array<{
    year: string;
    avgPackage: string;
    highestPackage: string;
    placementRate: string;
  }>;
  reviews?: {
    overall: number;
    faculty: number;
    placements: number;
    infrastructure: number;
  };
}

export interface CompareItem {
  slug: string;
  name: string;
  shortName: string;
}

export interface BranchCutoff {
  branch: string;
  counselling: 'JoSAA' | 'MHT-CET';
  category: string;
  openRank?: number;
  closeRank?: number;
  annualFees?: number;
}

export interface FeeStructure {
  branch: string;
  annualFees: number;
  totalFees: number;
  hostelFees?: number;
}

export interface PlacementData {
  avgPackage: string;
  highestPackage: string;
  topRecruiters: string[];
}

export interface Branch {
  slug: string;
  name: string;
  domain: 'CS & IT' | 'Electronics' | 'Mechanical' | 'Civil' | 'Chemical' | 'Electrical' | 'Other';
  description: string;
  longDescription?: string;
  coreSubjects: string[];
  specializationTracks?: string[];
  careerPaths: string[];
  skillRequirements?: {
    technical: string[];
    soft: string[];
  };
  topColleges?: string[];
}

export interface Scholarship {
  slug: string;
  name: string;
  provider: string;
  amount: string;
  category: string[];
  eligibility: string[];
  deadline?: string;
  renewable: boolean;
  applyLink?: string;
  documents?: string[];
  howToApply?: string[];
}

export interface University {
  slug: string;
  name: string;
  shortName: string;
  affiliatedColleges?: number;
  semester1: Subject[];
  semester2: Subject[];
  pdfLink?: string;
  officialWebsite?: string;
  latestPattern?: string;
  keyFramework?: string;
  academicEvolution?: string;
  pedagogy?: {
    overview: string;
    evaluationBreakdown?: Array<{ title: string; marks: number; desc: string }>;
  };
  detailedDatabase?: Array<{
    branch: string;
    year: string;
    pattern: string;
    link: string;
  }>;
  technicalInsights?: string;
  specialRules?: string;
}

export interface Subject {
  name: string;
  credits: number;
  type: 'Theory' | 'Practical' | 'Tutorial';
  examHours?: number;
}

export interface TestimonialType {
  quote: string;
  name: string;
  exam: string;
  percentile: string;
  collegePlaced: string;
}

export interface FAQ {
  question: string;
  answer: string;
  group: 'General' | 'JoSAA' | 'MHT CET' | 'Application';
}

export interface ApplicationData {
  counsellingType: string;
  name: string;
  phone: string;
  whatsappNumber: string;
  isWhatsappSameAsMobile: boolean;
  email: string;
  city: string;
  state: string;
  examDetails: Record<string, string>;
  branches: string[];
  collegeTypes: string[];
  feeBudget: string;
  specificColleges: string;
  consent: boolean;
  submittedAt: string;
}
