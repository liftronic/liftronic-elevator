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

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const hasTeam = !!(branch.teamMembers && branch.teamMembers.length > 0);
  const hasMedia = !!(branch.mediaGallery && branch.mediaGallery.length > 0);
  const toggleBg = (bg: "white" | "soft"): "white" | "soft" =>
    bg === "white" ? "soft" : "white";

  let nextBg: "white" | "soft" = "white";
  const teamBg = nextBg;
  if (hasTeam) nextBg = toggleBg(nextBg);
  const mediaBg = nextBg;
  if (hasMedia) nextBg = toggleBg(nextBg);
  const infoBg = nextBg;

  const isGoa = branch.slug === "goa";

  return (
    <main>
      <BranchHero branch={branch} />

      <BranchLegacySection legacy={branch.legacySection} />

      <BranchWhyChoose
        reasons={branch.whyChooseReasons}
        city={branch.city}
        branchSlug={branch.slug}
      />

      {branch.stiltzProducts && branch.stiltzProducts.length > 0 && (
        <BranchSiltzProducts products={branch.stiltzProducts} />
      )}

      <BranchStiltzExperience
        experience={branch.stiltzExperience}
        bookingSection={branch.bookingSection}
        branchSlug={branch.slug}
      />

      <BranchSpecializedEngineering
        sections={branch.specializedEngineering}
        branchSlug={branch.slug}
      />

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
      />

      {branch.teamMembers && branch.teamMembers.length > 0 && (
        <BranchTeamSection teamMembers={branch.teamMembers} bgVariant={teamBg} />
      )}

      {branch.mediaGallery && branch.mediaGallery.length > 0 && (
        <BranchMediaGallery
          mediaItems={branch.mediaGallery}
          bgVariant={mediaBg}
        />
      )}

      {isGoa ? (
        <BranchGoaContactForm branch={branch} />
      ) : (
        <BranchInfoSection branch={branch} bgVariant={infoBg} />
      )}
    </main>
  );
}
