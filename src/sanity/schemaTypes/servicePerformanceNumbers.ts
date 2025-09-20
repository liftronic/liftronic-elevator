import { ChartUpwardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const performanceType = defineType({
  name: "servicePerformance",
  title: "Service Performance",
  type: "document",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "servicePerformanceTitle",
      title: "Service Performance Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "servicePerformanceFigure",
      title: "Service Performance Figure",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "servicePerformanceTitle",
      subtitle: "servicePerformanceFigure",
    },
  },
});
