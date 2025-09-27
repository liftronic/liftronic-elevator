// app/(main)/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Liftronic - Leading Elevator Solutions Provider",
  description:
    "Learn about Liftronic's journey, mission, values, and expert team. Discover why we're the trusted choice for elevator installation, maintenance, and modernization services.",
  keywords: [
    "about liftronic",
    "elevator company",
    "team",
    "mission",
    "vision",
    "values",
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
