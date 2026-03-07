import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { SectionVisibilityInput } from "../components/SectionVisibilityInput";

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
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description:
        "Custom hero heading (e.g., 'Crafting the future of Vertical Living')",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        'Short inspirational quote (e.g., "Preserving the soul of historic Goa…")',
    }),

    /* Legacy Section */
    defineField({
      name: "legacySection",
      title: "Our Legacy Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Our Legacy in Motion",
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          description: "Main paragraph for the legacy section",
        }),
      ],
    }),

    /* Why Choose Section */
    defineField({
      name: "whyChooseReasons",
      title: "Why Choose Us Reasons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Reason Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Reason Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      description: 'Reasons displayed under "Why Choose Liftronic [city]?"',
    }),

    /* Stiltz Experience Section */
    defineField({
      name: "stiltzExperience",
      title: "Stiltz Experience Section",
      type: "object",
      fields: [
        defineField({
          name: "intro",
          title: "Introduction Text",
          type: "text",
          description:
            "Paragraph inviting visitors to experience the product in person",
        }),
        defineField({
          name: "experiences",
          title: "Experience Items",
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "title" },
              },
            },
          ],
        }),
      ],
    }),

    /* Booking Section */
    defineField({
      name: "bookingSection",
      title: "Book Your Visit Section",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Booking Description",
          type: "text",
        }),
        defineField({
          name: "conciergePhone",
          title: "Concierge Phone",
          type: "string",
        }),
        defineField({
          name: "visitAddress",
          title: "Visit Address",
          type: "text",
        }),
        defineField({
          name: "gpsLink",
          title: "GPS / Google Maps Link",
          type: "url",
        }),
      ],
    }),

    /* Private Experience Form Config */
    defineField({
      name: "privateExperienceFormConfig",
      title: "Private Experience Form Configuration",
      type: "object",
      description:
        "Email and Google Sheets settings for the 'Request a Private Experience' form on this branch page",
      fields: [
        defineField({
          name: "formGoogleSheetUrl",
          title: "Google Sheet Webhook URL",
          type: "url",
          description:
            "Google Apps Script Web App URL for logging form submissions to a spreadsheet",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["https"],
            }),
        }),
        defineField({
          name: "formRecipientEmails",
          title: "Form Notification Recipients",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Email addresses that receive notifications when someone submits the private experience form",
          options: { layout: "tags" },
          validation: (Rule) =>
            Rule.min(1)
              .required()
              .custom((emails: unknown) => {
                if (!Array.isArray(emails)) return true;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                for (const email of emails) {
                  if (!emailRegex.test(email)) {
                    return `"${email}" is not a valid email address`;
                  }
                }
                return true;
              }),
        }),
      ],
      hidden: ({ parent }) => !parent?.bookingSection,
    }),

    /* Specialized Engineering */
    defineField({
      name: "specializedEngineering",
      title: "Specialized Engineering Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "features",
              title: "Key Features",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Feature Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Feature Description",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "title" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      description:
        "Advanced engineering solution sections (e.g., Inclined Elevators, ATEX solutions)",
    }),

    /* Quote Email */
    defineField({
      name: "quoteEmail",
      title: "Quote Request Email",
      type: "string",
      description:
        "Email for quote requests (e.g., info@liftronicelevator.com)",
    }),

    /* Closing Quote */
    defineField({
      name: "closingQuote",
      title: "Closing Quote",
      type: "string",
      description: "Inspirational closing quote at the bottom of the page",
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

    /* Section Visibility Flags */
    defineField({
      name: "sectionVisibility",
      title: "Section Visibility",
      type: "object",
      description:
        "Control which sections are shown on this branch page. All sections are visible by default — uncheck to hide.",
      components: {
        input: SectionVisibilityInput,
      },
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "legacy",
          title: "Our Legacy Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "stiltzExperience",
          title: "Stiltz Experience Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "whyChoose",
          title: "Why Choose Us Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "specializedEngineering",
          title: "Specialized Engineering Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "consultant",
          title: "Consultant / Contact Person Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "stiltzProducts",
          title: "Stiltz Collection Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "team",
          title: "Branch Team Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "media",
          title: "Highlights / Media Gallery Section",
          type: "boolean",
          initialValue: true,
        }),
      ],
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
    },
  },
});
