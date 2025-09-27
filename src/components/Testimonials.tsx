"use client";
import { motion } from "motion/react";

const items = Array.from({ length: 6 }).map((_, i) => ({
  name: `Client ${i + 1}`,
  rating: 5,
  text: "Professional team and timely delivery. Highly recommended.",
}));

function Stars({ count }: { count: number }) {
  return (
    <div className="text-accent">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-charcoal">
          What Our Clients Say
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white p-8 transition-all duration-150 shadow-elevate"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-charcoal">{t.name}</div>
                  <Stars count={t.rating} />
                </div>
              </div>
              <p className="mt-5 text-charcoal/80 italic">
                “{t.text}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

