import type { Metadata } from "next";
import { getBranches } from "~/sanity/utils/getBranches";
import BranchesClient from "~/components/branches/BranchesClient";

export const metadata: Metadata = {
  title: "Our Branches | Liftronic Elevators",
  description:
    "Visit our branch offices across India for elevator solutions and services.",
  openGraph: {
    title: "Our Branches | Liftronic Elevators",
    description:
      "Visit our branch offices across India for elevator solutions and services.",
    url: "/branches",
    type: "website",
  },
};

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-charcoal to-charcoal/80 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Branches
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Visit our offices across India for elevator solutions,
            consultations, and services.
          </p>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-16 md:py-24 bg-soft">
        <div className="container mx-auto px-4">
          {branches.length > 0 ? (
            <BranchesClient branches={branches} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No branches available.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
