import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const visionMissionValuesType = defineType({
  name: "visionMissionValues",
  title: "Vision, Mission & Values",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For internal reference only",
      initialValue: "Vision, Mission & Values",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionDescription",
      title: "Vision Description",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "visionIcon",
      title: "Vision Icon",
      type: "string",
      description: "Icon name (e.g., 'trending', 'star', 'globe')",
      initialValue: "trending",
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionDescription",
      title: "Mission Description",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "missionIcon",
      title: "Mission Icon",
      type: "string",
      description: "Icon name (e.g., 'heart', 'star', 'shield')",
      initialValue: "heart",
    }),
    defineField({
      name: "commitmentTitle",
      title: "Commitment Title",
      type: "string",
      initialValue: "Our Commitment",
    }),
    defineField({
      name: "commitmentDescription",
      title: "Commitment Description",
      type: "text",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "commitmentIcon",
      title: "Commitment Icon",
      type: "string",
      description: "Icon name (e.g., 'shield', 'check', 'star')",
      initialValue: "shield",
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
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
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
