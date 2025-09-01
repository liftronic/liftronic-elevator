"use client";
import { motion } from "motion/react";

const services = [
  {
    title: "Supply",
    desc: "Certified components and complete elevator systems with traceable quality.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7V4h8v3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Installation & Maintenance",
    desc: "End-to-end installation with preventive maintenance for maximum uptime.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 19l12-12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Upgrades & Replacement",
    desc: "Safety, efficiency, and control upgrades tailored to your site.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Services Offered</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-black/10 bg-white p-6"
            >
              <div className="size-10 rounded-lg bg-soft flex items-center justify-center">
                {s.icon}
              </div>
              <div className="mt-4 font-medium">{s.title}</div>
              <p className="mt-2 text-sm opacity-80">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
