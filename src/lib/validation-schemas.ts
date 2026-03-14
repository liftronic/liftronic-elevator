import { z } from "zod";

const formProtectionFields = {
  website: z.string().trim().max(0),
};

const phoneNumberSchema = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(25, "Please enter a valid phone number")
  .refine((val) => {
    const digits = val.replace(/\D/g, "");
    const validFormat = /^[+]?[\d\s\-()./]+$/.test(val);

    return validFormat && digits.length >= 7 && digits.length <= 15;
  }, "Please enter a valid phone number");

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  ...formProtectionFields,
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .string()
    .trim()
    .pipe(z.email("Please enter a valid email address"))
    .optional()
    .or(z.literal("")),
  phone: phoneNumberSchema,
  productInterest: z.string().trim().min(1, "Please select a product").max(120),
  location: z.string().trim().max(250).optional(),
  requirements: z.string().trim().max(5000).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Catalog Form Validation Schema
export const catalogFormSchema = z.object({
  ...formProtectionFields,
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: phoneNumberSchema,
  location: z.string().trim().max(250).optional(),
});

export type CatalogFormData = z.infer<typeof catalogFormSchema>;

// Private Experience Form Validation Schema
export const privateExperienceFormSchema = z.object({
  ...formProtectionFields,
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().pipe(z.email("Please enter a valid email address")),
  phone: phoneNumberSchema,
  company: z.string().trim().max(250).optional(),
  branchName: z.string().trim().min(1).max(120),
  branchSlug: z.string().trim().min(1).max(120),
});

export type PrivateExperienceFormData = z.infer<
  typeof privateExperienceFormSchema
>;
