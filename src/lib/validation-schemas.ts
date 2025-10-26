import { z } from "zod";

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      // Remove all spaces and hyphens, keep + for country code
      const cleaned = val.replace(/[\s-]/g, "");
      // Must start with + or digit, and contain only valid phone characters
      const validFormat = /^[\+]?[0-9]{7,15}$/.test(cleaned);
      return validFormat && cleaned.length >= 8;
    }, "Please enter a valid phone number with country code"),
  productInterest: z.string().min(1, "Please select a product"),
  location: z.string().optional(),
  requirements: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Catalog Form Validation Schema
export const catalogFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      // Remove all spaces and hyphens, keep + for country code
      const cleaned = val.replace(/[\s-]/g, "");
      // Must start with + or digit, and contain only valid phone characters
      const validFormat = /^[\+]?[0-9]{7,15}$/.test(cleaned);
      return validFormat && cleaned.length >= 8;
    }, "Please enter a valid phone number with country code"),
  location: z.string().optional(),
});

export type CatalogFormData = z.infer<typeof catalogFormSchema>;
