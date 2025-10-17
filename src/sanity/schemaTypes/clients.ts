import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "client",
  title: "Clients",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Important for accessibility and SEO",
        }),
      ],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
