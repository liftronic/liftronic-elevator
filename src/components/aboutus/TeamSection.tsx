"use client";

import { useState } from "react";
import Image from "next/image";
import { FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import type { TeamMember as TeamMemberType } from "~/sanity/lib/aboutTypes";
import TeamMemberModal from "./TeamMemberModal";

// Fallback data
const fallbackMembers: TeamMemberType[] = [
  {
    _id: "1",
    _createdAt: new Date().toISOString(),
    name: "Michael Rodriguez",
    position: "Chief Executive Officer",
    bio: "With over 20 years in the elevator industry, Michael leads Liftronic with a vision of innovation and excellence. His expertise spans from technical engineering to strategic business development.",
    image: "/illustrations/lift02.png",
    email: "michael.rodriguez@liftronic.com",
    linkedin: "#",
    featured: true,
    order: 1,
  },
  {
    _id: "2",
    _createdAt: new Date().toISOString(),
    name: "Sarah Chen",
    position: "Chief Technology Officer",
    bio: "Sarah spearheads our technology initiatives, ensuring Liftronic stays at the forefront of elevator innovation. She holds multiple patents in elevator safety systems.",
    image: "/illustrations/lift02.png",
    email: "sarah.chen@liftronic.com",
    linkedin: "#",
    featured: true,
    order: 2,
  },
  {
    _id: "3",
    _createdAt: new Date().toISOString(),
    name: "David Thompson",
    position: "Head of Operations",
    bio: "David oversees all installation and maintenance operations, ensuring every project meets our high standards of quality and safety. His attention to detail is unmatched.",
    image: "/illustrations/lift02.png",
    email: "david.thompson@liftronic.com",
    phone: "+1 (555) 123-4571",
    featured: true,
    order: 3,
  },
];

type TeamSectionProps = {
  members?: TeamMemberType[];
};

export default function TeamSection({ members }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(
    null
  );
  const teamMembers = members || fallbackMembers;

  return (
    <section
      id="team-section"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Behind every successful project is our dedicated team of
            professionals. Meet the experts who make Liftronic a leader in
            elevator solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-top group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder={member.imageLqip ? "blur" : undefined}
                    blurDataURL={member.imageLqip || undefined}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Contact Icons Overlay */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    >
                      <FiMail className="text-sm" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    >
                      <FiPhone className="text-sm" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    >
                      <FiLinkedin className="text-sm" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-charcoal mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold mb-1">
                    {member.position}
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Contact Button */}
                <button
                  onClick={() => setSelectedMember(member)}
                  className="w-full btn bg-gray-100 text-charcoal hover:bg-accent hover:text-black text-sm transition-all duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed member view */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
}
