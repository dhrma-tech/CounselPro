import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'MHT CET CAP Counselling Support | CounselPro',
  description: 'Expert guidance for MHT CET CAP counselling. We help Maharashtra domiciled students navigate complex candidatures and option forms.'
};

export default function MHTCETPage() {
  const mistakes = [
    { q: 'Selecting the wrong candidature type', a: 'Many students get confused between Home University (HU) and Other Than Home University (OHU), or fail to claim Defence/Orphan quotas properly, leading to loss of reserved seats.' },
    { q: 'Not filling all DTE options', a: 'The CAP option form allows up to 300 choices. Do not just fill 10 choices. Always include backup colleges.' },
    { q: 'Ignoring Autonomous colleges', a: 'Autonomous colleges often have better syllabi and distinct cutoffs. Excluding them limits your best options.' },
    { q: 'Missing round deadlines', a: 'CAP rounds are fast. Registration, document verification, choice filling, and reporting happen in quick successions. Missing one means you are out of the round.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-teal-50 text-teal-700 mb-6">
            MHT CET Counselling
          </span>
          <h1 className="heading-xl mb-6">MHT CET CAP —<br/>Navigate with Confidence</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Demystify candidatures, Home University quotas, and DTE option forms to secure your ideal engineering seat in Maharashtra.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for MHT CET Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">
          
          <section id="what-is-cap">
            <h2 className="heading-lg mb-6">What is CAP Counselling?</h2>
            <div className="body-md space-y-4">
              <p>The Centralized Admission Process (CAP) is managed by the State CET Cell, Maharashtra, for admission to first-year engineering courses in colleges across the state.</p>
              <p>It includes admissions to Government, Government-Aided, University Managed Institutes, University Departments, and Unaided Private Professional Educational Institutes for the Academic Year.</p>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-brand-teal">
              <h4 className="font-semibold text-brand-navy mb-2">Candidature Types Explained</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">Type A:</strong> Passing 10th and 12th from Maharashtra AND Domicile/Born in Maharashtra.</li>
                <li><strong className="text-text-primary">Type B:</strong> Does not satisfy Type A, but Father/Mother is domiciled in Maharashtra.</li>
                <li><strong className="text-text-primary">Type C:</strong> Father/Mother is a Govt. of India employee posted in Maharashtra.</li>
                <li><strong className="text-text-primary">OHU (Other Than Home University):</strong> Applying to a college outside the university jurisdiction where you passed your 12th.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">MHT CET Qualifiers</h4>
                  <p className="body-sm">Maharashtra State Candidature Candidates appearing for MHT CET.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">JEE Main Qualifiers</h4>
                  <p className="body-sm">All India Candidature Candidates eligible via JEE Main scores (15% quota in private colleges).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Academic Criteria</h4>
                  <p className="body-sm">Passed HSC with Physics & Mathematics + Chemistry/Bio/Vocational with minimum 45% marks (40% for Reserved Categories).</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">CAP Round Structure</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Registration & Document Verification</h4>
                <p className="body-sm mt-2">Registration online followed by e-Scrutiny or physical physical verification at Facilitation Centers (FC).</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Option Form Filling</h4>
                <p className="body-sm mt-2">Fill and confirm choice of courses and colleges prior to CAP Round I. Important: First preference is auto-freezed if allotted!</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Provisional Allotment (Rounds)</h4>
                <p className="body-sm mt-2">If you get preference 1, you must accept. If preference 2+, you can accept & freeze, or accept & betterment (float).</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Reporting to ARC & College</h4>
                <p className="body-sm mt-2">Reporting to the Admission Reporting Centre (online/offline) and finally to the allotted institute.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="bg-brand-navy text-white p-8 rounded-2xl">
            <h2 className="font-display text-[28px] mb-6">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-brand-teal">
                 <h4 className="font-semibold mb-2">Candidature Support</h4>
                 <p className="text-sm text-white/80">Helping you claim the right type (A-E), TFWS, or minority status.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-brand-teal">
                 <h4 className="font-semibold mb-2">Option Form Order</h4>
                 <p className="text-sm text-white/80">300 options carefully ordered so you never get auto-freezed into a bad choice.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-brand-teal">
                 <h4 className="font-semibold mb-2">Betterment Strategy</h4>
                 <p className="text-sm text-white/80">When to pay the seat acceptance fee and push for betterment in Round 2 & 3.</p>
               </div>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="heading-lg mb-6 flex items-center gap-3">
              <AlertTriangle className="text-brand-amber w-8 h-8" /> 
              Common mistakes to avoid
            </h2>
            <Accordion items={mistakes} />
          </section>

        </div>

        <div className="w-full md:w-[30%] hidden md:block">
          <div className="sticky top-28 bg-surface-light border border-border p-6 rounded-xl">
            <h4 className="font-semibold mb-4 text-brand-navy uppercase tracking-wider text-sm">On this page</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#what-is-cap" className="text-text-secondary hover:text-brand-blue">What is CAP?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Maharashtra counselling has confusing rules. Let us help.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
      
      <PageCTA title="Don't lose your seat over a form mistake." ctaText="Apply for MHT CET Support" />
    </>
  );
}
