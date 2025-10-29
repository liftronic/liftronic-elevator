// app/(main)/aboutus/page.tsx

import Image from "next/image";
import { BiCheck } from "react-icons/bi";
import WhyUsSection from "~/components/aboutus/WhyUsSection";
import VisionMissionValues from "~/components/aboutus/VisionMissionValues";
import TeamSection from "~/components/aboutus/TeamSection";
import CertificatesSection from "~/components/aboutus/CertificatesSection";
import TimelineSection from "~/components/aboutus/TimelineSection";
import Breadcrumb from "~/components/Breadcrumb";
import Link from "next/link";
import CallToActionSection from "~/components/CallToActionSection";
import { FiMessageSquare, FiEye } from "react-icons/fi";
import {
  getCompanyInfo,
  getFeaturedTimeline,
  getWhyChooseUs,
  getVisionMissionValues,
  getTeamMembers,
} from "~/sanity/utils/getAboutUs";
import { getAllCertificates } from "~/sanity/utils/getCertificates";
import type {
  CompanyInfo,
  Timeline,
  WhyChooseUs,
  VisionMissionValues as VMVType,
  TeamMember,
} from "~/sanity/lib/aboutTypes";
import type { Certificate } from "~/sanity/lib/certificateTypes";
import { PortableText } from "@portabletext/react";

// ISR: Revalidate every 60 minutes (3600 seconds)
export const revalidate = 3600;

export default async function AboutPage() {
  // Fetch data from Sanity with error handling
  let companyInfo: CompanyInfo | null = null;
  let featuredTimeline: Timeline[] = [];
  let whyChooseUs: WhyChooseUs[] = [];
  let visionMissionValues: VMVType | null = null;
  let teamMembers: TeamMember[] = [];
  let certificates: Certificate[] = [];

  try {
    [
      companyInfo,
      featuredTimeline,
      whyChooseUs,
      visionMissionValues,
      teamMembers,
      certificates,
    ] = await Promise.all([
      getCompanyInfo().catch(() => null),
      getFeaturedTimeline().catch(() => []),
      getWhyChooseUs().catch(() => []),
      getVisionMissionValues().catch(() => null),
      getTeamMembers().catch(() => []),
      getAllCertificates().catch(() => []),
    ]);
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    // Components will use fallback data
  }

  // Fallback data if backend is not ready
  const defaultInfo = {
    establishedYear: "2009",
    tagline: "15+ Years of Excellence",
    aboutHeading: "About Liftronic",
    aboutDescription:
      "Pioneering the future of vertical transportation with innovative solutions, uncompromising safety, and exceptional service excellence.",
    whoWeAreTitle: "Who We Are",
    heroImage: "/illustrations/lift02.png",
    keyPoints: [
      "Industry-leading safety standards and certifications",
      "Cutting-edge technology and smart elevator solutions",
      "Comprehensive services from installation to maintenance",
      "24/7 emergency support and rapid response times",
    ],
  };

  const info = companyInfo || defaultInfo;
  return (
    <main>
      <section className="relative">
        {/* Background image - hidden on mobile, shown on desktop */}
        <div
          className="absolute inset-0 hidden md:block bg-contain bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url(/illustrations/lift02.png)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:py-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", isCurrentPage: true },
            ]}
          />

          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Est. {info?.establishedYear} •{" "}
              {info?.tagline || "15+ Years of Excellence"}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              {info?.aboutHeading || "About Liftronic"}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {info?.aboutDescription ||
                "Pioneering the future of vertical transportation with innovative solutions."}
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact">
                <button className="btn btn-primary px-4 py-2 text-sm md:px-8 md:py-3 md:text-base">
                  <FiMessageSquare className="text-sm md:text-base" />
                  Get Service Quote
                </button>
              </Link>
              <Link href="/products">
                <button className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-4 py-2 text-sm md:px-8 md:py-3 md:text-base">
                  <FiEye className="text-sm md:text-base" />
                  View Products
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8">
                {info?.whoWeAreTitle || "Who We Are"}
              </h2>

              {companyInfo?.whoWeAreContent ? (
                <div className="space-y-6 text-gray-600 leading-relaxed prose prose-lg max-w-none">
                  <PortableText value={companyInfo.whoWeAreContent as never} />
                </div>
              ) : (
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Liftronic stands as a beacon of innovation and excellence in
                    the elevator industry. Founded in {info?.establishedYear},
                    we have grown from a small startup to a leading provider of
                    comprehensive vertical transportation solutions.
                  </p>

                  <p className="text-lg">
                    Our journey began with a simple yet powerful vision: to
                    transform the way people move within buildings through
                    cutting-edge technology, unwavering safety standards, and
                    exceptional customer service.
                  </p>

                  <p className="text-lg">
                    Today, we serve hundreds of satisfied clients across the
                    nation, from residential complexes to towering commercial
                    buildings, always delivering solutions that exceed
                    expectations and stand the test of time.
                  </p>
                </div>
              )}

              {/* Key Points */}
              <div className="mt-8 space-y-4">
                {(info?.keyPoints || []).map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <BiCheck className="text-accent text-2xl flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image & Timeline */}
            <div className="space-y-8">
              {/* Hero Image */}
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={info?.heroImage || "/illustrations/lift02.png"}
                  alt={
                    companyInfo?.heroImageAlt ||
                    "Liftronic team and modern elevator installation"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">Modern Solutions</div>
                  <div className="text-white/80">For Every Building</div>
                </div>
              </div>

              {/* Company Timeline */}
              <TimelineSection timelines={featuredTimeline} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyUsSection reasons={whyChooseUs} />

      {/* Vision, Mission & Values */}
      <VisionMissionValues data={visionMissionValues || undefined} />

      {/* Certificates Section */}
      <CertificatesSection certificates={certificates} />

      {/* Our Team */}
      <TeamSection members={teamMembers} />

      <CallToActionSection />
    </main>
  );
}
