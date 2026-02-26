"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HiEnvelope, HiPhone } from "react-icons/hi2";
import type { Branch } from "~/sanity/lib/branchTypes";
import Breadcrumb from "~/components/Breadcrumb";
import {
  GOA_HERO_TITLE,
  GOA_TAGLINE,
} from "~/components/branches/goaFallbackData";

interface BranchHeroProps {
  branch: Branch;
}

export default function BranchHero({ branch }: BranchHeroProps) {
  const isGoa = branch.slug === "goa";
  const heroTitle = branch.heroTitle ?? (isGoa ? GOA_HERO_TITLE : undefined);
  const tagline = branch.tagline ?? (isGoa ? GOA_TAGLINE : undefined);

  return (
    <section className="relative">
      {/* Background image */}
      {branch.heroImage && (
        <div
          className="absolute inset-0 hidden md:block bg-cover opacity-40 bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${branch.heroImage.asset.url})`,
          }}
        />
      )}

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:pb-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Branches", href: "/branches" },
            { label: branch.name, isCurrentPage: true },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Left: Branch Info */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              {branch.city}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              {branch.name}
            </h1>
            {heroTitle && (
              <p className="mt-3 text-xl md:text-2xl font-semibold text-brand leading-snug">
                {heroTitle}
              </p>
            )}
            {tagline && (
              <p className="mt-4 text-lg text-gray-500 italic">{tagline}</p>
            )}
            {branch.description && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {branch.description}
              </p>
            )}
          </div>

          {/* Right: Branch Manager Card */}
          {branch.contactPerson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-md"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Branch Manager
              </h2>

              <div className="flex flex-col items-center text-center">
                {branch.contactPerson.photo && (
                  <div className="relative mb-6">
                    <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-accent/20">
                      <Image
                        src={branch.contactPerson.photo.asset.url}
                        alt={branch.contactPerson.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {branch.contactPerson.name}
                </h3>
                <p className="text-brand font-semibold mb-6">
                  {branch.contactPerson.position}
                </p>

                <div className="w-full space-y-3">
                  {branch.contactPerson.email && (
                    <a
                      href={`mailto:${branch.contactPerson.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand transition-colors group justify-center"
                    >
                      <HiEnvelope className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm break-all">
                        {branch.contactPerson.email}
                      </span>
                    </a>
                  )}
                  {branch.contactPerson.phone && (
                    <a
                      href={`tel:${branch.contactPerson.phone}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand transition-colors group justify-center"
                    >
                      <HiPhone className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">
                        {branch.contactPerson.phone}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
