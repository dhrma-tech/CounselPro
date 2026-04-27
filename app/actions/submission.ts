"use server";

import { ContactSchema, ApplicationSchema } from '@/lib/schemas';
import { postToGoogleSheets } from '@/lib/google-sheets';

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject') || 'General Inquiry',
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
    const sheetUrl = process.env.SHEET_URL;
    if (!sheetUrl) {
      console.error('SHEET_URL not configured');
      return { success: false, message: 'Server configuration error' };
    }

    const result = await postToGoogleSheets(sheetUrl, {
      ...validated.data,
      formType: 'contact',
      submittedAt: new Date().toISOString(),
    });

    if (!result.success) {
      console.error('Contact submission failed:', result.message);
      return { success: false, message: result.message };
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error: any) {
    console.error('Contact submission crash:', error);
    return { success: false, message: 'Failed to submit. Please try again or contact support directly.' };
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

    const result = await postToGoogleSheets(sheetUrl, {
      ...validated.data,
      branches: Array.isArray(validated.data.branches) ? validated.data.branches.join(', ') : validated.data.branches,
      collegeTypes: Array.isArray(validated.data.collegeTypes) ? validated.data.collegeTypes.join(', ') : validated.data.collegeTypes,
      formType: 'application',
      submittedAt: new Date().toISOString(),
    });

    if (!result.success) {
      console.error('Application submission failed:', result.message);
      return { success: false, message: result.message };
    }

    return { success: true, message: 'Application submitted successfully!' };
  } catch (error: any) {
    console.error('Application submission crash:', error);
    return { success: false, message: 'Failed to submit application. Please try again or contact support.' };
  }
}
