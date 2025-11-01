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
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
    }),
    defineField({
      name: "testimonialDetail",
      title: "Testimonial Detail",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating out of 5 stars",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .precision(1)
          .error("Rating must be between 1 and 5"),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: "testimonialFrom",
      subtitle: "testimonialDetail",
      media: "companyImage",
      rating: "rating",
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title: `${title}${rating ? ` (⭐ ${rating})` : ""}`,
        subtitle: subtitle
          ? subtitle.slice(0, 50) + (subtitle.length > 50 ? "…" : "")
          : "",
        media,
      };
    },
  },
});
