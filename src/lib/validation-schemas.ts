import { z } from "zod";

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
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
