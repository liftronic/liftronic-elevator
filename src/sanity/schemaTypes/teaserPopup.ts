import { defineField, defineType } from "sanity";

export const teaserPopupType = defineType({
  name: "teaserPopup",
  title: "Teaser Popup",
  type: "document",
  description:
    "Configure the teaser popup video that appears on the website. Only one document should exist.",
  fields: [
    defineField({
      name: "title",
      title: "Popup Title",
      type: "string",
      description: "The title displayed above the video",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown below the title",
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "The YouTube video URL (unlisted videos supported). Example: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "delaySeconds",
      title: "Delay (seconds)",
      type: "number",
      description:
        "Number of seconds to wait before showing the popup (default: 10)",
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0).max(120),
    }),
    defineField({
      name: "isEnabled",
      title: "Enable Popup",
      type: "boolean",
      description: "Toggle to enable or disable the popup across the site",
      initialValue: false,
    }),
    defineField({
      name: "showOncePerSession",
      title: "Show Once Per Session",
      type: "boolean",
      description:
        "If enabled, the popup will only show once per browser session",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      isEnabled: "isEnabled",
    },
    prepare(selection) {
      const { title, isEnabled } = selection;
      return {
        title: title || "Teaser Popup",
        subtitle: isEnabled ? "✅ Enabled" : "❌ Disabled",
      };
    },
  },
});
