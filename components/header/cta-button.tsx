"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CTAButtonProps } from "./types";

export function CTAButton({
  href,
  variant = "primary",
  size = "md",
  children,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link href={href} passHref>
      <motion.button
        className={`
          relative overflow-hidden
          inline-flex items-center justify-center rounded-md
          font-medium tracking-wide
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${sizeClasses[size]}
          ${
            variant === "primary"
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary before:bg-secondary-foreground/10"
              : "bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent before:bg-accent-foreground/10"
          }
          before:absolute before:inset-0 before:translate-y-full before:rounded-md
          before:transition-transform before:duration-300
          hover:before:translate-y-0
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.645, 0.045, 0.355, 1.0],
        }}
      >
        {children}
      </motion.button>
    </Link>
  );
}
