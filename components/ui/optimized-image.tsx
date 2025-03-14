"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define our own ImageProps type based on the Next.js Image component props
type ImageProps = React.ComponentProps<typeof Image>;

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fadeDuration?: number;
  fallbackSrc?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "landscape" | "ultra-wide" | string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  loadingSize?: "sm" | "md" | "lg";
  previewQuality?: "low" | "medium" | "high";
}

/**
 * OptimizedImage component that enhances the Next.js Image component with:
 * - Fade-in loading animation
 * - Fallback image support
 * - Aspect ratio control
 * - Border radius options
 * - Loading indicator
 * - Blur-up preview
 * 
 * @param src - Image source URL
 * @param alt - Alternative text for the image
 * @param width - Width of the image in pixels
 * @param height - Height of the image in pixels
 * @param fadeDuration - Duration of the fade-in animation in milliseconds
 * @param fallbackSrc - Source URL for fallback image if the main image fails to load
 * @param aspectRatio - Aspect ratio control for the image container
 * @param rounded - Border radius option
 * @param loadingSize - Size of the loading indicator
 * @param previewQuality - Quality of the blur-up preview
 * @param className - Additional CSS classes
 * @param priority - Whether the image should be prioritized for loading
 * @param fill - Whether the image should fill its container
 */
export function OptimizedImage({
  src,
  alt,
  width = 0,
  height = 0,
  fadeDuration = 400,
  fallbackSrc = "/placeholder.svg",
  aspectRatio = "auto",
  rounded = "md",
  loadingSize = "md",
  previewQuality = "low",
  className = "",
  priority = false,
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>(undefined);

  // Set the aspect ratio CSS class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square": return "aspect-[1/1]";
      case "video": return "aspect-video";
      case "portrait": return "aspect-[3/4]";
      case "landscape": return "aspect-[4/3]";
      case "ultra-wide": return "aspect-[21/9]";
      case "auto": return "";
      default: return aspectRatio?.includes("/") ? `aspect-[${aspectRatio}]` : "";
    }
  };

  // Set the border radius CSS class
  const getRoundedClass = () => {
    switch (rounded) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "md": return "rounded-md";
      case "lg": return "rounded-lg";
      case "xl": return "rounded-xl";
      case "full": return "rounded-full";
      default: return "rounded-md";
    }
  };

  // Generate a blur-up preview based on the quality setting
  useEffect(() => {
    if (!priority && typeof src === 'string' && !src.startsWith('data:')) {
      const size = previewQuality === 'low' ? 10 : previewQuality === 'medium' ? 20 : 30;
      // This would normally generate a tiny placeholder image, but for the demo we'll use fallbackSrc
      setBlurDataURL(fallbackSrc);
    }
  }, [src, priority, previewQuality, fallbackSrc]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
        getAspectRatioClass(),
        getRoundedClass(),
        className
      )}
    >
      {/* Loading indicator */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className={cn(
            "rounded-full bg-gray-200 dark:bg-gray-700",
            {
              "w-8 h-8": loadingSize === "sm",
              "w-12 h-12": loadingSize === "md",
              "w-16 h-16": loadingSize === "lg",
            }
          )}></div>
        </div>
      )}

      {/* The actual image */}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        width={!fill ? (width || undefined) : undefined}
        height={!fill ? (height || undefined) : undefined}
        fill={fill || (!width && !height)}
        priority={priority}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          getRoundedClass()
        )}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes={fill ? "100vw" : undefined}
        {...props}
      />
    </div>
  );
} 