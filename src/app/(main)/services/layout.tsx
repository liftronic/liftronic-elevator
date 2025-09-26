import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Services",
    template: "%s | Services | Liftronic Elevator",
  },
  description:
    "Comprehensive elevator services including design, installation, maintenance, modernization, and 24/7 support for all elevator types.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
