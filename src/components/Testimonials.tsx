"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import QuoteCTA from "~/components/QuoteCTA";
import type { Testimonial } from "~/sanity/lib/testimonialTypes";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

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

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
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
          {testimonial.companyImage ? (
            <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-accent/10">
              <Image
                src={testimonial.companyImage}
                alt={testimonial.imageAlt || testimonial.testimonialFrom}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-accent">
                {testimonial.testimonialFrom.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="font-semibold text-black">
              {testimonial.testimonialFrom}
            </div>
            <Stars count={5} />
          </div>
        </div>

        <p className="mt-4 text-black italic relative z-10">
          &ldquo;{testimonial.testimonialDetail}&rdquo;
        </p>

        <div className="mt-6 flex items-center justify-between relative z-10">
          <div className="text-sm text-black">Verified client</div>
        </div>

        {/* soft glow */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Stories from property managers and facility directors who count on
            Liftronic for safe, reliable elevator experiences every day.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {testimonials.slice(0, 6).map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              index={idx}
            />
          ))}
        </motion.div>

        <QuoteCTA
          quote="Trust is earned through every smooth ride and on-time service call."
          ctaText="Talk With Our Team"
          ctaHref="/#contact"
        />
      </div>
    </section>
  );
}
