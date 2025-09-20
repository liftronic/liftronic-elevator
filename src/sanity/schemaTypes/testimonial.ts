import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "testimonialFrom",
      title: "Testimonial From (Name)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyImage",
      title: "Company Image",
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
    }),
    defineField({
      name: "testimonialDetail",
      title: "Testimonial Detail",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    }),
  ],
  preview: {
    select: {
      title: "testimonialFrom",
      subtitle: "testimonialDetail",
      media: "companyImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? subtitle.slice(0, 50) + (subtitle.length > 50 ? "…" : "")
          : "",
        media,
      };
    },
  },
});
