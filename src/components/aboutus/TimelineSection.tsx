"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Timeline } from "~/sanity/lib/aboutTypes";

interface TimelineSectionProps {
  timelines: Timeline[];
  initialDisplayCount?: number;
}

export default function TimelineSection({
  timelines,
  initialDisplayCount = 3,
}: TimelineSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (timelines.length === 0) return null;

  // Sort timelines in descending order by year
  const sortedTimelines = [...timelines].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return yearB - yearA; // Descending order (newest first)
  });

  const displayedTimelines = isExpanded
    ? sortedTimelines
    : sortedTimelines.slice(0, initialDisplayCount);
  const hasMore = sortedTimelines.length > initialDisplayCount;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-charcoal mb-6 text-center">
        Our Journey
      </h3>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {displayedTimelines.map((milestone, index) => (
            <motion.div
              key={milestone._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                {milestone.year}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-charcoal">
                  {milestone.title}
                </div>
                <div className="text-gray-600 text-sm">
                  {milestone.description}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMore && (
          <div className="text-center pt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:text-accent/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-lg px-4 py-2"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <FiChevronUp className="text-lg" />
                </>
              ) : (
                <>
                  <span>View All Milestones ({sortedTimelines.length})</span>
                  <FiChevronDown className="text-lg" />
                </>
              )}
            </button>
          </div>
        )}

        {!hasMore && sortedTimelines.length > 0 && (
          <div className="text-center pt-4">
            <span className="text-accent font-medium text-sm">
              {sortedTimelines.length === 1
                ? "Our first milestone"
                : `All ${sortedTimelines.length} milestones`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
