"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface SubtleBackgroundProps {
  className?: string;
}

export default function SubtleBackground({ className }: SubtleBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Subtle pattern */}
      <div className="absolute inset-0 subtle-pattern" aria-hidden="true" />
      
      {/* Subtle gradient accents */}
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-white/5 to-transparent blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-gradient-radial from-white/5 to-transparent blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      />
    </div>
  );
} 