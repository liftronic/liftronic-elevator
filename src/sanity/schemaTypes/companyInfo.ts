import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const companyInfoType = defineType({
  name: "companyInfo",
  title: "Company Information",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal title (e.g., 'Main Company Info')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "establishedYear",
      title: "Established Year",
      type: "string",
      description: "Year company was founded (e.g., '2009')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short tagline (e.g., '15+ Years of Excellence')",
    }),
    defineField({
      name: "aboutHeading",
      title: "About Page Heading",
      type: "string",
      description: "Main heading for about page",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Description",
      type: "text",
      description: "Brief description for about page hero",
    }),
    defineField({
      name: "whoWeAreTitle",
      title: "Who We Are - Title",
      type: "string",
      initialValue: "Who We Are",
    }),
    defineField({
      name: "whoWeAreContent",
      title: "Who We Are - Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Multiple paragraphs about who we are",
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points highlighting key features/benefits",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Company Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "e.g., '+', '%', 'K'",
              initialValue: "+",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                "Icon name (e.g., 'star', 'buildings', 'globe', 'wrench')",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "aboutHeading",
      media: "heroImage",
    },
  },
});
