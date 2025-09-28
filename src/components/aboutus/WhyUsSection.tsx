import type { ReactNode } from "react";
import * as motion from "motion/react-client";
import {
  BiShield,
  BiCog,
  BiStar,
  BiSupport,
  BiCheckCircle,
  BiGlobe,
} from "react-icons/bi";

type WhyUsCard = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  stats?: string;
  features: string[];
};

const whyUsReasons: WhyUsCard[] = [
  {
    id: "experience",
    title: "Proven Expertise",
    description:
      "With over 15 years in the industry, we've mastered every aspect of elevator systems. Our extensive experience ensures reliable, safe, and efficient solutions for all your vertical transportation needs.",
    icon: <BiStar className="text-3xl" />,
    stats: "2000+ Projects",
    features: [
      "15+ Years Experience",
      "Certified Professionals",
      "Industry Leaders",
      "Proven Track Record",
    ],
  },
  {
    id: "quality",
    title: "Uncompromising Quality",
    description:
      "We use only premium materials and cutting-edge technology in all our installations and services. Our commitment to quality means your elevators will perform reliably for decades to come.",
    icon: <BiShield className="text-3xl" />,
    stats: "99.8% Uptime",
    features: [
      "Premium Materials",
      "Advanced Technology",
      "Rigorous Testing",
      "Quality Assurance",
    ],
  },
  {
    id: "service",
    title: "24/7 Support",
    description:
      "Our round-the-clock emergency service ensures you're never left stranded. With rapid response times and expert technicians, we keep your elevators running smoothly day and night.",
    icon: <BiSupport className="text-3xl" />,
    stats: "<15 Min Response",
    features: [
      "24/7 Availability",
      "Emergency Response",
      "Expert Technicians",
      "Remote Monitoring",
    ],
  },
  {
    id: "innovation",
    title: "Cutting-Edge Technology",
    description:
      "Stay ahead with our smart elevator solutions featuring IoT integration, predictive maintenance, and energy-efficient systems that reduce costs while improving performance.",
    icon: <BiCog className="text-3xl" />,
    stats: "40% Energy Savings",
    features: [
      "Smart Controls",
      "IoT Integration",
      "Predictive Analytics",
      "Energy Efficient",
    ],
  },
  {
    id: "reliability",
    title: "Trusted Reliability",
    description:
      "Our maintenance programs and quality installations ensure maximum uptime for your elevators. We build lasting relationships through dependable service and consistent performance.",
    icon: <BiCheckCircle className="text-3xl" />,
    stats: "99% Customer Retention",
    features: [
      "Preventive Maintenance",
      "Quality Installations",
      "Reliable Performance",
      "Long-term Support",
    ],
  },
  {
    id: "coverage",
    title: "Comprehensive Coverage",
    description:
      "From residential buildings to commercial complexes, we handle projects of all sizes. Our comprehensive services cover installation, maintenance, modernization, and emergency repairs.",
    icon: <BiGlobe className="text-3xl" />,
    stats: "All Building Types",
    features: [
      "Residential & Commercial",
      "All Project Sizes",
      "Complete Solutions",
      "Nationwide Service",
    ],
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-charcoal text-white">
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
          {whyUsReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10">
                {/* Icon and Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  {reason.stats && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        {reason.stats}
                      </div>
                      <div className="text-gray-400 text-sm">Achievement</div>
                    </div>
                  )}
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
                  {reason.features.map((feature, idx) => (
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
