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
    <section id="about" className="relative overflow-hidden py-16 bg-gray-50">
      {/* Decorative faint mark */}
      {/* background wrapper: placed below content but above the section background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-xl bg-accent/5 blur-3xl opacity-20" />
        {/* Liftronic logo / crop as background (subtle) */}
        {/* Large, low-opacity background crop positioned bottom-right on sm+ screens */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
          style={{
            width: 1200,
            height: 800,
            opacity: 0.12,
            backgroundImage: "url('/liftronic-crop.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "70%",
            backgroundPosition: "center center",
          }}
        />
      </div>

  <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
          >
            About Liftronic
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-3 mb-6">
              <p>
                <span className="font-semibold">Innovation Meets Elegance</span>
                . With over{" "}
                <span className="font-semibold">20 years of experience</span>,
                Liftronic Elevator delivers top-quality{" "}
                <span className="font-semibold">home elevators</span> and{" "}
                <span className="font-semibold">residential lifts</span> across
                India. Our dedicated team specializes in custom solutions that
                enhance your home&apos;s style and convenience, using the latest
                technology to ensure satisfaction.
              </p>

              <p>
                <span className="font-semibold">Liftronic India Pvt Ltd</span>{" "}
                stands proudly as a pioneering lift supplier nestled in the
                bustling city of <span className="font-semibold">Mumbai</span>.
                We offer a comprehensive range of top-notch services from
                seamless <span className="font-semibold">Sales</span> and
                impeccable <span className="font-semibold">Installation</span>{" "}
                to diligent <span className="font-semibold">Maintenance</span>{" "}
                of elevators and escalators. Beyond just elevators, we&apos;ve
                artfully blended{" "}
                <span className="font-semibold">European technology</span> with
                Indian warmth, culminating in a truly exceptional product. Step
                into the world of Liftronic Elevator and experience the seamless
                fusion of artistry and engineering.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiCog className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                European Technology
              </h3>
              <p className="text-gray-700 text-sm">
                Advanced engineering solutions blended with innovative design
                for superior performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiStar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Custom Solutions
              </h3>
              <p className="text-gray-700 text-sm">
                Tailored elevator designs that enhance your home&apos;s style
                and meet specific requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiShield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Expertise
              </h3>
              <p className="text-gray-700 text-sm">
                Proven track record with successful projects completed in India
                and internationally.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
