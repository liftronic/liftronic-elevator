"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface NumberStat {
  number: number;
  suffix?: string;
  label: string;
}

interface AnimatedNumbersProps {
  stats: NumberStat[];
}

function AnimatedNumber({
  number,
  suffix = "",
  inView,
}: {
  number: number;
  suffix?: string;
  inView: boolean;
}) {
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = number / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(increment * currentStep, number);
      setDisplayNumber(Math.floor(newValue));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayNumber(number);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [number, inView]);

  return (
    <span>
      {displayNumber.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AnimatedNumbers({ stats }: AnimatedNumbersProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-16"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">
                <AnimatedNumber
                  number={stat.number}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-gray-600 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
