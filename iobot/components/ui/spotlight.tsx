"use client";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SpotlightProps {
  children?: ReactNode;
  className?: string;
  size?: number;
  fill?: string;
}

export function Spotlight({
  children,
  className,
  size = 400,
  fill = "rgba(255,255,255,0.1)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseXSpring = useSpring(0);
  const mouseYSpring = useSpring(0);

  const spotlightX = useTransform(mouseXSpring, [-1, 1], [0, size]);
  const spotlightY = useTransform(mouseYSpring, [-1, 1], [0, size]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    mouseXSpring.set(normalizedX);
    mouseYSpring.set(normalizedY);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(${size}px circle at ${spotlightX}px ${spotlightY}px, 
            ${fill}, transparent 80%)`,
        }}
      />
    </motion.div>
  );
}
