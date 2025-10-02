"use client";

import { motion } from "motion/react";
import type { TeamMember } from "~/sanity/lib/aboutTypes";

type TeamMemberModalProps = {
  member: TeamMember;
  onClose: () => void;
};

export default function TeamMemberModal({
  member,
  onClose,
}: TeamMemberModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-charcoal">{member.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-accent font-semibold mb-4">{member.position}</p>
          <p className="text-gray-600 leading-relaxed">{member.bio}</p>
        </div>
      </motion.div>
    </div>
  );
}
