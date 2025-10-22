import { z } from "zod";

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string()
    .refine(
      (val) => {
        // Remove all non-digit characters
        const digits = val.replace(/\D/g, "");
        // Check if it's 10 digits (without country code) or 12 digits (with 91 country code)
        if (digits.length === 10) {
          // Check if first digit is 6-9 (valid mobile range)
          return /^[6-9]/.test(digits);
        } else if (digits.length === 12) {
          // Must start with 91 (India country code) followed by 6-9
          return /^91[6-9]/.test(digits);
        }
        return false;
      },
      "Please enter a valid Indian phone number (10 digits starting with 6-9)"
    ),
  productInterest: z.string().min(1, "Please select a product"),
  location: z.string().optional(),
  requirements: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Catalog Form Validation Schema
export const catalogFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  location: z.string().optional(),
});

export type CatalogFormData = z.infer<typeof catalogFormSchema>;
