"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoChevronDown } from "react-icons/io5";

type FAQ = {
  question: string;
  answer: string;
};

type FAQProps = {
  faqs: FAQ[];
};

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns (left/right)
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midpoint);
  const rightColumnFAQs = faqs.slice(midpoint);

  const renderFAQItem = (faq: FAQ, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6) }}
      className="mb-3"
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full px-5 py-4 text-left flex items-start justify-between gap-3 focus:outline-none cursor-pointer"
          aria-expanded={openIndex === index}
        >
          <h3 className="text-base font-semibold text-charcoal leading-snug">
            {faq.question}
          </h3>
          <IoChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 mt-0.5 ${
              openIndex === index ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed text-[15px] pt-3">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 max-w-7xl mx-auto">
      {/* Left Column */}
      <div className="space-y-0">
        {leftColumnFAQs.map((faq, index) => renderFAQItem(faq, index))}
      </div>

      {/* Right Column */}
      <div className="space-y-0">
        {rightColumnFAQs.map((faq, index) =>
          renderFAQItem(faq, index + midpoint)
        )}
      </div>
    </div>
  );
}
