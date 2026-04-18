export const metadata = {
  title: 'Terms of Use | CounselPro',
  description: 'Terms and conditions for using CounselPro services.'
};

export default function TermsPage() {
  return (
    <div className="bg-surface-white min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
        <h1 className="font-display text-[40px] text-brand-navy mb-8">Terms of Use</h1>
        
        <p className="body-md mb-6">Last updated: October 2024</p>
        
        <p className="body-md mb-6 pt-4">
          Please read these Terms of Use carefully before using the CounselPro website and our college admission counselling services. By accessing or using our services, you agree to be bound by these terms.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">1. Use of the Website</h2>
        <p className="body-md mb-4">
          You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party. The resources (cutoffs, fees, syllabi) provided on this website are compiled from publicly available data and are for informational purposes only.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">2. Application Submission</h2>
        <p className="body-md mb-4">
          When submitting an application form for counselling:
        </p>
        <ul className="list-disc list-inside body-md mb-6 space-y-2 text-text-secondary ml-4">
          <li>You warrant that all information provided (Ranks, Category, Marks) is genuine and belongs to you.</li>
          <li>You consent to us contacting you via Phone or WhatsApp for the sole purpose of admission counselling.</li>
        </ul>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">3. No Guarantee of Admission</h2>
        <p className="body-md mb-4">
          CounselPro provides expert guidance based on historical data, algorithmic predictions, and professional experience. However, <strong>we do NOT guarantee admission to any specific college or branch.</strong> Seat allocation is entirely managed by the respective authorities (JoSAA, State CET Cell, DTE) based on merit, availability, and their dynamic rules.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">4. Advisory Nature of Service</h2>
        <p className="body-md mb-4">
          Our service is strictly advisory. While we guide you on filling option forms, choice blocking, and round maneuvers (Freeze/Float/Slide), the final decision to lock choices or pay acceptance fees rests solely with the student and their parents. CounselPro is not liable for any form submission errors made directly by the student on official portals.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">5. Contact</h2>
        <p className="body-md mb-4">
          If you have any questions or concerns regarding these Terms of Use, please reach out to us:
        </p>
        <p className="body-md mb-6 font-medium text-text-primary">
          Email: support@counselpro.in<br/>
          Phone: +91 98765 43210
        </p>
      </div>
    </div>
  );
}
