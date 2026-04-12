// app/(main)/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best all types of Lift & Elevator Manufacturers in Mumbai",
  description:
    "Best elevator service provider in Mumbai, Maharashtra specializing in customized elevator solutions for efficient performance and seamless vertical mobility.",
  keywords: [
    "lift manufacturer in Mumbai",
    "elevator manufacturer in Mumbai",
    "elevator company Mumbai",
    "customized elevator solutions",
    "vertical mobility solutions",
    "Liftronic Elevator",
  ],
  alternates: {
    canonical: "/aboutus",
  },
  openGraph: {
    title: "Best all types of Lift & Elevator Manufacturers in Mumbai",
    description:
      "Best elevator service provider in Mumbai, Maharashtra specializing in customized elevator solutions for efficient performance and seamless vertical mobility.",
    url: "/aboutus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best all types of Lift & Elevator Manufacturers in Mumbai",
    description:
      "Best elevator service provider in Mumbai, Maharashtra specializing in customized elevator solutions for efficient performance and seamless vertical mobility.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
