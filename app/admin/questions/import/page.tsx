import ImportForm from '@/components/admin/ImportForm';

export default function ImportPage() {
  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="heading-sm mb-1">Import questions</h2>
        <p className="text-[14px] text-text-secondary">
          Upload a CSV or JSON file in the format described in <code className="text-[12px] bg-surface-light px-1 rounded">docs/mock-tests/IMPORT_FORMAT.md</code>.
          Questions are matched by <b>external_key</b>, so re-uploading the same file updates questions instead of duplicating them.
          Always run <b>Check file</b> first; nothing is saved until you press <b>Import</b>.
        </p>
      </div>
      <ImportForm />
    </div>
  );
}
