import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'JoSAA Counselling Support | CounselPro',
  description: 'Expert guidance for JoSAA counselling. We help JEE Main and Advanced students navigate the round-by-round seat allocation process.'
};

export default function JoSAAPage() {
  const mistakes = [
    { q: 'Not filling enough choices', a: 'Many students only fill choices they think they will get. You must fill all possible choices (Ambitious, Target, Safe) in your preferred order to maximize chances.' },
    { q: 'Ignoring Home State quota', a: 'Home State quota in NITs offers significant rank relaxation. Students often overlook lesser-known NITs where they could easily secure a seat.' },
    { q: 'Missing document verification deadlines', a: 'Failing to upload documents or pay the seat acceptance fee on time leads to permanent cancellation of the allotted seat.' },
    { q: 'Withdrawing too early', a: 'Patience is key. Many good seat upgrades happen in rounds 4, 5 and 6 as other students withdraw or shift to IITs/NITs.' },
    { q: 'Ignoring TFWS or state-specific quotas', a: 'While JoSAA is all-India, overlapping counselling schedules (like state rounds) must be managed carefully so you don’t lose out on both.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-blue-50 text-blue-700 mb-6">
            JoSAA Counselling
          </span>
          <h1 className="heading-xl mb-6">JoSAA Counselling —<br/>Guided Round by Round</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Navigate the complex system of IITs, NITs, IIITs, and GFTIs with expert choice filling and round strategy.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for JoSAA Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">
          
          <section id="what-is-josaa">
            <h2 className="heading-lg mb-6">What is JoSAA?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>The Joint Seat Allocation Authority (JoSAA) manages and regulates the joint seat allocation for admissions to 118 institutes for the academic year.</p>
                <p>This includes 23 IITs, 31 NITs, IIEST Shibpur, 26 IIITs and 38 Other-Government Funded Technical Institutes (Other-GFTIs). Admission to all the academic programs offered by these Institutes is made through a single platform.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">23</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">IITs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">31</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">NITs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">26</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">IIITs</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">38</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">GFTIs</div></div>
              </div>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">JEE Main Qualifiers</h4>
                  <p className="body-sm">Students who secure a rank in JEE Main are eligible for NITs, IIITs, and GFTIs.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">JEE Advanced Qualifiers</h4>
                  <p className="body-sm">Students who clear JEE Main cutoffs, write JEE Advanced, and secure a rank are eligible for IITs.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Class 12th Criteria</h4>
                  <p className="body-sm">Must have passed Class 12 (or equivalent) examination. The 75% criteria (65% for SC/ST) usually applies for admissions in IITs/NITs.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">The JoSAA Round Process</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Registration & Choice Filling</h4>
                <p className="body-sm mt-2">Enter all preferred colleges/branches in strictly decreasing order of preference. You can fill as many choices as you want.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Mock Allotments</h4>
                <p className="body-sm mt-2">Before the real allocation, 2 mock rounds display indicative seat allotments based on current choices so you can refine your list.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Seat Allotment (Round 1)</h4>
                <p className="body-sm mt-2">First real allocation. If allotted a seat, you must choose Freeze, Float, or Slide, and pay the acceptance fee.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Rounds 2–6</h4>
                <p className="body-sm mt-2">Subsequent rounds upgrade your seat based on availability above your currently locked choice.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="bg-brand-navy text-white p-8 rounded-2xl">
            <h2 className="font-display text-[28px] mb-6">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/10 p-5 rounded-xl">
                 <h4 className="font-semibold mb-2">Choice Strategy</h4>
                 <p className="text-sm text-white/80">We optimize your order of preference to ensure you never miss an upgrade opportunity.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl">
                 <h4 className="font-semibold mb-2">Personalized List</h4>
                 <p className="text-sm text-white/80">Tailored shortlists based on your specific rank, category, home state, and engineering interests.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl">
                 <h4 className="font-semibold mb-2">Round Guidance</h4>
                 <p className="text-sm text-white/80">Step-by-step advice on whether to Float, Slide, or Freeze after every single round.</p>
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
              <li><a href="#what-is-josaa" className="text-text-secondary hover:text-brand-blue">What is JoSAA?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Confused by the process? Let our experts guide you.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
      
      <PageCTA title="Don't leave your seat to chance." ctaText="Apply for JoSAA Counselling Support" />
    </>
  );
}
