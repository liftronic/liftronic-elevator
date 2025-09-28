"use client";

import type { MouseEventHandler } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type CTAAction = {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
};

type CallToActionSectionProps = {
  title?: string;
  description?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction | null;
};

const baseButtonClass = "btn text-lg px-8 py-4";

const getVariantClasses = (variant: CTAAction["variant"]) => {
  if (variant === "secondary") {
    return "border-2 border-white text-white hover:bg-white hover:text-black";
  }

  return "bg-white hover:bg-gray-100 text-black";
};

const renderAction = (action: CTAAction) => {
  const { label, href, onClick, variant = "primary" } = action;
  const className = `${baseButtonClass} ${getVariantClasses(variant)} inline-flex items-center justify-center`;

  if (href) {
    return (
      <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href={href} className={className}>
          {label}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      key={label}
      type="button"
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default function CallToActionSection({
  title = "Ready to Work with Liftronic?",
  description =
    "Experience the difference that comes with choosing a partner committed to excellence, innovation, and your success. Let's elevate your building together.",
  primaryAction,
  secondaryAction,
}: CallToActionSectionProps) {
  const actions: CTAAction[] = [];

  const resolvedPrimary: CTAAction = {
    label: "Get Free Consultation",
    href: "/#contact",
    variant: "primary",
    ...primaryAction,
  };

  actions.push(resolvedPrimary);

  const resolvedSecondary: CTAAction | null =
    secondaryAction === null
      ? null
      : {
          label: "View Our Projects",
          variant: "secondary",
          ...secondaryAction,
        };

  if (resolvedSecondary) {
    actions.push(resolvedSecondary);
  }

  return (
    <section className="py-20 bg-gradient-to-r from-accent to-green-500">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">{description}</p>
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map((action) => renderAction(action))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
