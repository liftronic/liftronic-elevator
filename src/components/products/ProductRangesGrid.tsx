import React from "react";
import ProductRangeCard from "./ProductRangeCard";
import type { ProductRange } from "~/sanity/lib/productRangeTypes";

type ProductRangesGridProps = {
  ranges: ProductRange[];
  title?: string;
  description?: string;
};

export default function ProductRangesGrid({
  ranges,
  title = "Product Ranges",
  description,
}: ProductRangesGridProps) {
  if (!ranges || ranges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No product ranges available at this time.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-lg text-gray-600">{description}</p>
          )}
        </div>
      )}

      {/* Grid Layout: 1 column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {ranges.map((range) => (
          <ProductRangeCard
            key={range._id}
            title={range.title}
            description={range.description}
            slug={range.slug}
            featured={range.featured}
            imageSrc={range.image}
            imageAlt={range.imageAlt}
            blurDataURL={range.imageLqip}
            productCount={range.productCount}
          />
        ))}
      </div>
    </div>
  );
}
