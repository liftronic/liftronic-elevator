import Image from "next/image";
import * as motion from "motion/react-client";
import QuoteCTA from "~/components/QuoteCTA";

export default function ClientsMarquee() {
  const logos = [
    { src: "/vercel.svg", alt: "Vercel" },
    { src: "/next.svg", alt: "Next.js" },
    { src: "/globe.svg", alt: "Globe" },
    { src: "/file.svg", alt: "File" },
    { src: "/window.svg", alt: "Window" },
  ];
  const row = [...logos, ...logos];
  return (
    <section id="clients" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Leading Brands
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            From residential towers to corporate campuses, industry leaders rely
            on Liftronic to keep people moving with confidence.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* track */}
          <div className="whitespace-nowrap marquee-track py-10">
            {row.map((l, i) => (
              <Image
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                width={140}
                height={40}
                className="inline-block h-10 w-auto mx-14 opacity-90 hover:opacity-100 transition-all duration-200"
              />
            ))}
          </div>
        </motion.div>

        <QuoteCTA
          quote="Partnerships built on uptime, responsiveness, and an unwavering safety record."
          ctaText="Explore Our Services"
          ctaHref="/#services"
          className="mt-12"
        />
      </div>
    </section>
  );
}
