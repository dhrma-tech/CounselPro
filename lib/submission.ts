"use client";

import { CounsellingType } from "@/store/applicationStore";
import { submitApplicationForm } from "@/app/actions/submission";

interface SubmissionPayload {
  counsellingType: CounsellingType;
  fields: Record<string, any>;
}

export async function submitToGoogleSheets(payload: SubmissionPayload) {
  const submissionId = 'CP-' + Date.now();
  
  // Prepare data for server action
  const serverData = {
    counsellingType: payload.counsellingType,
    name: payload.fields.candidateName || payload.fields.name || 'Unknown',
    email: payload.fields.email || 'no-email@counselpro.in',
    phone: payload.fields.phone || '0000000000',
    city: payload.fields.city || 'N/A',
    state: payload.fields.state || 'N/A',
    examDetails: payload.fields, // Pass all for now
    branches: payload.fields.branches || [],
    collegeTypes: payload.fields.collegeTypes || [],
    feeBudget: payload.fields.feeBudget || 'N/A',
    specificColleges: payload.fields.specificColleges || '',
    consent: payload.fields.consent ?? true,
  };

  try {
    const result = await submitApplicationForm(serverData);
    
    if (!result.success) {
      const errorMsg = result.errors 
        ? `Validation Error: ${JSON.stringify(result.errors)}` 
        : result.message || 'Server action failed';
      throw new Error(errorMsg);
    }

    return { success: true, id: submissionId };
    
  } catch (error) {
    console.error("Submission error:", error);
    throw error;
  }
}
