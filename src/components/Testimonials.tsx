"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";

const items = Array.from({ length: 6 }).map((_, i) => ({
  name: `Client ${i + 1}`,
  rating: 5,
  text: "Professional team and timely delivery. Highly recommended.",
}));

function Stars({ count }: { count: number }) {
  return (
    <div className="text-accent flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ name, rating, text, index }: { name: string; rating: number; text: string; index: number; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 18; // -9..9
    const rotateX = -(py - 0.5) * 14; // -7..7
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 120 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: isHover ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="rounded-2xl bg-white/80 dark:bg-soft p-6 shadow-xl border border-accent/10 overflow-hidden"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none mix-blend-overlay" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-accent">{name.charAt(0)}</span>
          </div>
          <div>
            <div className="font-semibold text-black">{name}</div>
            <Stars count={rating} />
          </div>
        </div>

        <p className="mt-4 text-black italic relative z-10">
          “{text}”
        </p>

        <div className="mt-6 flex items-center justify-between relative z-10">
          <div className="text-sm text-black">Verified client</div>
          <div className="text-xs text-black">Posted 2 months ago</div>
        </div>

        {/* soft glow */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black">
          What Our Clients Say
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((t, idx) => (
            <TestimonialCard key={t.name} name={t.name} rating={t.rating} text={t.text} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

