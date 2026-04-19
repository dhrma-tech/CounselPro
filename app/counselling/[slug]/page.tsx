import Link from 'next/link';
import { CheckCircle, AlertTriangle, GraduationCap, BookOpen, Stethoscope, Sprout, HeartPulse } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';
import { notFound } from 'next/navigation';

const SLUG_DATA: Record<string, any> = {
  'csab': {
    title: 'CSAB Special Rounds',
    subtitle: 'The Final Opportunity for NIT+ Seats',
    badge: 'Spot Round Support',
    description: 'Central Seat Allocation Board (CSAB) handles the spot rounds for vacant seats in NITs, IIITs, and GFTIs after the JoSAA process concludes.',
    fullDescription: 'After the completion of six rounds of JoSAA, many seats remain vacant in top-tier technical institutes. CSAB Special Rounds provide a crucial second chance for students to secure these seats, often at significantly different ranks than early rounds.',
    icon: GraduationCap,
    color: 'text-brand-blue',
    stats: [
      { label: 'NITs', value: '31' },
      { label: 'IIITs', value: '26' },
      { label: 'GFTIs', value: '38' },
      { label: 'Rounds', value: '2' },
    ],
    eligibility: [
      { title: 'JoSAA Non-Allotted', text: 'Candidates who did not get a seat in JoSAA or did not participate.' },
      { title: 'JoSAA Allotted', text: 'Candidates who want a better branch or college than their JoSAA allotment.' },
      { title: 'JEE Main Rank', text: 'Admissions are strictly based on CRL/Category ranks in JEE Main.' },
    ],
    mistakes: [
      { q: 'Not checking vacancy lists', a: 'You must analyze the seat vacancy list released before CSAB rounds to target the right colleges.' },
      { q: 'Over-ambitious filling', a: 'Since these are final rounds, filling only top-tier choices might lead to no allotment at all.' },
      { q: 'Wait-and-watch approach', a: 'CSAB requires a fresh registration and participation fee, even if you were in JoSAA.' },
    ]
  },
  'mcc-all-india': {
    title: 'MCC All India Quota',
    subtitle: 'National Medical & Dental Admissions',
    badge: 'NEET Support',
    description: 'Medical Counselling Committee (MCC) manages 15% All India Quota, Central & Deemed Universities, and AIIMS/JIPMER admissions.',
    fullDescription: 'Navigate the complex national medical counselling for MBBS, BDS, and B.Sc Nursing. We provide expert guidance on choice filling for Central Institutes and Deemed Universities across India.',
    icon: Stethoscope,
    color: 'text-brand-violet',
    stats: [
      { label: 'AIQ %', value: '15%' },
      { label: 'AIIMS', value: '20+' },
      { label: 'Deemed', value: '50+' },
      { label: 'Seats', value: '90k+' },
    ],
    eligibility: [
      { title: 'NEET UG Qualified', text: 'Only students who clear the NEET UG cutoff are eligible.' },
      { title: 'National Level', text: 'Open to all students across India regardless of state domicile.' },
      { title: 'Document Readiness', text: 'Central level document verification requires specific formats for category certificates.' },
    ],
    mistakes: [
      { q: 'Ignoring Deemed fees', a: 'Deemed universities have high fee structures; ensure you are financially ready before filling them.' },
      { q: 'Forfeiting Security Deposit', a: 'Missing round 2 deadlines or rules can lead to forfeiture of your security deposit (upto 2 Lakhs).' },
    ]
  },
  'mht-state-neet': {
    title: 'MHT State NEET',
    subtitle: 'Maharashtra Medical Admissions (85%)',
    badge: 'State Quota',
    description: 'State Common Entrance Test Cell, Maharashtra handles the 85% state quota seats in government and private medical colleges.',
    fullDescription: 'The state level medical counselling is highly competitive and has unique rules regarding bond services, domicile requirements, and regional quotas within Maharashtra.',
    icon: HeartPulse,
    color: 'text-brand-teal',
    stats: [
      { label: 'State %', value: '85%' },
      { label: 'Govt MBBS', value: '30+' },
      { label: 'Pvt MBBS', value: '20+' },
      { label: 'Ayush', value: 'Exts' },
    ],
    eligibility: [
      { title: 'NEET UG + Domicile', text: 'Must be NEET qualified and possess Maharashtra state domicile.' },
      { title: 'Category Benefits', text: 'Strict verification of Caste, Validity, and NCL certificates is required.' },
    ],
    mistakes: [
      { q: 'Preference List errors', a: 'MH State NEET doesn\'t allow changing preferences usually after round 1; the first list is final.' },
      { q: 'Regional Quota neglect', a: 'Many students fail to claim their Vidarbha/Marathwada regional benefits correctly.' },
    ]
  },
  'nursing': {
    title: 'MHT-CET Nursing',
    subtitle: 'B.Sc Nursing Admissions Maharashtra',
    badge: 'Nursing Support',
    description: 'Dedicated counselling for B.Sc Nursing courses in government and private institutions across Maharashtra state.',
    fullDescription: 'Nursing admissions have seen a surge in demand. We help you navigate the specialized merit lists and institutional preferences to ensure a career in healthcare.',
    icon: HeartPulse,
    color: 'text-brand-teal',
    stats: [
      { label: 'Colleges', value: '100+' },
      { label: 'Govt Seats', value: '500+' },
      { label: 'Pvt Seats', value: '4k+' },
      { label: 'Exam', value: 'MH-CET' },
    ],
    eligibility: [
      { title: 'MH-CET Nursing', text: 'Must have appeared for the specific Nursing CET conducted by the state.' },
      { title: 'Science Background', text: 'Must have physics, chemistry, and biology in Class 12.' },
    ],
    mistakes: [
      { q: 'Ignoring Location', a: 'Nursing requires intensive clinical practice; hospital-attached colleges should be prioritized.' },
    ]
  },
  'agri': {
    title: 'MHT-CET Agriculture',
    subtitle: 'Agriculture & Allied Sciences',
    badge: 'Agri Support',
    description: 'Admissions to Agriculture, Horticulture, Forestry, and Food Technology courses in Maharashtra through the Centralized process.',
    fullDescription: 'Agriculture counselling includes complex weightage for farming backgrounds (7/12 extracts) and diverse course options across multiple agri-universities in the state.',
    icon: Sprout,
    color: 'text-brand-teal',
    stats: [
      { label: 'Uni Count', value: '4' },
      { label: 'Courses', value: '9+' },
      { label: 'Weightage', value: 'Extra' },
      { label: 'Seats', value: '15k+' },
    ],
    eligibility: [
      { title: 'CET/NEET/JEE', text: 'Accepts scores from multiple exams depending on the specific agri-course.' },
      { title: 'Farmer Certificate', text: 'Additional points for students with verified agricultural backgrounds.' },
    ],
    mistakes: [
      { q: 'Document errors', a: 'Agricultural weightage documents (7/12) often have names mismatches that lead to rejection.' },
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = SLUG_DATA[params.slug];
  if (!data) return { title: 'Counselling | CounselPro' };
  return {
    title: `${data.title} | CounselPro`,
    description: data.description
  };
}

export default function DynamicCounsellingPage({ params }: { params: { slug: string } }) {
  const data = SLUG_DATA[params.slug];
  
  if (!data) {
    notFound();
  }

  const Icon = data.icon;

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium ${data.color.replace('text-', 'bg-').split('-').slice(0,-1).join('-') + '-50'} ${data.color} mb-6`}>
            {data.badge}
          </span>
          <h1 className="heading-xl mb-6">{data.title} —<br/>{data.subtitle}</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            {data.description}
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for {data.title} Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">
          
          <section id="about">
            <h2 className="heading-lg mb-6">What is {data.title}?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>{data.fullDescription}</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                {data.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="font-display text-[24px] text-brand-navy">{stat.value}</div>
                    <div className="text-[13px] text-text-muted mt-1 uppercase font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              {data.eligibility.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className={`w-6 h-6 ${data.color} shrink-0`} />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="body-sm">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="how-we-help" className="bg-brand-navy text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
              <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-white/10 p-5 rounded-xl">
                   <h4 className="font-semibold mb-2 text-brand-navy">Expert Filling</h4>
                   <p className="text-sm text-text-secondary">We optimize your preference list based on historical cutoffs and seat trends.</p>
                 </div>
                 <div className="bg-white/10 p-5 rounded-xl">
                   <h4 className="font-semibold mb-2 text-brand-navy">Real-time Updates</h4>
                   <p className="text-sm text-text-secondary">Instant notifications on registration, document verification, and round results.</p>
                 </div>
                 <div className="bg-white/10 p-5 rounded-xl">
                   <h4 className="font-semibold mb-2 text-brand-navy">Round Analysis</h4>
                   <p className="text-sm text-text-secondary">Strategic advice on whether to accept, upgrade, or wait for subsequent rounds.</p>
                 </div>
              </div>
            </div>
            <Icon className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
          </section>

          <section id="mistakes">
            <h2 className="heading-lg mb-6 flex items-center gap-3">
              <AlertTriangle className="text-brand-violet w-8 h-8" /> 
              Common mistakes to avoid
            </h2>
            <Accordion items={data.mistakes} />
          </section>

        </div>

        <div className="w-full md:w-[30%] hidden md:block">
          <div className="sticky top-28 bg-surface-light border border-border p-6 rounded-xl">
            <h4 className="font-semibold mb-4 text-brand-navy uppercase tracking-wider text-sm">On this page</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#about" className={`text-text-secondary hover:${data.color}`}>Overview</a></li>
              <li><a href="#eligibility" className={`text-text-secondary hover:${data.color}`}>Eligibility</a></li>
              <li><a href="#how-we-help" className={`text-text-secondary hover:${data.color}`}>Our Process</a></li>
              <li><a href="#mistakes" className={`text-text-secondary hover:${data.color}`}>Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Confused by the process? Let our experts guide you.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-all">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
      
      <PageCTA title="Don't leave your seat to chance." ctaText={`Apply for ${data.title} Support`} />
    </>
  );
}
