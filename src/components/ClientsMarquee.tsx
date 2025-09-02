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
      <div className="overflow-hidden">
        <div className="whitespace-nowrap marquee-track">
          {row.map((l, i) => (
            <Image
              key={`${l.alt}-${i}`}
              src={l.src}
              alt={l.alt}
              width={120}
              height={32}
              className="inline-block h-8 w-auto mx-10 opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
