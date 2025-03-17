"use client"

import { cn } from "@/lib/utils"
import { imageFallbacks } from "@/lib/image-fallbacks"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ProfessionalImage } from "./professional-image"

export interface ModernCardProps {
  title: string
  description?: string
  imageSrc: string
  imageAlt: string
  href: string
  category?: string
  className?: string
  imageClassName?: string
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "tall"
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "glass" | "gradient" | "bordered" | "minimal" | "elevated"
  featured?: boolean
  target?: "_blank" | "_self"
  priority?: boolean
}

export function ModernCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  category,
  className,
  imageClassName,
  aspectRatio = "video",
  size = "md",
  variant = "default",
  featured = false,
  target,
  priority = false,
}: ModernCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position tracking for 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Calculate mouse position relative to card (0-1)
    const x = (e.clientX - rect.left) / width
    const y = (e.clientY - rect.top) / height
    
    // Update mouse position
    setMousePosition({ 
      x: (x - 0.5) * 10, // -5 to 5 for rotation
      y: (y - 0.5) * 10  // -5 to 5 for rotation
    })
  }

  const resetMousePosition = () => {
    // Reset to center
    setMousePosition({ x: 0, y: 0 })
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    tall: "aspect-[9/16]",
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }
  
  const variantStyles = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
    gradient: "bg-gradient-to-br from-black to-gray-700 text-white",
    bordered: "bg-white dark:bg-gray-900 border-2 border-black dark:border-white",
    minimal: "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900",
    elevated: "bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl",
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300",
        variantStyles[variant],
        featured && "md:col-span-2 md:row-span-2",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        resetMousePosition()
      }}
      onMouseMove={handleMouseMove}
      style={{
        perspective: 1000,
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* 3D rotation container */}
      <motion.div
        className="relative flex flex-col h-full"
        style={{
          rotateX: variant !== "minimal" ? mousePosition.y : 0,
          rotateY: variant !== "minimal" ? mousePosition.x : 0,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* Spotlight overlay */}
        {(variant === "glass" || variant === "gradient" || variant === "elevated") && (
          <div 
            className={cn(
              "absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
            style={{ 
              background: `radial-gradient(
                250px circle at ${mousePosition.x * 10 + 50}% ${mousePosition.y * 10 + 50}%,
                rgba(255, 255, 255, 0.15),
                transparent 80%
              )`
            }}
          />
        )}

        <Link href={href} className="absolute inset-0 z-20" aria-label={title} target={target}>
          <span className="sr-only">{title}</span>
        </Link>

        <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], imageClassName)}>
          <ProfessionalImage
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "scale-110" : "scale-100",
              variant === "glass" && "opacity-80"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            gradientOverlay={variant === "gradient"}
            noiseTexture={true}
            decorativeBorder={variant === "bordered"}
            variant={variant === "bordered" ? "bordered" : "default"}
          />

          {/* Image overlay gradient */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )} />

          {category && (
            <div className="absolute top-4 left-4 z-20">
              <motion.span 
                className="inline-block bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {category}
              </motion.span>
            </div>
          )}
        </div>

        <div className={cn(
          "flex flex-col flex-grow p-5",
          variant === "glass" || variant === "gradient" ? "text-white" : "text-foreground"
        )}>
          <motion.h3
            className={cn(
              "font-semibold mb-2 transition-colors duration-300",
              sizeClasses[size],
              isHovered ? "text-primary" : "text-foreground",
              (variant === "glass" || variant === "gradient") && "text-white"
            )}
            style={{ transform: "translateZ(10px)" }}
          >
            {title}
          </motion.h3>

          {description && (
            <motion.p 
              className={cn(
                "text-sm mb-4",
                variant === "glass" || variant === "gradient" ? "text-white/80" : "text-muted-foreground"
              )}
              style={{ transform: "translateZ(5px)" }}
            >
              {description}
            </motion.p>
          )}

          <div className="mt-auto">
            <motion.span
              className={cn(
                "inline-flex items-center text-sm font-medium",
                isHovered ? "text-primary" : "text-foreground",
                (variant === "glass" || variant === "gradient") && "text-white"
              )}
              style={{ transform: "translateZ(15px)" }}
            >
              Read more
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {target === "_blank" ? (
                  <ExternalLink size={16} className="ml-1.5" />
                ) : (
                  <ArrowRight size={16} className="ml-1.5" />
                )}
              </motion.span>
            </motion.span>
          </div>
        </div>
        
        {/* Border highlight effect for bordered variant */}
        {variant === "bordered" && (
          <motion.div 
            className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

