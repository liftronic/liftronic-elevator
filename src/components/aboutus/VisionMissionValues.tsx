// components/VisionMissionValues.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BiTrendingUp,
  BiHeart,
  BiShield,
  BiStar,
  BiGlobe,
  BiUser,
} from "react-icons/bi";

type VMVCard = {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
  highlights: string[];
};

const vmvData: VMVCard[] = [
  {
    id: "vision",
    title: "Our Vision",
    content:
      "To be the global leader in vertical transportation solutions, setting new standards for safety, innovation, and customer satisfaction. We envision a world where every building is equipped with intelligent, sustainable, and reliable elevator systems that enhance the quality of life for all users.",
    icon: <BiTrendingUp className="text-3xl" />,
    color: "from-blue-500 to-blue-600",
    highlights: [
      "Global Leadership",
      "Innovation Excellence",
      "Sustainable Solutions",
      "Quality of Life",
    ],
  },
  {
    id: "mission",
    title: "Our Mission",
    content:
      "To provide exceptional elevator solutions through cutting-edge technology, unparalleled service, and unwavering commitment to safety. We strive to exceed customer expectations by delivering reliable, efficient, and sustainable vertical transportation systems that connect people and communities.",
    icon: <BiHeart className="text-3xl" />,
    color: "from-accent to-green-500",
    highlights: [
      "Exceptional Solutions",
      "Cutting-edge Technology",
      "Safety First",
      "Community Connection",
    ],
  },
  {
    id: "values",
    title: "Our Values",
    content:
      "Integrity, Excellence, Innovation, Safety, and Customer-Centricity form the foundation of everything we do. These values guide our decisions, shape our culture, and drive our commitment to delivering superior elevator solutions that our customers can trust and rely on.",
    icon: <BiShield className="text-3xl" />,
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Integrity",
      "Excellence",
      "Innovation",
      "Safety",
      "Customer-Centricity",
    ],
  },
];

const coreValues = [
  {
    id: "safety",
    title: "Safety First",
    description:
      "Safety is our top priority in every project, ensuring the wellbeing of passengers and technicians alike.",
    icon: <BiShield className="text-2xl" />,
    color: "bg-red-500",
  },
  {
    id: "excellence",
    title: "Pursuit of Excellence",
    description:
      "We continuously strive for perfection in every aspect of our service delivery and product quality.",
    icon: <BiStar className="text-2xl" />,
    color: "bg-yellow-500",
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "We embrace cutting-edge technology and creative solutions to stay ahead of industry trends.",
    icon: <BiTrendingUp className="text-2xl" />,
    color: "bg-blue-500",
  },
  {
    id: "integrity",
    title: "Integrity",
    description:
      "Honesty, transparency, and ethical business practices form the foundation of all our relationships.",
    icon: <BiHeart className="text-2xl" />,
    color: "bg-accent",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    description:
      "We're committed to environmentally responsible practices and energy-efficient solutions.",
    icon: <BiGlobe className="text-2xl" />,
    color: "bg-green-500",
  },
  {
    id: "customer",
    title: "Customer Focus",
    description:
      "Our customers' success and satisfaction drive every decision we make and service we provide.",
    icon: <BiUser className="text-2xl" />,
    color: "bg-purple-500",
  },
];

export default function VisionMissionValues() {
  const [activeCard, setActiveCard] = useState("vision");

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
          {vmvData.map((item, index) => (
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
                  activeCard === item.id ? "ring-2 ring-accent shadow-2xl" : ""
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

                  {/* Highlights */}
                  <div className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                        ></div>
                        <span className="text-gray-700 text-sm font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            </motion.div>
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
            {coreValues.map((value, index) => (
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
              <button className="btn bg-white hover:bg-gray-100 text-lg px-8 py-3">
                Explore Careers
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3">
                Partner With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
