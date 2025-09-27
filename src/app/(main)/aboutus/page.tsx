// app/(main)/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { BiPlay, BiCheck, BiAward, BiTrendingUp } from "react-icons/bi";
import WhyUsSection from "~/components/aboutus/WhyUsSection";
import VisionMissionValues from "~/components/aboutus/VisionMissionValues";
import TeamSection from "~/components/aboutus/TeamSection";
import Testimonials from "~/components/Testimonials";
import Link from "next/link";

// Company stats data
const companyStats = [
  { label: "Years of Excellence", value: "15+", icon: <BiAward /> },
  { label: "Projects Completed", value: "2000+", icon: <BiCheck /> },
  { label: "Happy Clients", value: "500+", icon: <BiTrendingUp /> },
  { label: "Team Members", value: "50+", icon: <BiPlay /> },
];

// Timeline data for company history
const companyTimeline = [
  {
    year: "2009",
    title: "Foundation",
    description:
      "Liftronic was founded with a vision to revolutionize elevator solutions",
  },
  {
    year: "2012",
    title: "First Major Contract",
    description:
      "Secured our first major commercial project, establishing our reputation",
  },
  {
    year: "2015",
    title: "Technology Innovation",
    description: "Launched our smart elevator monitoring system",
  },
  {
    year: "2018",
    title: "Market Expansion",
    description: "Expanded operations to cover nationwide service",
  },
  {
    year: "2021",
    title: "Sustainability Initiative",
    description: "Launched eco-friendly elevator solutions program",
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description: "Recognized as leading elevator solutions provider",
  },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main>
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url(/illustrations/lift02.png)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Est. 2009 • 15+ Years of Excellence
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              About Liftronic
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Pioneering the future of vertical transportation with innovative
              solutions, uncompromising safety, and exceptional service
              excellence.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact" className="btn btn-primary">
                Get Service Quote
              </Link>
              <Link href="/products" className="btn">
                View Products
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8">
                Who We Are
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Liftronic stands as a beacon of innovation and excellence in
                  the elevator industry. Founded in 2009, we have grown from a
                  small startup to a leading provider of comprehensive vertical
                  transportation solutions.
                </p>

                <p className="text-lg">
                  Our journey began with a simple yet powerful vision: to
                  transform the way people move within buildings through
                  cutting-edge technology, unwavering safety standards, and
                  exceptional customer service.
                </p>

                <p className="text-lg">
                  Today, we serve hundreds of satisfied clients across the
                  nation, from residential complexes to towering commercial
                  buildings, always delivering solutions that exceed
                  expectations and stand the test of time.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-8 space-y-4">
                {[
                  "Industry-leading safety standards and certifications",
                  "Cutting-edge technology and smart elevator solutions",
                  "Comprehensive services from installation to maintenance",
                  "24/7 emergency support and rapid response times",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <BiCheck className="text-accent text-2xl flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image & Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Hero Image */}
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/illustrations/lift02.png"
                  alt="Liftronic team and modern elevator installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">Modern Solutions</div>
                  <div className="text-white/80">For Every Building</div>
                </div>
              </div>

              {/* Company Timeline */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-charcoal mb-6 text-center">
                  Our Journey
                </h3>
                <div className="space-y-4">
                  {companyTimeline.slice(0, 3).map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {milestone.year}
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">
                          {milestone.title}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {milestone.description}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <span className="text-accent font-medium text-sm">
                      ...and many more milestones
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyUsSection />

      {/* Vision, Mission & Values */}
      <VisionMissionValues />

      {/* Our Team */}
      <TeamSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-accent to-green-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Work with Liftronic?
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Experience the difference that comes with choosing a partner
              committed to excellence, innovation, and your success. Let&apos;s
              elevate your building together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white hover:bg-gray-100 text-lg px-8 py-4">
                Get Free Consultation
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                View Our Projects
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
