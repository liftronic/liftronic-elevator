"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { BranchTeamMember } from "~/sanity/lib/branchTypes";

interface BranchTeamSectionProps {
  teamMembers: BranchTeamMember[];
}

export default function BranchTeamSection({
  teamMembers,
}: BranchTeamSectionProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-soft">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Our Team
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Member Image */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                <Image
                  src={member.image.asset.url}
                  alt={member.image.alt || member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-charcoal mb-1">
                  {member.name}
                </h3>
                <p className="text-brand font-semibold mb-3">
                  {member.position}
                </p>

                {member.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {/* Contact Info */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-gray-600 hover:text-brand transition-colors truncate"
                      title={member.email}
                    >
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="text-sm text-gray-600 hover:text-brand transition-colors"
                    >
                      {member.phone}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
