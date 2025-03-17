"use client";

import { cn } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Intensity of the parallax effect
  inverted?: boolean; // Whether to invert the direction
  disabled?: boolean; // Whether to disable the effect
}

/**
 * MouseParallax Component
 *
 * A reusable component that applies parallax effects to its children based on mouse position.
 *
 * @example
 * <MouseParallax intensity={20}>
 *   <div className="w-64 h-64 bg-blue-500 rounded-lg" />
 * </MouseParallax>
 */
export function MouseParallax({
  children,
  className,
  intensity = 10,
  inverted = false,
  disabled = false,
}: MouseParallaxProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled]);

  // Create transform values based on mouse position
  const factor = inverted ? 1 : -1;
  const xValue = useTransform(() => mousePosition.x * intensity * factor);
  const yValue = useTransform(() => mousePosition.y * intensity * factor);

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        x: disabled ? 0 : xValue,
        y: disabled ? 0 : yValue,
        transition: { type: "spring", damping: 15, stiffness: 150 },
      }}
    >
      {children}
    </motion.div>
  );
}
