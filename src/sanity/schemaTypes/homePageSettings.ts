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
    defineField({
      name: "seoContentSections",
      title: "SEO Content Sections",
      type: "array",
      description: "Collapsible content sections for SEO (aim for 3000+ words total across all sections)",
      of: [
        defineField({
          name: "seoSection",
          title: "SEO Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Main heading for this collapsible section",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                    { title: "Quote", value: "blockquote" },
                  ],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                      { title: "Code", value: "code" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "string",
                            title: "URL",
                            validation: (Rule) => Rule.required(),
                          },
                          {
                            name: "openInNewTab",
                            type: "boolean",
                            title: "Open in new tab",
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .custom((content: unknown) => {
                    if (!content) return "Content is required";

                    const contentArray = content as Array<{ children?: Array<{ text?: string }> }>;
                    const text = contentArray
                      .map((block) =>
                        block.children ? block.children.map((child) => child.text || "").join(" ") : ""
                      )
                      .join(" ");

                    const wordCount = text.trim().split(/\s+/).length;

                    if (wordCount < 300) {
                      return `Content should be at least 300 words. Current: ${wordCount} words.`;
                    }

                    return true;
                  }),
              description: "Rich text content for this section (minimum 300 words recommended)",
            }),
            defineField({
              name: "keywords",
              title: "Target Keywords",
              type: "array",
              of: [{ type: "string" }],
              options: {
                layout: "tags",
              },
              description: "Primary keywords this content targets for SEO",
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.required().integer().min(0),
              description: "Order in which this section appears (0 = first)",
            }),
            defineField({
              name: "defaultExpanded",
              title: "Default Expanded",
              type: "boolean",
              initialValue: false,
              description: "Show content expanded by default (recommended for first section only)",
            }),
          ],
          preview: {
            select: {
              title: "title",
              order: "order",
            },
            prepare({ title, order }) {
              return {
                title: `${order}. ${title}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(15).warning("Consider limiting to 15 sections for better user experience"),
    }),
    defineField({
      name: "showSeoContentSection",
      title: "Show SEO Content Section",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show/hide the SEO content section on the home page",
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
