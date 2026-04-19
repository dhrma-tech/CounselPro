import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'CSAB Special Rounds Counselling Support | CounselPro',
  description: 'Expert guidance for CSAB Special Rounds. We help JEE students secure vacant NIT/IIIT/GFTI seats through strategic choice filling in the final spot rounds.'
};

export default function CSABPage() {
  const mistakes = [
    { q: 'Not registering fresh for CSAB', a: 'CSAB requires a new registration and fee payment even if you participated in JoSAA. Many students assume their JoSAA registration carries over — it does not.' },
    { q: 'Ignoring the vacancy list', a: 'CSAB releases a seat matrix before rounds. Targeting colleges without checking vacancies wastes your limited choices.' },
    { q: 'Filling only aspirational choices', a: 'Since these are final rounds, a purely ambitious list risks getting no allotment at all. Mix ambitious with safe options.' },
    { q: 'Ignoring NEUT seats', a: 'CSAB also offers NEUT (North Eastern University seats) and SUPERNUMERARY seats which many students overlook, losing easy opportunities.' },
    { q: 'Not checking document validity', a: 'CSAB document deadlines are tight. Expired NCL, caste validity, or category certificates cause instant rejection.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-blue-50 text-blue-700 mb-6">
            CSAB Counselling
          </span>
          <h1 className="heading-xl mb-6">CSAB Special Rounds —<br/>Your Final Seat Opportunity</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Maximize vacant NIT+, IIIT, and GFTI seats after JoSAA with expert strategy, tailored choice filling, and round-by-round guidance.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for CSAB Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">

          <section id="what-is-csab">
            <h2 className="heading-lg mb-6">What is CSAB?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>The Central Seat Allocation Board (CSAB) conducts special rounds after the conclusion of JoSAA to fill the remaining vacant seats in NITs, IIITs, and GFTIs across India.</p>
                <p>CSAB Special Rounds are a crucial second chance for candidates who did not receive an allotment in JoSAA, or who want to upgrade their existing allotment to a better institute or branch.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">31</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">NITs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">26</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">IIITs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">38</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">GFTIs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">2</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Special Rounds</div></div>
              </div>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-brand-blue">
              <h4 className="font-semibold text-brand-navy mb-2">Who should apply for CSAB?</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">Not allotted in JoSAA:</strong> Students who missed all rounds or withdrew their seat.</li>
                <li><strong className="text-text-primary">Want an upgrade:</strong> Students allotted a seat in JoSAA but seeking a better branch or college.</li>
                <li><strong className="text-text-primary">Freshers with JEE ranks:</strong> First-time applicants who skipped JoSAA.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Valid JEE Main / Advanced Rank</h4>
                  <p className="body-sm">Must hold a valid JEE Main CRL or category rank from the same academic year.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Class 12 Criteria</h4>
                  <p className="body-sm">Must have passed Class 12 with the required percentage (75% for general; 65% for SC/ST).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Not Reported to JoSAA Institute</h4>
                  <p className="body-sm">Candidates who accepted a JoSAA seat and reported to an institute are NOT eligible for CSAB unless they officially withdraw.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">CSAB Round Process</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Fresh Registration</h4>
                <p className="body-sm mt-2">Register on the JOSAA/CSAB portal separately with your JEE credentials and pay the registration fee.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Check Vacancy Matrix</h4>
                <p className="body-sm mt-2">CSAB releases a vacancy list of available seats before each round. Review it carefully to build a realistic target list.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Choice Filling</h4>
                <p className="body-sm mt-2">Fill and lock choices in descending order of preference. Choices once locked cannot be changed.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Allotment & Reporting</h4>
                <p className="body-sm mt-2">If allotted, pay the seat acceptance fee and report to the institute within the stipulated deadline.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="p-8 rounded-2xl" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
            <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-blue backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Vacancy Analysis</h4>
                 <p className="text-sm text-text-secondary">We analyze the CSAB seat matrix to identify the best realistic targets for your rank.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-blue backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Priority Choice List</h4>
                 <p className="text-sm text-text-secondary">Optimized choice order mixing ambitious and safe colleges to guarantee an allotment.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-blue backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Document Readiness</h4>
                 <p className="text-sm text-text-secondary">Pre-check of all documents including validity of NCL, caste certificates before registration.</p>
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
              <li><a href="#what-is-csab" className="text-text-secondary hover:text-brand-blue">What is CSAB?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">CSAB is your final chance. Don't leave it to chance.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      <PageCTA title="Don't miss your final chance at a top NIT seat." ctaText="Apply for CSAB Counselling Support" />
    </>
  );
}
