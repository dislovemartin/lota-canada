"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface ParallaxBackgroundProps {
  className?: string;
  pattern?: "dots" | "grid" | "waves" | "noise" | "circles" | "gradient";
  intensity?: number;
  color1?: string;
  color2?: string;
  interactive?: boolean;
}

// Create a client-only version of the component to avoid hydration mismatches
const ParallaxBackgroundClient = dynamic(() => Promise.resolve(ParallaxBackgroundBase), { ssr: false });

// Export the client-only version as the main component
export function ParallaxBackground(props: ParallaxBackgroundProps) {
  // Initial render placeholder (server-side and during hydration)
  return <ParallaxBackgroundClient {...props} />;
}

// Base component implementation that will only run on the client
function ParallaxBackgroundBase({
  className,
  pattern = "grid",
  intensity = 1,
  color1 = "#000000", // black
  color2 = "#4B5563", // gray-600
  interactive = true,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Create parallax effect transforms for different elements
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Generate particle elements based on the pattern
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const count = pattern === "dots" ? 50 : pattern === "grid" ? 100 : 20;

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 15 + 10;
        const opacity = Math.random() * 0.5 + 0.1;

        newParticles.push(
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full",
              pattern === "grid" ? "bg-white/20" : "bg-white/30"
            )}
            style={{
              width: size + "px",
              height: size + "px",
              left: x + "%",
              top: y + "%",
              opacity: opacity,
              x: interactive ? mousePosition.x * intensity * -30 * (1 + i % 3) : 0,
              y: interactive ? mousePosition.y * intensity * -30 * (1 + i % 3) : 0,
            }}
            animate={{
              y: interactive ? undefined : [0, -20, 0],
              x: interactive ? undefined : [0, 10, 0],
              opacity: [opacity, opacity + 0.1, opacity]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        );
      }
      return newParticles;
    };

    setParticles(generateParticles());
  }, [pattern, interactive, intensity, mousePosition]);

  // Render wave pattern
  const renderWaves = () => {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z"
          fill={color1}
          initial={{ y: 0 }}
          animate={{ y: [-5, 0, -5] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            x: interactive ? mousePosition.x * intensity * -20 : 0,
            y: interactive ? mousePosition.y * intensity * -20 : 0
          }}
        />
        <motion.path
          d="M0,65 C25,55 50,75 75,65 C100,55 100,65 100,65 L100,100 L0,100 Z"
          fill={color2}
          initial={{ y: 0 }}
          animate={{ y: [-7, 0, -7] }}
          transition={{ duration: 12, repeat: Infinity, delay: 0.5 }}
          style={{
            x: interactive ? mousePosition.x * intensity * -30 : 0,
            y: interactive ? mousePosition.y * intensity * -30 : 0
          }}
        />
      </svg>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Base gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/10 to-gray-500/20"
        style={{
          scale,
          opacity,
          backgroundImage: pattern === "gradient" 
            ? `linear-gradient(to bottom right, ${color1}10, ${color2}20)` 
            : undefined,
          x: interactive ? mousePosition.x * intensity * -10 : 0,
          y: interactive ? mousePosition.y * intensity * -10 : 0
        }}
      />

      {/* Pattern overlay */}
      {pattern === "waves" && renderWaves()}
      
      {pattern === "noise" && (
        <motion.div 
          className="absolute inset-0 bg-[url('/images/noise.png')] opacity-30 mix-blend-overlay"
          style={{
            x: interactive ? mousePosition.x * intensity * -20 : 0,
            y: interactive ? mousePosition.y * intensity * -20 : 0
          }}
        />
      )}

      {(pattern === "dots" || pattern === "grid" || pattern === "circles") && (
        <div className="absolute inset-0">
          {particles}
        </div>
      )}
      
      {/* Advanced parallax effect with floating shapes */}
      <motion.div 
        className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-black/10 blur-3xl"
        style={{
          x: interactive ? mousePosition.x * intensity * -30 : 0,
          y: interactive ? mousePosition.y * intensity * -30 : 0
        }}
        animate={{
          x: interactive ? undefined : [0, 20, 0],
          y: interactive ? undefined : [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute top-[60%] -right-[5%] w-[25%] h-[25%] rounded-full bg-purple-500/10 blur-3xl"
        style={{
          x: interactive ? mousePosition.x * intensity * -40 : 0,
          y: interactive ? mousePosition.y * intensity * -40 : 0
        }}
        animate={{
          x: interactive ? undefined : [0, -20, 0],
          y: interactive ? undefined : [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
} 