"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  company?: string
  avatarSrc?: string
  className?: string
  variant?: "default" | "minimal" | "gradient" | "bordered" | "glass"
  size?: "sm" | "md" | "lg"
  rating?: 1 | 2 | 3 | 4 | 5
  featured?: boolean
  animated?: boolean
  delay?: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarSrc,
  className,
  variant = "default",
  size = "md",
  rating,
  featured = false,
  animated = true,
  delay = 0,
}: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variantStyles = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md",
    minimal: "bg-transparent",
    gradient: "bg-gradient-to-br from-blue-600 to-blue-800 text-white",
    bordered: "bg-white dark:bg-gray-900 border-2 border-blue-700 dark:border-blue-500",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
  }

  const sizeStyles = {
    sm: "p-4 text-sm",
    md: "p-6 text-base",
    lg: "p-8 text-lg",
  }

  const quoteStyles = {
    default: "text-gray-800 dark:text-gray-200",
    minimal: "text-gray-800 dark:text-gray-200",
    gradient: "text-white",
    bordered: "text-gray-800 dark:text-gray-200",
    glass: "text-white",
  }

  const authorStyles = {
    default: "text-gray-900 dark:text-white font-semibold",
    minimal: "text-gray-900 dark:text-white font-semibold",
    gradient: "text-white font-semibold",
    bordered: "text-gray-900 dark:text-white font-semibold",
    glass: "text-white font-semibold",
  }

  const roleStyles = {
    default: "text-gray-700 dark:text-gray-300",
    minimal: "text-gray-700 dark:text-gray-300",
    gradient: "text-white/90",
    bordered: "text-gray-700 dark:text-gray-300",
    glass: "text-white/90",
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-xl overflow-hidden",
        variantStyles[variant],
        sizeStyles[size],
        featured && "md:col-span-2",
        className
      )}
      initial={animated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      {/* Decorative elements for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-white/10 blur-xl" />
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
      )}
      
      {/* Decorative elements for glass variant */}
      {variant === "glass" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
      )}
      
      <div className="relative z-10">
        {/* Quote icon */}
        <motion.div
          className={cn(
            "mb-4",
            variant === "gradient" || variant === "glass" ? "text-white/80" : "text-blue-700"
          )}
          initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={animated && isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          <Quote size={32} />
        </motion.div>
        
        {/* Quote text */}
        <motion.blockquote
          className={cn(
            "mb-6 font-medium leading-relaxed",
            quoteStyles[variant]
          )}
          initial={animated ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          "{quote}"
        </motion.blockquote>
        
        {/* Rating stars if provided */}
        {rating && (
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < rating ? "currentColor" : "none"}
                stroke={i < rating ? "none" : "currentColor"}
                className={cn(
                  "w-5 h-5 mr-1",
                  i < rating 
                    ? variant === "gradient" || variant === "glass" 
                      ? "text-white" 
                      : "text-blue-500" 
                    : variant === "gradient" || variant === "glass" 
                      ? "text-white/30" 
                      : "text-gray-300"
                )}
                initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={animated && isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: delay + 0.2 + i * 0.05 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </motion.svg>
            ))}
          </div>
        )}
        
        {/* Author info */}
        <div className="flex items-center">
          {avatarSrc && (
            <motion.div
              className="mr-4 relative"
              initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              animate={animated && isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.3 }}
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={avatarSrc}
                  alt={author}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
          
          <div>
            <motion.p
              className={authorStyles[variant]}
              initial={animated ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
              animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.4 }}
            >
              {author}
            </motion.p>
            
            {(role || company) && (
              <motion.p
                className={roleStyles[variant]}
                initial={animated ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
                animate={animated && isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: delay + 0.5 }}
              >
                {role && company ? `${role}, ${company}` : role || company}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

