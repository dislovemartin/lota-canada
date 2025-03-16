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
  glareColor = "rgba(255, 255, 255, 0.5)", // Increased glare intensity for more professional look
  borderColor = "border-blue-100 dark:border-blue-900", // More refined border color
  intensity = 12, // Slightly reduced for more subtle, professional movement
  glare = true,
  rounded = "rounded-xl",
  shadow = "shadow-lg hover:shadow-xl", // Enhanced shadow on hover
  border = true,
  borderWidth = "border",
  perspective = 800,
  hoverScale = 1.015, // More subtle scale for professional look
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
        transition: "box-shadow 0.3s ease-in-out", // Smooth shadow transition
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
        {/* Decorative accent line at top */}
        <div className="absolute top-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {children}
        {/* Decorative accent line at bottom */}
        <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Glare Effect - Enhanced for more professional look */}
      {glare && isHovered && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 70%)`, // Tighter gradient for more refined look
            opacity: glareOpacity,
            mixBlendMode: "overlay"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Smoother transition
        />
      )}
      
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

      {/* Animated border/highlight effect - Enhanced for business-formal aesthetic */}
      {border && (
        <>
          <motion.div
            className={cn(
              "absolute inset-0 opacity-0 z-0 pointer-events-none",
              "bg-gradient-to-br from-blue-600/20 via-blue-400/15 to-blue-800/20" // More professional gradient
            )}
            style={{
              opacity: isHovered ? 0.25 : 0,
              transition: "opacity 0.3s ease-in-out"
            }}
          />
          
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/30 opacity-0 transform -translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 rounded-tl-sm"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/30 opacity-0 transform translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 rounded-tr-sm"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/30 opacity-0 transform -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 rounded-bl-sm"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/30 opacity-0 transform translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 rounded-br-sm"></div>
        </>
      )}
    </motion.div>
  );
} 