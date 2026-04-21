import { ApplicationData } from './types';
import { submitApplicationForm } from '@/app/actions/submission';

export async function submitToSheets(data: ApplicationData): Promise<void> {
  const payload = {
    ...data,
    branches: data.branches,
    collegeTypes: data.collegeTypes,
  };

  const result = await submitApplicationForm(payload);

  if (!result.success) {
    throw new Error(result.message || 'Submission failed');
  }
}
