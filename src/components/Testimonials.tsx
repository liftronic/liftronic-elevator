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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Testimonials</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-black/10 bg-white p-6"
            >
              <div className="text-4xl leading-none">“</div>
              <p className="mt-2 text-sm opacity-90">{t.text}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-medium">{t.name}</div>
                <Stars count={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

