"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface AnimatedHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  subtitleClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  underline?: boolean;
  gradient?: boolean;
  split?: boolean;
  highlight?: boolean;
  staggerDelay?: number;
  animated?: boolean;
  variant?: "default" | "outlined" | "gradient" | "minimal" | "accent";
}

export function AnimatedHeading({
  title,
  subtitle,
  align = "left",
  className,
  subtitleClassName,
  size = "md",
  underline = false,
  gradient = false,
  split = false,
  highlight = false,
  staggerDelay = 0.05,
  animated = true,
  variant = "default",
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.3,
  });
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };
  
  const variantClasses = {
    default: "text-foreground",
    outlined: "text-transparent bg-clip-text border-foreground",
    gradient: "text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700",
    minimal: "text-foreground font-light",
    accent: "text-primary",
  };

  // Split title into words for word-by-word animation
  const titleWords = title.split(" ");
  
  // Split title into characters for character-by-character animation
  const titleChars = title.split("");

  return (
    <div ref={ref} className={cn("mb-12", alignClasses[align], className)}>
      <h2 
        className={cn(
          "font-bold tracking-tight", 
          sizeClasses[size],
          gradient && "text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700",
          variant !== "gradient" && variantClasses[variant]
        )}
      >
        {animated && split && isMounted ? (
          <span className="inline-block">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: staggerDelay * i,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {word}
                {highlight && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[0.1em] bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + staggerDelay * i,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  />
                )}
              </motion.span>
            ))}
          </span>
        ) : animated && highlight && isMounted ? (
          // Character by character animation for highlight effect
          <span className="inline-block">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block relative"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.3,
                  delay: staggerDelay * i,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
                {char !== " " && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[0.1em] w-full bg-primary rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.3 + staggerDelay * i,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  />
                )}
              </motion.span>
            ))}
          </span>
        ) : (
          <motion.span
            className="inline-block"
            initial={animated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {title}
          </motion.span>
        )}

        {underline && (
          <motion.span
            className={cn(
              "block h-1 mt-2 rounded-full",
              variant === "accent" || variant === "gradient" ? "bg-primary" : "bg-foreground/20"
            )}
            initial={{ width: 0 }}
            animate={
              isInView
                ? { width: align === "center" ? "80px" : "40px" }
                : { width: 0 }
            }
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            style={{
              marginLeft: align === "center" ? "auto" : 0,
              marginRight: align === "center" ? "auto" : 0,
            }}
          />
        )}
      </h2>

      {subtitle && (
        <motion.p
          className={cn(
            "mt-4 max-w-prose",
            align === "center" && "mx-auto",
            variant === "minimal" ? "text-foreground/80" : "text-muted-foreground",
            subtitleClassName
          )}
          initial={animated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
