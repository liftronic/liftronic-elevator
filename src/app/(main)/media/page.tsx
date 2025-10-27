import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumb from "~/components/Breadcrumb";
import * as motion from "motion/react-client";
import CallToActionSection from "~/components/CallToActionSection";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import { client } from "~/sanity/lib/client";
import { mediaQuery } from "~/sanity/lib/queries";
import type { MediaItem } from "~/sanity/lib/mediaTypes";
import MediaPageClient from "~/components/media/MediaPageClient";

export const metadata: Metadata = {
  title: "Media Gallery - Elevator Installations & Projects | Lift Solutions",
  description:
    "Explore our latest elevator projects, product showcases, and behind-the-scenes content showcasing our elevator solutions and installations.",
  openGraph: {
    title: "Media Gallery - Elevator Installations & Projects",
    description:
      "Discover our latest projects, product showcases, and behind-the-scenes content showcasing our elevator solutions and installations.",
    type: "website",
    url: "/media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Gallery - Elevator Installations & Projects",
    description:
      "Explore our latest elevator projects, product showcases, and installations.",
  },
  alternates: {
    canonical: "/media",
  },
};

async function getAllMedia(): Promise<MediaItem[]> {
  return client.fetch(mediaQuery, {}, { next: { revalidate: 3600 } });
}

export const revalidate = 3600; // 3600 seconds

export default async function MediaPage() {
  const mediaItems = await getAllMedia();

  return (
    <main>
      {/* Page hero */}
      <section className="relative">
        {/* Background image - hidden on mobile, shown on desktop */}
        <div
          className="absolute inset-0 hidden md:block bg-cover opacity-60 bg-no-repeat bg-right"
          style={{
            backgroundImage: "url(/assets/service_banner.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Media Gallery", isCurrentPage: true },
            ]}
          />

          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Media Gallery
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Explore Our Work
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover our latest projects, product showcases, and
              behind-the-scenes content showcasing our elevator solutions and
              installations.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact">
                <motion.button
                  className="btn btn-primary px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-sm md:text-base" />
                  Request a Quote
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-sm md:text-base" />
                  View Products
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MediaPageClient mediaItems={mediaItems} />

      <CallToActionSection
        title="Want to see your project featured?"
        description="Get in touch with us to discuss your elevator needs and join our gallery of successful installations."
        primaryAction={{
          label: "Start Your Project",
          href: "/#contact",
        }}
        secondaryAction={{
          label: "View Products",
          href: "/products",
        }}
      />
    </main>
  );
}
