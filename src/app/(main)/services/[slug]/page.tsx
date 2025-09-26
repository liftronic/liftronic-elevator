import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";

// Service type definition
type Service = {
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

// Sample service data - this would typically come from a CMS or database
const services: Record<string, Service> = {
  "design-consultation": {
    id: "design-consultation",
    title: "Design & Consultation",
    summary:
      "Expert guidance from concept to completion with customized elevator solutions.",
    description:
      "Our design and consultation services provide comprehensive guidance throughout your elevator project lifecycle. From initial feasibility studies to detailed architectural integration, our experts ensure your elevator solution perfectly matches your building requirements, aesthetic preferences, and budget constraints.",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Design consultation process",
    tags: ["Consultation", "Custom Design", "Planning", "Architecture"],
    features: [
      {
        title: "Site Assessment",
        description:
          "Comprehensive evaluation of your building structure, space constraints, and traffic requirements.",
        icon: "🏗️",
      },
      {
        title: "Custom Design Solutions",
        description:
          "Tailored elevator designs that seamlessly integrate with your architectural vision.",
        icon: "✏️",
      },
      {
        title: "Technical Planning",
        description:
          "Detailed technical specifications, load calculations, and compliance documentation.",
        icon: "📋",
      },
      {
        title: "Project Management",
        description:
          "End-to-end project coordination ensuring timely delivery and quality execution.",
        icon: "⚡",
      },
    ],
    specifications: [
      { label: "Consultation Duration", value: "2-4 weeks" },
      { label: "Design Iterations", value: "Up to 3 revisions" },
      { label: "Technical Drawings", value: "Complete CAD package" },
      { label: "Compliance Check", value: "Local & National codes" },
    ],
    faqs: [
      {
        question: "What does the consultation process involve?",
        answer:
          "Our consultation process includes site visits, requirement analysis, preliminary design concepts, technical feasibility studies, and detailed project proposals with timelines and costs.",
      },
      {
        question: "How long does the design phase take?",
        answer:
          "Typically 2-4 weeks depending on project complexity. Simple residential projects may take 1-2 weeks, while complex commercial installations can take 4-6 weeks.",
      },
      {
        question: "Do you handle building permits?",
        answer:
          "Yes, we assist with all necessary permits and regulatory approvals. Our team is familiar with local building codes and works with authorities to ensure smooth approval processes.",
      },
    ],
  },
  installation: {
    id: "installation",
    title: "Professional Installation",
    summary:
      "Certified technicians ensure safe, efficient installation of all elevator types.",
    description:
      "Our certified installation teams bring years of experience and expertise to every project. Using industry-leading techniques and safety protocols, we ensure your elevator is installed correctly, safely, and ready for years of reliable service.",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Professional elevator installation",
    tags: ["Installation", "Certified", "Professional", "Safety"],
    features: [
      {
        title: "Certified Technicians",
        description:
          "Factory-trained and certified installation professionals with extensive experience.",
        icon: "🔧",
      },
      {
        title: "Safety Protocols",
        description:
          "Strict adherence to safety standards and protocols throughout the installation process.",
        icon: "🛡️",
      },
      {
        title: "Quality Control",
        description:
          "Multi-stage quality checks and testing to ensure optimal performance and safety.",
        icon: "✅",
      },
      {
        title: "Timeline Commitment",
        description:
          "Predictable installation schedules with milestone tracking and regular updates.",
        icon: "⏱️",
      },
    ],
    specifications: [
      { label: "Installation Time", value: "3-10 days" },
      { label: "Team Size", value: "2-4 certified technicians" },
      { label: "Testing Phase", value: "2-3 days post-installation" },
      { label: "Warranty", value: "1 year full coverage" },
    ],
    faqs: [
      {
        question: "How long does installation typically take?",
        answer:
          "Installation time varies by elevator type and building complexity. Residential elevators typically take 3-5 days, while commercial installations may take 7-10 days.",
      },
      {
        question: "What preparations are needed before installation?",
        answer:
          "We provide a detailed preparation checklist including hoistway completion, electrical connections, and access requirements. Our team coordinates with your contractors for seamless preparation.",
      },
      {
        question: "Is the building operational during installation?",
        answer:
          "We minimize disruption to building operations. Most work is contained to the elevator hoistway, and we coordinate schedules to avoid peak building usage times.",
      },
    ],
  },
  maintenance: {
    id: "maintenance",
    title: "Preventive Maintenance",
    summary:
      "Scheduled maintenance programs to keep your elevators running smoothly.",
    description:
      "Our preventive maintenance programs are designed to maximize elevator uptime, extend equipment life, and ensure passenger safety. Through regular inspections, adjustments, and component replacements, we prevent minor issues from becoming major problems.",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Elevator maintenance service",
    tags: ["Maintenance", "Preventive", "Scheduled", "Safety"],
    features: [
      {
        title: "Regular Inspections",
        description:
          "Comprehensive monthly or quarterly inspections covering all elevator systems and components.",
        icon: "🔍",
      },
      {
        title: "Preventive Replacements",
        description:
          "Proactive replacement of wear components before they fail, preventing unexpected breakdowns.",
        icon: "🔄",
      },
      {
        title: "Performance Optimization",
        description:
          "Regular adjustments and calibrations to maintain optimal performance and energy efficiency.",
        icon: "⚙️",
      },
      {
        title: "Detailed Reporting",
        description:
          "Comprehensive maintenance reports with recommendations and compliance documentation.",
        icon: "📊",
      },
    ],
    specifications: [
      { label: "Service Frequency", value: "Monthly or Quarterly" },
      { label: "Response Time", value: "Within 4 hours" },
      { label: "Service Hours", value: "24/7 availability" },
      { label: "Parts Warranty", value: "12 months coverage" },
    ],
    faqs: [
      {
        question: "How often should elevators be maintained?",
        answer:
          "We recommend monthly maintenance for high-traffic commercial elevators and quarterly maintenance for residential elevators. The frequency can be adjusted based on usage patterns and equipment age.",
      },
      {
        question: "What's included in preventive maintenance?",
        answer:
          "Our service includes lubrication, safety system testing, door operation checks, control system diagnostics, emergency communications testing, and detailed performance reports.",
      },
      {
        question: "Can maintenance prevent all breakdowns?",
        answer:
          "While preventive maintenance significantly reduces breakdown risk, it cannot eliminate all possibilities. However, our programs typically reduce emergency calls by 70-80% compared to reactive maintenance approaches.",
      },
    ],
  },
  "emergency-repair": {
    id: "emergency-repair",
    title: "24/7 Emergency Repair",
    summary:
      "Round-the-clock emergency response for critical elevator repairs.",
    description:
      "When elevator emergencies occur, every minute counts. Our 24/7 emergency repair service ensures rapid response times, expert troubleshooting, and quick resolution to get your elevators back in service safely and efficiently.",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Emergency elevator repair service",
    tags: ["Emergency", "24/7", "Rapid Response", "Critical Support"],
    features: [
      {
        title: "Rapid Response",
        description:
          "Guaranteed response within 2 hours for emergency calls, with most technicians arriving within 60 minutes.",
        icon: "🚨",
      },
      {
        title: "Expert Diagnosis",
        description:
          "Skilled technicians with advanced diagnostic tools for quick problem identification and resolution.",
        icon: "🔧",
      },
      {
        title: "Parts Availability",
        description:
          "Extensive parts inventory and rapid sourcing network for immediate repairs and minimal downtime.",
        icon: "📦",
      },
      {
        title: "Safety Priority",
        description:
          "All emergency repairs prioritize passenger safety with thorough testing before returning to service.",
        icon: "🛡️",
      },
    ],
    specifications: [
      { label: "Response Time", value: "Within 2 hours" },
      { label: "Average Resolution", value: "2-4 hours" },
      { label: "Technician Coverage", value: "24/7/365" },
      { label: "Parts Availability", value: "95% in-stock rate" },
    ],
    faqs: [
      {
        question: "What constitutes an elevator emergency?",
        answer:
          "Emergencies include passenger entrapments, complete elevator failures, safety system malfunctions, fire service issues, or any situation that poses immediate safety risks.",
      },
      {
        question: "How quickly can you respond to emergencies?",
        answer:
          "We guarantee response within 2 hours, but most emergency calls receive technician dispatch within 30-60 minutes depending on location and time of day.",
      },
      {
        question: "What if repairs require special parts?",
        answer:
          "Our technicians carry common emergency parts. For special components, we have expedited sourcing with overnight delivery capabilities and temporary solutions to maintain service.",
      },
    ],
  },
  modernization: {
    id: "modernization",
    title: "Elevator Modernization",
    summary:
      "Upgrade legacy systems with modern technology for improved performance.",
    description:
      "Transform your aging elevator systems with our comprehensive modernization services. We upgrade controls, drives, safety systems, and aesthetics to improve reliability, energy efficiency, and passenger experience while extending equipment life.",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Elevator modernization upgrade",
    tags: ["Modernization", "Upgrade", "Technology", "Efficiency"],
    features: [
      {
        title: "Control System Upgrade",
        description:
          "Replace outdated relay controls with modern microprocessor-based systems for improved reliability.",
        icon: "💻",
      },
      {
        title: "Drive Modernization",
        description:
          "Upgrade to variable frequency drives for smoother rides and significant energy savings.",
        icon: "⚡",
      },
      {
        title: "Safety Enhancement",
        description:
          "Install latest safety features including emergency communications and monitoring systems.",
        icon: "🛡️",
      },
      {
        title: "Aesthetic Renewal",
        description:
          "Complete interior and fixture updates to modernize appearance and improve passenger experience.",
        icon: "✨",
      },
    ],
    specifications: [
      { label: "Project Duration", value: "2-6 weeks" },
      { label: "Energy Savings", value: "20-40% reduction" },
      { label: "Reliability Improvement", value: "80-90% fewer breakdowns" },
      { label: "Warranty Period", value: "2 years full coverage" },
    ],
    faqs: [
      {
        question: "When should I consider elevator modernization?",
        answer:
          "Consider modernization for elevators over 15-20 years old, frequent breakdowns, high energy costs, outdated safety features, or when parts become difficult to source.",
      },
      {
        question: "Can you modernize elevators from any manufacturer?",
        answer:
          "Yes, we specialize in modernizing elevators from all major manufacturers. Our solutions are designed to work with existing hoistways and structural components.",
      },
      {
        question: "How long is the building without elevator service?",
        answer:
          "We plan modernization to minimize downtime, typically 2-4 weeks depending on scope. For buildings with multiple elevators, we can phase the work to maintain some service.",
      },
    ],
  },
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
