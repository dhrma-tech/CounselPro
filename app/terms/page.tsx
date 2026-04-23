import Breadcrumb from '@/components/shared/Breadcrumb';
import { ShieldAlert, Scale, Info, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | CounselPro',
  description: 'Strict legal terms and conditions for CounselPro academic services.'
};

export default function TermsPage() {
  return (
    <div className="bg-surface-white min-h-screen">
      {/* HEADER */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Legal', href: '/terms' },
              { label: 'Terms of Service' }
            ]} 
          />
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-navy rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-[40px] md:text-[48px] text-brand-navy leading-none">Terms of Service</h1>
              <p className="text-text-muted font-ui font-bold uppercase tracking-[0.2em] text-[10px] mt-3">Revision 4.2 — Effective April 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="bg-white border border-border p-8 md:p-16 rounded-[40px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-navy/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="prose prose-slate max-w-none relative z-10">
            <p className="body-lg text-brand-navy font-medium border-l-4 border-brand-blue pl-6 py-2 mb-12">
              By accessing the CounselPro platform, engaging in private consultation, or utilizing our data-driven strategy tools, you enter into a legally binding agreement. Failure to adhere to these terms may result in immediate termination of services without notice.
            </p>

            <section className="mb-12">
              <h2 className="heading-md mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">1</div>
                Scope of Professional Advisory
              </h2>
              <p className="body-md text-text-secondary leading-relaxed">
                CounselPro provides high-precision academic guidance based on historical statistical models, current year trends, and algorithmic seat matrix predictions. 
                <span className="block mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-900 font-bold text-sm">
                  CRITICAL: CounselPro DOES NOT guarantee admission to any specific university, branch, or institute. 
                </span>
                Seat allocation is governed solely by the respective official admission authorities (e.g., JoSAA, CSAB, MCC, State CET Cells) based on candidate merit, category rankings, and real-time vacancies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">2</div>
                Data Integrity & Documentation
              </h2>
              <p className="body-md text-text-secondary">
                Accuracy of input data is the sole responsibility of the user. We require:
              </p>
              <ul className="list-none space-y-3 mt-4">
                {['Submission of verifiable scorecards and rank cards.', 'Accurate disclosure of category (OBC-NCL, EWS, SC/ST, PwD) and domicile status.', 'Notification of any discrepancy in official records immediately.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <FileCheck className="w-4 h-4 text-brand-teal mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-red-700 font-medium italic">
                Any attempt to manipulate our strategy tools with falsified rank data will result in a permanent platform ban and voiding of all service agreements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">3</div>
                Intellectual Property & Confidentiality
              </h2>
              <p className="body-md text-text-secondary leading-relaxed">
                All customized college preference lists, strategic branch-priority documents, and proprietary cutoff analysis reports generated by CounselPro are protected by copyright.
              </p>
              <div className="mt-6 p-6 bg-brand-navy text-white rounded-2xl">
                <h4 className="text-brand-teal font-bold mb-2 flex items-center gap-2">
                   <ShieldAlert className="w-4 h-4" /> Non-Distribution Policy
                </h4>
                <p className="text-[13px] text-white/70">
                  Users are strictly prohibited from redistributing, selling, or publicly sharing CounselPro's strategic documents or consultation logs on social media, WhatsApp groups, or public forums. Unauthorized sharing will trigger legal action under intellectual property laws.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">4</div>
                Limitation of Liability
              </h2>
              <p className="body-md text-text-secondary leading-relaxed">
                CounselPro shall not be held liable for losses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-text-secondary">
                <li>Failure of the user to lock choices on the official portal before the deadline.</li>
                <li>Errors in the official admission portals (JoSAA/CET Cell/MCC).</li>
                <li>Sudden changes in government reservation policies or seat matrixes.</li>
                <li>Rejection of documents at reporting centers due to user-provided discrepancies.</li>
                <li>Failure to pay seat acceptance fees or reporting within the stipulated timeline.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">5</div>
                Payment & Refund Policy
              </h2>
              <p className="body-md text-text-secondary leading-relaxed">
                All professional fees for premium counselling packages are **non-refundable** once the strategic analysis has been initiated or the preliminary preference list has been shared. Our services are based on man-hours and proprietary data usage, which cannot be "returned" once accessed.
              </p>
            </section>

            <div className="bg-surface-light p-8 rounded-3xl border border-border mt-16">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-brand-blue" />
                <h4 className="font-bold text-brand-navy">Final Acknowledgment</h4>
              </div>
              <p className="text-[13px] text-text-secondary leading-relaxed">
                CounselPro is an independent advisory body. We have no direct or indirect affiliation with the NTA, JoSAA, State CET Cells, or any government university. By proceeding, you acknowledge that you are seeking private professional advice to supplement your own admission efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
