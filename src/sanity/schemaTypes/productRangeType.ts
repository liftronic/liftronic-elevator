import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productRangeType = defineType({
  name: "productRange",
  title: "Product Ranges",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Range Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Name of the product range (e.g., Passenger Elevators)",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly version of the title",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(50),
      description:
        "Brief description for display on product ranges page (50+ chars)",
    }),
    defineField({
      name: "image",
      title: "Range Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
      description: "Featured image for the range. Max file size: 300KB.",
    }),
    defineField({
      name: "featured",
      title: "Featured Range",
      type: "boolean",
      initialValue: false,
      description: "Display this range prominently with a featured badge",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.required().min(1),
      description:
        "Select products that belong to this range. If only 1 product, clicking the range will redirect directly to the product.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description:
        "Control the display order (lower numbers appear first). Featured ranges appear before non-featured.",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
          description: "Custom meta title for SEO (max 60 chars)",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: "Custom meta description for SEO (max 160 chars)",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          description: "SEO keywords for this product range",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      featured: "featured",
      media: "image",
    },
    prepare({ title, featured, media }) {
      return {
        title: title || "Unnamed Range",
        subtitle: featured ? "⭐ Featured Range" : "Product Range",
        media,
      };
    },
  },
});
