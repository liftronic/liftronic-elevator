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

// Stat card with 3D tilt effect
function StatCard({
  label,
  value,
  suffix = "+",
}: {
  label: string;
  value: number;
  suffix?: string;
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
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div 
      ref={cardRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Gradient accent on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
            animation: "shine 2s infinite",
          }}
        />
        
        <div className="relative z-10">
          <div className="text-5xl md:text-6xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-accent to-brand bg-clip-text text-transparent">
              {value}{suffix}
            </span>
          </div>
          <div className="text-sm md:text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
            {label}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </div>
  );
}

// Simple feature card (no tilt effect on server)
function FeatureCard({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <div style={{ perspective: 1000 }} className="relative">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
        <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-center">{children}</p>

        {/* subtle glossy highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(600px 200px at 10% 10%, rgba(255,255,255,0.18), transparent 20%)",
          }}
        />
      </div>
    </div>
  );
}

// The main About Us component - now a server component
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
      className="relative overflow-hidden py-20 md:py-28 bg-gray-50"
    >
      {/* BACKGROUND DECORATIONS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle gradient glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/10 blur-3xl opacity-40" />

        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[640px] md:h-[640px] opacity-10"
            style={{
              backgroundImage: "url('/liftronic-crop.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* CENTERED HEADER & COPY */}
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <strong className="block text-lg md:text-xl font-semibold text-gray-900">
                {subtitle}
              </strong>
              {description}
            </p>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = getFeatureIcon(feature.icon);
            return (
              <FeatureCard key={index} title={feature.title} icon={Icon}>
                {feature.description}
              </FeatureCard>
            );
          })}
        </div>

        {/* STATS CARDS SECTION */}
        <div className="mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                suffix={s.suffix}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
