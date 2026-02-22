"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchesClientProps {
  branches: Branch[];
}

export default function BranchesClient({ branches }: BranchesClientProps) {
  if (!branches || branches.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {branches.map((branch, index) => (
        <motion.div
          key={branch._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Link href={`/branches/${branch.slug}`}>
            <div className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:border-accent border border-transparent group cursor-pointer">
              {branch.heroImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={branch.heroImage.asset.url}
                    alt={branch.heroImage.alt || branch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-brand transition-colors">
                    {branch.name}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {branch.city}
                  </span>
                </div>
                {branch.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {branch.description}
                  </p>
                )}

                <div className="mt-5 flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all">
                  <span>View Branch</span>
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
