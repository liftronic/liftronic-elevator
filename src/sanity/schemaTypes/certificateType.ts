import { defineField, defineType } from "sanity";

export const certificateType = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  icon: () => "🏆",
  fields: [
    defineField({
      name: "title",
      title: "Certificate Title",
      type: "string",
      description: "The name/title of the certificate (e.g., Certificate of Appreciation)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      description: "The organization that issued this certificate",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "string",
      description: "When the certificate was issued (e.g., October 2022 or 2022)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "certificateImage",
      title: "Certificate Image",
      type: "image",
      description: "Upload the certificate image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      description: "Alternative text for the certificate image (for accessibility)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description or context about this certificate",
      rows: 3,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which this certificate should appear (lower numbers first)",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Certificate",
      type: "boolean",
      description: "Show this certificate prominently",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      issuer: "issuer",
      date: "issueDate",
      media: "certificateImage",
      isFeatured: "isFeatured",
    },
    prepare(selection) {
      const { title, issuer, date, media, isFeatured } = selection;
      return {
        title: title,
        subtitle: `${issuer} - ${date}${isFeatured ? " ⭐" : ""}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Issue Date (Newest First)",
      name: "issueDateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    },
  ],
});
