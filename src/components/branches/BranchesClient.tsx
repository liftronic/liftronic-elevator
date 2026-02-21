"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchesClientProps {
  branches: Branch[];
}

export default function BranchesClient({ branches }: BranchesClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {branches.map((branch, index) => (
        <motion.div
          key={branch._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Link href={`/branches/${branch.slug}`}>
            <div className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:border-accent border border-transparent group cursor-pointer">
              {/* Branch Image */}
              {branch.heroImage && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={branch.heroImage.asset.url}
                    alt={branch.heroImage.alt || branch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Branch Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-charcoal group-hover:text-brand transition-colors">
                    {branch.name}
                  </h2>
                </div>
                <p className="text-brand font-semibold mb-4 text-sm">
                  {branch.city}
                </p>

                {branch.description && (
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {branch.description}
                  </p>
                )}

                {/* Contact Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <p className="flex gap-2">
                    <span className="text-brand">📍</span>
                    <span className="line-clamp-2">{branch.address}</span>
                  </p>
                  <p className="flex gap-2 hover:text-brand transition-colors">
                    <span>📞</span>
                    <a href={`tel:${branch.phone}`}>{branch.phone}</a>
                  </p>
                  <p className="flex gap-2 hover:text-brand transition-colors">
                    <span>✉️</span>
                    <a href={`mailto:${branch.email}`} className="truncate">
                      {branch.email}
                    </a>
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
