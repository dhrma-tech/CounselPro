"use client";

import { CounsellingType } from "@/store/applicationStore";
import { SHEETS_CONFIG } from "@/config/sheets";

interface SubmissionPayload {
  counsellingType: CounsellingType;
  fields: Record<string, any>;
}

export async function submitToGoogleSheets(payload: SubmissionPayload) {
  // Add metadata
  const fullPayload = {
    ...payload,
    fields: {
      ...payload.fields,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      referralCode: payload.fields.referralCode || 'NONE'
    }
  };

  try {
    const response = await fetch(SHEETS_CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "no-cors", // Apps Script Web App requirement for CORS avoidance in simple setup
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain", // Important: Apps Script prefers text/plain for doPost
      },
      body: JSON.stringify(fullPayload),
    });

    // Note: With opaque responses (no-cors), we can't reliably read the body
    // In a production env with a custom domain/proxy, we'd use regular cors.
    // For this prompt, we'll assume success if no error is thrown by fetch.
    return { success: true, id: 'CP-' + Date.now() };
    
  } catch (error) {
    console.error("Submission error:", error);
    throw error;
  }
}
