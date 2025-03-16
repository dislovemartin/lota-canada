"use client";

import { getOptimalImageFormat } from "@/lib/performance";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  quality?: number;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  loading = "lazy",
  quality = 75,
  fill = false,
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "empty",
  blurDataURL,
  unoptimized = false,
  onLoad,
  onError,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [format, setFormat] = useState<'webp' | 'jpg'>('webp');
  
  // Determine optimal image format based on browser support
  useEffect(() => {
    getOptimalImageFormat().then(setFormat);
  }, []);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    // Extract base path and extension from src
    const basePath = src.substring(0, src.lastIndexOf('.')) || src;
    
    // Define available sizes
    const availableSizes = [320, 640, 960, 1280, 1920];
    
    // Generate srcset string
    return availableSizes
      .map(size => `${basePath}-${size}.${format} ${size}w`)
      .join(', ');
  };

  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        quality={quality}
        fill={fill}
        style={{
          objectFit,
          objectPosition,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        unoptimized={unoptimized}
        onLoad={handleLoad}
        onError={onError}
      />
      
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-neutral-200 animate-pulse"
          style={{
            opacity: isLoaded ? 0 : 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}
    </div>
  );
} 