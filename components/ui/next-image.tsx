"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ImageProps } from "next/dist/client/legacy/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  className?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  fill?: boolean;
  eager?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  hover?: "none" | "zoom" | "lift" | "brighten";
}

export function NextImage({
  alt,
  src,
  width,
  height,
  className,
  aspectRatio = "auto",
  fill = false,
  eager = false,
  rounded = "none",
  hover = "none",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Define aspect ratio classes
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
  };

  // Define rounded corner classes
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Define hover effect classes
  const hoverClasses = {
    none: "",
    zoom: "hover:scale-105 transition-transform duration-300",
    lift: "hover:-translate-y-2 transition-transform duration-300",
    brighten: "hover:brightness-110 transition-all duration-300",
  };

  return (
    <div
      className={cn(
        "overflow-hidden relative",
        aspectRatioClasses[aspectRatio],
        roundedClasses[rounded],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        loading={eager ? "eager" : "lazy"}
        priority={eager}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-500",
          hoverClasses[hover],
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        sizes={
          fill
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : undefined
        }
        {...props}
      />
      
      {/* Placeholder/Skeleton */}
      <div
        className={cn(
          "absolute inset-0 bg-neutral-200 animate-pulse",
          isLoaded ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500"
        )}
      />
    </div>
  );
} 