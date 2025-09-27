import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog | Liftronic Elevators",
    default: "Blog | Liftronic Elevators",
  },
  description:
    "Expert insights, technical guides, and industry perspectives on elevator technology, maintenance, and modernization.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
