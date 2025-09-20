import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10),
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle
          ? subtitle.slice(0, 80) + (subtitle.length > 80 ? "…" : "")
          : "",
      };
    },
  },
});
