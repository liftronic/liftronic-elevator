import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBranchBySlug, getBranches } from "~/sanity/utils/getBranches";
import BranchHero from "~/components/branches/BranchHero";
import BranchInfoSection from "~/components/branches/BranchInfoSection";
import BranchSiltzProducts from "~/components/branches/BranchSiltzProducts";
import BranchMediaGallery from "~/components/branches/BranchMediaGallery";
import BranchTeamSection from "~/components/branches/BranchTeamSection";

interface BranchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found",
    };
  }

  return {
    title: `${branch.name} | Liftronic Elevators`,
    description:
      branch.description ||
      `Visit our ${branch.city} branch for elevator solutions.`,
    openGraph: {
      title: `${branch.name} | Liftronic Elevators`,
      description:
        branch.description ||
        `Visit our ${branch.city} branch for elevator solutions.`,
      url: `/branches/${branch.slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const branches = await getBranches();
  return branches.map((branch) => ({
    slug: branch.slug,
  }));
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  return (
    <main>
      <BranchHero branch={branch} />

      {branch.stiltzProducts && branch.stiltzProducts.length > 0 && (
        <BranchSiltzProducts products={branch.stiltzProducts} />
      )}

      {branch.teamMembers && branch.teamMembers.length > 0 && (
        <BranchTeamSection teamMembers={branch.teamMembers} />
      )}

      {branch.mediaGallery && branch.mediaGallery.length > 0 && (
        <BranchMediaGallery mediaItems={branch.mediaGallery} />
      )}

      <BranchInfoSection branch={branch} />
    </main>
  );
}
