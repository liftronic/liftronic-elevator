"use client";
import { motion } from "motion/react";
import { getIcon } from "~/sanity/utils/iconMapper";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type ProductFeaturesProps = {
  features: Feature[];
};

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  // Only show the first 3 features
  const displayedFeatures = features.slice(0, 3);

  return (
    <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto space-y-4 mb-8"
        >
          <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
            Engineered for excellence & performance
          </h2>
        </motion.div>

        {/* Features Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedFeatures.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/30 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent/20"
              >
                <div className="space-y-6">
                  {/* Icon Container */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 group-hover:scale-110 transition-transform duration-300">
                    {IconComponent ? (
                      <IconComponent className="h-8 w-8 text-accent" />
                    ) : (
                      <span className="text-3xl">{feature.icon}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-charcoal leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
