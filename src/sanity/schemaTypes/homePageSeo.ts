import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homePageSeoType = defineType({
  name: "homePageSeo",
  title: "Home Page SEO Settings",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
      description:
        "Page title for search engines and browser tabs (max 60 characters)",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(160).min(50),
      description:
        "Brief description for search results (50-160 characters recommended)",
    }),
    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Keywords for SEO (e.g., elevator manufacturer, lift installation, Mumbai)",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Image shown when sharing on social media (recommended: 1200x630px)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Preferred URL for this page (leave empty to use default site URL)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "robotsIndex",
      title: "Allow Search Engine Indexing",
      type: "boolean",
      initialValue: true,
      description: "Allow search engines to index this page",
    }),
    defineField({
      name: "robotsFollow",
      title: "Allow Following Links",
      type: "boolean",
      initialValue: true,
      description: "Allow search engines to follow links on this page",
    }),
    defineField({
      name: "structuredData",
      title: "Additional Structured Data",
      type: "object",
      description: "Override default JSON-LD structured data",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "organizationName",
          title: "Organization Name",
          type: "string",
          description: "Override default organization name",
        }),
        defineField({
          name: "organizationDescription",
          title: "Organization Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "faqEnabled",
          title: "Enable FAQ Schema",
          type: "boolean",
          initialValue: false,
          description: "Include FAQ structured data on home page",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "metaTitle",
      subtitle: "metaDescription",
    },
  },
});
