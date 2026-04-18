import { University } from '@/lib/types';

export const syllabus: University[] = [
  {
    slug: 'mumbai-university',
    name: 'University of Mumbai',
    shortName: 'MU',
    officialWebsite: 'mu.ac.in',
    latestPattern: 'NEP 2024 / Rev-2019',
    keyFramework: 'Activity Based Learning',
    academicEvolution: 'MU has adopted a phased approach to NEP implementation, launching the NEP 2024 curriculum for the 2024-25 first-year cohort while maintaining the Revised 2019 "C-Scheme" for upper years.',
    affiliatedColleges: 66,
    detailedDatabase: [
      { branch: "All Branches", year: "First Year (FE)", pattern: "NEP 2024", link: "https://muquestionpapers.com/storage/syllabus/be_first-year-engineering_fe-all-branches-semester-1-nep-2024.pdf" },
      { branch: "All Branches", year: "First Year (FE)", pattern: "Rev-2019", link: "https://muquestionpapers.com/storage/syllabus/be_first-year-engineering_fe-all-branches-semester-1-rev-2019-c-scheme.pdf" },
      { branch: "Computer Science", year: "SE Sem 3 & 4", pattern: "Rev-2019", link: "https://muquestionpapers.com/storage/syllabus/be_computer-engineering_second-year-se-semester-3-rev-2019-c-scheme.pdf" }
    ],
    technicalInsights: "The University of Mumbai has introduced a robust mentoring system as part of its induction program (1 faculty mentor per 20 students).",
    semester1: [
      { name: 'Engg. Mathematics-I', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engg. Physics-I', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engg. Chemistry-I', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engg. Mechanics', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Basic Electrical Engg', credits: 4, type: 'Theory', examHours: 3 },
    ],
    semester2: [
      { name: 'Engg. Mathematics-II', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engg. Physics-II', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engg. Chemistry-II', credits: 3, type: 'Theory', examHours: 2 },
      { name: 'Engg. Graphics', credits: 4, type: 'Practical', examHours: 3 },
      { name: 'C Programming', credits: 4, type: 'Theory', examHours: 3 },
    ]
  },
  {
    slug: 'sppu',
    name: 'Savitribai Phule Pune University',
    shortName: 'SPPU',
    officialWebsite: 'unipune.ac.in',
    latestPattern: '2024 Pattern (NEP)',
    keyFramework: 'NHEQF Level 4.5/5.0',
    academicEvolution: 'SPPU has pioneered the implementation of the 2024 Pattern, aligning fully with NEP 2020. The curriculum phases out the 2019 Pattern for FE starting 2024-25.',
    affiliatedColleges: 112,
    pedagogy: {
      overview: "Introduction of Comprehensive Continuous Evaluation (CCE) scheme distributed through the semester.",
      evaluationBreakdown: [
        { title: "Unit Tests", marks: 12, desc: "Evaluating fundamental recall and understanding." },
        { title: "Assignments", marks: 12, desc: "Focusing on application and analysis." },
        { title: "Seminars/Quizzes", marks: 6, desc: "Evaluating evaluation and creation skills." }
      ]
    },
    detailedDatabase: [
      { branch: "All Branches", year: "First Year (FE)", pattern: "2024 NEP", link: "https://www.scribd.com/document/849300662/SPPU-FE-2024-2024-2025-Pattern-Syllabus" },
      { branch: "Computer Engineering", year: "SE", pattern: "2024 NEP", link: "https://www.scribd.com/document/888341803/ComputerSyllabus-2024-Pattern-V1" }
    ],
    technicalInsights: "A notable addition is the 'Indian Knowledge System' (IKS-151), aimning to integrate traditional scientific perspectives.",
    semester1: [
      { name: 'Engg. Mathematics-I', credits: 5, type: 'Theory', examHours: 3 },
      { name: 'Engg. Physics / Chemistry', credits: 5, type: 'Theory', examHours: 2 },
      { name: 'Mechanical Systems', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Basic Electrical / Electronics', credits: 4, type: 'Theory', examHours: 3 },
    ],
    semester2: [
      { name: 'Engg. Mathematics-II', credits: 5, type: 'Theory', examHours: 3 },
      { name: 'Engg. Mechanics', credits: 4, type: 'Theory', examHours: 3 },
      { name: 'Engg. Graphics', credits: 3, type: 'Practical' },
    ]
  },
  {
    slug: 'dbatu',
    name: 'Dr. Babasaheb Ambedkar Technological University',
    shortName: 'DBATU',
    officialWebsite: 'dbatu.ac.in',
    latestPattern: 'NEP 2024-25',
    keyFramework: 'Absolute Percentage-to-Grade Mapping',
    academicEvolution: 'DBATU is the affiliating university for 80+ institutes. Grading uses absolute mapping: 91-100%: EX (10.0), 86-90%: AA (9.0).',
    affiliatedColleges: 80,
    detailedDatabase: [
      { branch: "Common (Affiliated)", year: "First Year (FE)", pattern: "NEP 2024-25", link: "https://dbatu.ac.in/wp-content/uploads/2024/09/First-Year-B.Tech-syllabus-common-to-all-Branches_for_Affiliated-Institutes_as-per-NEP_w.e.f._2024-25.pdf" }
    ],
    technicalInsights: "Passing grade threshold is 5.0 CGPA. Honors degree requires 180-194 credits.",
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
      { name: 'Physics', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'coep-tech',
    name: 'COEP Technological University',
    shortName: 'COEP Tech',
    officialWebsite: 'coeptech.ac.in',
    latestPattern: 'NEP 2024',
    keyFramework: 'Cornerstone Project Based',
    academicEvolution: 'COEP has transitioned to University status and introduced a "Cornerstone Project" in the second year of its NEP curriculum.',
    detailedDatabase: [
      { branch: "Computer Sci", year: "First Year B.Tech", pattern: "NEP 2024", link: "https://www.coeptech.ac.in/academics/schools/school-of-engineering-and-technology/computer-science-and-engineering/curriculum/" }
    ],
    technicalInsights: "Specialized electives include 'Human Resource Management in Construction' and 'Tunnels, Docks, Harbour & Railway Engineering'.",
    semester1: [
      { name: 'Calculus', credits: 4, type: 'Theory' },
      { name: 'Physics', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Chemistry', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'rtmnu',
    name: 'Rashtrasant Tukadoji Maharaj Nagpur University',
    shortName: 'RTMNU',
    officialWebsite: 'nagpuruniversity.ac.in',
    latestPattern: 'NEP 2024-25',
    keyFramework: '70:30 Evaluation Scheme',
    academicEvolution: 'RTMNU has moved to NEP-2020 framework with a 70:30 ratio for University Theory and Internal assessments.',
    detailedDatabase: [
      { branch: "All Branches", year: "First Year (FE)", pattern: "NEP 2024", link: "https://www.scribd.com/document/792186192/First-Year-UG-Syllabus-Inline-With-NEP2020-final12092024" }
    ],
    technicalInsights: "The Applied Physics module (BEL1T02) is structured into five core units including Wave Optics and Quantum Mechanics.",
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'shivaji-university',
    name: 'Shivaji University',
    shortName: 'SUK',
    officialWebsite: 'unishivaji.ac.in',
    latestPattern: 'NEP 2020 (MEME)',
    keyFramework: 'Multiple Entry and Multiple Exit',
    academicEvolution: 'SUK allows students to earn a UG Certificate after one year and a UG Diploma after two years under the new NEP structure.',
    detailedDatabase: [
      { branch: "All Programs", year: "FE", pattern: "NEP 2020", link: "https://www.scribd.com/document/969698104/FY-B-tech-All-Programs-Detailed-Curriculum-NEP2020-wef-25-26" }
    ],
    technicalInsights: "Honors degree requires an additional 20 credits through specialized courses or research projects.",
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'bamu',
    name: 'Dr. Babasaheb Ambedkar Marathwada University',
    shortName: 'BAMU',
    officialWebsite: 'bamu.ac.in',
    latestPattern: 'NEP 2020 (Level 6.0)',
    keyFramework: 'Triple Curricular Pathways',
    academicEvolution: 'BAMU offers students three options at Level 6.0 focusing on Multidisciplinary Minors and Honors paths.',
    detailedDatabase: [
      { branch: "Computer Science", year: "SY", pattern: "NEP 2025-26", link: "https://www.bamu.ac.in/media/02zmyscq/sy-btech-cse-cs-ce-nep-25-26.pdf" }
    ],
    technicalInsights: "Mandatory 'Field Projects' (FP-1) and 'Open Elective' (OE) baskets are core to the new curriculum.",
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'sgbau',
    name: 'Sant Gadge Baba Amravati University',
    shortName: 'SGBAU',
    officialWebsite: 'sgbau.ac.in',
    latestPattern: 'NEP 2024-25',
    detailedDatabase: [
      { branch: "UG Programs", year: "AY 2024-25", pattern: "NEP", link: "https://www.sgbau.ac.in/Syllabus-Curriculum(CBCS)2022-23/syllabus-2023-24.aspx" }
    ],
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'kbcnmu',
    name: 'Kavayitri Bahinabai Chaudhari North Maharashtra University',
    shortName: 'KBCNMU',
    academicEvolution: 'KBCNMU focus is heavy on Chemical Technology through UICT. FE syllabus includes Communicative English and Civil Mechanics.',
    detailedDatabase: [
      { branch: "Common to All", year: "FE", pattern: "2017-18 Rev", link: "https://apps.nmu.ac.in/syllab/Science%20and%20Technology/Engineering%20and%20Technology/2017-18%20First%20Year%20Engineering.pdf.pdf" }
    ],
    semester1: [
      { name: 'Maths-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Maths-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'pahsu',
    name: 'Punyashlok Ahilyadevi Holkar Solapur University',
    shortName: 'PAHSU',
    latestPattern: 'NEP-2020 (effective 2025-26)',
    detailedDatabase: [
      { branch: "Undergraduate (UG)", year: "BOS Portal", pattern: "NEP", link: "https://www.sus.ac.in/bos/Syllabus-Home" }
    ],
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'gondwana-university',
    name: 'Gondwana University',
    shortName: 'GU',
    latestPattern: 'NEP 2020',
    detailedDatabase: [
      { branch: "Computer Science", year: "Sem I to IV", pattern: "NEP 2020", link: "https://unigug.ac.in/se_slider/index.php?id=58" }
    ],
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'ict-mumbai',
    name: 'Institute of Chemical Technology',
    shortName: 'ICT',
    officialWebsite: 'ictmumbai.edu.in',
    latestPattern: 'NEP 2020',
    detailedDatabase: [
      { branch: "Electrical Engg", year: "SY", pattern: "NEP 2024-25", link: "https://www.scribd.com/document/965054204/DOC0" }
    ],
    semester1: [
      { name: 'Inorganic Chemistry', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Physics-I', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'nmims',
    name: 'NMIMS University',
    shortName: 'NMIMS',
    latestPattern: 'AY 2025-26 (B.Tech)',
    detailedDatabase: [
      { branch: "IT / CS", year: "Standard", pattern: "Technical Growth", link: "https://engineering.nmims.edu/btech-degree-programmes/b-tech-information-technology/" }
    ],
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  },
  {
    slug: 'symbiosis',
    name: 'Symbiosis International University',
    shortName: 'SIU',
    latestPattern: '2024-28 Batch Path',
    detailedDatabase: [
      { branch: "Mechanical Engg", year: "SIT Pune", pattern: "NEP", link: "https://www.sitpune.edu.in/assets/pdf/SITPuneBTechME%202024-28.pdf" }
    ],
    semester1: [
      { name: 'Design Thinking', credits: 3, type: 'Theory' },
    ],
    semester2: [
      { name: 'Applied Sciences', credits: 5, type: 'Theory' },
    ]
  },
  {
    slug: 'bharati-vidyapeeth',
    name: 'Bharati Vidyapeeth Deemed University',
    shortName: 'BVDU',
    semester1: [
      { name: 'Mathematics-I', credits: 4, type: 'Theory' },
    ],
    semester2: [
      { name: 'Mathematics-II', credits: 4, type: 'Theory' },
    ]
  }
];
