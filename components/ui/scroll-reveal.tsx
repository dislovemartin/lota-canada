"use client";

import { motion, useInView, Variant } from "framer-motion";
import React, { ReactNode, useRef } from "react";

type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip-up"
  | "flip-down"
  | "blur-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  as?: React.ElementType;
}

const variants = {
  hidden: {
    "fade-up": { opacity: 0, y: 40 },
    "fade-down": { opacity: 0, y: -40 },
    "fade-left": { opacity: 0, x: -40 },
    "fade-right": { opacity: 0, x: 40 },
    "zoom-in": { opacity: 0, scale: 0.9 },
    "zoom-out": { opacity: 0, scale: 1.1 },
    "flip-up": { opacity: 0, rotateX: 20, y: 40 },
    "flip-down": { opacity: 0, rotateX: -20, y: -40 },
    "blur-in": { opacity: 0, filter: "blur(8px)" },
  },
  visible: {
    "fade-up": { opacity: 1, y: 0 },
    "fade-down": { opacity: 1, y: 0 },
    "fade-left": { opacity: 1, x: 0 },
    "fade-right": { opacity: 1, x: 0 },
    "zoom-in": { opacity: 1, scale: 1 },
    "zoom-out": { opacity: 1, scale: 1 },
    "flip-up": { opacity: 1, rotateX: 0, y: 0 },
    "flip-down": { opacity: 1, rotateX: 0, y: 0 },
    "blur-in": { opacity: 1, filter: "blur(0px)" },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  className,
  threshold = 0.2,
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once,
    amount: threshold,
  });

  // Handle staggered children
  if (staggerChildren && React.Children.count(children) > 1) {
    return (
      <Component ref={ref} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: variants.hidden[variant] as Variant,
              visible: {
                ...variants.visible[variant],
                transition: {
                  duration,
                  delay: delay + index * staggerDelay,
                  ease: [0.215, 0.61, 0.355, 1],
                },
              },
            }}
            key={index}
          >
            {child}
          </motion.div>
        ))}
      </Component>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: variants.hidden[variant] as Variant,
        visible: {
          ...variants.visible[variant],
          transition: {
            duration,
            delay,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
      as={Component}
    >
      {children}
    </motion.div>
  );
}

// Convenience components for common use cases
export function FadeUp({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fade-up" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function FadeDown({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fade-down" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function FadeLeft({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fade-left" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function FadeRight({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fade-right" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function ZoomIn({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="zoom-in" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function BlurIn({ children, ...props }: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="blur-in" {...props}>
      {children}
    </ScrollReveal>
  );
} 