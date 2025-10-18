"use client";
import {
  BiCog,
  BiStar,
  BiGlobe,
  BiShield,
  BiWrench,
  BiBuilding,
} from "react-icons/bi";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import type { CompanyInfo } from "~/sanity/lib/aboutTypes";

interface AboutUsProps {
  companyInfo: CompanyInfo | null;
}

// Icon mapping function
const getFeatureIcon = (iconName?: string) => {
  const iconMap: Record<string, React.ElementType> = {
    cog: BiCog,
    star: BiStar,
    globe: BiGlobe,
    shield: BiShield,
    wrench: BiWrench,
    building: BiBuilding,
  };
  return iconMap[iconName?.toLowerCase() || "star"] || BiStar;
};

// Enhanced Stat card with 3D tilt effect and animated counter
function StatCard({
  label,
  value,
  suffix = "+",
  index,
}: {
  label: string;
  value: number;
  suffix?: string;
  index: number;
}) {
  const [transform, setTransform] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      style={{
        transform,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Gradient accent on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(42, 227, 148, 0.15) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "shine 2.5s ease-in-out infinite",
          }}
        />

        <div className="relative z-10">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 leading-none">
            <span className="bg-gradient-to-r from-accent via-brand to-accent bg-clip-text text-transparent animate-gradient">
              {value}
              {suffix}
            </span>
          </div>
          <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wide">
            {label}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// Enhanced feature card with better animations
function FeatureCard({
  title,
  children,
  icon: Icon,
  index,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  index: number;
}) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = -(py - 0.5) * 12;
    setRot({ x: rotateX, y: rotateY });
  };

  const handleLeave = () => {
    setRot({ x: 0, y: 0 });
    setIsHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      style={{ perspective: 1200 }}
      className="relative h-full"
    >
      <motion.div
        animate={{
          rotateX: rot.x,
          rotateY: rot.y,
          scale: isHover ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 h-full flex flex-col relative overflow-hidden group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon with enhanced styling */}
        <div className="relative z-10 mb-4 md:mb-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent/10 to-brand/10 rounded-2xl flex items-center justify-center mx-auto border border-accent/20 group-hover:border-accent/40 transition-all duration-300 group-hover:scale-110">
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:text-brand transition-colors duration-300" />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center text-center">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 tracking-tight group-hover:text-brand transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {children}
          </p>
        </div>

        {/* Subtle glossy highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
          style={{
            background:
              "radial-gradient(800px 200px at 50% 0%, rgba(255,255,255,0.15), transparent 40%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// The main About Us component
export default function AboutUs({ companyInfo }: AboutUsProps) {
  // Fallback data
  const defaultStats = [
    { label: "Years of Experience", value: 20, suffix: "+" },
    { label: "Projects Completed", value: 100, suffix: "+" },
    { label: "Countries Served", value: 6, suffix: "" },
    { label: "Ongoing Projects", value: 200, suffix: "+" },
  ];

  const defaultFeatures = [
    {
      title: "European Technology",
      description:
        "Advanced engineering solutions blended with innovative design for superior performance.",
      icon: "cog",
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored elevator designs that enhance your home's style and meet specific requirements.",
      icon: "star",
    },
    {
      title: "Global Expertise",
      description:
        "Proven track record with successful projects completed in India and internationally.",
      icon: "globe",
    },
  ];

  const defaultDescription = `For over 20 years, Liftronic has been elevating homes across India with beautifully designed residential lifts. We craft bespoke solutions that pair refined aesthetics with dependable European-engineered performance — making everyday movement effortless and elegant. Headquartered in Mumbai, Liftronic India Pvt Ltd delivers end-to-end elevator experiences: expert consultation and Sales, precise Installation, and proactive Maintenance. Our designs blend European technology with Indian sensibilities to create lifts that feel custom-made for your space. Discover an elevator that improves accessibility, adds luxury, and transforms how you live.`;

  // Use Sanity data or fallback
  const stats = companyInfo?.stats || defaultStats;
  const features = companyInfo?.homepageFeatures || defaultFeatures;
  const title = companyInfo?.homepageAboutTitle || "About Liftronic";
  const subtitle =
    companyInfo?.homepageAboutSubtitle || "Innovation Meets Elegance.";
  const description =
    companyInfo?.homepageAboutDescription || defaultDescription;

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* BACKGROUND DECORATIONS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Enhanced gradient glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[800px] rounded-full bg-accent/8 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-brand/6 blur-3xl opacity-50" />

        {/* Background image with better positioning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] opacity-[0.07]"
            style={{
              backgroundImage: "url('/liftronic-crop.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00a86b 1px, transparent 1px), linear-gradient(to bottom, #00a86b 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CENTERED HEADER & COPY */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
              {title}
            </h2>
            <div className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-3 md:space-y-4">
              <strong className="block text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                {subtitle}
              </strong>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* FEATURE CARDS - Responsive grid */}
        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = getFeatureIcon(feature.icon);
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                icon={Icon}
                index={index}
              >
                {feature.description}
              </FeatureCard>
            );
          })}
        </div>

        {/* STATS CARDS SECTION - Enhanced responsive grid */}
        <motion.div
          className="mt-16 md:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {stats.map((s, index) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                suffix={s.suffix}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes shine {
          0%,
          100% {
            background-position: -200% -200%;
          }
          50% {
            background-position: 200% 200%;
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
