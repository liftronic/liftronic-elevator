import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

// Product type definition
type Product = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags?: string[];
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imageSrc?: string;
  imageAlt?: string;
};

// Sample product data - this would typically come from a CMS or database
const products: Record<string, Product> = {
  home: {
    id: "home",
    title: "Home Elevators",
    summary: "Compact, quiet lifts purpose-built for residences and villas.",
    description:
      "Our home elevators combine luxury with functionality, designed specifically for residential properties. With whisper-quiet operation and space-efficient design, these elevators seamlessly integrate into your home while providing safe, comfortable transportation between floors.",
    tags: ["Residential", "Compact", "Quiet Operation"],
    features: [
      {
        title: "Space Efficient Design",
        description:
          "Minimal footprint design that fits perfectly in residential spaces without compromising aesthetics.",
        icon: "🏠",
      },
      {
        title: "Whisper Quiet Operation",
        description:
          "Advanced noise reduction technology ensures peaceful operation day and night.",
        icon: "🔇",
      },
      {
        title: "Safety First",
        description:
          "Multiple safety systems including emergency communication and backup power options.",
        icon: "🛡️",
      },
      {
        title: "Custom Interiors",
        description:
          "Personalize your elevator with premium finishes and lighting options.",
        icon: "✨",
      },
    ],
    specifications: [
      { label: "Capacity", value: "2-6 persons" },
      { label: "Travel Height", value: "Up to 15m" },
      { label: "Speed", value: "0.15-0.3 m/s" },
      { label: "Power Supply", value: "220V Single Phase" },
    ],
    faqs: [
      {
        question: "How much space do I need for a home elevator?",
        answer:
          "Our compact home elevators require a minimum space of 1.2m x 1.2m. We offer various sizes to fit different home layouts and can customize dimensions based on your specific requirements.",
      },
      {
        question: "Is it safe for daily family use?",
        answer:
          "Absolutely. Our home elevators meet all safety standards and include features like emergency communication, backup power, and multiple safety sensors. They're designed for daily family use including elderly members and children.",
      },
      {
        question: "What maintenance is required?",
        answer:
          "We recommend quarterly maintenance checks which include safety system testing, lubrication, and general inspection. Our service team provides comprehensive maintenance plans to ensure optimal performance.",
      },
      {
        question: "Can it be installed in an existing home?",
        answer:
          "Yes, our engineers can assess your home and recommend the best installation approach. In most cases, we can install elevators in existing homes with minimal structural modifications.",
      },
    ],
  },
  passenger: {
    id: "passenger",
    title: "Passenger Elevators",
    summary: "Reliable people movement for apartments, offices and hotels.",
    description:
      "Built for high-traffic commercial and residential buildings, our passenger elevators deliver exceptional reliability, energy efficiency, and passenger comfort. Engineered to handle frequent use while maintaining smooth, quiet operation.",
    tags: ["Commercial", "High-usage", "Energy Efficient"],
    features: [
      {
        title: "High Traffic Capacity",
        description:
          "Designed to handle thousands of trips daily with consistent performance and reliability.",
        icon: "👥",
      },
      {
        title: "Energy Efficient",
        description:
          "Advanced regenerative drives and LED lighting reduce energy consumption by up to 40%.",
        icon: "⚡",
      },
      {
        title: "Smart Controls",
        description:
          "Intelligent destination control systems optimize passenger flow and reduce wait times.",
        icon: "🧠",
      },
      {
        title: "Premium Comfort",
        description:
          "Smooth acceleration, quiet operation, and climate control for passenger comfort.",
        icon: "🎯",
      },
    ],
    specifications: [
      { label: "Capacity", value: "8-26 persons" },
      { label: "Travel Height", value: "Up to 200m" },
      { label: "Speed", value: "1.0-4.0 m/s" },
      { label: "Power Supply", value: "380V Three Phase" },
    ],
    faqs: [
      {
        question: "What capacity options are available?",
        answer:
          "Our passenger elevators range from 8-person (630kg) to 26-person (2000kg) capacity. We can also customize based on specific building requirements and expected traffic patterns.",
      },
      {
        question: "How energy efficient are these elevators?",
        answer:
          "Our elevators feature regenerative drives that recover energy during descent, LED lighting, and smart controls that optimize power usage. This results in up to 40% energy savings compared to conventional elevators.",
      },
      {
        question: "What about accessibility compliance?",
        answer:
          "All our passenger elevators meet accessibility standards including wheelchair accessibility, audio announcements, braille buttons, and emergency communication systems.",
      },
      {
        question: "How fast can they be installed?",
        answer:
          "Installation typically takes 4-8 weeks depending on building height and complexity. We provide detailed project timelines and coordinate with construction schedules to minimize delays.",
      },
    ],
  },
  freight: {
    id: "freight",
    title: "Freight Elevators",
    summary: "Heavy‑duty cabins with rugged finishes for goods and logistics.",
    description:
      "Our freight elevators are engineered for demanding industrial applications. Built with reinforced structures and heavy-duty components, they ensure reliable transportation of goods, equipment, and materials in warehouses, manufacturing facilities, and commercial buildings.",
    tags: ["Industrial", "High-capacity", "Heavy Duty"],
    features: [
      {
        title: "Heavy Load Capacity",
        description:
          "Designed to handle loads from 1000kg to 5000kg with reinforced cabin structure.",
        icon: "🏗️",
      },
      {
        title: "Rugged Construction",
        description:
          "Industrial-grade materials and finishes that withstand harsh operating conditions.",
        icon: "🛠️",
      },
      {
        title: "Bi-Parting Doors",
        description:
          "Wide opening doors for easy loading and unloading of large items and equipment.",
        icon: "🚪",
      },
      {
        title: "Safety Systems",
        description:
          "Advanced safety features including overload protection and emergency stops.",
        icon: "⚠️",
      },
    ],
    specifications: [
      { label: "Capacity", value: "1000-5000 kg" },
      { label: "Travel Height", value: "Up to 60m" },
      { label: "Speed", value: "0.25-1.0 m/s" },
      { label: "Door Opening", value: "Up to 3500mm wide" },
    ],
    faqs: [
      {
        question: "What's the maximum load capacity available?",
        answer:
          "Our freight elevators can handle loads up to 5000kg (5 tons). We can also customize for specific requirements with higher capacities for specialized industrial applications.",
      },
      {
        question: "Can they be used for both goods and people?",
        answer:
          "Yes, our freight elevators can be configured for dual use with appropriate safety features and passenger controls. However, we recommend dedicated passenger elevators for regular people transport.",
      },
      {
        question: "What door options are available?",
        answer:
          "We offer various door configurations including single-speed, two-speed, and bi-parting doors. Door widths can range from standard 1200mm up to 3500mm for oversized cargo.",
      },
      {
        question: "How do they handle power outages?",
        answer:
          "Our freight elevators include emergency lowering systems and backup power options to ensure safe operation during power failures. They automatically return to the nearest floor for safe exit.",
      },
    ],
  },
  hospital: {
    id: "hospital",
    title: "Hospital / Stretcher Elevators",
    summary: "Wide cabins and smooth acceleration tailored for healthcare.",
    description:
      "Specifically designed for healthcare facilities, our hospital elevators prioritize patient comfort, hygiene, and accessibility. With spacious cabins, smooth ride quality, and infection control features, they ensure safe patient transport in critical care environments.",
    tags: ["Healthcare", "Spacious", "Smooth Ride"],
    features: [
      {
        title: "Spacious Design",
        description:
          "Extra-wide cabins to accommodate stretchers, wheelchairs, and medical equipment.",
        icon: "🏥",
      },
      {
        title: "Smooth Operation",
        description:
          "Advanced vibration control and smooth acceleration for patient comfort.",
        icon: "🛌",
      },
      {
        title: "Infection Control",
        description:
          "Antimicrobial surfaces and air purification systems for enhanced hygiene.",
        icon: "🧼",
      },
      {
        title: "Emergency Features",
        description:
          "Independent service mode, emergency communication, and backup power systems.",
        icon: "🚨",
      },
    ],
    specifications: [
      { label: "Capacity", value: "1600-2500 kg" },
      { label: "Cabin Size", value: "2100 x 2400mm" },
      { label: "Speed", value: "1.0-1.6 m/s" },
      { label: "Door Width", value: "1200-1600mm" },
    ],
    faqs: [
      {
        question: "Are they suitable for stretcher transport?",
        answer:
          "Yes, our hospital elevators are specifically designed with dimensions that accommodate standard stretchers, beds, and medical equipment. The cabin size and door width are optimized for healthcare use.",
      },
      {
        question: "What infection control features are included?",
        answer:
          "Our hospital elevators feature antimicrobial button panels, air purification systems, and easy-to-clean surfaces. Optional UV sterilization systems are also available.",
      },
      {
        question: "Do they meet healthcare regulations?",
        answer:
          "Yes, all our hospital elevators comply with relevant healthcare building codes and standards, including accessibility requirements and emergency evacuation protocols.",
      },
      {
        question: "Can they operate during emergencies?",
        answer:
          "Our hospital elevators include independent service mode for emergency use, backup power systems, and priority controls for critical situations like fire evacuation.",
      },
    ],
  },
  mrl: {
    id: "mrl",
    title: "MRL (Machine‑Room‑Less) Elevators",
    summary: "Space‑efficient design with excellent energy performance.",
    description:
      "Our Machine-Room-Less elevators eliminate the need for a separate machine room, saving valuable building space while delivering superior performance. Perfect for modern buildings where space optimization and energy efficiency are priorities.",
    tags: ["Space Saving", "Energy Efficient", "Modern"],
    features: [
      {
        title: "No Machine Room",
        description:
          "Compact design eliminates the need for a separate machine room, saving building space.",
        icon: "📦",
      },
      {
        title: "Energy Efficient",
        description:
          "Advanced drive systems and regenerative technology reduce energy consumption by 40%.",
        icon: "🌿",
      },
      {
        title: "Quiet Operation",
        description:
          "Low-noise gearless motors and advanced vibration isolation for silent operation.",
        icon: "🔉",
      },
      {
        title: "Easy Maintenance",
        description:
          "Accessible components and remote monitoring for simplified maintenance procedures.",
        icon: "🔧",
      },
    ],
    specifications: [
      { label: "Capacity", value: "320-1600 kg" },
      { label: "Travel Height", value: "Up to 75m" },
      { label: "Speed", value: "1.0-2.5 m/s" },
      { label: "Machine Room", value: "Not Required" },
    ],
    faqs: [
      {
        question: "How much space is saved without a machine room?",
        answer:
          "Eliminating the machine room can save 15-25 square meters of valuable building space, which can be used for other purposes or reduce overall building footprint.",
      },
      {
        question: "Are they as reliable as traditional elevators?",
        answer:
          "Yes, MRL elevators use proven technology and often have better reliability due to newer components and improved design. They meet all the same safety and performance standards.",
      },
      {
        question: "Where is the machinery located?",
        answer:
          "The machine is located in the hoistway itself, typically at the top of the shaft. This compact arrangement doesn't compromise performance or safety.",
      },
      {
        question: "What about maintenance access?",
        answer:
          "All components are designed for easy access from within the hoistway. Many systems also include remote monitoring capabilities for predictive maintenance.",
      },
    ],
  },
};

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate static paths for all products
export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({
    slug,
  }));
}
