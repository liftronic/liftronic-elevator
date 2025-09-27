// app/(main)/services/layout.tsx
import type { Metadata } from "next";

type CustomMetadata = Metadata & {
  template?: string;
};

export const metadata: CustomMetadata = {
  title: "Services",
  template: "%s | Services | Liftronic Elevator",
  description:
    "Comprehensive elevator services including design, installation, maintenance, modernization, and 24/7 support for all elevator types.",
  alternates: { canonical: "/services" },
  keywords: [
    "elevator services",
    "installation",
    "maintenance",
    "modernization",
    "repair",
  ],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
