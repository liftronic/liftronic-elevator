"use client";

import { usePathname } from "next/navigation";
import { FiMapPin } from "react-icons/fi";

interface AddressEntry {
  label: string;
  address: string;
}

interface BranchEntry {
  slug: string;
  city: string;
  address: string;
}

interface FooterAddressBlockProps {
  headquarters: string | undefined;
  branches: BranchEntry[];
}

export default function FooterAddressBlock({
  headquarters,
  branches,
}: FooterAddressBlockProps) {
  const pathname = usePathname();
  const branchSlug = pathname.match(/^\/branches\/([^/]+)/)?.[1];

  // On branch pages: show only that branch's address
  // Everywhere else: HQ first, then branches — capped at 3 total
  const entries: AddressEntry[] = [];

  if (branchSlug) {
    const match = branches.find((b) => b.slug === branchSlug);
    if (match) {
      entries.push({ label: match.city, address: match.address });
    }
  } else {
    if (headquarters) {
      entries.push({ label: "Headquarters", address: headquarters });
    }
    for (const branch of branches) {
      if (entries.length >= 3) break;
      entries.push({ label: branch.city, address: branch.address });
    }
  }

  if (entries.length === 0) return null;

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.label} className="flex items-start gap-3 text-sm">
          <div className="mt-0.5 shrink-0 rounded-lg bg-accent/10 p-2">
            <FiMapPin className="size-4 text-accent" />
          </div>
          <div className="text-left">
            <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-white/50">
              {entry.label}
            </p>
            <p className="leading-relaxed text-white/80">{entry.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
