import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore home, passenger, freight, hospital and specialty elevators — thoughtfully engineered and customizable.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
