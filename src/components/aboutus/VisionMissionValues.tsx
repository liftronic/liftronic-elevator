// components/VisionMissionValues.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BiTrendingUp,
  BiHeart,
  BiShield,
  BiStar,
  BiGlobe,
  BiUser,
  BiCheckCircle,
} from "react-icons/bi";
import type { VisionMissionValues as VMVType } from "~/sanity/lib/aboutTypes";

// Icon mapping function
const getIcon = (iconName: string | undefined): React.ReactNode => {
  if (!iconName) return <BiTrendingUp className="text-3xl" />;

  const iconMap: Record<string, React.ReactNode> = {
    trending: <BiTrendingUp className="text-3xl" />,
    heart: <BiHeart className="text-3xl" />,
    shield: <BiShield className="text-3xl" />,
    star: <BiStar className="text-3xl" />,
    globe: <BiGlobe className="text-3xl" />,
    user: <BiUser className="text-3xl" />,
    check: <BiCheckCircle className="text-3xl" />,
  };

  return (
    iconMap[iconName.toLowerCase()] || <BiTrendingUp className="text-3xl" />
  );
};

const getSmallIcon = (iconName: string | undefined): React.ReactNode => {
  if (!iconName) return <BiStar className="text-2xl" />;

  const iconMap: Record<string, React.ReactNode> = {
    trending: <BiTrendingUp className="text-2xl" />,
    heart: <BiHeart className="text-2xl" />,
    shield: <BiShield className="text-2xl" />,
    star: <BiStar className="text-2xl" />,
    globe: <BiGlobe className="text-2xl" />,
    user: <BiUser className="text-2xl" />,
    check: <BiCheckCircle className="text-2xl" />,
  };

  return iconMap[iconName.toLowerCase()] || <BiStar className="text-2xl" />;
};

// Fallback data
const fallbackVMV: VMVType = {
  _id: "fallback-vmv",
  _createdAt: new Date().toISOString(),
  visionTitle: "Our Vision",
  visionDescription:
    "To be the global leader in vertical transportation solutions, setting new standards for safety, innovation, and customer satisfaction. We envision a world where every building is equipped with intelligent, sustainable, and reliable elevator systems that enhance the quality of life for all users.",
  visionIcon: "trending",
  missionTitle: "Our Mission",
  missionDescription:
    "To provide exceptional elevator solutions through cutting-edge technology, unparalleled service, and unwavering commitment to safety. We strive to exceed customer expectations by delivering reliable, efficient, and sustainable vertical transportation systems that connect people and communities.",
  missionIcon: "heart",
  commitmentTitle: "Our Commitment",
  commitmentDescription:
    "Integrity, Excellence, Innovation, Safety, and Customer-Centricity form the foundation of everything we do. These values guide our decisions, shape our culture, and drive our commitment to delivering superior elevator solutions that our customers can trust and rely on.",
  commitmentIcon: "shield",
  values: [
    {
      title: "Safety First",
      description:
        "Safety is our top priority in every project, ensuring the wellbeing of passengers and technicians alike.",
      icon: "shield",
    },
    {
      title: "Pursuit of Excellence",
      description:
        "We continuously strive for perfection in every aspect of our service delivery and product quality.",
      icon: "star",
    },
    {
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and creative solutions to stay ahead of industry trends.",
      icon: "trending",
    },
    {
      title: "Integrity",
      description:
        "Honesty, transparency, and ethical business practices form the foundation of all our relationships.",
      icon: "heart",
    },
    {
      title: "Sustainability",
      description:
        "We're committed to environmentally responsible practices and energy-efficient solutions.",
      icon: "globe",
    },
    {
      title: "Customer Focus",
      description:
        "Our customers' success and satisfaction drive every decision we make and service we provide.",
      icon: "user",
    },
  ],
};

type VisionMissionValuesProps = {
  data?: VMVType;
};

export default function VisionMissionValues({
  data,
}: VisionMissionValuesProps) {
  const [activeCard, setActiveCard] = useState("vision");
  const [isLoaded, setIsLoaded] = useState(false);

  const vmvInfo = data || fallbackVMV;

  // Transform backend data to component format
  const vmvData = [
    {
      id: "vision",
      title: vmvInfo.visionTitle || "Our Vision",
      content: vmvInfo.visionDescription,
      icon: getIcon(vmvInfo.visionIcon),
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "mission",
      title: vmvInfo.missionTitle || "Our Mission",
      content: vmvInfo.missionDescription,
      icon: getIcon(vmvInfo.missionIcon),
      color: "from-accent to-green-500",
    },
    {
      id: "commitment",
      title: vmvInfo.commitmentTitle || "Our Commitment",
      content: vmvInfo.commitmentDescription,
      icon: getIcon(vmvInfo.commitmentIcon),
      color: "from-purple-500 to-pink-500",
    },
  ];

  const coreValues = (vmvInfo.values || []).map((value, index) => ({
    id: `value-${index}`,
    title: value.title,
    description: value.description,
    icon: getSmallIcon(value.icon),
    color: [
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-accent",
      "bg-green-500",
      "bg-purple-500",
    ][index % 6],
  }));

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

    const section = document.getElementById("vmv-section");
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
    <section
      id="vmv-section"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Our Foundation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built on strong principles and guided by a clear vision, we&apos;re
            committed to transforming the vertical transportation industry
            through innovation and excellence.
          </p>
        </motion.div>

        {/* Vision, Mission, Values Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {isLoaded &&
            vmvData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setActiveCard(item.id)}
              >
                <div
                  className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full ${
                    activeCard === item.id
                      ? "ring-2 ring-accent shadow-2xl"
                      : ""
                  }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative p-8">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.content}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Skeleton Loading for VMV Cards */}
          {!isLoaded &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
        </div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-charcoal text-center mb-12">
            Our Core Values in Action
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoaded &&
              coreValues.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>

                  <h4 className="text-lg font-bold text-charcoal mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h4>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}

            {/* Skeleton Loading for Core Values */}
            {!isLoaded &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-accent to-green-500 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">Join Us in Our Mission</h3>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Be part of our journey to revolutionize vertical transportation.
              Together, we can build a safer, more connected world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn bg-white hover:bg-gray-100 text-lg px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Careers
              </motion.button>

              <motion.button
                className="btn border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Partner With Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
