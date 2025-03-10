"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface AnimatedStatsProps {
  stats: Stat[]
  className?: string
  columns?: 2 | 3 | 4
  variant?: "default" | "card" | "minimal"
}

export function AnimatedStats({ stats, className, columns = 4, variant = "default" }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  }

  const variantClasses = {
    default: "",
    card: "bg-white shadow-md rounded-lg p-8",
    minimal: "border-t border-b py-12",
  }

  return (
    <div ref={ref} className={cn("w-full", variantClasses[variant], className)}>
      <div className={cn("grid gap-8", columnClasses[columns])}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <CountUp
                from={0}
                to={stat.value}
                duration={2}
                isInView={hasAnimated}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <div className="text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface CountUpProps {
  from: number
  to: number
  duration: number
  isInView: boolean
  prefix?: string
  suffix?: string
}

function CountUp({ from, to, duration, isInView, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * (to - from) + from))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [from, to, duration, isInView])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

