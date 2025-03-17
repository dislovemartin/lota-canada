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
    
    // Reset all counts initially
    setCounts(stats.map(() => 0));
    
    const timers: NodeJS.Timeout[] = [];
    
    // Create animation intervals
    stats.forEach((stat, index) => {
      const stepDuration = Math.max(10, duration * 1000 / (stat.value || 1));
      let currentCount = 0;
      
      const timer = setInterval(() => {
        if (currentCount >= stat.value) {
          clearInterval(timer);
          return;
        }
        
        currentCount += 1;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = currentCount;
          return newCounts;
        });
      }, stepDuration);
      
      timers.push(timer);
    });
    
    // Cleanup function
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [isInView, animated, duration, stats.length]);
  
  // Store stat values in a ref to avoid dependency issues
  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const variantStyles = {
    default: "bg-white dark:bg-gray-900 shadow-md",
    minimal: "bg-transparent",
    cards: "bg-transparent",
    gradient: "bg-gradient-to-br from-blue-800 to-blue-950 text-white",
    bordered: "bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700",
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
              "relative p-6 rounded-xl flex flex-col items-center text-center group",
              variant === "cards" && "bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800",
              variant !== "cards" && variant !== "minimal" && variantStyles[variant],
              variant === "minimal" && "py-4"
            )}
            initial={animated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={isInView && animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
          >
            {/* Decorative elements for gradient variant */}
            {variant === "gradient" && (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-white/10 blur-xl" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 opacity-70 rounded-t-xl" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-50 rounded-b-xl" />
              </div>
            )}
            
            {/* Decorative elements for bordered variant */}
            {variant === "bordered" && (
              <>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
              </>
            )}
            
            <div className="relative z-10">
              <motion.div className="relative mb-2 group">
                {/* Stat icon based on label - dynamically choose icon */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                      stat.label.toLowerCase().includes('member') ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" : 
                      stat.label.toLowerCase().includes('event') ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" : 
                      stat.label.toLowerCase().includes('mentor') ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" : 
                      stat.label.toLowerCase().includes('partner') ? "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" : 
                      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    } />
                  </svg>
                </div>
                <motion.p
                  className={cn(
                    "text-4xl md:text-5xl font-bold relative",
                    variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
                  )}
                  initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                  animate={isInView && animated ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: delay + index * 0.1 + 0.2 }}
                >
                  <span className="relative inline-block">
                    {stat.prefix || ""}{counts[index].toLocaleString(undefined, {
                      minimumFractionDigits: stat.decimal || 0,
                      maximumFractionDigits: stat.decimal || 0,
                    })}{stat.suffix || ""}
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </span>
                </motion.p>
              </motion.div>
              
              <motion.p
                className={cn(
                  "text-sm md:text-base font-medium relative",
                  variant === "gradient" ? "text-white/90" : "text-gray-700 dark:text-gray-300"
                )}
                initial={animated ? { opacity: 0 } : { opacity: 1 }}
                animate={isInView && animated ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: delay + index * 0.1 + 0.3 }}
              >
                <span className="relative inline-block px-3 py-1 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                  {stat.label}
                </span>
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
