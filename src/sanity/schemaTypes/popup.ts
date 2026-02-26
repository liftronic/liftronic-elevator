import { defineField, defineType } from "sanity";

export const popupType = defineType({
  name: "popup",
  title: "Popup model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Internal label to identify this popup in Studio",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "popupType",
      title: "Popup Type",
      type: "string",
      options: {
        list: [
          { title: "Teaser Popup", value: "teaser" },
          { title: "Request a Quote", value: "requestQuote" },
        ],
        layout: "radio",
      },
      initialValue: "teaser",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active popups are considered by the website",
    }),
    defineField({
      name: "order",
      title: "Sequence Order",
      type: "number",
      initialValue: 1,
      description: "Lower numbers are processed first",
      validation: (Rule) => Rule.required().integer().min(1).max(999),
    }),
    defineField({
      name: "triggerMode",
      title: "Trigger Mode",
      type: "string",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "Manual", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "delaySeconds",
      title: "Delay Before Showing (seconds)",
      type: "number",
      initialValue: 10,
      description: "Used only for auto-trigger popups",
      hidden: ({ parent }) => parent?.triggerMode !== "auto",
      validation: (Rule) => Rule.required().integer().min(0).max(300),
    }),
    defineField({
      name: "showOncePerSession",
      title: "Show Once Per Session",
      type: "boolean",
      initialValue: true,
      description:
        "If enabled, this popup is not shown again in the same browser session after closing",
    }),
    defineField({
      name: "waitForPrevious",
      title: "Wait For Previous Auto Popups",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, this popup waits until all lower-order auto popups are completed",
    }),
    defineField({
      name: "teaserConfig",
      title: "Teaser Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.popupType !== "teaser",
      fields: [
        defineField({
          name: "title",
          title: "Popup Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "videoUrl",
          title: "YouTube Video URL",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "requestQuoteConfig",
      title: "Request Quote Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.popupType !== "requestQuote",
      fields: [
        defineField({
          name: "title",
          title: "Modal Title",
          type: "string",
          initialValue: "Request a Quote",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Modal Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Fill in your details and our team will get back to you shortly.",
        }),
      ],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      const popup = document as
        | {
            popupType?: string;
            triggerMode?: string;
            teaserConfig?: { title?: string; videoUrl?: string };
            requestQuoteConfig?: { title?: string };
          }
        | undefined;

      if (!popup) return true;

      if (popup.popupType === "teaser") {
        if (!popup.teaserConfig?.title || !popup.teaserConfig.videoUrl) {
          return "Teaser popups require teaser title and video URL.";
        }
      }

      if (popup.popupType === "requestQuote") {
        if (!popup.requestQuoteConfig?.title) {
          return "Request Quote popups require a modal title.";
        }
      }

      return true;
    }),
  preview: {
    select: {
      title: "name",
      popupType: "popupType",
      isActive: "isActive",
      order: "order",
    },
    prepare({ title, popupType, isActive, order }) {
      const typeLabel =
        popupType === "requestQuote" ? "Request Quote" : "Teaser";
      const statusLabel = isActive ? "Active" : "Inactive";

      return {
        title: title || "Untitled Popup",
        subtitle: `#${order ?? "-"} - ${typeLabel} - ${statusLabel}`,
      };
    },
  },
});
