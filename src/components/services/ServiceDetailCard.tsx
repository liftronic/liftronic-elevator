// components/ServiceDetailCard.tsx

import Image from "next/image";
import * as motion from "motion/react-client";
import { BiCheck, BiPhone, BiMailSend } from "react-icons/bi";

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
  icon: string;
  features?: string[];
  benefits?: string[];
};

type ServiceDetailCardProps = {
  service: ServiceDetail;
  index: number;
};

export default function ServiceDetailCard({
  service,
  index,
}: ServiceDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 md:h-full">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
            <span className="text-2xl">{service.icon}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-charcoal mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-charcoal mb-3">
              Key Services Include:
            </h4>
            <ul className="space-y-2">
              {service.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <BiCheck className="text-accent text-xl mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features or Benefits */}
          {service.features && service.features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-charcoal mb-3">
                Additional Features:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn btn-primary flex items-center justify-center space-x-2">
              <BiPhone className="text-lg" />
              <span>Get Quote</span>
            </button>
            <button className="btn bg-gray-100 text-charcoal hover:bg-gray-200 flex items-center justify-center space-x-2">
              <BiMailSend className="text-lg" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
