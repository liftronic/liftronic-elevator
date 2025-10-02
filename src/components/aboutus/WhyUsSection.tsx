"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import {
  BiShield,
  BiCog,
  BiStar,
  BiSupport,
  BiCheckCircle,
  BiGlobe,
  BiWrench,
  BiRocket,
  BiTrendingUp,
  BiHeart,
} from "react-icons/bi";
import type { WhyChooseUs } from "~/sanity/lib/aboutTypes";

// Icon mapping function
const getIcon = (iconName: string | undefined): ReactNode => {
  if (!iconName) return <BiStar className="text-3xl" />;

  const iconMap: Record<string, ReactNode> = {
    star: <BiStar className="text-3xl" />,
    shield: <BiShield className="text-3xl" />,
    support: <BiSupport className="text-3xl" />,
    cog: <BiCog className="text-3xl" />,
    check: <BiCheckCircle className="text-3xl" />,
    globe: <BiGlobe className="text-3xl" />,
    wrench: <BiWrench className="text-3xl" />,
    rocket: <BiRocket className="text-3xl" />,
    trending: <BiTrendingUp className="text-3xl" />,
    heart: <BiHeart className="text-3xl" />,
  };

  return iconMap[iconName.toLowerCase()] || <BiStar className="text-3xl" />;
};

// Fallback data
const fallbackReasons: WhyChooseUs[] = [
  {
    _id: "fallback-1",
    _createdAt: new Date().toISOString(),
    title: "Proven Expertise",
    description:
      "With over 15 years in the industry, we've mastered every aspect of elevator systems. Our extensive experience ensures reliable, safe, and efficient solutions for all your vertical transportation needs.",
    icon: "star",
    features: [
      "15+ Years Experience",
      "Certified Professionals",
      "Industry Leaders",
      "Proven Track Record",
    ],
    order: 1,
    active: true,
  },
  {
    _id: "fallback-2",
    _createdAt: new Date().toISOString(),
    title: "Uncompromising Quality",
    description:
      "We use only premium materials and cutting-edge technology in all our installations and services. Our commitment to quality means your elevators will perform reliably for decades to come.",
    icon: "shield",
    features: [
      "Premium Materials",
      "Advanced Technology",
      "Rigorous Testing",
      "Quality Assurance",
    ],
    order: 2,
    active: true,
  },
  {
    _id: "fallback-3",
    _createdAt: new Date().toISOString(),
    title: "24/7 Support",
    description:
      "Our round-the-clock emergency service ensures you're never left stranded. With rapid response times and expert technicians, we keep your elevators running smoothly day and night.",
    icon: "support",
    features: [
      "24/7 Availability",
      "Emergency Response",
      "Expert Technicians",
      "Remote Monitoring",
    ],
    order: 3,
    active: true,
  },
  {
    _id: "fallback-4",
    _createdAt: new Date().toISOString(),
    title: "Cutting-Edge Technology",
    description:
      "Stay ahead with our smart elevator solutions featuring IoT integration, predictive maintenance, and energy-efficient systems that reduce costs while improving performance.",
    icon: "cog",
    features: [
      "Smart Controls",
      "IoT Integration",
      "Predictive Analytics",
      "Energy Efficient",
    ],
    order: 4,
    active: true,
  },
  {
    _id: "fallback-5",
    _createdAt: new Date().toISOString(),
    title: "Trusted Reliability",
    description:
      "Our maintenance programs and quality installations ensure maximum uptime for your elevators. We build lasting relationships through dependable service and consistent performance.",
    icon: "check",
    features: [
      "Preventive Maintenance",
      "Quality Installations",
      "Reliable Performance",
      "Long-term Support",
    ],
    order: 5,
    active: true,
  },
  {
    _id: "fallback-6",
    _createdAt: new Date().toISOString(),
    title: "Comprehensive Coverage",
    description:
      "From residential buildings to commercial complexes, we handle projects of all sizes. Our comprehensive services cover installation, maintenance, modernization, and emergency repairs.",
    icon: "globe",
    features: [
      "Residential & Commercial",
      "All Project Sizes",
      "Complete Solutions",
      "Nationwide Service",
    ],
    order: 6,
    active: true,
  },
];

type WhyUsSectionProps = {
  reasons?: WhyChooseUs[];
};

export default function WhyUsSection({ reasons }: WhyUsSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const whyUsReasons = reasons || fallbackReasons;

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

    const section = document.getElementById("why-us-section");
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
    <section id="why-us-section" className="py-20 bg-charcoal text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Liftronic?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover what sets us apart in the elevator industry. Our commitment
            to excellence, innovation, and customer satisfaction makes us the
            preferred choice for vertical transportation solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoaded &&
            whyUsReasons.map((reason, index) => (
              <motion.div
                key={reason._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                      {getIcon(reason.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {(reason.features || []).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}

          {/* Skeleton Loading */}
          {!isLoaded &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full animate-pulse"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl"></div>
                </div>
                <div className="mb-6">
                  <div className="h-6 bg-white/10 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-4 bg-white/10 rounded w-2/3"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Liftronic Difference?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of satisfied customers who trust us with their
              elevator needs.
            </p>
            <motion.button
              className="btn bg-accent text-black hover:bg-accent/90 text-lg px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
