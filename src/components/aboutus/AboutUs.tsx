"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

// Small animated stat used inside the green stats bar.
function AnimatedStat({ label, value, suffix = "+" }: { label: string; value: number; suffix?: string }) {
  const animated = useCounter(value, true, 1200);
  return (
    <div>
      <div className="text-4xl md:text-5xl font-extrabold">
        <span className="text-white">{animated}</span><span className="ml-1 text-white">{suffix}</span>
      </div>
      <div className="text-sm font-medium text-white">{label}</div>
    </div>
  );
}

// TiltCard: lightweight mouse-driven 3D card with subtle glare
function TiltCard({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: React.ElementType }) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const target = useRef({ rx: 0, ry: 0, s: 1 });

  const maxTilt = 12; // degrees
  const hoverScale = 1.03;

  const pushTransform = () => {
    if (!innerRef.current) return;
    const { rx, ry, s } = target.current;
    innerRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
    raf.current = null;
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * maxTilt;
    const rx = (0.5 - py) * maxTilt;
    target.current = { rx, ry, s: hoverScale };
    if (raf.current == null) raf.current = requestAnimationFrame(pushTransform);
  };

  const handleLeave = () => {
    target.current = { rx: 0, ry: 0, s: 1 };
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 450ms cubic-bezier(0.2,0.8,0.2,1)";
      innerRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      window.setTimeout(() => {
        if (innerRef.current) innerRef.current.style.transition = "";
      }, 480);
    }
  };

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow will-change-transform"
      >
        <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{children}</p>

        {/* subtle glossy highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(600px 200px at 10% 10%, rgba(255,255,255,0.18), transparent 20%)' }} />
      </div>
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
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[640px] md:h-[640px] opacity-10"
            style={{
              backgroundImage: "url('/liftronic-crop.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
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
              <strong className="block text-xl text-accent">Innovation Meets Elegance.</strong>
              For over <span className="font-bold text-accent ml-1">20 years</span>, Liftronic has been elevating homes across India with beautifully designed residential lifts. We craft <span className="text-accent font-semibold">bespoke solutions</span> that pair refined aesthetics with dependable, <span className="text-accent font-semibold">European-engineered performance</span> — making everyday movement <span className="italic font-medium">effortless</span> and <span className="italic font-medium">elegant</span>.
            </p>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Headquartered in <span className="text-accent font-semibold">Mumbai</span>, Liftronic India Pvt Ltd delivers <span className="text-accent font-semibold">end-to-end</span> elevator experiences: expert consultation and
              <span className="text-accent font-semibold ml-1">Sales</span>, precise
              <span className="text-accent font-semibold ml-1">Installation</span>, and proactive
              <span className="text-accent font-semibold ml-1">Maintenance</span>. Our designs blend <span className="text-accent font-semibold ml-1">European technology</span> with Indian sensibilities to create lifts that feel <span className="text-accent font-semibold ml-1">custom-made</span> for your space. Discover an elevator that improves <span className="text-accent font-semibold ml-1">accessibility</span>, adds <span className="text-accent font-semibold ml-1">luxury</span>, and transforms how you live.
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
          >
            <TiltCard title="European Technology" icon={BiCog}>
              Advanced engineering solutions blended with innovative design for superior performance.
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <TiltCard title="Custom Solutions" icon={BiStar}>
              Tailored elevator designs that enhance your home&apos;s style and meet specific requirements.
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <TiltCard title="Global Expertise" icon={BiGlobe}>
              Proven track record with successful projects completed in India and internationally.
            </TiltCard>
          </motion.div>
        </div>

        {/* GREEN STATS BAR */}
        <motion.div
          className="mt-12 bg-accent text-white rounded-2xl px-6 py-8 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* subtle dark overlay to reduce glare on bright accent backgrounds */}
          <div className="absolute inset-0 bg-black/18 pointer-events-none rounded-2xl" />
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center relative z-10">
            {stats.map((s) => (
              <AnimatedStat key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
