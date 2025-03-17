"use client";

import { getFallbackImage, imageFallbacks } from "@/lib/image-fallbacks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageManagerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fallbackType?: keyof typeof imageFallbacks;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: boolean;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "landscape";
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  loading?: "eager" | "lazy";
}

/**
 * ImageManager component
 *
 * A comprehensive image management component that:
 * - Handles image loading and errors
 * - Provides fallbacks for missing images
 * - Optimizes images for performance
 * - Supports various styling options
 * - Prevents duplicate images
 */
export function ImageManager({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  quality = 80,
  sizes,
  fallbackType = "default",
  objectFit = "cover",
  rounded = false,
  aspectRatio = "auto",
  overlay = false,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  overlayOpacity = 0.4,
  loading = "lazy",
}: ImageManagerProps) {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Check if the image is a duplicate of another commonly used image
  useEffect(() => {
    // If there's an error or the src is empty, use the fallback
    if (error || !src) {
      setImageSrc(getFallbackImage(fallbackType, alt));
      return;
    }

    // Check if the image is a duplicate
    const isDuplicate =
      src === imageFallbacks.hero ||
      src === imageFallbacks.header ||
      src === imageFallbacks.default;

    // If it's a duplicate, try to find a better image based on the alt text
    if (isDuplicate) {
      setImageSrc(getFallbackImage(fallbackType, alt));
    } else {
      setImageSrc(src);
    }
  }, [src, alt, error, fallbackType]);

  // Handle aspect ratio
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      default:
        return "";
    }
  };

  // Handle object fit
  const getObjectFitClass = () => {
    switch (objectFit) {
      case "cover":
        return "object-cover";
      case "contain":
        return "object-contain";
      case "fill":
        return "object-fill";
      case "none":
        return "object-none";
      case "scale-down":
        return "object-scale-down";
      default:
        return "object-cover";
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        getAspectRatioClass(),
        rounded && "rounded-lg",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={loading}
        className={cn(getObjectFitClass())}
        onError={() => setError(true)}
      />

      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}
    </div>
  );
}
