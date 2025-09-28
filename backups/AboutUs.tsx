"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { BiCog, BiStar, BiBuildings, BiGlobe, BiWrench } from "react-icons/bi";

// A custom hook to animate a number from 0 to a target value.
function useCounter(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      // Apply a simple ease-out curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easedProgress * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

// A component to display an animated statistic.
function Stat({
  label,
  value,
  suffix = "+",
  icon: Icon
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // We can unobserve after it has been seen once
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const animatedValue = useCounter(value, inView);

  return (
    <div
      ref={ref}
      className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-accent/10"
    >
      <Icon className="mx-auto text-4xl text-accent mb-3" />
      <div className="text-5xl font-extrabold text-gray-800 mb-2">
        {animatedValue}
        {suffix}
      </div>
      <div className="text-md font-semibold text-gray-600">{label}</div>
    </div>
  );
}

// The main About Us component
export default function AboutUs() {
  const stats = [
    { label: "Years of Experience", value: 20, suffix: "+", icon: BiStar },
    { label: "Projects Completed", value: 100, suffix: "+", icon: BiBuildings },
    { label: "Countries Served", value: 6, suffix: "", icon: BiGlobe },
    { label: "Ongoing Projects", value: 200, suffix: "+", icon: BiWrench },
  ];

  // Ref for parallax effect
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax transformations for decorative elements
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const illustrationY1 = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);
  const illustrationY2 = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  // We'll animate individual items with explicit initial/whileInView props

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20 md:py-28 bg-gray-50">
      {/* BACKGROUND DECORATIONS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle gradient glow */}
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/10 blur-3xl opacity-40" />
        
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full opacity-10"
            style={{
              backgroundImage: "url('https://placehold.co/1200x800/e2e8f0/e2e8f0?text=.')", // Placeholder for liftronic-crop.png
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>
        
        {/* Parallax corner illustrations */}
        <motion.div 
            style={{ y: illustrationY1 }} 
            className="absolute top-10 left-4 hidden lg:block opacity-20"
        >
          <div className="w-[380px] transform -rotate-12 relative">
            <Image
              src="/illustrations/lift01.png"
              alt="Decorative lift illustration"
              width={380}
              height={380}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </motion.div>
         <motion.div 
            style={{ y: illustrationY2 }} 
            className="absolute bottom-10 right-4 hidden lg:block opacity-20"
        >
          <div className="w-[420px] transform rotate-10 relative">
            <Image
              src="/illustrations/lift02.png"
              alt="Decorative lift illustration"
              width={420}
              height={420}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* CENTERED HEADER & COPY */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              About Liftronic
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              With over <span className="font-bold text-accent">20 years of leadership</span>, we merge cutting-edge European technology with bespoke design to deliver unparalleled home elevators and residential lifts across India, from sales and installation to meticulous maintenance.
            </p>
          </motion.div>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <BiCog className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">European Technology</h3>
              <p className="text-gray-600 text-center">Advanced engineering solutions blended with innovative design for superior performance.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className=""
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <BiStar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Custom Solutions</h3>
              <p className="text-gray-600 text-center">Tailored elevator designs that enhance your home&apos;s style and meet specific requirements.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className=""
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <BiGlobe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Global Expertise</h3>
              <p className="text-gray-600 text-center">Proven track record with successful projects completed in India and internationally.</p>
            </div>
          </motion.div>
        </div>

        {/* GREEN STATS BAR */}
        <motion.div
          className="mt-12 bg-accent text-white rounded-2xl px-6 py-8 shadow-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold">20+</div>
              <div className="text-sm opacity-90">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold">100+</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold">6</div>
              <div className="text-sm opacity-90">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold">200+</div>
              <div className="text-sm opacity-90">Ongoing Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
