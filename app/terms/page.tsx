import Breadcrumb from '@/components/shared/Breadcrumb';

export const metadata = {
  title: 'Terms of Use | CounselPro',
  description: 'Terms and conditions for using CounselPro services.'
};

export default function TermsPage() {
  return (
    <div className="bg-surface-white min-h-screen">
      {/* HEADER */}
      <div className="pt-24 pb-12 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms of Use', href: '/terms' }
            ]} 
          />
          <h1 className="font-display text-[40px] md:text-[48px] text-brand-navy mt-10">Terms of Service</h1>
          <p className="text-text-muted font-ui font-semibold uppercase tracking-widest text-[12px] mt-2">Effective Date: October 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[32px] shadow-sm prose prose-slate max-w-none">
          <p className="body-md leading-relaxed text-text-secondary text-[17px]">
            The following Terms of Use govern your access to the CounselPro platform and our professional admission advisory services. By utilizing our tools or engaging with our consultants, you acknowledge and agree to these guidelines.
          </p>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">1. Advisory Scope</h2>
          <p className="body-md text-text-secondary">
            CounselPro provides professional guidance based on historical data analytics, algorithmic predictions, and regulatory knowledge. However, <strong>we do NOT guarantee admission</strong> to any specific institution. Final seat allocation is an autonomous process managed by official bodies (JoSAA, CET Cell, etc.) based on merit and vacancy.
          </p>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">2. User Responsibility</h2>
          <p className="body-md text-text-secondary">
            When using our strategy tools or counselling services:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-text-secondary mt-4">
            <li>You agree to provide accurate and verifiable exam scores and category documentation.</li>
            <li>You acknowledge that final choice locking on official portals is your responsibility.</li>
            <li>You agree not to redistribute our proprietary college shortlists or strategy documents.</li>
          </ul>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">3. Resource Accuracy</h2>
          <p className="body-md text-text-secondary leading-relaxed">
            While we strive for 100% accuracy in our directories (Fees, Cutoffs, Syllabus), these are for informational purposes. Users are advised to cross-reference critical details with official college brochures or government gazettes before final commitments.
          </p>

          <div className="bg-brand-violet/5 border-l-4 border-brand-violet p-6 my-10 rounded-r-xl shadow-sm">
            <h4 className="font-bold text-brand-navy mb-2">Legal Disclaimer:</h4>
            CounselPro is a private consulting body and is not affiliated, endorsed, or sponsored by any government admission authority including NTA, JoSAA, or State CET Cells.
          </div>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">4. Limitation of Liability</h2>
          <p className="body-md text-text-secondary mb-6 leading-relaxed">
            In no event shall CounselPro be liable for any results arising from the failure of a student to follow official deadlines, pay seat acceptance fees on time, or verify their document discrepancies at reporting centers.
          </p>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">5. Modifications</h2>
          <p className="body-md text-text-secondary mb-8 leading-relaxed">
            CounselPro reserves the right to modify these terms at any time. Continued use of the website or services following any such changes shall constitute your acceptance of such changes.
          </p>
          
          <div className="pt-8 border-t border-border flex items-center justify-between">
            <p className="text-sm text-text-muted italic">Thank you for trusting CounselPro with your academic future.</p>
            <div className="w-12 h-12 bg-surface-light rounded-full flex items-center justify-center text-brand-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
