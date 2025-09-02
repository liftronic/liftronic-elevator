"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BiMapPin, BiCheckCircle, BiTime } from "react-icons/bi";

function useCounter(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const step = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function Stat({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.4,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const n = useCounter(value, inView);
  return (
    <div
      ref={ref}
      className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-accent mb-3">
        {n}+
      </div>
      <div className="text-lg md:text-xl font-semibold text-gray-700">
        {label}
      </div>
    </div>
  );
}

export default function AboutUs() {
  const items = [
    { label: "Projects Delivered", value: 500 },
    { label: "Years of Experience", value: 20 },
    { label: "Cities Served", value: 35 },
    { label: "Service Uptime", value: 99 },
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Nationwide Services Across Pan India
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-gray-600 mb-10 leading-relaxed"
          >
            From bustling metros to serene landscapes, we deliver unparalleled
            mechanical excellence across every corner of India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiMapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pan India Coverage
              </h3>
              <p className="text-gray-600">
                Comprehensive mechanical solutions in all major cities and
                states
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiCheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Rigorous quality control and certifications ensure exceptional
                delivery
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiTime className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock emergency support across all service locations
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {items.map((it) => (
              <Stat key={it.label} label={it.label} value={it.value} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
