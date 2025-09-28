import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery | Liftronic - Elevator Solutions",
  description:
    "Explore our media gallery featuring elevator installations, product showcases, maintenance services, and project highlights. See our work in action.",
  keywords: [
    "elevator gallery",
    "installation videos",
    "product images",
    "elevator projects",
    "lift maintenance",
    "Liftronic media",
  ],
  openGraph: {
    title: "Media Gallery | Liftronic - Elevator Solutions",
    description:
      "Explore our media gallery featuring elevator installations, product showcases, maintenance services, and project highlights.",
    images: ["/liftronic.png"],
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
