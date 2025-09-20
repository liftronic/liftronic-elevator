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
      name: "description",
      title: "Service Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        'Enter the React icon component name (e.g. "FiCode", "SettingsIcon"). This will be mapped to an icon in the frontend.',
      type: "string",
      validation: (Rule) => Rule.required(),
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
