import { ApplicationData } from './types';

export async function submitToSheets(data: ApplicationData): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SHEET_URL;
  if (!url) throw new Error('Sheet URL not configured');

  const payload = {
    ...data,
    branches: data.branches.join(', '),
    collegeTypes: data.collegeTypes.join(', '),
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Submission failed');
}
