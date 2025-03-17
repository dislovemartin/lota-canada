"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ImageProps } from "next/dist/client/legacy/image";
import { useEffect, useState } from "react";

/**
 * OptimizedImage component for performance-optimized image rendering
 *
 * Performance optimizations:
 * - Sets proper width and height attributes to prevent layout shifts
 * - Uses priority loading for above-the-fold images
 * - Implements responsive sizes for different viewports
 * - Sets explicit quality for better performance/quality balance
 */
export interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
}

// Helper function to get default dimensions for specific images
const getDefaultDimensions = (src: string): { width: number; height: number } | null => {
  // Map of image paths to their dimensions
  const imageDimensions: Record<string, { width: number; height: number }> = {
    '/images/programs/community-education.jpg': { width: 800, height: 600 },
    '/images/hero/image-asset2.jpeg': { width: 1200, height: 800 },
    '/images/hero/image-asset3.jpeg': { width: 1200, height: 800 },
    '/images/hero/image-asset4.jpeg': { width: 1200, height: 800 },
    '/images/project-management/avatar-1.jpg': { width: 200, height: 200 },
    '/images/project-management/avatar-2.jpg': { width: 200, height: 200 },
    '/images/project-management/avatar-3.jpg': { width: 200, height: 200 },
  };

  // Check if the src contains any of the keys in imageDimensions
  for (const path in imageDimensions) {
    if (src.includes(path)) {
      return imageDimensions[path];
    }
  }

  return null;
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get default dimensions if available for this image
  const defaultDimensions = getDefaultDimensions(src.toString());

  // Use provided dimensions or fall back to defaults if available
  const finalWidth = width || (defaultDimensions?.width || (fill ? undefined : 1200));
  const finalHeight = height || (defaultDimensions?.height || (fill ? undefined : 800));

  // Only log warning in development environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && fill) {
      if (!style || (!style.width && !style.height)) {
        console.warn('OptimizedImage: When using fill, parent element must have position relative and defined dimensions');
      }
    }
  }, [fill, style]);

  // Create a wrapper div with position relative when using fill
  if (fill) {
    return (
      <div className={cn("relative", className)} style={{ width: '100%', height: '100%', ...style }}>
        <Image
          src={src}
          alt={alt}
          fill={true}
          className={cn(isLoaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-500')}
          priority={priority}
          quality={quality}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      </div>
    );
  }

  // Regular image without fill
  return (
    <Image
      src={src}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      className={cn(className, isLoaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-500')}
      priority={priority}
      quality={quality}
      sizes={sizes}
      style={style}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
