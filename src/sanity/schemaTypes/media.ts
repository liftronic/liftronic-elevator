import { defineField, defineType } from "sanity";

export default defineType({
  name: "media",
  title: "Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.type !== "image",
      validation: (Rule) =>
        Rule.custom(async (image, context) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const type = (context.document as any)?.type;
          if (type === "image" && !image) {
            return "Image is required for image type media";
          }

          // Validate image size
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(image, context);
        }),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)",
      hidden: ({ document }) => document?.type !== "video",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const type = (context.document as any)?.type;
          if (type === "video" && !url) {
            return "YouTube URL is required for video type media";
          }
          if (
            url &&
            !url.includes("youtube.com") &&
            !url.includes("youtu.be")
          ) {
            return "Please enter a valid YouTube URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Video Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
      description:
        "Thumbnail image for video (optional - YouTube thumbnail will be used if not provided). Max file size: 300KB.",
      hidden: ({ document }) => document?.type !== "video",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Products", value: "products" },
          { title: "Installations", value: "installations" },
          { title: "Maintenance", value: "maintenance" },
          { title: "Projects", value: "projects" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      image: "image",
      thumbnail: "thumbnail",
      category: "category",
    },
    prepare({ title, type, image, thumbnail, category }) {
      return {
        title,
        subtitle: `${type} - ${category}`,
        media: type === "image" ? image : thumbnail || image,
      };
    },
  },
});
