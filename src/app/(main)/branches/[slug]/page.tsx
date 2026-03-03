import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBranchBySlug, getBranches } from "~/sanity/utils/getBranches";
import BranchHero from "~/components/branches/BranchHero";
import BranchLegacySection from "~/components/branches/BranchLegacySection";
import BranchWhyChoose from "~/components/branches/BranchWhyChoose";
import BranchStiltzExperience from "~/components/branches/BranchStiltzExperience";
import BranchSpecializedEngineering from "~/components/branches/BranchSpecializedEngineering";
import BranchConsultantSection from "~/components/branches/BranchConsultantSection";
import BranchInfoSection from "~/components/branches/BranchInfoSection";
import BranchGoaContactForm from "~/components/branches/BranchGoaContactForm";
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

type BgVariant = "white" | "soft";

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const isGoa = branch.slug === "goa";

  // Declarative section registry. Each entry declares whether it renders and
  // how to render itself given a background variant. After filtering out
  // non-rendering sections, the index drives alternation: i % 2 → soft/white.
  // No manual counter, no toggleBg — adding or removing a section just works.
  const sections: Array<{
    key: string;
    renders: boolean;
    element: (bg: BgVariant) => React.ReactNode;
  }> = [
    {
      key: "legacy",
      renders: !!branch.legacySection?.body,
      element: (bg) => <BranchLegacySection legacy={branch.legacySection} bgVariant={bg} />,
    },
    {
      key: "stiltz-experience",
      renders: !!(
        branch.stiltzExperience?.intro ||
        (branch.stiltzExperience?.experiences && branch.stiltzExperience.experiences.length > 0)
      ),
      element: (bg) => (
        <BranchStiltzExperience
          experience={branch.stiltzExperience}
          bookingSection={branch.bookingSection}
          branchSlug={branch.slug}
          branchName={branch.name}
          bgVariant={bg}
        />
      ),
    },
    {
      key: "why-choose",
      renders: !!(branch.whyChooseReasons && branch.whyChooseReasons.length > 0),
      element: (bg) => (
        <BranchWhyChoose
          reasons={branch.whyChooseReasons}
          city={branch.city}
          branchSlug={branch.slug}
          bgVariant={bg}
        />
      ),
    },
    {
      key: "stiltz-products",
      renders: !!(branch.stiltzProducts && branch.stiltzProducts.length > 0),
      element: (bg) => (
        <BranchSiltzProducts products={branch.stiltzProducts!} bgVariant={bg} />
      ),
    },
    {
      key: "specialized",
      renders: !!(branch.specializedEngineering && branch.specializedEngineering.length > 0),
      element: (bg) => (
        <BranchSpecializedEngineering
          sections={branch.specializedEngineering}
          branchSlug={branch.slug}
          bgVariant={bg}
        />
      ),
    },
    {
      key: "consultant",
      renders: !!(branch.consultant || branch.quoteEmail || branch.closingQuote) || isGoa,
      element: (bg) => (
        <BranchConsultantSection
          consultant={branch.consultant}
          quoteEmail={branch.quoteEmail}
          closingQuote={branch.closingQuote}
          branchSlug={branch.slug}
          photoUrl={branch.contactPerson?.photo?.asset?.url}
          bio={branch.description}
          city={branch.city}
          contactPhone={branch.contactPerson?.phone}
          contactEmail={branch.contactPerson?.email}
          bgVariant={bg}
        />
      ),
    },
    {
      key: "team",
      renders: !!(branch.teamMembers && branch.teamMembers.length > 0),
      element: (bg) => (
        <BranchTeamSection teamMembers={branch.teamMembers!} bgVariant={bg} />
      ),
    },
    {
      key: "media",
      renders: !!(branch.mediaGallery && branch.mediaGallery.length > 0),
      element: (bg) => (
        <BranchMediaGallery mediaItems={branch.mediaGallery!} bgVariant={bg} />
      ),
    },
    {
      key: "contact",
      renders: true,
      element: (bg) =>
        isGoa ? (
          <BranchGoaContactForm branch={branch} />
        ) : (
          <BranchInfoSection branch={branch} bgVariant={bg} />
        ),
    },
  ];

  return (
    <main>
      <BranchHero branch={branch} />
      {sections
        .filter((s) => s.renders)
        .map((s, i) => (
          <React.Fragment key={s.key}>
            {s.element(i % 2 === 0 ? "soft" : "white")}
          </React.Fragment>
        ))}
    </main>
  );
}
