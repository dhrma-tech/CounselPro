"use client";

import { CounsellingType } from "@/store/applicationStore";
import { CONTACT_CONFIG } from "@/config/contact";
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
    email: payload.fields.email || CONTACT_CONFIG.email,
    phone: payload.fields.phone || CONTACT_CONFIG.phone,
    whatsappNumber: payload.fields.whatsappNumber || payload.fields.phone || CONTACT_CONFIG.whatsappNumber,
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
      if (result.errors) {
        const errors = result.errors as any;
        const fieldNames = Object.keys(errors);
        const firstError = errors[fieldNames[0]];
        const message = Array.isArray(firstError) ? firstError[0] : 'Validation failed';
        throw new Error(message);
      }
      throw new Error(result.message || 'The server encountered an issue while processing your application. Please try again.');
    }

    return { success: true, id: submissionId };
    
  } catch (error) {
    console.error("Submission error:", error);
    throw error;
  }
}
