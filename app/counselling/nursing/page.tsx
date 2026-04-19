import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'MHT-CET Nursing Counselling Support | CounselPro',
  description: 'Expert guidance for B.Sc Nursing admissions in Maharashtra. We help nursing aspirants navigate the state CET-based counselling and secure the best colleges.'
};

export default function NursingPage() {
  const mistakes = [
    { q: 'Confusing Nursing CET with NEET', a: 'Maharashtra B.Sc Nursing admissions for some streams are based on a separate Nursing CET, not NEET. Students with only NEET scores miss the CET-based seats.' },
    { q: 'Not prioritizing hospital-attached colleges', a: 'B.Sc Nursing requires extensive clinical training. Colleges without dedicated teaching hospital attachments compromise your practical education.' },
    { q: 'Ignoring government college bonds', a: 'Government Nursing colleges in Maharashtra come with rural service bond obligations. Understand the commitment before accepting.' },
    { q: 'Missing application window', a: 'The Nursing counselling window is shorter than Engineering or Medical counselling. Many students miss it by waiting for Engineering results.' },
    { q: 'Not verifying college MUHS affiliation', a: 'Only colleges affiliated under MUHS (Maharashtra University of Health Sciences) have valid degrees recognized for nursing council registration.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-teal-50 text-teal-700 mb-6">
            Nursing Counselling
          </span>
          <h1 className="heading-xl mb-6">MHT-CET Nursing —<br/>Your Healthcare Career Starts Here</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Expert guidance for B.Sc Nursing admissions across Maharashtra's top government and private nursing colleges through the state CET process.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for Nursing Counselling Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">

          <section id="what-is-nursing">
            <h2 className="heading-lg mb-6">What is MHT-CET Nursing Counselling?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>Maharashtra conducts state-level centralized counselling for B.Sc Nursing admissions in government and private nursing colleges affiliated to Maharashtra University of Health Sciences (MUHS), Nashik.</p>
                <p>The process covers Government, Government-Aided, and Unaided Private B.Sc Nursing colleges providing the 4-year MUHS-affiliated degree program that qualifies graduates for Indian Nursing Council (INC) registration.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">100+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Colleges</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">4 yrs</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Duration</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">MUHS</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Affiliated</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">INC</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Recognized</div></div>
              </div>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-brand-teal">
              <h4 className="font-semibold text-brand-navy mb-2">Admissions through MHT-CET Nursing</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">B.Sc Nursing (4 years):</strong> Core nursing degree for clinical healthcare practice and hospital employment.</li>
                <li><strong className="text-text-primary">Post-Basic B.Sc Nursing:</strong> Upgrade path for GNM diploma holders to get a full B.Sc degree.</li>
                <li><strong className="text-text-primary">NEET-based seats:</strong> Some private colleges may also use NEET scores — verify with each institution.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">MHT-CET Nursing Qualified</h4>
                  <p className="body-sm">Must have appeared and qualified in the MHT-CET Nursing examination conducted by the State CET Cell, Maharashtra.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Science Background</h4>
                  <p className="body-sm">Must have passed HSC (Class 12) with Physics, Chemistry, and Biology with minimum 45% marks (40% for reserved categories).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Age Criteria</h4>
                  <p className="body-sm">Minimum age of 17 years at the time of admission. No upper age limit for this program.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">Nursing CAP Round Process</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Online Registration</h4>
                <p className="body-sm mt-2">Register on the State CET Cell portal with MHT-CET score, HSC marksheet, and personal details.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Document Verification</h4>
                <p className="body-sm mt-2">e-Scrutiny or physical verification of academic, domicile, and category documents at designated centres.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Option Form Filling</h4>
                <p className="body-sm mt-2">Fill college and course preferences in order of priority. Fill as many options as available — more options mean better chances.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Seat Allotment & Admission</h4>
                <p className="body-sm mt-2">Allotment is published online. Accept the seat and report to the allotted nursing college with original documents within the deadline.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="p-8 rounded-2xl" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
            <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">College Quality Check</h4>
                 <p className="text-sm text-text-secondary">We verify hospital attachment quality and MUHS affiliation status before recommending any college.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Merit-Based Preference</h4>
                 <p className="text-sm text-text-secondary">Your option form is built using previous year cutoffs and seat availability for your percentile range.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Bond Counselling</h4>
                 <p className="text-sm text-text-secondary">We explain government bond obligations and help you decide between government and private college options.</p>
               </div>
            </div>
          </section>

          <section id="mistakes">
            <h2 className="heading-lg mb-6 flex items-center gap-3">
              <AlertTriangle className="text-brand-violet w-8 h-8" />
              Common mistakes to avoid
            </h2>
            <Accordion items={mistakes} />
          </section>

        </div>

        <div className="w-full md:w-[30%] hidden md:block">
          <div className="sticky top-28 bg-surface-light border border-border p-6 rounded-xl">
            <h4 className="font-semibold mb-4 text-brand-navy uppercase tracking-wider text-sm">On this page</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#what-is-nursing" className="text-text-secondary hover:text-brand-blue">What is Nursing CET?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Secure a nursing college with strong clinical exposure.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      <PageCTA title="Start your healthcare career at the right college." ctaText="Apply for Nursing Counselling Support" />
    </>
  );
}
