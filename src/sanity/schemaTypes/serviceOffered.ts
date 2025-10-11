import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service Offered",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      description: "Used for URL generation (e.g., 'design-consultation')",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Service Summary",
      type: "text",
      description: "Brief description for service cards and meta descriptions",
      rows: 2,
      validation: (Rule) => Rule.required().min(20).max(160),
    }),
    defineField({
      name: "description",
      title: "Service Description",
      type: "text",
      description: "Detailed service description for the service page",
      rows: 4,
      validation: (Rule) => Rule.required().min(50),
    }),
    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      description: "Mark as featured to show 'Popular' badge",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Service Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags for categorization and filtering",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      description: "Main image for the service page and cards",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "features",
      title: "Service Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
      description: "Frequently asked questions for this service",
    }),
    defineField({
      name: "specifications",
      title: "Service Specifications",
      type: "array",
      description: "Key service parameters and metrics",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Specification Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Specification Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
          description: "Override the default title for SEO (max 60 chars)",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: "Override the default description for SEO (max 160 chars)",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          description: "SEO keywords for this service",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
