// components/TeamSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import type { TeamMember as TeamMemberType } from "~/sanity/lib/aboutTypes";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const teamMembers = members || fallbackMembers;

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("team-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [isLoaded]);

  return (
    <section
      id="team-section"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Behind every successful project is our dedicated team of
            professionals. Meet the experts who make Liftronic a leader in
            elevator solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoaded &&
            teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
              </motion.div>
            ))}

          {/* Skeleton Loading */}
          {!isLoaded &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-gray-600">Avg. Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">25</div>
              <div className="text-gray-600">Certified Engineers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-600">Support Coverage</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for detailed member view */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal content would go here */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-charcoal">
                  {selectedMember.name}
                </h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              {/* Add more detailed member information here */}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
