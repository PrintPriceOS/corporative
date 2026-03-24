import { z } from 'zod';

export const PartnerOnboardingSchema = z.object({
  // Step 1: Company
  companyName: z.string().min(2, "Company name is too short").max(100, "Too long"),
  website: z.string().url("Invalid website URL").optional().or(z.literal('')),
  country: z.string().min(2, "Country is required").max(50),
  contactName: z.string().min(2, "Contact name is required").max(100),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z.string().max(20).optional().or(z.literal('')),
  
  // Step 2: Capabilities
  productionTypes: z.array(z.string()).min(1, "Select at least one capability"),
  maxSheetSize: z.string().max(50).optional().or(z.literal('')),
  materials: z.string().max(500).optional().or(z.literal('')),
  
  // Step 3: Machinery
  presses: z.string().max(1000).optional().or(z.literal('')),
  typicalJobs: z.string().max(1000).optional().or(z.literal('')),
  colorCaps: z.string().max(200).optional().or(z.literal('')),
  
  // Step 4: Capacity
  monthlyVolume: z.string().min(1, "Select monthly volume"),
  utilization: z.string().min(1, "Select utilization"),
  
  // Step 5: Integration
  integrationLevel: z.string().min(1, "Select integration level"),
  
  // Step 6: Compliance
  standards: z.boolean(),
  certifications: z.string().max(500).optional().or(z.literal('')),
  qaProcess: z.string().max(2000).optional().or(z.literal('')),
  
  // Anti-Spam
  _honeypot: z.string().max(0, "Bot detected (honeypot)").optional(),
  _timestamp: z.string().transform(v => parseInt(v, 10))
});

export type PartnerOnboardingData = z.infer<typeof PartnerOnboardingSchema>;
