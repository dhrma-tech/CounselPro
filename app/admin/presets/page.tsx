import { connection } from 'next/server';
import { listPresets } from '@/lib/tests/server/content';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { addRankReference, updatePreset } from '../actions';

export default async function AdminPresets() {
  // Admin data must be read per request, never at build time
  await connection();
  const presets = await listPresets();
  const { data: refs } = await supabaseAdmin()
    .from('rank_reference')
    .select('id, preset_id, year, source, is_sample, rows, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="heading-sm">Exam presets</h2>
        <p className="text-[13px] text-text-muted">
          Check each pattern against the official notice every year. Mark it verified only after you have confirmed it, and add the official URL.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((p) => (
            <form key={p.id} action={updatePreset} className="bg-white border border-border rounded-2xl p-5 space-y-3 text-[13px]">
              <input type="hidden" name="id" value={p.id} />
              <div className="flex items-center justify-between">
                <p className="font-ui font-bold text-[15px]">{p.name}</p>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.verified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {p.verified ? `Verified ${p.lastVerifiedAt ? new Date(p.lastVerifiedAt).toLocaleDateString('en-IN') : ''}` : 'Not verified'}
                </span>
              </div>
              <p className="text-text-muted">
                {Math.round(p.durationSeconds / 60)} min · {p.totalMarks} marks · {p.sections.map((s) => `${s.name} ${s.questionCount}`).join(', ')}
              </p>
              <label className="block">Registered candidates (used for the rank range)
                <input name="registrations_count" type="number" defaultValue={p.registrationsCount ?? ''} className="input-field mt-1 h-10" />
              </label>
              <label className="block">Official source URLs
                <input name="verified_sources" defaultValue={p.verifiedSources.join(' ')} className="input-field mt-1 h-10" />
              </label>
              <label className="flex items-center gap-2"><input type="checkbox" name="verified" defaultChecked={p.verified} className="accent-[#1A56DB]" /> I confirmed this pattern against the official notice</label>
              <button className="h-9 px-4 rounded-lg bg-brand-blue text-white font-semibold">Save</button>
            </form>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="heading-sm">Rank reference tables (marks → percentile)</h2>
        <form action={addRankReference} className="bg-white border border-border rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
          <label className="block">Preset
            <select name="preset_id" className="input-field mt-1 h-10">
              {presets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label className="block">Year<input name="year" type="number" defaultValue={new Date().getFullYear()} className="input-field mt-1 h-10" /></label>
          <label className="block md:col-span-2">Source (where this data comes from)<input name="source" required className="input-field mt-1 h-10" /></label>
          <label className="block md:col-span-2">Rows, one per line: <code>marks,percentile</code>
            <textarea name="rows" rows={6} required placeholder={'0,5\n100,90\n200,99.5'} className="w-full mt-1 rounded-xl border border-border bg-surface-light p-3 font-mono text-[12px]" />
          </label>
          <label className="flex items-center gap-2"><input type="checkbox" name="is_sample" className="accent-[#1A56DB]" /> This is sample / unofficial data</label>
          <button className="h-10 px-4 rounded-lg bg-brand-blue text-white font-semibold md:justify-self-end">Add table</button>
        </form>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border/60 text-[13px]">
          {(refs ?? []).map((r) => (
            <div key={r.id as string} className="px-4 py-3 flex flex-wrap gap-3">
              <span className="font-semibold">{r.preset_id as string} · {r.year as number}</span>
              <span className="text-text-muted flex-1">{r.source as string}</span>
              <span>{(r.rows as unknown[]).length} rows</span>
              <span className={r.is_sample ? 'text-amber-700' : 'text-green-700'}>{r.is_sample ? 'Sample' : 'Official / owned'}</span>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-text-muted">The newest table for each preset is used. Sample tables are labelled as such on students&apos; results.</p>
      </section>
    </div>
  );
}
