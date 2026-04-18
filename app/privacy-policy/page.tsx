export const metadata = {
  title: 'Privacy Policy | CounselPro',
  description: 'How we collect, use, and protect your data.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface-white min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
        <h1 className="font-display text-[40px] text-brand-navy mb-8">Privacy Policy</h1>
        
        <p className="body-md mb-6">Last updated: October 2024</p>
        
        <p className="body-md mb-6 pt-4">
          At CounselPro, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our counselling services.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">1. Information We Collect</h2>
        <p className="body-md mb-6">
          When you use our application form, we collect the following personal and academic information:
        </p>
        <ul className="list-disc list-inside body-md mb-6 space-y-2 text-text-secondary ml-4">
          <li>Full Name</li>
          <li>Mobile Number and Email Address</li>
          <li>City and State of Residence</li>
          <li>Exam Details (JEE Main, JEE Advanced, MHT CET scores and application numbers)</li>
          <li>Category and Candidature type</li>
          <li>College and Branch Preferences</li>
        </ul>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">2. How We Use It</h2>
        <p className="body-md mb-6">
          The information we collect is used strictly for admission counselling purposes:
        </p>
        <ul className="list-disc list-inside body-md mb-6 space-y-2 text-text-secondary ml-4">
          <li>To evaluate your academic profile and rank.</li>
          <li>To build accurate and personalized college shortlists.</li>
          <li>To communicate with you and your parents regarding counselling rounds.</li>
          <li>To update you on critical deadlines for JoSAA and CAP rounds.</li>
        </ul>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">3. Data Storage and Security</h2>
        <p className="body-md mb-6">
          All data submitted through our application form is securely transmitted and stored in protected databases (such as Google Sheets under restricted organizational access). We implement appropriate technical security measures to protect your personal information from unauthorized access, accidental loss, or alteration.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">4. No Third-Party Sharing</h2>
        <p className="body-md mb-6">
          <strong>CounselPro will NEVER sell, rent, or share your personal data with third-party marketers, private colleges (for promotional purposes), or any unauthorized entities.</strong> Your information remains strictly confidential between you and our counselling team.
        </p>

        <h2 className="heading-md mt-10 mb-4 text-brand-navy">5. Data Deletion</h2>
        <p className="body-md mb-6">
          If at any point you wish to withdraw your application or request the deletion of your data from our systems, you can contact us at <strong>support@counselpro.in</strong>. We will process your request within 48 working hours.
        </p>
      </div>
    </div>
  );
}
