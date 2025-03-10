"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernCardProps {
  title: string
  description?: string
  imageSrc: string
  imageAlt: string
  href: string
  category?: string
  className?: string
  imageClassName?: string
  aspectRatio?: "square" | "video" | "wide" | "portrait"
  size?: "sm" | "md" | "lg"
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
}: ModernCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300",
        isHovered ? "shadow-lg" : "shadow-sm",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={title}>
        <span className="sr-only">{title}</span>
      </Link>

      <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], imageClassName)}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className={cn("object-cover transition-transform duration-500", isHovered ? "scale-105" : "scale-100")}
        />

        {category && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 bg-white">
        <h3
          className={cn(
            "font-medium mb-2 transition-colors duration-300",
            sizeClasses[size],
            isHovered ? "text-primary" : "text-foreground",
          )}
        >
          {title}
        </h3>

        {description && <p className="text-muted-foreground text-sm mb-4">{description}</p>}

        <div className="mt-auto">
          <span
            className={cn(
              "inline-flex items-center text-sm font-medium",
              isHovered ? "text-primary" : "text-foreground",
            )}
          >
            Read more
            <ArrowRight
              size={16}
              className={cn("ml-1 transition-transform duration-300", isHovered ? "translate-x-1" : "")}
            />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

