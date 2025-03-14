"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimal?: number;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
  variant?: "default" | "minimal" | "cards" | "gradient" | "bordered";
  columns?: 1 | 2 | 3 | 4 | 5;
  animated?: boolean;
  delay?: number;
  duration?: number;
}

export function AnimatedStats({
  stats,
  className,
  variant = "default",
  columns = 4,
  animated = true,
  delay = 0.3,
  duration = 2,
}: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (!isInView || !animated) return;

    const timers = stats.map((stat, index) => {
      // Reset count
      setCounts(prev => {
        const newCounts = [...prev];
        newCounts[index] = 0;
        return newCounts;
      });

      // Animate count
      const stepDuration = duration * 1000 / stat.value;
      let currentCount = 0;

      return setInterval(() => {
        if (currentCount >= stat.value) {
          clearInterval(timers[index]);
          return;
        }

        currentCount += 1;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = currentCount;
          return newCounts;
        });
      }, stepDuration);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [isInView, stats, animated, duration]);

  const variantStyles = {
    default: "bg-white dark:bg-gray-900 shadow-md",
    minimal: "bg-transparent",
    cards: "bg-transparent",
    gradient: "bg-gradient-to-br from-blue-600 to-purple-700 text-white",
    bordered: "bg-white dark:bg-gray-900 border-2 border-black dark:border-white",
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full mt-12",
        className
      )}
    >
      <div
        className={cn(
          "grid gap-8",
          gridCols[columns]
        )}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative p-6 rounded-xl flex flex-col items-center text-center",
              variant === "cards" && "bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300",
              variant !== "cards" && variant !== "minimal" && variantStyles[variant],
              variant === "minimal" && "py-4"
            )}
            initial={animated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={isInView && animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + index * 0.1 }}
            whileHover={variant === "cards" ? { y: -5 } : {}}
          >
            {/* Decorative elements for gradient variant */}
            {variant === "gradient" && (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-white/10 blur-xl" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
              </div>
            )}
            
            {/* Decorative elements for bordered variant */}
            {variant === "bordered" && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            )}
            
            <div className="relative z-10">
              <motion.p
                className={cn(
                  "text-4xl md:text-5xl font-bold mb-2",
                  variant === "gradient" ? "text-white" : "text-primary"
                )}
                initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={isInView && animated ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: delay + index * 0.1 + 0.2 }}
              >
                {stat.prefix || ""}{counts[index].toLocaleString(undefined, {
                  minimumFractionDigits: stat.decimal || 0,
                  maximumFractionDigits: stat.decimal || 0,
                })}{stat.suffix || ""}
              </motion.p>
              
              <motion.p
                className={cn(
                  "text-sm md:text-base font-medium",
                  variant === "gradient" ? "text-white/80" : "text-muted-foreground"
                )}
                initial={animated ? { opacity: 0 } : { opacity: 1 }}
                animate={isInView && animated ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: delay + index * 0.1 + 0.3 }}
              >
                {stat.label}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
