import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const whyChooseUsType = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
        "Icon name (e.g., 'star', 'shield', 'support', 'cog', 'check', 'globe')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key features or benefits",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.required().integer().positive(),
      initialValue: 1,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show this item on the website",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      active: "active",
      order: "order",
    },
    prepare({ title, subtitle, active, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: active
          ? subtitle?.slice(0, 60) +
            (subtitle && subtitle.length > 60 ? "…" : "")
          : "❌ Inactive",
      };
    },
  },
});
