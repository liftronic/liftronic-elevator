import {
  BiCog,
  BiStar,
  BiGlobe,
  BiShield,
  BiWrench,
  BiBuilding,
} from "react-icons/bi";
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

// Simple stat display (no animation needed on server)
function StatDisplay({
  label,
  value,
  suffix = "+",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-extrabold">
        <span className="text-white">{value}</span>
        <span className="ml-1 text-white">{suffix}</span>
      </div>
      <div className="text-sm font-medium text-white">{label}</div>
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

        {/* GREEN STATS BAR */}
        <div className="mt-12 bg-accent text-white rounded-2xl px-6 py-8 shadow-xl relative overflow-hidden">
          {/* subtle dark overlay to reduce glare on bright accent backgrounds */}
          <div className="absolute inset-0 bg-black/18 pointer-events-none rounded-2xl" />
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center relative z-10">
            {stats.map((s) => (
              <StatDisplay
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
