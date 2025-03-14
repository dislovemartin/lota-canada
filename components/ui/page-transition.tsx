"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "scale" | "none";
}

/**
 * PageTransition component that provides smooth transitions between pages
 * 
 * @param children - The content to be wrapped with the transition effect
 * @param className - Additional CSS classes to apply
 * @param variant - The type of transition effect (fade, slide, scale, or none)
 */
export function PageTransition({ 
  children, 
  className = "", 
  variant = "fade" 
}: PageTransitionProps) {
  // Define animation variants
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -15 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
    },
    none: {
      hidden: {},
      visible: {},
      exit: {},
    },
  };

  // Skip animation if variant is "none"
  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants[variant]}
      transition={{
        type: "tween",
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 