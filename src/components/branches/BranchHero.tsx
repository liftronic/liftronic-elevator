"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchHeroProps {
  branch: Branch;
}

export default function BranchHero({ branch }: BranchHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background */}
      {branch.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={branch.heroImage.asset.url}
            alt={branch.heroImage.alt || branch.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {branch.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">{branch.city}</p>
          {branch.description && (
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
              {branch.description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
