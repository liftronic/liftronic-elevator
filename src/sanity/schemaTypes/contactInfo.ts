import { MobileDeviceIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactInfoType = defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: "supportPhone",
      title: "Support Phone",
      description: "Customer support phone number (e.g., 1800 890 8411)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "supportPhoneLabel",
      title: "Support Phone Label",
      description: "Label for support phone (e.g., Liftronic Care)",
      type: "string",
      initialValue: "Liftronic Care",
    }),
    defineField({
      name: "email",
      title: "Email",
      description: "Contact email address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      description: "Label for email (e.g., Send us Email)",
      type: "string",
      initialValue: "Send us Email",
    }),
    defineField({
      name: "salesPhone",
      title: "Sales Enquiry Phone",
      description: "Sales enquiry phone number (e.g., +91 9028226664)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "salesPhoneLabel",
      title: "Sales Phone Label",
      description: "Label for sales phone (e.g., Sales Enquiry)",
      type: "string",
      initialValue: "Sales Enquiry",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      description: "Google Maps embed URL for the location",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "headquarters",
      title: "Headquarters",
      description:
        "Company headquarters address (e.g., Mumbai, Maharashtra, India)",
      type: "string",
      initialValue: "Mumbai, Maharashtra, India",
    }),
    defineField({
      name: "secondaryAddress",
      title: "Secondary Address",
      description:
        "Secondary office or branch address (e.g., Pune, Maharashtra, India)",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      description:
        "WhatsApp business number (format: country code + number, no + or spaces, e.g., 919876543210)",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^[1-9]\d{1,14}$/,
          "Must be a valid phone number without + or spaces (e.g., 919876543210)"
        ),
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Default Message",
      description:
        "Default message that appears when user clicks WhatsApp button",
      type: "text",
      initialValue: "Hello! I'm interested in Liftronic Elevator services.",
    }),
    defineField({
      name: "privacyPolicyUrl",
      title: "Privacy Policy URL",
      description: "Link to the privacy policy page",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "termsOfServiceUrl",
      title: "Terms of Service URL",
      description: "Link to the terms of service page",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      supportPhone: "supportPhone",
      email: "email",
      salesPhone: "salesPhone",
    },
    prepare({ supportPhone, email, salesPhone }) {
      return {
        title: "Contact Information",
        subtitle: `Support: ${supportPhone} | Email: ${email} | Sales: ${salesPhone}`,
      };
    },
  },
});
