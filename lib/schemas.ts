import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 3,
      { message: 'Please provide your full legal name (minimum 3 words)' }
    ),
  phone: z.string().regex(/^\d{10}$/, 'A valid 10-digit mobile number is required'),
  email: z.string().email('Please provide a valid email address for communication'),
  subject: z.enum(['General Inquiry', 'JoSAA Counselling Package', 'MHT CET Strategy Hub', 'Document Verification Help']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const ApplicationSchema = z.object({
  counsellingType: z.string().min(1, 'Counselling type is required'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 3,
      { message: 'Please provide your full legal name (minimum 3 words)' }
    ),
  phone: z.string().regex(/^\d{10}$/, 'A valid 10-digit mobile number is required'),
  whatsappNumber: z.string().regex(/^\d{10}$/, 'A valid 10-digit WhatsApp number is required'),
  email: z.string().email('Please provide a valid email address for communication'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  examDetails: z.record(z.string(), z.any()),
  branches: z.array(z.string()),
  collegeTypes: z.array(z.string()),
  feeBudget: z.string(),
  specificColleges: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Consent is required to proceed'),
});
