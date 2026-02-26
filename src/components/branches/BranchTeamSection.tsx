"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HiEnvelope, HiPhone } from "react-icons/hi2";
import type { BranchTeamMember } from "~/sanity/lib/branchTypes";

interface BranchTeamSectionProps {
  teamMembers: BranchTeamMember[];
  bgVariant?: "white" | "soft";
}

export default function BranchTeamSection({
  teamMembers,
  bgVariant = "soft",
}: BranchTeamSectionProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section
      className={`${bgVariant === "soft" ? "bg-soft" : "bg-white"} py-16 md:py-24`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            People
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-charcoal md:text-4xl">
            Meet the local team
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.article
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              {/* Portrait */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <Image
                  src={member.image.asset.url}
                  alt={member.image.alt || member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-charcoal">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                  {member.position}
                </p>

                {member.bio && (
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                )}

                {(member.email || member.phone) && (
                  <div className="mt-4 space-y-2 border-t border-black/8 pt-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-brand"
                      >
                        <HiEnvelope className="h-3.5 w-3.5 shrink-0 text-brand" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-brand"
                      >
                        <HiPhone className="h-3.5 w-3.5 shrink-0 text-brand" />
                        {member.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
