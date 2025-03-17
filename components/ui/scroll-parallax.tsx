"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Parallax speed factor
  direction?: "up" | "down" | "left" | "right";
  fadeOut?: boolean; // Whether to fade out on scroll
  scale?: boolean; // Whether to scale on scroll
  offset?: [string, string]; // Scroll offset
}

/**
 * ScrollParallax Component
 *
 * A reusable component that applies parallax effects to its children based on scroll position.
 *
 * @example
 * <ScrollParallax speed={0.5} direction="up" fadeOut>
 *   <Image src="/image.jpg" alt="Parallax Image" fill />
 * </ScrollParallax>
 */
export function ScrollParallax({
  children,
  className,
  speed = 0.5,
  direction = "up",
  fadeOut = false,
  scale = false,
  offset = ["start start", "end start"],
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Create transform values based on scroll position - always call hooks unconditionally
  const yUpTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const yDownTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
  const xLeftTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const xRightTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5], [1, 1 + (speed * 0.2)]);

  // Determine which transform values to use based on direction
  const yValue = direction === "up" 
    ? yUpTransform 
    : direction === "down" 
    ? yDownTransform 
    : "0%";

  const xValue = direction === "left" 
    ? xLeftTransform 
    : direction === "right" 
    ? xRightTransform 
    : "0%";

  // Use the appropriate opacity and scale values
  const opacityValue = fadeOut ? opacityTransform : 1;
  const scaleValue = scale ? scaleTransform : 1;

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        y: direction === "up" || direction === "down" ? yValue : 0,
        x: direction === "left" || direction === "right" ? xValue : 0,
        opacity: opacityValue,
        scale: scaleValue,
      }}
    >
      {children}
    </motion.div>
  );
}
