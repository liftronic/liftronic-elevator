"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BiShield, BiCog, BiStar } from "react-icons/bi";

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

function Stat({
  label,
  value,
  suffix = "+",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
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
        {n}
        {suffix}
      </div>
      <div className="text-lg md:text-xl font-semibold text-gray-700">
        {label}
      </div>
    </div>
  );
}

export default function AboutUs() {
  const stats = [
    { label: "Years of Experience", value: 20, suffix: "+" },
    { label: "Countries", value: 6, suffix: "" },
    { label: "Projects Completed", value: 100, suffix: "+" },
    { label: "Under Projects", value: 200, suffix: "+" },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-16">
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 top-16 bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('/liftronic-crop.png')",
          backgroundSize: "contain",
        }}
      />
      <div className="relative container mx-auto px-4">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            About Liftronic
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="text-lg text-gray-600 leading-relaxed space-y-3 mb-6">
              <p>
                <span className="text-accent font-semibold">
                  Innovation Meets Elegance
                </span>
                . With over{" "}
                <span className="font-semibold text-accent">
                  20 years of experience
                </span>
                , Liftronic Elevator delivers top-quality{" "}
                <span className="font-semibold">home elevators</span> and{" "}
                <span className="font-semibold">residential lifts</span> across
                India. Our dedicated team specializes in custom solutions that
                enhance your home's style and convenience, using the latest
                technology to ensure satisfaction.
              </p>

              <p>
                <span className="font-semibold text-accent">
                  Liftronic India Pvt Ltd
                </span>{" "}
                stands proudly as a pioneering lift supplier nestled in the
                bustling city of <span className="font-semibold">Mumbai</span>.
                We offer a comprehensive range of top-notch services from
                seamless <span className="font-semibold">Sales</span> and
                impeccable <span className="font-semibold">Installation</span>{" "}
                to diligent <span className="font-semibold">Maintenance</span>{" "}
                of elevators and escalators.
              </p>

              <p>
                Beyond just elevators, we've artfully blended{" "}
                <span className="font-semibold text-accent">
                  European technology
                </span>{" "}
                with Indian warmth, culminating in a truly exceptional product.
                Step into the world of Liftronic Elevator and experience the
                seamless fusion of artistry and engineering.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BiCog className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                European Technology
              </h3>
              <p className="text-gray-600">
                Advanced engineering solutions blended with innovative design
                for superior performance
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BiStar className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Custom Solutions
              </h3>
              <p className="text-gray-600">
                Tailored elevator designs that enhance your home's style and
                meet specific requirements
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BiShield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Expertise
              </h3>
              <p className="text-gray-600">
                Proven track record with successful projects completed in India
                and internationally
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {stats.map((stat) => (
              <Stat
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
