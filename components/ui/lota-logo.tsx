"use client";

import { imageFallbacks } from "@/lib/image-fallbacks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface LotaLogoProps {
  variant?: "full" | "square" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  darkMode?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  withGlow?: boolean;
  animated?: boolean;
}

/**
 * LOTA Logo Component
 *
 * A flexible component for displaying the LOTA logo throughout the site
 * with different variants, sizes, and styling options.
 */
export function LotaLogo({
  variant = "full",
  size = "md",
  className = "",
  href = "/",
  darkMode = false,
  withBackground = false,
  withBorder = false,
  withGlow = false,
  animated = false,
}: LotaLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine logo source based on variant
  const logoSrc =
    variant === "full" ? imageFallbacks.logo :
    variant === "square" ? imageFallbacks.logoSquare :
    imageFallbacks.logoHorizontal;

  // Determine dimensions based on size
  const dimensions = {
    sm: { width: 100, height: 50, className: "h-8 w-auto" },
    md: { width: 160, height: 80, className: "h-12 w-auto" },
    lg: { width: 200, height: 100, className: "h-16 w-auto" },
    xl: { width: 240, height: 120, className: "h-20 w-auto" },
  };

  const { width, height, className: sizeClassName } = dimensions[size];

  // Wrapper component (Link or div)
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      href={href || "#"}
      className={cn(
        "inline-block relative",
        animated && "transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      {withGlow && (
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-600/20 via-amber-400/10 to-amber-600/20 rounded-full blur-md"></div>
      )}

      <div className={cn(
        "relative",
        withBackground && "p-3 rounded-lg",
        withBackground && (darkMode ? "bg-black/70" : "bg-white/70"),
        withBorder && "border",
        withBorder && (darkMode ? "border-amber-500/30" : "border-amber-600/30"),
        withBackground && "shadow-lg"
      )}>
        <Image
          src={logoSrc}
          alt="LOTA Logo"
          width={width}
          height={height}
          className={cn(
            sizeClassName,
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          priority
        />
      </div>
    </Wrapper>
  );
}
