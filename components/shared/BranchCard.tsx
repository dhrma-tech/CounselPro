import Link from 'next/link';
import { Branch } from '@/lib/types';
import { Server, Cpu, Settings, Building, FlaskConical, Zap, Layout, Stethoscope, Pill, HeartPulse, Sprout, Activity } from 'lucide-react';

export default function BranchCard({ branch }: { branch: Branch }) {
  const getIcon = (domain: string) => {
    switch(domain) {
      case 'CS & IT': return <Server className="w-5 h-5 text-brand-blue" />;
      case 'Electronics': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Mechanical': return <Settings className="w-5 h-5 text-orange-600" />;
      case 'Civil': return <Building className="w-5 h-5 text-stone-600" />;
      case 'Chemical': return <FlaskConical className="w-5 h-5 text-green-600" />;
      case 'Electrical': return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'Medical': 
      case 'Clinical':
      case 'Super-Specialty': return <Stethoscope className="w-5 h-5 text-red-600" />;
      case 'Pharmacy': return <Pill className="w-5 h-5 text-emerald-600" />;
      case 'Nursing': return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Agriculture': return <Sprout className="w-5 h-5 text-lime-600" />;
      default: return <Activity className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getBadgeColor = (domain: string) => {
    switch(domain) {
      case 'CS & IT': return 'bg-blue-50 text-blue-700';
      case 'Electronics': return 'bg-purple-50 text-purple-700';
      case 'Mechanical': return 'bg-orange-50 text-orange-700';
      case 'Civil': return 'bg-stone-50 text-stone-700';
      case 'Chemical': return 'bg-green-50 text-green-700';
      case 'Electrical': return 'bg-yellow-50 text-yellow-700';
      case 'Medical':
      case 'Clinical':
      case 'Super-Specialty': return 'bg-red-50 text-red-700';
      case 'Pharmacy': return 'bg-emerald-50 text-emerald-700';
      case 'Nursing': return 'bg-rose-50 text-rose-700';
      case 'Agriculture': return 'bg-lime-50 text-lime-700';
      default: return 'bg-surface-light text-text-secondary';
    }
  };

  return (
    <div className="bg-surface-white border border-border rounded-xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[0.34,1.56,0.64,1] flex flex-col h-full group">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBadgeColor(branch.domain)} bg-opacity-50 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
          {getIcon(branch.domain)}
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-ui font-medium ${getBadgeColor(branch.domain)} group-hover:bg-opacity-80 transition-all`}>
          {branch.domain}
        </span>
      </div>
      
      <h3 className="heading-sm mb-2 group-hover:text-brand-blue transition-colors duration-300">{branch.name}</h3>
      <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-2">{branch.description}</p>
      
      {branch.topColleges && branch.topColleges.length > 0 && (
        <div className="mb-6 pt-4 border-t border-border group-hover:border-brand-blue/20 transition-colors">
          <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-2">Top Colleges</div>
          <div className="flex flex-wrap gap-1.5">
            {branch.topColleges.slice(0, 3).map(c => (
              <span key={c} className="text-[11px] px-2 py-1 bg-surface-light text-text-secondary rounded font-bold border border-border group-hover:border-brand-blue/20 transition-colors">{c}</span>
            ))}
          </div>
        </div>
      )}
      
      <Link href={`/branches/${branch.slug}`} className="block w-full text-center text-brand-blue border border-brand-blue/30 rounded-lg py-2.5 font-bold text-[14px] group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300 mt-auto">
        Explore Branch &rarr;
      </Link>
    </div>
  );
}
