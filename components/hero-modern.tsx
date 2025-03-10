"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedButton } from "@/components/ui/animated-button"

interface HeroModernProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  className?: string
}

export function HeroModern({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ctaText = "Learn More",
  ctaHref = "/about",
  secondaryCtaText = "Join Now",
  secondaryCtaHref = "/contact",
  className,
}: HeroModernProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const titleWords = title.split(" ")

  return (
    <div
      ref={ref}
      className={cn("relative h-[90vh] flex items-center overflow-hidden", className)}
      role="banner"
      aria-label="Hero section"
    >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="container-wide relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-wide text-white">
            {isMounted ? (
              <>
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </>
            ) : (
              title
            )}
          </h1>

          {subtitle && (
            <motion.p
              className="text-xl mb-8 text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <AnimatedButton href={ctaHref} variant="primary" size="lg">
              {ctaText}
            </AnimatedButton>

            <AnimatedButton href={secondaryCtaHref} variant="outline" size="lg">
              {secondaryCtaText}
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-8 h-12 border-2 border-white rounded-full flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

