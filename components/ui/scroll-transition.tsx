"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollTransitionProps {
  children: ReactNode;
  className?: string;
  type?: "fade" | "slide" | "zoom" | "reveal" | "flip";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  triggerOnce?: boolean;
}

export function ScrollTransition({
  children,
  className,
  type = "fade",
  direction = "up",
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  once = true,
  triggerOnce = true,
}: ScrollTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: threshold 
  });
  
  // Mask dimensions for reveal animation
  const clipPathInitial = (): string => {
    switch (direction) {
      case "up":
        return "inset(100% 0 0 0)";
      case "down":
        return "inset(0 0 100% 0)";
      case "left":
        return "inset(0 0 0 100%)";
      case "right":
        return "inset(0 100% 0 0)";
      default:
        return "inset(100% 0 0 0)";
    }
  };

  const clipPathTarget = "inset(0 0 0 0)";
  
  // Get animation properties based on type
  const getAnimationProps = () => {
    const baseProps = {
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier curve for smooth easing
      },
    };

    switch (type) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          ...baseProps,
        };
      case "slide":
        return {
          initial: { 
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0 
          },
          animate: isInView ? { x: 0, y: 0, opacity: 1 } : { 
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0 
          },
          ...baseProps,
        };
      case "zoom":
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 },
          ...baseProps,
        };
      case "reveal":
        return {
          initial: { clipPath: clipPathInitial(), opacity: 0 },
          animate: isInView ? { clipPath: clipPathTarget, opacity: 1 } : { clipPath: clipPathInitial(), opacity: 0 },
          ...baseProps,
        };
      case "flip":
        return {
          initial: { 
            rotateX: direction === "up" || direction === "down" ? 80 : 0,
            rotateY: direction === "left" || direction === "right" ? 80 : 0,
            opacity: 0 
          },
          animate: isInView ? { 
            rotateX: 0, 
            rotateY: 0, 
            opacity: 1 
          } : { 
            rotateX: direction === "up" || direction === "down" ? 80 : 0,
            rotateY: direction === "left" || direction === "right" ? 80 : 0,
            opacity: 0 
          },
          ...baseProps,
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          ...baseProps,
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
} 