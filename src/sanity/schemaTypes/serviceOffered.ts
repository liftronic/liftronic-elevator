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
      name: "icon",
      title: "Icon",
      description:
        'Enter the React icon component name (e.g. "FiCode", "SettingsIcon"). This will be mapped to an icon in the frontend.',
      type: "string",
      validation: (Rule) => Rule.required(),
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
            defineField({
              name: "icon",
              title: "Feature Icon",
              type: "string",
              description: "Emoji or icon identifier",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "icon",
            },
          },
        },
      ],
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Icon: ${subtitle}` : "",
      };
    },
  },
});
