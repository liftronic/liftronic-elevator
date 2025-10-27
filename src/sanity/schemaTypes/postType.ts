import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { IMAGE_SIZE_DESCRIPTION } from "../lib/imageValidation";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(200),
      description: "The title of the blog post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Brief summary of the post (recommended: 50-300 characters for optimal display)",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      description: "Optional: Select the author of this blog post",
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
          description: "Describe the image for accessibility",
        }),
      ],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
      description: `Featured image for the blog post (optional). ${IMAGE_SIZE_DESCRIPTION}`,
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "reference",
      to: { type: "tag" },
      description: "Primary tag/category for the post (optional)",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "Publication date and time (defaults to now, optional)",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      placeholder: "5 min read",
      description: 'Optional: Estimated reading time (e.g., "5 min read")',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
      description: "Main content of the blog post",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
      description: "Display this post in the featured section",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "post" } })],
      validation: (Rule) => Rule.max(3),
      description: "Select up to 3 related posts",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "product" } })],
      validation: (Rule) => Rule.max(3),
      description: "Select up to 3 related products to showcase",
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
          description: "Override the default excerpt for SEO (max 160 chars)",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          description: "SEO keywords for this post",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      tag: "tag.title",
      featured: "featured",
    },
    prepare(selection) {
      const { author, tag, featured } = selection;
      const subtitle = [
        author && `by ${author}`,
        tag && `in ${tag}`,
        featured && "⭐ Featured",
      ]
        .filter(Boolean)
        .join(" • ");
      return { ...selection, subtitle };
    },
  },
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Oldest",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title, A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
