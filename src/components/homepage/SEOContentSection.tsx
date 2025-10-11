"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface SEOSection {
  title: string;
  content: PortableTextBlock[];
  keywords?: string[];
  order: number;
  defaultExpanded: boolean;
}

interface SEOContentSectionProps {
  sections: SEOSection[];
}

// Custom components for PortableText rendering
const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-6 mb-4 text-charcoal">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-5 mb-3 text-charcoal">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2 text-charcoal">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; openInNewTab?: boolean };
      children?: React.ReactNode;
    }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      const rel = value?.openInNewTab ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-accent hover:text-accent/80 underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

// Helper function to count words in PortableText content
function countWords(content: PortableTextBlock[] | null | undefined): number {
  if (!content || !Array.isArray(content)) {
    return 0;
  }

  let wordCount = 0;
  content.forEach((block) => {
    if (block._type === "block" && Array.isArray(block.children)) {
      block.children.forEach((child) => {
        if ("text" in child && typeof child.text === "string") {
          wordCount += child.text.split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });
  return wordCount;
}

function SEOContentItem({ section }: { section: SEOSection }) {
  const wordCount = countWords(section.content);
  const isLong = wordCount > 100;
  const [isExpanded, setIsExpanded] = useState(
    section.defaultExpanded || !isLong
  );

  return (
    <div className="mb-8">
      <h3 className="text-xl md:text-2xl font-semibold text-charcoal mb-4">
        {section.title}
      </h3>
      <div
        className={`prose prose-lg max-w-none ${!isExpanded && isLong ? "line-clamp-3" : ""}`}
      >
        <PortableText
          value={section.content}
          components={portableTextComponents}
        />
      </div>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-accent hover:text-accent/80 font-medium text-sm"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function SEOContentSection({
  sections,
}: SEOContentSectionProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {sections.map((section, index) => (
          <SEOContentItem
            key={`section-${section.order}-${index}`}
            section={section}
          />
        ))}
      </div>
    </section>
  );
}
