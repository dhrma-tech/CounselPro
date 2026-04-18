import { ApplicationData } from '@/lib/types';
import { GraduationCap, BookOpen, HelpCircle } from 'lucide-react';

interface StepProps {
  data: ApplicationData;
  setData: (data: ApplicationData) => void;
  onEdit?: (step: number) => void;
}

export function Step1CounsellingType({ data, setData }: StepProps) {
  const options = [
    { id: 'JoSAA', title: 'JoSAA Counselling', desc: 'JEE Main / Advanced → IIT, NIT, IIIT, GFTI', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'MHT CET', title: 'MHT CET Counselling', desc: 'MHT CET → Maharashtra State Engineering Colleges', icon: <BookOpen className="w-6 h-6" /> },
    { id: 'Other', title: 'Other / Not Sure', desc: "We'll help you figure out the right path", icon: <HelpCircle className="w-6 h-6" /> }
  ];

  return (
    <div className="pt-8">
      <h3 className="heading-md mb-2">Which counselling are you applying for?</h3>
      <p className="body-md mb-8">Select the exam path that applies to you.</p>

      <div className="space-y-4">
        {options.map((opt) => (
          <label 
            key={opt.id}
            className={`flex items-center p-5 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
              data.counsellingType === opt.id 
                ? 'border-brand-blue bg-brand-blue/5' 
                : 'border-transparent bg-white border border-border hover:border-brand-blue/40' // Tailwind will merge border-2 and border
            } shadow-[0_1px_4px_rgba(0,0,0,0.04)]`}
          >
            <input 
              type="radio" 
              name="counselling" 
              value={opt.id}
              checked={data.counsellingType === opt.id}
              onChange={() => setData({ ...data, counsellingType: opt.id, examDetails: {} })}
              className="sr-only"
            />
            <div className={`mr-4 ${data.counsellingType === opt.id ? 'text-brand-blue' : 'text-text-muted'}`}>
              {opt.icon}
            </div>
            <div>
              <div className="font-ui font-semibold text-[16px] text-text-primary">{opt.title}</div>
              <div className="font-ui text-[14px] text-text-secondary">{opt.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export function Step2PersonalDetails({ data, setData }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-8">
      <h3 className="heading-md mb-8">Tell us about yourself</h3>

      <div className="space-y-5 flex flex-col">
        <div>
          <label className="block label mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input 
            type="text" name="name" value={data.name} onChange={handleChange} required
            className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block label mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
          <input 
            type="tel" name="phone" value={data.phone} onChange={handleChange} required
            className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="9876543210" pattern="[0-9]{10}"
          />
          <p className="text-text-muted text-[12px] mt-1.5 tracking-wide">🔒 We'll only use this to contact you. No spam.</p>
        </div>

        <div>
          <label className="block label mb-1.5">Email Address <span className="text-red-500">*</span></label>
          <input 
            type="email" name="email" value={data.email} onChange={handleChange} required
            className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block label mb-1.5">City / District <span className="text-red-500">*</span></label>
            <input 
              type="text" name="city" value={data.city} onChange={handleChange} required
              className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="Pune"
            />
          </div>
          <div>
            <label className="block label mb-1.5">State</label>
            <select 
              name="state" value={data.state} onChange={handleChange}
              className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Madhya Pradesh</option>
              <option>Gujarat</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step3ExamDetails({ data, setData }: StepProps) {
  const isJoSAA = data.counsellingType === 'JoSAA';
  const isMHT = data.counsellingType === 'MHT CET';

  const heading = isJoSAA ? "Your JEE Details" : isMHT ? "Your MHT CET Details" : "Your Exam Details";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, examDetails: { ...data.examDetails, [e.target.name]: e.target.value } });
  };

  return (
    <div className="pt-8">
      <h3 className="heading-md mb-8">{heading}</h3>

      <div className="space-y-5">
        {isJoSAA && (
          <>
            <div>
              <label className="block label mb-1.5">JEE Main Application Number</label>
              <input type="text" name="jeeAppNum" value={data.examDetails.jeeAppNum || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label mb-1.5">JEE Main Percentile</label>
                <input type="number" step="0.01" name="jeePercentile" value={data.examDetails.jeePercentile || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label className="block label mb-1.5">JEE Adv Rank (Optional)</label>
                <input type="number" name="jeeAdvRank" value={data.examDetails.jeeAdvRank || ''} onChange={handleChange} placeholder="If applicable" className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
            </div>
            <div>
              <label className="block label mb-1.5">Category</label>
              <select name="category" value={data.examDetails.category || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                <option value="">Select Category</option>
                <option>General</option><option>OBC-NCL</option><option>SC</option><option>ST</option><option>EWS</option><option>PwD</option>
              </select>
            </div>
          </>
        )}

        {isMHT && (
          <>
            <div>
              <label className="block label mb-1.5">MHT CET Application Number</label>
              <input type="text" name="mhtAppNum" value={data.examDetails.mhtAppNum || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
              <label className="block label mb-1.5">MHT CET Percentile</label>
              <input type="number" step="0.01" name="mhtPercentile" value={data.examDetails.mhtPercentile || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label mb-1.5">Category</label>
                <select name="category" value={data.examDetails.category || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                  <option value="">Select Category</option>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>VJ/NT/SBC</option><option>EWS</option>
                </select>
              </div>
              <div>
                <label className="block label mb-1.5">Candidature</label>
                <select name="candidature" value={data.examDetails.candidature || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                  <option value="">Select Type</option>
                  <option>Home District</option>
                  <option>Other than Home</option>
                  <option>J&K Migrant</option>
                </select>
              </div>
            </div>
          </>
        )}

        {!isJoSAA && !isMHT && (
          <>
            <div>
              <label className="block label mb-1.5">Exam Name</label>
              <input type="text" name="examName" value={data.examDetails.examName || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
              <label className="block label mb-1.5">Score / Rank</label>
              <input type="text" name="score" value={data.examDetails.score || ''} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function Step4Preferences({ data, setData }: StepProps) {
  const branches = ["Computer Science", "IT", "Electronics", "Mechanical", "Civil", "Chemical", "AI/ML", "Data Science", "Electrical"];
  const collegeTypes = ["IIT", "NIT", "IIIT", "GFTI", "State Government", "Autonomous Private", "Private"];

  const toggleArray = (arr: string[], item: string, max?: number) => {
    if (arr.includes(item)) return arr.filter(i => i !== item);
    if (max && arr.length >= max) return arr;
    return [...arr, item];
  };

  return (
    <div className="pt-8">
      <h3 className="heading-md mb-2">Your college preferences</h3>
      <p className="body-md mb-8">This helps us build your shortlist.</p>

      <div className="space-y-6">
        <div>
          <label className="block label mb-3">Preferred Branch (Max 3)</label>
          <div className="flex flex-wrap gap-2">
            {branches.map(b => (
              <button
                key={b}
                onClick={() => setData({ ...data, branches: toggleArray(data.branches, b, 3) })}
                className={`px-3 py-1.5 rounded-full text-[13px] font-ui transition-all ${
                  data.branches.includes(b) ? 'bg-brand-blue text-white' : 'bg-surface-light border border-border text-text-secondary hover:border-brand-blue/50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block label mb-3">Type of Colleges</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {collegeTypes.map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer text-[14px] text-text-secondary">
                <input 
                  type="checkbox" 
                  checked={data.collegeTypes.includes(t)}
                  onChange={() => setData({ ...data, collegeTypes: toggleArray(data.collegeTypes, t) })}
                  className="rounded text-brand-blue border-border focus:ring-brand-blue/30 w-4 h-4"
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block label mb-1.5">Specific Colleges in Mind (Optional)</label>
          <textarea 
            rows={2}
            value={data.specificColleges}
            onChange={(e) => setData({ ...data, specificColleges: e.target.value })}
            placeholder="e.g. COEP Pune, VJTI Mumbai"
            className="w-full p-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export function Step5Review({ data, setData, onEdit }: StepProps) {
  return (
    <div className="pt-8">
      <h3 className="heading-md mb-6">Review your application</h3>

      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
        <section className="bg-surface-light p-4 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-3">
            <h4 className="label text-brand-navy">Personal Details</h4>
            <button onClick={() => onEdit?.(2)} className="text-brand-blue text-[13px] font-medium hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[14px]">
            <div><span className="text-text-muted block text-[12px]">Name</span><span className="font-medium text-text-primary">{data.name || '-'}</span></div>
            <div><span className="text-text-muted block text-[12px]">Phone</span><span className="font-medium text-text-primary">{data.phone || '-'}</span></div>
            <div><span className="text-text-muted block text-[12px]">Email</span><span className="font-medium text-text-primary break-all">{data.email || '-'}</span></div>
            <div><span className="text-text-muted block text-[12px]">City/State</span><span className="font-medium text-text-primary">{data.city}, {data.state}</span></div>
          </div>
        </section>

        <section className="bg-surface-light p-4 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-3">
            <h4 className="label text-brand-navy">Counselling & Exam</h4>
            <button onClick={() => onEdit?.(3)} className="text-brand-blue text-[13px] font-medium hover:underline">Edit</button>
          </div>
          <div className="bg-white p-3 rounded-lg border border-border text-[14px] font-medium text-text-primary mb-3">
            {data.counsellingType || 'Not Selected'}
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[14px]">
            {Object.entries(data.examDetails).map(([k, v]) => (
              <div key={k}>
                <span className="text-text-muted block text-[12px]">{k}</span>
                <span className="font-medium text-text-primary">{v || '-'}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-light p-4 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-3">
            <h4 className="label text-brand-navy">Preferences</h4>
            <button onClick={() => onEdit?.(4)} className="text-brand-blue text-[13px] font-medium hover:underline">Edit</button>
          </div>
          <div className="text-[14px] space-y-2">
            <div><strong className="font-medium text-text-secondary">Branches:</strong> {data.branches.join(', ') || '-'}</div>
            <div><strong className="font-medium text-text-secondary">College Types:</strong> {data.collegeTypes.join(', ') || '-'}</div>
          </div>
        </section>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer p-4 border border-brand-blue/30 bg-brand-blue/5 rounded-xl">
            <input 
              type="checkbox" 
              checked={data.consent}
              onChange={(e) => setData({ ...data, consent: e.target.checked })}
              className="mt-1 w-5 h-5 rounded text-brand-blue border-border"
            />
            <span className="text-[13px] text-text-secondary leading-snug font-medium">
              I agree to be contacted by CounselPro regarding my counselling application. 
              I understand my data will not be shared with third parties.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
