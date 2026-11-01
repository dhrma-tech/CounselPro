"use client";

import { useState } from 'react';
import { CheckCircle2, Loader2, Upload } from 'lucide-react';
import { commitImport, previewImport, type ImportReport } from '@/app/admin/actions';

export default function ImportForm() {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [approve, setApprove] = useState(false);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [busy, setBusy] = useState<'check' | 'import' | null>(null);
  const [checkedText, setCheckedText] = useState<string | null>(null);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setFormat(file.name.toLowerCase().endsWith('.json') ? 'json' : 'csv');
    setText(await file.text());
    setReport(null);
    setCheckedText(null);
  };

  const check = async () => {
    setBusy('check');
    const r = await previewImport(format, text).catch((e) => ({ ok: false, total: 0, valid: 0, newCount: 0, updateCount: 0, errors: [], message: String(e?.message ?? e) }));
    setReport(r);
    setCheckedText(r.ok ? text : null);
    setBusy(null);
  };

  const doImport = async () => {
    setBusy('import');
    const r = await commitImport(format, text, approve).catch((e) => ({ ok: false, total: 0, valid: 0, newCount: 0, updateCount: 0, errors: [], message: String(e?.message ?? e) }));
    setReport(r);
    setCheckedText(null);
    setBusy(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="h-11 px-4 rounded-xl border border-border bg-white flex items-center gap-2 text-[13px] font-semibold cursor-pointer hover:bg-surface-light">
          <Upload className="w-4 h-4" /> {fileName || 'Choose CSV / JSON file'}
          <input type="file" accept=".csv,.json,text/csv,application/json" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        <select value={format} onChange={(e) => { setFormat(e.target.value as 'csv' | 'json'); setCheckedText(null); }} className="h-11 rounded-xl border border-border bg-white px-3 text-[13px]">
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setCheckedText(null); }}
        placeholder="…or paste the file contents here"
        rows={10}
        className="w-full rounded-xl border border-border bg-white p-3 font-mono text-[12px]"
      />
      <label className="flex items-center gap-2 text-[13px] text-text-secondary">
        <input type="checkbox" checked={approve} onChange={(e) => setApprove(e.target.checked)} className="accent-[#1A56DB]" />
        Mark imported questions as Approved (otherwise they stay as Draft for review)
      </label>
      <div className="flex gap-3">
        <button onClick={check} disabled={!text || busy !== null} className="h-11 px-5 rounded-xl border border-border bg-white text-[14px] font-semibold disabled:opacity-50 flex items-center gap-2">
          {busy === 'check' && <Loader2 className="w-4 h-4 animate-spin" />} Check file
        </button>
        <button onClick={doImport} disabled={checkedText !== text || !text || busy !== null} className="h-11 px-5 rounded-xl bg-brand-blue text-white text-[14px] font-semibold disabled:opacity-50 flex items-center gap-2">
          {busy === 'import' && <Loader2 className="w-4 h-4 animate-spin" />} Import
        </button>
      </div>

      {report && (
        <div className={`rounded-2xl border p-4 text-[13px] ${report.ok ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {report.message && <p className="font-semibold mb-2">{report.message}</p>}
          <p className="flex items-center gap-2">
            {report.ok && <CheckCircle2 className="w-4 h-4 text-green-600" />}
            {report.total} rows read · {report.valid} valid · {report.newCount} new · {report.updateCount} will update · {report.errors.length} with errors
          </p>
          {report.errors.length > 0 && (
            <ul className="mt-3 space-y-1.5 max-h-80 overflow-y-auto">
              {report.errors.slice(0, 200).map((e, i) => (
                <li key={i}><span className="font-mono font-semibold">{e.externalKey}</span>: {e.errors.join('; ')}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
