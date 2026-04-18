"use client";

import { syllabus } from '@/data/syllabus';
import Link from 'next/link';
import { Download, BookOpen, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function SyllabusDetailPage({ params }: { params: { slug: string } }) {
  const uni = syllabus.find(s => s.slug === params.slug);
  const [activeTab, setActiveTab] = useState<'sem1' | 'sem2'>('sem1');

  if (!uni) {
    return notFound();
  }

  const currentSubjects = activeTab === 'sem1' ? uni.semester1 : uni.semester2;

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8 font-ui">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/syllabus" className="hover:text-brand-blue transition-colors">Syllabus</Link>
          <span>/</span>
          <span className="text-text-primary capitalize">{uni.shortName}</span>
        </div>

        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="heading-xl mb-2">{uni.name}</h1>
            <p className="text-text-secondary text-lg">First Year Engineering Syllabus</p>
          </div>
          {uni.pdfLink && (
            <a 
              href={uni.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand-blue font-semibold border-2 border-brand-blue hover:bg-brand-blue hover:text-white px-6 py-2.5 rounded-xl transition-all"
            >
              <Download className="w-5 h-5 -ml-1" />
              Download Official PDF
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          <button 
            onClick={() => setActiveTab('sem1')}
            className={`flex-1 md:flex-none px-8 py-4 text-[16px] font-ui font-semibold transition-colors border-b-2 ${activeTab === 'sem1' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-text-muted hover:text-text-primary'}`}
          >
            Semester 1
          </button>
          <button 
            onClick={() => setActiveTab('sem2')}
            className={`flex-1 md:flex-none px-8 py-4 text-[16px] font-ui font-semibold transition-colors border-b-2 ${activeTab === 'sem2' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-text-muted hover:text-text-primary'}`}
          >
            Semester 2
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-light border-b border-border text-text-muted text-[13px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Credits</th>
                <th className="px-6 py-4 text-center">Exam Hrs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentSubjects.map((sub, i) => (
                <tr key={i} className="hover:bg-surface-light/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-ui font-medium text-[15px] text-text-primary flex items-center gap-2">
                      {sub.type === 'Theory' ? <BookOpen className="w-4 h-4 text-brand-blue/50" /> : <BookOpen className="w-4 h-4 text-brand-teal/50" />}
                      {sub.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${sub.type === 'Theory' ? 'bg-blue-50 text-blue-700' : 'bg-teal-50 text-teal-700'}`}>
                      {sub.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-text-secondary font-medium">
                    {sub.credits}
                  </td>
                  <td className="px-6 py-4 text-center text-text-secondary">
                    {sub.examHours ? (
                      <span className="flex items-center justify-center gap-1.5"><Clock className="w-3.5 h-3.5" />{sub.examHours}h</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-surface-light p-4 text-[13px] text-text-muted italic border-t border-border flex justify-between items-center px-6">
            <span>Note: Detailed grading patterns depend on the university's official ordinance.</span>
            <span className="font-medium text-brand-navy">Total Credits: {currentSubjects.reduce((acc, curr) => acc + curr.credits, 0)}</span>
          </div>
        </div>

        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-8 text-center">
          <h3 className="heading-sm text-brand-navy mb-2">Preparing for your first year?</h3>
          <p className="text-[15px] text-text-secondary mb-6 max-w-lg mx-auto">
            Choose the right college and branch to set a strong foundation for your engineering career. Connect with us to plan your admission strategy.
          </p>
          <Link href="/contact" className="inline-block bg-brand-blue text-white font-medium py-2.5 px-6 rounded-lg hover:bg-[#1648c0] transition-colors shadow-sm">
            Connect with us
          </Link>
        </div>

      </div>
    </div>
  );
}
