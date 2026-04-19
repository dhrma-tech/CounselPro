import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'MHT State NEET Counselling Support | CounselPro',
  description: 'Expert guidance for Maharashtra State NEET counselling. We help students secure MBBS, BDS, and BAMS seats in Maharashtra government and private medical colleges.'
};

export default function MHTStateNEETPage() {
  const mistakes = [
    { q: 'Wrong domicile certificate format', a: 'Maharashtra state quota requires domicile in a specific format issued by a competent authority. Tehsildar-issued certificates are mandatory — self-declarations are rejected.' },
    { q: 'Claiming regional quota incorrectly', a: 'Vidarbha and Marathwada regional quotas offer significant advantages, but students often fail to claim them due to incorrect district evidence on documents.' },
    { q: 'Not understanding the bond obligation', a: 'Government college MBBS seats come with a mandatory rural service bond of 1–5 years. Failing to complete it has financial penalties.' },
    { q: 'Ignoring AYUSH streams', a: 'Students with lower NEET scores ignore BAMS/BHMS/BNYS streams that provide excellent career pathways through the same counselling.' },
    { q: 'Preference list locked too early', a: 'Preference lists in MHT State NEET should be finalized strategically. Submitting without analysis of previous year cutoffs is a common mistake.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-teal-50 text-teal-700 mb-6">
            Maharashtra Medical Counselling
          </span>
          <h1 className="heading-xl mb-6">MHT State NEET —<br/>Maharashtra Medical Admissions</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Navigate the 85% state quota seats in Maharashtra's government and private medical colleges with expert NEET counselling and regional quota strategy.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for State NEET Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">

          <section id="what-is-mht-neet">
            <h2 className="heading-lg mb-6">What is MHT State NEET Counselling?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>The State Common Entrance Test Cell, Maharashtra, conducts centralized counselling for the 85% State Quota seats in government and private medical and dental colleges.</p>
                <p>This process covers MBBS, BDS, BAMS (Ayurveda), BHMS (Homeopathy), BNYS, and other allied health science courses. It is the primary route for Maharashtra domicile students to enter medical careers.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">85%</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">State Quota</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">30+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Govt. Colleges</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">20+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Pvt. Colleges</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">6+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Streams</div></div>
              </div>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-brand-teal">
              <h4 className="font-semibold text-brand-navy mb-2">Regional Quotas in Maharashtra</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">Vidarbha:</strong> Students domiciled in the Vidarbha region get exclusive seats in Vidarbha colleges.</li>
                <li><strong className="text-text-primary">Marathwada:</strong> Reservation for Marathwada region students in respective medical colleges.</li>
                <li><strong className="text-text-primary">North Maharashtra:</strong> Similar regional benefits for Nashik division candidates.</li>
                <li><strong className="text-text-primary">Mumbai Region:</strong> Specific seats reserved for Mumbai Metropolitan Region students.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">NEET UG Qualified + Maharashtra Domicile</h4>
                  <p className="body-sm">Must have cleared NEET UG and possess a valid Maharashtra State Domicile Certificate issued by a Tehsildar.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Category & Validity Certificates</h4>
                  <p className="body-sm">SC/ST/OBC/VJ-NT candidates must have valid Caste Certificate, Caste Validity, and Non-Creamy Layer certificates issued before CAP rounds.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Academic Criteria</h4>
                  <p className="body-sm">Must have passed HSC with Physics, Chemistry, and Biology with at least 50% marks (45% for reserved categories). Age must be minimum 17 years.</p>
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
                <p className="body-sm mt-2">Online registration followed by physical document verification at designated Facilitation Centres across Maharashtra.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Merit List Declaration</h4>
                <p className="body-sm mt-2">State provisional merit lists are published for each category and stream. Verify your position before filling options.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Option Form Filling</h4>
                <p className="body-sm mt-2">Fill preference list of colleges and courses. Once submitted and confirmed for round 1, this list typically cannot be changed.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Allotment & College Reporting</h4>
                <p className="body-sm mt-2">CAP allotment is published. Accept the seat, pay the fee, and report to the allotted medical/dental college within the deadline.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="p-8 rounded-2xl" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
            <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Regional Quota Claim</h4>
                 <p className="text-sm text-text-secondary">We ensure you correctly claim Vidarbha, Marathwada, or North MH regional benefits to maximize seat chances.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Stream Selection</h4>
                 <p className="text-sm text-text-secondary">Guidance on choosing between MBBS, BDS, BAMS, BHMS, and BNYS based on rank, interest, and career prospects.</p>
               </div>
               <div className="bg-white/70 p-5 rounded-xl border-t-2 border-brand-teal backdrop-blur-sm shadow-sm">
                 <h4 className="font-semibold mb-2 text-brand-navy">Preference Optimization</h4>
                 <p className="text-sm text-text-secondary">Data-driven college preference list using last year's cutoffs to ensure the best possible allotment.</p>
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
              <li><a href="#what-is-mht-neet" className="text-text-secondary hover:text-brand-blue">What is MHT State NEET?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">State NEET is complex. Our experts know every rule.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      <PageCTA title="Don't miss your Maharashtra medical seat over a document issue." ctaText="Apply for State NEET Counselling Support" />
    </>
  );
}
