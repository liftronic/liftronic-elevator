"use client";
import { motion } from "motion/react";
import { BiPackage, BiWrench, BiArrowToTop } from "react-icons/bi";

const services = [
  {
    title: "Supply",
    desc: "Certified components and complete elevator systems with traceable quality.",
    icon: <BiPackage size={20} />,
  },
  {
    title: "Installation & Maintenance",
    desc: "End-to-end installation with preventive maintenance for maximum uptime.",
    icon: <BiWrench size={20} />,
  },
  {
    title: "Upgrades & Replacement",
    desc: "Safety, efficiency, and control upgrades tailored to your site.",
    icon: <BiArrowToTop size={20} />,
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
