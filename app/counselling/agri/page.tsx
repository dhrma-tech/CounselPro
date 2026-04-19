import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Accordion from '@/components/shared/Accordion';

export const metadata = {
  title: 'MHT-CET Agriculture Counselling Support | CounselPro',
  description: 'Expert guidance for Agriculture admissions in Maharashtra. We help students secure seats in B.Sc (Agriculture), Horticulture, Forestry, and Agri-allied courses.'
};

export default function AgriPage() {
  const mistakes = [
    { q: 'Not attaching the 7/12 extract correctly', a: 'Agricultural background weightage requires a correctly formatted 7/12 Utara (land record extract). Mismatch in names between the 7/12 and your application causes rejection of the extra points.' },
    { q: 'Ignoring lesser-known universities', a: 'Maharashtra has 4 agricultural universities — MPKV Rahuri, PDKV Akola, VNMKV Parbhani, DBSKKV Dapoli. Students often fill only the popular ones, missing easier seats elsewhere.' },
    { q: 'Confusing the CET with NEET/JEE for agri', a: 'Agri admissions use MHT-CET (PCB group). Students who appeared only for Physics-Chem-Math CET may not be eligible for most agriculture courses.' },
    { q: 'Not understanding course differences', a: 'Agriculture, Horticulture, Forestry, Food Technology, and Agri-Engineering have very different career paths. Many students fill all without understanding the distinction.' },
    { q: 'Missing state merit list notifications', a: 'Agri counselling schedules are released independently from engineering/medical. Students mistime registrations assuming they follow the same cycle.' },
  ];

  return (
    <>
      <div className="py-16 bg-surface-light border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-ui font-medium bg-green-50 text-green-700 mb-6">
            Agriculture Counselling
          </span>
          <h1 className="heading-xl mb-6">MHT-CET Agriculture —<br/>Build Your Agrarian Future</h1>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Navigate Maharashtra's agricultural university admissions with expert guidance on 7/12 weightage, university selection, and strategic option filling for Agri-allied courses.
          </p>
          <Link href="/apply" className="inline-flex items-center justify-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all">
            Apply for Agriculture Counselling Support
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-[70%] space-y-16">

          <section id="what-is-agri">
            <h2 className="heading-lg mb-6">What is MHT-CET Agriculture Counselling?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 body-md space-y-4">
                <p>Maharashtra conducts centralized counselling for admissions to B.Sc (Agriculture), B.Sc (Horticulture), B.Sc (Forestry), B.Tech (Food Technology), and other allied agri-sciences programs in the four state agricultural universities.</p>
                <p>The process is managed by the respective Agricultural Universities with coordination from the State CET Cell. Students with farming or agricultural background receive additional weightage in the merit list through the 7/12 extract benefit.</p>
              </div>
              <div className="w-full md:w-64 bg-surface-light p-6 rounded-xl border border-border grid grid-cols-2 gap-4 text-center">
                <div><div className="font-display text-[24px] text-brand-navy">4</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Universities</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">9+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Courses</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">+5%</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Agri Bonus</div></div>
                <div><div className="font-display text-[24px] text-brand-navy">15k+</div><div className="text-[13px] text-text-muted mt-1 uppercase font-medium">Seats</div></div>
              </div>
            </div>
            <div className="mt-8 bg-surface-light p-6 rounded-xl border border-border border-l-4 border-l-green-500">
              <h4 className="font-semibold text-brand-navy mb-2">The Four Agricultural Universities of Maharashtra</h4>
              <ul className="space-y-3 mt-4 text-[15px]">
                <li><strong className="text-text-primary">MPKV, Rahuri:</strong> Mahatma Phule Krishi Vidyapeeth — Pune, Nashik, Ahmednagar region.</li>
                <li><strong className="text-text-primary">PDKV, Akola:</strong> Dr. Panjabrao Deshmukh Krishi Vidyapeeth — Vidarbha region.</li>
                <li><strong className="text-text-primary">VNMKV, Parbhani:</strong> Vasantrao Naik Marathwada Krishi Vidyapeeth — Marathwada region.</li>
                <li><strong className="text-text-primary">DBSKKV, Dapoli:</strong> Dr. Balasaheb Sawant Konkan Krishi Vidyapeeth — Konkan region.</li>
              </ul>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="heading-lg mb-6">Who is eligible?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">MHT-CET (PCB Group) Qualified</h4>
                  <p className="body-sm">Most agriculture courses require the PCB (Physics, Chemistry, Biology) group CET score. Mathematics group qualifiers may be eligible for Agri-Engineering streams.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">HSC with Science</h4>
                  <p className="body-sm">Must have passed Class 12 with Physics, Chemistry, and Biology/Mathematics with minimum 45% aggregate (40% for reserved categories).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Agricultural Background Bonus</h4>
                  <p className="body-sm">Students whose parents or guardians hold agricultural land (verified via 7/12 Utara) receive a 5–10% weightage bonus in the merit list calculation.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Maharashtra Domicile</h4>
                  <p className="body-sm">State quota seats require Maharashtra state domicile. All India seats are available in a limited capacity through a separate merit process.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="process">
            <h2 className="heading-lg mb-6">Agriculture Admission Process</h2>
            <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">1</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">CET Exam & Registration</h4>
                <p className="body-sm mt-2">Appear for MHT-CET (PCB group). After results, register on the respective agricultural university's portal or the State CET Cell portal.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">2</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">7/12 & Document Submission</h4>
                <p className="body-sm mt-2">Submit agricultural background documents (7/12 Utara, 8-A), domicile, caste certificates, and HSC marksheet for verification.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">3</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Merit List & Choice Filling</h4>
                <p className="body-sm mt-2">Merit list is published with weightage applied. Fill your preference list of colleges and courses in descending order of priority.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-[12px] -left-3 top-0 ring-4 ring-white">4</div>
                <h4 className="font-semibold text-[18px] text-brand-navy">Allotment & College Reporting</h4>
                <p className="body-sm mt-2">Seat allotment is published by the university. Pay the admission fee and report to the allotted college with original documents.</p>
              </div>
            </div>
          </section>

          <section id="how-we-help" className="p-8 rounded-2xl" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
            <h2 className="font-display text-[28px] mb-6 text-brand-navy">How CounselPro helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-green-400">
                 <h4 className="font-semibold mb-2 text-brand-navy">7/12 Weightage Claim</h4>
                 <p className="text-sm text-text-secondary">We verify your 7/12 documents and ensure the agricultural bonus is correctly applied to your merit calculation.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-green-400">
                 <h4 className="font-semibold mb-2 text-brand-navy">University Selection</h4>
                 <p className="text-sm text-text-secondary">Guidance on choosing between all four universities based on your region, course preference, and career goals.</p>
               </div>
               <div className="bg-white/10 p-5 rounded-xl border-t-2 border-green-400">
                 <h4 className="font-semibold mb-2 text-brand-navy">Course Clarity</h4>
                 <p className="text-sm text-text-secondary">Clear explanation of B.Sc Agriculture vs Horticulture vs Forestry vs Food Tech career paths and job markets.</p>
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
              <li><a href="#what-is-agri" className="text-text-secondary hover:text-brand-blue">What is Agri Counselling?</a></li>
              <li><a href="#eligibility" className="text-text-secondary hover:text-brand-blue">Who is eligible?</a></li>
              <li><a href="#process" className="text-text-secondary hover:text-brand-blue">The Process</a></li>
              <li><a href="#how-we-help" className="text-text-secondary hover:text-brand-blue">How we help</a></li>
              <li><a href="#mistakes" className="text-text-secondary hover:text-brand-blue">Common Mistakes</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">Agriculture has great opportunities — let us help you claim the right seat.</p>
              <Link href="/apply" className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-[#1648c0] transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      <PageCTA title="Your agricultural future deserves the right foundation." ctaText="Apply for Agriculture Counselling Support" />
    </>
  );
}
