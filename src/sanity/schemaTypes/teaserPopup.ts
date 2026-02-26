import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const teaserPopupType = defineType({
  name: "teaserPopup",
  title: "Teaser Popup",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Popup Title",
      type: "string",
      description: "Heading shown above the video in the popup",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional short text shown below the title",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Supports: youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "delaySeconds",
      title: "Delay Before Showing (seconds)",
      type: "number",
      description: "How many seconds after page load before the popup appears",
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0).max(120).integer(),
    }),
    defineField({
      name: "showOncePerSession",
      title: "Show Once Per Session",
      type: "boolean",
      description:
        "If enabled, the popup will not re-appear after the user closes it (until a new browser session)",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Only one active popup is shown at a time",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "isActive",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? "Active" : "Inactive",
      };
    },
  },
});
