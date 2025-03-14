"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

export interface AnimatedButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "gradient" | "glass" | "minimal"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  icon?: boolean | React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
  ariaLabel?: string
}

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon = true,
  disabled = false,
  fullWidth = false,
  ariaLabel,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  // Track mouse position for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const baseStyles = cn(
    "relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50",
    disabled && "opacity-60 cursor-not-allowed pointer-events-none",
    fullWidth && "w-full"
  )

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:bg-blue-800 active:text-white",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
    outline: "bg-transparent border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    gradient: "text-white shadow-md hover:shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:shadow-lg hover:bg-white/20",
    minimal: "bg-transparent text-primary hover:bg-accent hover:text-accent-foreground"
  }

  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "px-6 py-3",
    lg: "text-lg px-8 py-4",
    xl: "text-xl px-10 py-5"
  }

  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon === true ? (
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight
              size={size === "sm" ? 16 : size === "lg" ? 20 : size === "xl" ? 24 : 18}
            />
          </motion.div>
        ) : icon}
      </span>
      
      {/* Animated background fill effect */}
      <motion.span
        className={cn(
          "absolute inset-0 z-0 origin-left",
          variant === "primary" ? "bg-blue-800" : 
          variant === "secondary" ? "bg-gray-300" : 
          variant === "gradient" ? "bg-gradient-to-r from-blue-700 to-blue-900" :
          variant === "glass" ? "bg-white/30" : "bg-blue-50"
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Spotlight effect */}
      {(variant === "primary" || variant === "gradient" || variant === "glass") && (
        <motion.span
          className="absolute z-0 h-32 w-32 rounded-full bg-white/20 opacity-0 pointer-events-none"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            opacity: isHovered ? 0.15 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
      
      {/* Border animation for outline variant */}
      {variant === "outline" && (
        <motion.span
          className="absolute inset-0 z-0 rounded-lg border border-blue-700 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  )

  const commonProps = {
    className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseMove: handleMouseMove,
    "aria-disabled": disabled,
    "aria-label": ariaLabel || (typeof children === 'string' ? children : undefined),
  }

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        whileHover={{ y: -2 }}
        whileTap={{ y: 1 }}
        {...commonProps}
      >
        <ButtonContent />
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      disabled={disabled}
      {...commonProps}
    >
      <ButtonContent />
    </motion.button>
  )
}

