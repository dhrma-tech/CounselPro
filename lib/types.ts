export interface College {
  slug: string;
  name: string;
  shortName: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'GFTI' | 'State' | 'Private' | 'Autonomous';
  location: string;
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
  coreSubjects: string[];
  careerPaths: string[];
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
}

export interface University {
  slug: string;
  name: string;
  shortName: string;
  affiliatedColleges?: number;
  semester1: Subject[];
  semester2: Subject[];
  pdfLink?: string;
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
