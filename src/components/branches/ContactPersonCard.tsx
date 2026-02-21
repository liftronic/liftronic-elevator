"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ContactPerson } from "~/sanity/lib/branchTypes";

interface ContactPersonCardProps {
  person: ContactPerson;
}

export default function ContactPersonCard({ person }: ContactPersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center"
    >
      {person.photo && (
        <div className="mb-6 flex justify-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-accent/20 shadow-lg">
            <Image
              src={person.photo.asset.url}
              alt={person.photo.alt || person.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold text-charcoal mb-1">{person.name}</h3>
      <p className="text-brand font-semibold mb-4">{person.position}</p>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="hover:text-brand transition-colors"
          >
            {person.email}
          </a>
        )}
        {person.phone && (
          <a
            href={`tel:${person.phone}`}
            className="hover:text-brand transition-colors"
          >
            {person.phone}
          </a>
        )}
      </div>
    </motion.div>
  );
}
