"use client";

import { CounsellingType } from "@/store/applicationStore";
import { SHEETS_CONFIG } from "@/config/sheets";

interface SubmissionPayload {
  counsellingType: CounsellingType;
  fields: Record<string, any>;
}

export async function submitToGoogleSheets(payload: SubmissionPayload) {
  const submissionId = 'CP-' + Date.now();
  
  // Add metadata and the ID to the fields
  const fullPayload = {
    ...payload,
    fields: {
      ...payload.fields,
      id: submissionId,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      referralCode: payload.fields.referralCode || 'NONE'
    }
  };

  try {
    const response = await fetch(SHEETS_CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "no-cors", 
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(fullPayload),
    });

    return { success: true, id: submissionId };
    
  } catch (error) {
    console.error("Submission error:", error);
    throw error;
  }
}
