"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  glareColor?: string;
  borderColor?: string;
  intensity?: number;
  glare?: boolean;
  rounded?: string;
  shadow?: string;
  border?: boolean;
  borderWidth?: string;
  perspective?: number;
  hoverScale?: number;
  clickEffect?: boolean;
}

export function InteractiveCard({
  children,
  className,
  bgColor = "bg-white dark:bg-gray-900",
  glareColor = "rgba(255, 255, 255, 0.4)",
  borderColor = "border-gray-200 dark:border-gray-800",
  intensity = 15,
  glare = true,
  rounded = "rounded-xl",
  shadow = "shadow-lg",
  border = true,
  borderWidth = "border",
  perspective = 800,
  hoverScale = 1.02,
  clickEffect = true,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics to make the movement smoother
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  // Transform values for the glare effect
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "120%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "120%"]);
  const glareOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.4]);

  // Handle mouse interactions
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized mouse position between -0.5 and 0.5
    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-all", 
        bgColor,
        rounded,
        shadow,
        border && borderWidth,
        border && borderColor,
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: `${perspective}px`,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? (isPressed ? 0.98 : hoverScale) : 1,
      }}
      whileTap={{ scale: clickEffect ? 0.98 : 1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Card Content */}
      <div 
        className="relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>

      {/* Glare Effect */}
      {glare && isHovered && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 80%)`,
            opacity: glareOpacity,
            mixBlendMode: "overlay"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Animated border/highlight effect */}
      {border && (
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 z-0 pointer-events-none",
            "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          )}
          style={{
            opacity: isHovered ? 0.2 : 0,
          }}
        />
      )}
    </motion.div>
  );
} 