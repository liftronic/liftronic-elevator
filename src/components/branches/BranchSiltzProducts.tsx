"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { BranchProduct } from "~/sanity/lib/branchTypes";

interface BranchSiltzProductsProps {
  products: BranchProduct[];
}

export default function BranchSiltzProducts({
  products,
}: BranchSiltzProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-soft">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Stiltz Home Lifts Available
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our Stiltz products available at this branch
          </p>
          <div className="inline-block h-1 w-16 bg-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link href={`/products/${product.slug}`}>
                <div className="h-full bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:border-accent border border-transparent group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-charcoal group-hover:text-brand transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <span className="ml-2 px-3 py-1 bg-accent/10 text-brand text-xs font-semibold rounded-full whitespace-nowrap">
                      Stiltz
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6">
                    Explore this Stiltz home lift model and its specifications
                  </p>

                  <div className="flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/products/stiltz-homelifts">
            <button className="btn btn-primary">
              Browse All Stiltz Products
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
