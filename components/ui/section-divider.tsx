"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  width?: "narrow" | "medium" | "wide" | "full"
  color?: "primary" | "secondary" | "accent"
}

export function SectionDivider({ className, width = "medium", color = "primary" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const widthClasses = {
    narrow: "max-w-xs",
    medium: "max-w-md",
    wide: "max-w-xl",
    full: "w-full",
  }

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-black",
  }

  return (
    <div ref={ref} className={cn("flex items-center justify-center py-8", className)}>
      <motion.div
        className={cn("h-px", widthClasses[width], colorClasses[color])}
        initial={{ width: 0 }}
        animate={{ width: isInView ? "100%" : 0 }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </div>
  )
}

