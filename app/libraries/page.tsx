"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Download, 
  Database, 
  Archive, 
  ChevronRight, 
  Filter,
  ArrowRight,
  Info,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const LIBRARY_CATEGORIES = ['All', 'JoSAA', 'MHT-CET', 'Seat Matrix', 'Cutoffs', 'Syllabus'];

const DOCUMENTS = [
  {
    id: 1,
    title: "Official JoSAA 2025 Seat Matrix",
    category: "Seat Matrix",
    tags: ["JoSAA", "IIT", "NIT"],
    year: "2025",
    type: "PDF",
    size: "2.4 MB",
    description: "The complete breakdown of available seats across all 118 JoSAA institutes for the current year."
  },
  {
    id: 2,
    title: "MHT CET 2024 Final Cutoff List (Round 3)",
    category: "Cutoffs",
    tags: ["MHT-CET", "Engineering", "Maharashtra"],
    year: "2024",
    type: "PDF",
    size: "4.1 MB",
    description: "Detailed branch-wise and category-wise closing ranks for all engineering colleges in Maharashtra."
  },
  {
    id: 3,
    title: "JoSAA Opening & Closing Ranks - 2024 Archive",
    category: "Cutoffs",
    tags: ["JoSAA", "Archive", "IIT"],
    year: "2024",
    type: "Archive",
    size: "12.8 MB",
    description: "Complete historical data from the previous year to help you predict your allotment chances."
  },
  {
    id: 4,
    title: "DTE Maharashtra Admission Rules & Regulations 2025",
    category: "JoSAA", // Actually MHT-CET but tagging it for filter
    tags: ["MHT-CET", "Official", "Rules"],
    year: "2025",
    type: "PDF",
    size: "1.2 MB",
    description: "The official information brochure detailing candidature types, reservation policies, and CAP rules."
  },
  {
    id: 5,
    title: "Engineering Syllabus Repository (All Universities)",
    category: "Syllabus",
    tags: ["Syllabus", "Academic", "First Year"],
    year: "2024-25",
    type: "Hub",
    link: "/syllabus",
    description: "Direct access to our specialized university-wise syllabus portals for first-year engineering."
  },
  {
    id: 6,
    title: "CSAB 2024 Special Round Vacancy Report",
    category: "Seat Matrix",
    tags: ["CSAB", "Special Round", "NIT"],
    year: "2024",
    type: "PDF",
    size: "850 KB",
    description: "Record of vacant seats after JoSAA completion for the 2024 session."
  }
];

export default function LibrariesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    return DOCUMENTS.filter(doc => {
      const matchesCategory = activeCategory === 'All' || 
                             doc.category === activeCategory || 
                             doc.tags.includes(activeCategory);
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-surface-white">
      {/* GLOSSY HERO SECTION */}
      <div className="pt-32 pb-20 bg-surface-light border-b border-border relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full mb-6 text-[12px] font-black tracking-widest uppercase border border-brand-blue/10">
              <Archive className="w-4 h-4" />
              Admission Knowledge Store
            </span>
            <h1 className="heading-xl italic text-text-primary mb-6">
              The Data <span className="text-brand-blue not-italic font-black">Libraries.</span>
            </h1>
            <p className="body-lg text-text-secondary leading-relaxed max-w-2xl">
              Access the most comprehensive collection of official PDFs, seat matrices, 
              and historical cutoff datasets. Verified by our experts to ensure you plan with the right numbers.
            </p>
          </motion.div>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/[0.03] rounded-bl-[200px] pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* SMART FILTER & SEARCH BAR */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mr-4 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {LIBRARY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/20'
                      : 'bg-white border-border text-text-secondary hover:border-brand-blue/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text"
              placeholder="Search documents, years, exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-border rounded-2xl text-[14px] font-medium focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
            />
          </div>
        </div>

        {/* DOCUMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDocs.map((doc, idx) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.2) }}
                className="group flex flex-col bg-white border border-border rounded-[32px] p-8 hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[48px] opacity-10 transition-transform duration-500 group-hover:scale-110 ${
                  doc.type === 'PDF' ? 'bg-rose-500' : doc.type === 'Archive' ? 'bg-brand-blue' : 'bg-brand-teal'
                }`} />

                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-border bg-surface-white transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/5 ${
                      doc.type === 'PDF' ? 'text-rose-600' : doc.type === 'Archive' ? 'text-brand-blue' : 'text-brand-teal'
                    }`}>
                      {doc.type === 'PDF' ? <FileText className="w-7 h-7" /> : doc.type === 'Archive' ? <Archive className="w-7 h-7" /> : <Database className="w-7 h-7" />}
                    </div>
                    <span className="text-[11px] font-black text-text-muted opacity-40 uppercase tracking-widest">{doc.year} Session</span>
                  </div>

                  <div className="mb-6">
                    <span className="inline-block px-2.5 py-1 bg-surface-light border border-border rounded-lg text-[10px] font-black uppercase text-text-muted mb-3 group-hover:text-brand-blue transition-colors">
                      {doc.category}
                    </span>
                    <h3 className="text-[20px] font-black text-text-primary leading-tight mb-3 group-hover:text-brand-blue transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed font-medium line-clamp-3">
                      {doc.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {doc.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-text-muted bg-surface-light px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Format: {doc.type}</span>
                    <span className="text-[12px] font-bold text-text-primary">{doc.size || 'Redirect'}</span>
                  </div>
                  
                  {doc.link ? (
                    <Link 
                      href={doc.link}
                      className="inline-flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-brand-blue transition-all shadow-md group-hover:shadow-lg"
                    >
                      Visit Hub <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button 
                      className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-brand-navy transition-all shadow-md group-hover:shadow-lg"
                    >
                      Download <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {filteredDocs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-surface-light rounded-[48px] border-2 border-dashed border-border"
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="heading-sm mb-2">No documents found</h3>
            <p className="body-md text-text-secondary max-w-sm mx-auto mb-8">
              We couldn't find any results for "{searchQuery}" in our {activeCategory} archives.
            </p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-brand-blue font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* GUIDANCE CALLOUT */}
        <div className="mt-28 bg-brand-navy rounded-[48px] p-8 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <Calendar className="w-12 h-12 text-brand-teal mx-auto mb-8 opacity-40" />
            <h2 className="heading-lg mb-6 text-white italic">Strategic <span className="text-brand-teal not-italic font-black">Planning Data.</span></h2>
            <p className="body-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Historical cutoffs are just indicators, not guarantees. Our counsellors use multi-year 
              trend analysis to build a choice list that account for seat increases and shifts in student preferences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/apply" 
                className="inline-block px-10 py-5 bg-white text-brand-blue rounded-2xl font-black uppercase text-[13px] tracking-widest hover:bg-brand-teal hover:text-white transition-all shadow-xl hover:-translate-y-1"
              >
                Analyze My Rank
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold text-sm"
              >
                Talk to Data Expert <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Background Accents */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] -ml-48 -mt-48" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] -mr-48 -mb-48" />
        </div>
      </div>
    </div>
  );
}
