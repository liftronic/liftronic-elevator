import Image from "next/image";

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
    <section id="clients" className="py-20 scroll-mt-24 bg-soft">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-charcoal">
          Trusted by Leading Brands
        </h2>
        <div className="relative mt-10 overflow-hidden">
          {/* edge fades (soft) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* track */}
          <div className="whitespace-nowrap marquee-track py-6">
            {row.map((l, i) => (
              <Image
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                width={120}
                height={32}
                className="inline-block h-8 w-auto mx-12 opacity-90 hover:opacity-100 transition-all duration-200"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
