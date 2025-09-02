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
    <section id="clients" className="py-16 scroll-mt-24 bg-white/60 border-y border-black/5">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl border border-black/5 bg-white/60">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/90 to-transparent" />

          {/* track */}
          <div className="whitespace-nowrap marquee-track py-6">
            {row.map((l, i) => (
              <Image
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                width={120}
                height={32}
                className="inline-block h-8 w-auto mx-10 opacity-70 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
