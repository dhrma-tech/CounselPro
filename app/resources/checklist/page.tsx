"use client";

import { motion } from 'framer-motion';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { 
  ClipboardCheck, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  Download
} from 'lucide-react';

export default function DocumentChecklistPage() {
  const documents = [
    {
      group: "Primary Academic Documents",
      items: [
        { name: "MHT-CET Score Card", original: true, xerox: 3, status: "Mandatory" },
        { name: "JEE Main Score Card", original: true, xerox: 3, status: "If Applicable" },
        { name: "SSC (10th) Marksheet", original: true, xerox: 3, status: "Mandatory" },
        { name: "HSC (12th) Marksheet", original: true, xerox: 3, status: "Mandatory" },
        { name: "Leaving Certificate (LC/TC)", original: true, xerox: 3, status: "Mandatory" }
      ]
    },
    {
      group: "Identity & Domicile",
      items: [
        { name: "Domicile Certificate of Maharashtra", original: true, xerox: 2, status: "Mandatory" },
        { name: "Aadhaar Card", original: false, xerox: 2, status: "Mandatory" },
        { name: "Nationality Certificate", original: true, xerox: 2, status: "Mandatory (or LC with Nationality)" }
      ]
    },
    {
      group: "Category Documents (Reserved)",
      items: [
        { name: "Caste Certificate", original: true, xerox: 3, status: "For Reserved Categories" },
        { name: "Caste Validity Certificate", original: true, xerox: 3, status: "Mandatory (Magistrate sign)" },
        { name: "Non-Creamy Layer Certificate", original: true, xerox: 3, status: "Valid up to March 31 of current year" }
      ]
    },
    {
      group: "Financial / Special Quota",
      items: [
        { name: "Annual Income Certificate", original: true, xerox: 3, status: "For EWS / TFWS / EBC" },
        { name: "EWS Proforma / Certificate", original: true, xerox: 3, status: "State Level Format" },
        { name: "Migration Certificate", original: true, xerox: 3, status: "For Other University Students" }
      ]
    }
  ];

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'Document Checklist', href: '/resources/checklist' }
            ]} 
          />
          
          <div className="mt-8">
            <Link 
              href="/resources" 
              className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-navy mb-6 group transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Resource Hub
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="label text-brand-blue mb-3 inline-block"
              >
                Verification Guide
              </motion.span>
              <h1 className="heading-xl mb-4">CAP Round Document Checklist</h1>
              <p className="body-lg text-text-secondary max-w-2xl">
                The most critical part of the admission process. Ensure you have the right set 
                of documents verified at SC Center before the deadline.
              </p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 h-fit">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Critical Notice */}
        <div className="mb-12 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <h3 className="font-bold text-rose-900 mb-1">Important Instruction</h3>
            <p className="text-rose-700 text-[14px] leading-relaxed">
              Every document must be scanned in color and original. Xeroxed copies of marksheets are 
              not accepted for verification at Scrutiny Centers. Ensure all category certificates have 
              the <strong>validity period</strong> covering the current academic year.
            </p>
          </div>
        </div>

        {/* Grouped Lists */}
        <div className="space-y-12">
          {documents.map((group, idx) => (
            <motion.section 
              key={group.group}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                <h2 className="heading-sm">{group.group}</h2>
              </div>
              
              <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-light border-b border-border">
                      <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Document Name</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Original</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Xerox</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-right">Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {group.items.map((doc, i) => (
                      <tr key={doc.name} className="hover:bg-brand-blue/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-surface-light flex items-center justify-center group-hover:bg-white transition-colors">
                              <FileText className="w-3.5 h-3.5 text-text-muted" />
                            </div>
                            <span className="text-[14px] font-bold text-text-primary">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {doc.original ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-text-muted font-bold text-sm">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-[14px] font-bold text-text-secondary">{doc.xerox} Sets</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={`text-[12px] font-bold px-2 py-1 rounded ${
                            doc.status.includes('Mandatory') 
                              ? 'bg-rose-50 text-rose-600' 
                              : 'bg-surface-light text-text-muted'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Verification Tips */}
        <div className="mt-20">
          <div className="p-8 bg-brand-navy text-white rounded-[32px] relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck className="w-8 h-8 text-brand-teal" />
                 <h2 className="heading-sm text-white">Verification Center Tips</h2>
               </div>
               <ul className="space-y-4">
                 {[
                   "Always carry an extra set of xerox copies for safety.",
                   "Keep soft copies (PDF) of all originals on your Google Drive.",
                   "Ensure your mobile number is linked with Aadhaar.",
                   "SC centers usually operate from 10:00 AM to 5:00 PM."
                 ].map((tip, i) => (
                    <li key={i} className="flex gap-4 items-start text-[14px] text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0"></div>
                      {tip}
                    </li>
                 ))}
               </ul>
             </div>
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
