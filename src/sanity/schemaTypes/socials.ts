import { MobileDeviceIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const socialsType = defineType({
  name: "social",
  title: "Socials",
  type: "document",
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Title of the social media",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
  },
});
