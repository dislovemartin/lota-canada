"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfessionalImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  variant?: "gradient" | "bordered" | "shadow" | "default";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  decorativeBorder?: boolean;
  gradientOverlay?: boolean;
  noiseTexture?: boolean;
}

/**
 * Professional Image component with consistent styling and fallback handling
 * Supports various decorative elements like gradients, borders, and noise textures
 * to maintain the business-formal aesthetic across the site
 */
export function ProfessionalImage({
  src,
  alt,
  fallbackSrc = "/images/placeholder-professional.jpg",
  width,
  height,
  fill = false,
  className = "",
  containerClassName = "",
  priority = false,
  quality = 85,
  sizes,
  variant = "default",
  objectFit = "cover",
  decorativeBorder = false,
  gradientOverlay = false,
  noiseTexture = false,
}: ProfessionalImageProps) {
  const [error, setError] = useState(false);
  const actualSrc = error || !src || src.includes("placeholder.svg") ? fallbackSrc : src;
  
  // Determine if we should use a category-based fallback
  const useCategoryFallback = actualSrc === fallbackSrc && alt.toLowerCase().includes("leadership");
  const finalSrc = useCategoryFallback ? "/images/hero/diverse-professionals.jpg" : actualSrc;
  
  // Generate variant-specific styling
  const variantStyles = {
    default: "",
    gradient: "rounded-lg overflow-hidden",
    bordered: "rounded-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden",
    shadow: "rounded-lg shadow-lg overflow-hidden",
  };

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  return (
    <div
      className={cn(
        "relative",
        variantStyles[variant],
        containerClassName,
        decorativeBorder && "p-1 border border-gray-200 dark:border-gray-800"
      )}
      style={{
        width: fill ? "100%" : width,
        height: fill ? "100%" : height,
      }}
    >
      {/* Main image */}
      <Image
        src={finalSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(objectFitClass[objectFit], "z-10", className)}
        onError={() => setError(true)}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
      
      {/* Gradient overlay for improved text contrast and business-formal aesthetic */}
      {gradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20 pointer-events-none" />
      )}
      
      {/* Noise texture overlay for depth and sophistication */}
      {noiseTexture && (
        <div 
          className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay z-30 pointer-events-none" 
        />
      )}
      
      {/* Decorative corner elements for business-formal look */}
      {decorativeBorder && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-300 dark:border-gray-700 rounded-tl-sm z-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-300 dark:border-gray-700 rounded-tr-sm z-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gray-300 dark:border-gray-700 rounded-bl-sm z-40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-300 dark:border-gray-700 rounded-br-sm z-40 pointer-events-none" />
        </>
      )}
    </div>
  );
}
