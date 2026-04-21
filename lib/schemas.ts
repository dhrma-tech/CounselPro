import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['General Inquiry', 'JoSAA Counselling Package', 'MHT CET Strategy Hub', 'Document Verification Help']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const ApplicationSchema = z.object({
  counsellingType: z.string().min(1, 'Counselling type is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  examDetails: z.record(z.string(), z.any()),
  branches: z.array(z.string()),
  collegeTypes: z.array(z.string()),
  feeBudget: z.string(),
  specificColleges: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Consent is required'),
});
