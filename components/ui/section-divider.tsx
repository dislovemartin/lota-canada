"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle" | "triangle" | "zigzag" | "dotted";
  color?: "primary" | "accent" | "muted" | "default";
  height?: "xs" | "sm" | "md" | "lg";
  flip?: boolean;
  animated?: boolean;
  className?: string;
}

export function SectionDivider({
  variant = "curve",
  color = "muted",
  height = "md",
  flip = false,
  animated = true,
  className,
}: SectionDividerProps) {
  const heightClasses = {
    xs: "h-12",
    sm: "h-16",
    md: "h-24",
    lg: "h-36",
  };

  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    muted: "text-muted-foreground",
    default: "text-background dark:text-background",
  };

  // Animation variants
  const waveAnimation = {
    initial: { pathLength: 0, pathOffset: 1 },
    animate: {
      pathLength: 1,
      pathOffset: 0,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const renderDivider = () => {
    switch (variant) {
      case "wave":
        return (
          <div className="relative h-full w-full">
            {/* LOTA emblem in the center of the wave for brand reinforcement */}
            <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ transform: flip ? "translate(-50%, 75%) rotate(180deg)" : "translate(-50%, -50%)" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg relative z-10 group hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">LOTA</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors duration-300"></div>
              </div>
            </div>
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
              style={{ transform: flip ? "rotate(180deg)" : "none" }}
            >
              {animated ? (
                <motion.path
                  initial="initial"
                  animate="animate"
                  variants={waveAnimation}
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  fill="currentColor"
                />
              )}
              
              {animated ? (
                <motion.path
                  initial="initial"
                  animate="animate"
                  variants={waveAnimation}
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  fill="currentColor"
                />
              )}
              
              {animated ? (
                <motion.path
                  initial="initial"
                  animate="animate"
                  variants={waveAnimation}
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="currentColor"
                />
              )}
            </svg>
          </div>
        );
      
      case "curve":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            {animated ? (
              <motion.path
                initial="initial"
                animate="animate"
                variants={waveAnimation}
                d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
                fill="currentColor"
              />
            ) : (
              <path
                d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
                fill="currentColor"
              />
            )}
          </svg>
        );
      
      case "angle":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            {animated ? (
              <motion.path
                initial="initial"
                animate="animate"
                variants={waveAnimation}
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                fill="currentColor"
              />
            ) : (
              <path
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                fill="currentColor"
              />
            )}
          </svg>
        );
      
      case "triangle":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            {animated ? (
              <motion.path
                initial="initial"
                animate="animate"
                variants={waveAnimation}
                d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
                fill="currentColor"
              />
            ) : (
              <path
                d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
                fill="currentColor"
              />
            )}
          </svg>
        );
        
      case "zigzag":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            {animated ? (
              <motion.path
                initial="initial"
                animate="animate"
                variants={waveAnimation}
                d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
                fill="currentColor"
              />
            ) : (
              <path
                d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
                fill="currentColor"
              />
            )}
          </svg>
        );
        
      case "dotted":
        return (
          <div
            className={cn(
              "absolute inset-0 w-full h-full flex items-end justify-around overflow-hidden",
              colorClasses[color]
            )}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-current"
                initial={
                  animated
                    ? { opacity: 0, y: 20 }
                    : { opacity: 1, y: 0 }
                }
                animate={
                  animated
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: animated ? i * 0.05 : 0,
                }}
                style={{
                  marginBottom: `${Math.sin(i / 2) * 40}px`,
                }}
              />
            ))}
          </div>
        );

      default:
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 w-full h-full", colorClasses[color])}
            style={{ transform: flip ? "rotate(180deg)" : "none" }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        );
    }
  };

  // Return the divider wrapped in a container div
  return (
    <div className={cn("relative w-full overflow-hidden", heightClasses[height], className)}>
      {/* Add decorative LOTA emblem to the divider for non-wave variants */}
      {variant !== "wave" && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border-2 border-white/20 group hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">LOTA</span>
            <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-white/50 transition-colors duration-300"></div>
          </div>
        </div>
      )}
      
      {/* Add subtle horizontal lines for better section separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 dark:via-blue-700/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 dark:via-blue-700/30 to-transparent" />
      
      {renderDivider()}
    </div>
  );
}
