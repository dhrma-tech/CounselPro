import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'MCC All India Quota NEET Counselling | CounselPro',
  description: 'Expert guidance for MCC All India Quota counselling. We help NEET qualifiers secure MBBS/BDS seats in Central, Deemed Universities and AIIMS.'
};

export default function MCCAllIndiaPage() {
  const mistakes = [
    { q: 'Not registering on MCC portal separately', a: 'Many students assume state registration covers MCC. MCC AIQ requires a completely separate registration on the MCC website.' },
    { q: 'Ignoring Deemed University fee structures', a: 'Deemed Universities have fees ranging from ₹10-25 lakhs per year. Students fill these choices without checking financial feasibility.' },
    { q: 'Forfeiting the security deposit', a: 'If you accept a seat in Round 1 or 2 and withdraw later, you forfeit the ₹2 lakh security deposit. Plan carefully.' },
    { q: 'Missing the stray vacancy round', a: 'After rounds 1 and 2, a stray vacancy round fills remaining seats. Many students miss this final opportunity.' },
    { q: 'Wrong category certificate format', a: 'Central University admissions require certificates in specific formats (Central Government format). State-issued certificates are often rejected.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-violet-50 text-violet-700 mb-6">
            Medical Counselling
          </span>
          <h1 className="heading-xl mb-6">MCC All India Quota —<br/>Your Gateway to Top Medical Colleges</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Navigate the 15% AIQ, Central Universities, Deemed Universities, and AIIMS/JIPMER admissions with expert NEET counselling support.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for MCC Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">

          <section id="what-is-mcc">
            <h2 className="heading-lg mb-6">What is MCC AIQ Counselling?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>The Medical Counselling Committee (MCC) conducts online centralized counselling for 15% All India Quota (AIQ) seats in State Government Medical/Dental Colleges, and 100% seats in Central and Deemed Universities.</p>
                <p>This is the premier medical counselling process in India, covering AIIMS (20+), JIPMER, ESIC, AFMC, and all 50+ Deemed Medical Universities across the country.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">15%</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">AIQ Seats</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">20+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">AIIMS</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">50+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Deemed Univ.</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">90k+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Total Seats</div></div>
              </div>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-brand-violet">
              <h4 className="font-semibold text-brand-navy mb-2">Categories covered under MCC</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">15% AIQ:</strong> Open to all India students regardless of state, in Government Medical/Dental colleges.</li>
                <li><strong className="text-text-primary">Central Universities:</strong> AIIMS (New Delhi, etc.), JIPMER, AMU, BHU — 100% national seats.</li>
                <li><strong className="text-text-primary">Deemed Universities:</strong> Manipal, Kasturba, SRM, Amrita etc. — merit-based national admissions.</li>
                <li><strong className="text-text-primary">ESIC & AFMC:</strong> Employee State Insurance and Armed Forces Medical College through MCC.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-violet shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">NEET UG Qualified</h4>
                  <p className="body-sm">Must have qualified NEET UG with a rank and score above the applicable cutoff percentile for the respective category.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-violet shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Age & Academic Criteria</h4>
                  <p className="body-sm">Must be at least 17 years of age and have passed Class 12 with Physics, Chemistry, Biology/Biotechnology with minimum 50% marks (40% for SC/ST/OBC/PwD).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-violet shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Nationality</h4>
                  <p className="body-sm">Indian Nationals, NRI, OCI, PIO, and Foreign Nationals are eligible for specific seat categories under MCC.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">MCC Counselling Round Structure</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-violet text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Registration & Fee</h4>
                <p className="body-sm mt-2">Register on mcc.nic.in, pay the registration fee and submit a refundable security deposit (₹2 Lakhs for General).</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Choice Filling</h4>
                <p className="body-sm mt-2">Fill college and course preferences in order. You can add up to 1500 choices across AIIMS, Government, and Deemed Universities.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Seat Allotment (Round 1 & 2)</h4>
                <p className="body-sm mt-2">Provisional allotment based on NEET rank. You can choose to accept the seat or wait for Round 2 for a potential upgrade.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Stray Vacancy Round</h4>
                <p className="body-sm mt-2">Final round for remaining vacant seats with no upgrade option. Decision to accept is final and binding.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="p-8 rounded-2xl" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
            <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-violet backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">AIIMS vs Deemed Strategy</h4>
                 <p className="text-sm text-text-secondary">Personalized guidance on choosing between AIIMS, Government AIQ, and Deemed colleges based on rank and budget.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-violet backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">1500-Choice Optimization</h4>
                 <p className="text-sm text-text-secondary">We build a comprehensive, ranked preference list to maximize your best possible allotment.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-violet backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Round 1 vs Round 2</h4>
                 <p className="text-sm text-text-secondary">Expert advice on whether to accept Round 1 offer or risk waiting for an upgrade in Round 2.</p>
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
              <li><a href="#what-is-mcc" className="text-text-secondary hover:text-brand-blue">What is MCC AIQ?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Medical counselling has high stakes. Let experts lead the way.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      <PageCTA title="A wrong choice here could cost you your dream medical seat." ctaText="Apply for MCC Counselling Support" />
    </>
  );
}
