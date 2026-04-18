import { Branch } from '@/lib/types';

export const branches: Branch[] = [
  {
    slug: 'computer-science-engineering',
    name: 'Computer Science Engineering',
    domain: 'CS & IT',
    description: 'Focuses on the basic elements of computer programming and networking. It covers both software and hardware aspects of computing.',
    coreSubjects: ['Data Structures', 'Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks'],
    careerPaths: ['Software Developer', 'System Architect', 'Data Scientist', 'Cloud Engineer'],
    topColleges: ['IIT Bombay', 'IIT Delhi', 'IIIT Hyderabad', 'NIT Trichy', 'COEP Pune']
  },
  {
    slug: 'electronics-telecommunication',
    name: 'Electronics & Telecommunication',
    domain: 'Electronics',
    description: 'Involves researching, designing, developing, and testing electronic equipment used in various systems.',
    coreSubjects: ['Analog Electronics', 'Digital Communication', 'Microprocessors', 'Signal Processing', 'Control Systems'],
    careerPaths: ['Electronics Engineer', 'Network Planning Engineer', 'Telecom Consultant'],
    topColleges: ['IIT Madras', 'IIT Kharagpur', 'VJTI Mumbai', 'NIT Surathkal']
  },
  {
    slug: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    domain: 'Mechanical',
    description: 'Applies engineering, physics, and materials science principles to design, analyze, manufacture, and maintain mechanical systems.',
    coreSubjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Kinematics', 'Heat Transfer'],
    careerPaths: ['Mechanical Design Engineer', 'Automotive Engineer', 'HVAC Engineer', 'Manufacturing Engineer'],
    topColleges: ['IIT Kanpur', 'IIT Roorkee', 'NIT Warangal', 'COEP Pune']
  }
];
