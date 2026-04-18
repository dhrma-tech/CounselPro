import Link from 'next/link';
import { syllabus } from '@/data/syllabus';
import { BookOpen, MapPin, Building2 } from 'lucide-react';

export const metadata = {
  title: 'First Year Engineering Syllabus | CounselPro',
  description: 'University-wise syllabus for Semester 1 & 2 for first-year engineering students.'
};

export default function SyllabusPage() {
  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <h1 className="heading-xl mb-4">First Year Engineering Syllabus</h1>
        <p className="body-lg max-w-2xl mx-auto">
          University-wise syllabus for Semester 1 & 2 to help you prepare ahead.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabus.map(uni => (
            <div key={uni.slug} className="bg-surface-white border border-border rounded-xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-all duration-200 flex flex-col h-full">
              <div className="w-12 h-12 bg-surface-light border border-border rounded-xl flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-brand-navy" />
              </div>
              
              <h3 className="heading-sm mb-2 leading-snug">{uni.name}</h3>
              
              <div className="flex gap-4 mb-6 text-sm text-text-muted font-medium mt-auto">
                {uni.affiliatedColleges && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {uni.affiliatedColleges} Affiliated Colleges
                  </span>
                )}
              </div>

              <Link href={`/syllabus/${uni.slug}`} className="block w-full text-center text-brand-blue border border-brand-blue/30 rounded-lg py-2.5 font-medium text-[14px] hover:bg-brand-blue/5 transition-colors">
                View Syllabus &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-navy rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="heading-md mb-4 text-white">Why check the syllabus now?</h2>
          <p className="body-md text-white/80 max-w-2xl mx-auto mb-8">
            First-year engineering introduces completely new subjects like Engineering Mechanics and Graphics. Getting a head start before college begins gives you a significant advantage.
          </p>
          <Link href="/apply" className="inline-block bg-white text-brand-blue py-3 px-8 rounded-lg font-semibold hover:bg-surface-light transition-colors">
            Connect with us for Guidance
          </Link>
        </div>
      </div>
    </>
  );
}
