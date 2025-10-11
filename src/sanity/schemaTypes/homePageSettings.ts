import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homePageSettingsType = defineType({
  name: "homePageSettings",
  title: "Home Page Settings",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Home Page Configuration",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "featuredFaqs",
      title: "Featured FAQs",
      type: "array",
      description: "Select FAQs to display on the home page (recommended: 8-12)",
      of: [
        {
          type: "reference",
          to: [{ type: "faq" }],
        },
      ],
      validation: (Rule) => Rule.max(12).warning("Consider limiting to 12 FAQs for better user experience"),
    }),
    defineField({
      name: "showFaqSection",
      title: "Show FAQ Section",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show/hide the FAQ section on the home page",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page Settings",
        subtitle: "Configure home page content and sections",
      };
    },
  },
});
