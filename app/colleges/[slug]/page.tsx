import { College } from '@/lib/types';
import { colleges } from '@/data/colleges';
import CollegeDetailClient from '@/components/colleges/CollegeDetailClient';

export function generateStaticParams() {
  return colleges.map((college) => ({ slug: college.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = colleges.find(c => c.slug === slug);
  if (!college) return { title: 'College Not Found' };
  return {
    title: `${college.name} — Cutoffs, Branches, Fees | CounselPro`,
    description: `Admission cutoffs, fee structure, placements, and branch details for ${college.name}.`,
  };
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = colleges.find(c => c.slug === slug);
  const related = college
    ? colleges.filter(c => c.slug !== college.slug && (c.type === college.type || c.state === college.state)).slice(0, 3)
    : [];

  if (!college) {
    return <div className="py-40 text-center text-text-muted">College not found.</div>;
  }

  return <CollegeDetailClient college={college} related={related} />;
}
