import { SparklesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const keyFeatureType = defineType({
  name: "keyFeature",
  title: "Product Key Feature",
  type: "document",
  icon: SparklesIcon,
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
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        'Enter the React icon component name (e.g. "FiCheckCircle" or "RocketIcon"). This will be used in the frontend UI.',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      iconName: "icon",
    },
    prepare({ title, subtitle, iconName }) {
      return {
        title: title,
        subtitle: iconName
          ? `${iconName} — ${subtitle?.slice(0, 50)}…`
          : subtitle,
      };
    },
  },
});
