import * as motion from "motion/react-client";
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
                className="group relative overflow-hidden rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-gray-50/20 to-gray-100/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-1"
              >
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-28 h-28 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-accent/80 to-accent/40 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Icon Container */}
                  <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 shadow-md group-hover:shadow-accent/15">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl group-hover:bg-accent/5 transition-all duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                      {IconComponent ? (
                        <IconComponent className="h-10 w-10 text-accent drop-shadow-sm transition-all duration-200" />
                      ) : (
                        <span className="text-4xl filter drop-shadow-sm">
                          {feature.icon}
                        </span>
                      )}
                    </div>

                    {/* Subtle inner border */}
                    <div className="absolute inset-0 rounded-2xl border border-accent/20 group-hover:border-accent/25 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-charcoal leading-tight group-hover:text-accent/70 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
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
