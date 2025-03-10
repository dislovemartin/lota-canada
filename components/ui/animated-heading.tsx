"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
  subtitleClassName?: string
  size?: "sm" | "md" | "lg" | "xl"
  underline?: boolean
}

export function AnimatedHeading({
  title,
  subtitle,
  align = "left",
  className,
  subtitleClassName,
  size = "md",
  underline = false,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
  }

  return (
    <div ref={ref} className={cn("mb-8", alignClasses[align], className)}>
      <h2 className={cn("font-bold tracking-tight", sizeClasses[size])}>
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {title}
        </motion.span>

        {underline && (
          <motion.span
            className="block h-1 bg-primary mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: align === "center" ? "80px" : "40px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}
          />
        )}
      </h2>

      {subtitle && (
        <motion.p
          className={cn("text-muted-foreground mt-4", subtitleClassName)}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

