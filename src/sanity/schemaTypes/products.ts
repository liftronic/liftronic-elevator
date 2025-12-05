import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "reference", to: [{ type: "keyFeature" }] }],
      validation: (Rule) => Rule.max(6).error("Maximum 6 key features allowed"),
      description: "Select up to 6 key features for this product",
    }),
    defineField({
      name: "specifications",
      title: "Key Specifications",
      type: "array",
      of: [
        defineField({
          name: "spec",
          title: "Specification",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        }),
      ],
      description:
        "Enter key specifications as label-value pairs (e.g., Capacity: 2-6 persons)",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
      description: "Featured image for the product. Max file size: 300KB.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!Array.isArray(value)) return true;

          const { validateImageSize } = await import("../lib/imageValidation");

          // Validate each image in the gallery
          for (const image of value) {
            const result = await validateImageSize(image, context);
            if (result !== true) {
              return result; // Return error message if validation fails
            }
          }

          return true;
        }),
      description:
        "Additional product images for gallery. Max file size: 300KB per image.",
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
      description: "Display this product in the featured section",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      description:
        "Lower numbers appear first (e.g., 1 for Home Elevator to show at top, 2 for next, etc.)",
    }),
    defineField({
      name: "locationPages",
      title: "Location-Specific Pages",
      type: "array",
      description:
        "Create location-specific versions of this product page for SEO (e.g., Product | Mumbai)",
      of: [
        defineField({
          name: "locationPage",
          title: "Location Page",
          type: "object",
          fields: [
            defineField({
              name: "city",
              title: "City Name",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Display name (e.g., Mumbai, Pune)",
            }),
            defineField({
              name: "citySlug",
              title: "City Slug",
              type: "slug",
              options: {
                source: "city",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
              description: "URL-friendly version (e.g., mumbai, pune)",
            }),
            defineField({
              name: "uniqueContent",
              title: "Unique Content",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .custom((content: unknown) => {
                    if (!content) return "Unique content is required for SEO";

                    const contentArray = content as Array<{
                      children?: Array<{ text?: string }>;
                    }>;
                    const text = contentArray
                      .map((block) =>
                        block.children
                          ? block.children
                              .map((child) => child.text || "")
                              .join(" ")
                          : ""
                      )
                      .join(" ");

                    const wordCount = text.trim().split(/\s+/).length;

                    if (wordCount < 500) {
                      return `Content must be at least 500 words to avoid duplicate content penalties. Current: ${wordCount} words.`;
                    }

                    return true;
                  }),
              description:
                "REQUIRED: Minimum 500 words of unique, city-specific content",
            }),
            defineField({
              name: "metaTitle",
              title: "Meta Title",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
              description:
                "REQUIRED: Unique meta title (e.g., Product Name | City)",
            }),
            defineField({
              name: "metaDescription",
              title: "Meta Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(160),
              description: "REQUIRED: Unique meta description for this city",
            }),
            defineField({
              name: "keywords",
              title: "Keywords",
              type: "array",
              of: [{ type: "string" }],
              options: {
                layout: "tags",
              },
              description:
                "Location-based keywords (e.g., product name + city)",
            }),
            defineField({
              name: "published",
              title: "Published",
              type: "boolean",
              initialValue: false,
              description:
                "Publish this location page (ensure all content is complete first)",
            }),
            defineField({
              name: "enableIndexing",
              title: "Enable Search Engine Indexing",
              type: "boolean",
              initialValue: false,
              description:
                "⚠️ PHASE B: Enable after content quality is validated. Keep FALSE during Phase A testing.",
            }),
          ],
          preview: {
            select: {
              city: "city",
              published: "published",
              enableIndexing: "enableIndexing",
            },
            prepare({ city, published, enableIndexing }) {
              return {
                title: city || "Unnamed Location",
                subtitle: published
                  ? enableIndexing
                    ? "✅ Published & Indexed"
                    : "🔒 Published (noindex)"
                  : "📝 Draft",
              };
            },
          },
        }),
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
          description: "SEO keywords for this product",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
