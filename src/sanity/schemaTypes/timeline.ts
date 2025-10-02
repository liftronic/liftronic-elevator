import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const timelineType = defineType({
  name: "timeline",
  title: "Company Timeline",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
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
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this milestone on main timeline display",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year",
      name: "yearAsc",
      by: [{ field: "year", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "year",
      subtitle: "title",
      featured: "featured",
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: featured ? "⭐ Featured" : "",
      };
    },
  },
});
