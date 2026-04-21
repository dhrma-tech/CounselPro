"use server";

import { ContactSchema, ApplicationSchema } from '@/lib/schemas';

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const validated = ContactSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const sheetUrl = process.env.SHEET_URL; // Using non-public env
    if (!sheetUrl) {
      console.error('SHEET_URL not configured');
      return { success: false, message: 'Server configuration error' };
    }

    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validated.data,
        formType: 'contact',
        submittedAt: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Submission failed');
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return { success: false, message: error.message || 'Failed to send message. Please try again.' };
  }
}

export async function submitApplicationForm(data: any) {
  const validated = ApplicationSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const sheetUrl = process.env.SHEET_URL;
    if (!sheetUrl) {
      console.error('SHEET_URL not configured');
      return { success: false, message: 'Server configuration error' };
    }

    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validated.data,
        branches: Array.isArray(validated.data.branches) ? validated.data.branches.join(', ') : validated.data.branches,
        collegeTypes: Array.isArray(validated.data.collegeTypes) ? validated.data.collegeTypes.join(', ') : validated.data.collegeTypes,
        formType: 'application',
        submittedAt: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Submission failed');
    }

    return { success: true, message: 'Application submitted successfully!' };
  } catch (error: any) {
    console.error('Application submission error:', error);
    return { success: false, message: error.message || 'Failed to submit application.' };
  }
}
