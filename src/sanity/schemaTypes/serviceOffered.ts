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
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
      description:
        "Main image for the service page and cards. Max file size: 300KB.",
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
          description:
            "Override the default description for SEO (max 160 chars)",
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
    defineField({
      name: "sitemapPriority",
      title: "Sitemap Priority",
      type: "number",
      initialValue: 0.8,
      validation: (Rule) => Rule.min(0.0).max(1.0).precision(1),
      description:
        "SEO priority in sitemap (0.0-1.0, higher = more important). Default: 0.8",
    }),
    defineField({
      name: "changeFrequency",
      title: "Change Frequency",
      type: "string",
      options: {
        list: [
          { title: "Daily", value: "daily" },
          { title: "Weekly", value: "weekly" },
          { title: "Monthly", value: "monthly" },
          { title: "Yearly", value: "yearly" },
        ],
      },
      initialValue: "monthly",
      description: "How often this service page typically updates",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
