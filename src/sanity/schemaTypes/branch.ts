import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const branchType = defineType({
  name: "branch",
  title: "Branches",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      description: "E.g., 'Goa Branch', 'Hyderabad Branch'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier (e.g., 'goa', 'hyderabad')",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      description: "City name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Branch Address",
      type: "text",
      description: "Full address of the branch",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
      description: "Link to Google Maps location",
    }),
    defineField({
      name: "description",
      title: "Branch Description",
      type: "text",
      description: "Overview of the branch and its services",
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
          description: "Important for accessibility and SEO",
        }),
      ],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const { validateImageSize } = await import("../lib/imageValidation");
          return validateImageSize(value, context);
        }),
    }),

    /* Contact Person Section */
    defineField({
      name: "contactPerson",
      title: "Contact Person",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Full Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "position",
          title: "Position/Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "photo",
          title: "Profile Photo",
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
          validation: (Rule) =>
            Rule.custom(async (value, context) => {
              const { validateImageSize } =
                await import("../lib/imageValidation");
              return validateImageSize(value, context);
            }),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
      ],
    }),

    /* Branch Team Members */
    defineField({
      name: "teamMembers",
      title: "Branch Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "position",
              title: "Position/Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "bio",
              title: "Biography",
              type: "text",
              description: "Short bio about the team member",
            }),
            defineField({
              name: "image",
              title: "Profile Image",
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
              validation: (Rule) =>
                Rule.required().custom(async (value, context) => {
                  const { validateImageSize } =
                    await import("../lib/imageValidation");
                  return validateImageSize(value, context);
                }),
            }),
            defineField({
              name: "email",
              title: "Email",
              type: "string",
            }),
            defineField({
              name: "phone",
              title: "Phone",
              type: "string",
            }),
          ],
        },
      ],
      description: "Team members specific to this branch",
    }),

    /* Branch Media Gallery */
    defineField({
      name: "mediaGallery",
      title: "Branch Media Gallery",
      type: "array",
      of: [
        {
          type: "object",
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
              hidden: ({ parent }) => parent?.type !== "image",
              validation: (Rule) =>
                Rule.custom(async (image, context) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const type = (context.parent as any)?.type;
                  if (type === "image" && !image) {
                    return "Image is required for image type media";
                  }

                  const { validateImageSize } =
                    await import("../lib/imageValidation");
                  return validateImageSize(image, context);
                }),
            }),
            defineField({
              name: "youtubeUrl",
              title: "YouTube URL",
              type: "url",
              description:
                "Full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)",
              hidden: ({ parent }) => parent?.type !== "video",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const type = (context.parent as any)?.type;
                  if (type === "video" && !value) {
                    return "YouTube URL is required for video type media";
                  }
                  return true;
                }),
            }),
          ],
        },
      ],
      description: "Photos and videos of the branch office and projects",
    }),

    /* Stiltz Products Links */
    defineField({
      name: "stiltzProducts",
      title: "Stiltz Products Available",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Stiltz home lift models available at this branch",
    }),

    /* Display Settings */
    defineField({
      name: "isActive",
      title: "Active Branch",
      type: "boolean",
      description: "Enable or disable this branch on the website",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in lists",
      validation: (Rule) => Rule.integer().positive(),
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "city",
      media: "heroImage",
    },
  },
});
