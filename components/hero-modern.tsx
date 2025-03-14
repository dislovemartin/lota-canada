"use client"
import { AnimatedButton } from "@/components/ui/animated-button"
import { LiquidText } from "@/components/ui/liquid-text"
import { ParallaxBackground } from "@/components/ui/parallax-background"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
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
  showLogo?: boolean
  overlayOpacity?: number
  variant?: "default" | "gradient" | "minimal" | "pattern" | "video" | "parallax" | "webgl"
  height?: "full" | "large" | "medium" | "small"
  titleAnimation?: "words" | "chars" | "fade" | "slide" | "liquid" | "bounce" | "wave" | "reveal" | "gradient"
  videoSrc?: string
  pattern?: "dots" | "grid" | "waves" | "noise" | "circles" | "gradient"
  textColor?: string
  hoverColor?: string
}
export function HeroModern({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ctaText = "Explore Programs",
  ctaHref = "/programs",
  secondaryCtaText = "Contact Us",
  secondaryCtaHref = "/contact",
  className,
  showLogo = true,
  overlayOpacity = 0.65,
  variant = "default",
  height = "full",
  titleAnimation = "words",
  videoSrc,
  pattern = "grid",
  textColor = "text-white",
  hoverColor = "text-blue-300",
}: HeroModernProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) - 0.5
      const y = (clientY / window.innerHeight) - 0.5
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const titleWords = title.split(" ")
  const titleChars = title.split("")
  // Parallax effect for mouse movement
  const imageX = useTransform(() => mousePosition.x * -20)
  const imageY = useTransform(() => mousePosition.y * -20)
  const contentX = useTransform(() => mousePosition.x * 10)
  const contentY = useTransform(() => mousePosition.y * 10)
  const heightClasses = {
    full: "h-screen",
    large: "h-[85vh]",
    medium: "h-[70vh]",
    small: "h-[50vh]",
  }
  // Determine if we should use parallax for title
  const useParallaxText = variant === "parallax" || variant === "webgl";
  // Check if we're using liquid text animations
  const useLiquidText = titleAnimation === "liquid" || 
                      titleAnimation === "bounce" || 
                      titleAnimation === "wave" || 
                      titleAnimation === "reveal" || 
                      titleAnimation === "gradient";
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full flex items-center overflow-hidden mt-0", 
        heightClasses[height],
        className
      )}
      style={{ marginTop: 0 }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Video background */}
      {variant === "video" && videoSrc && (
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {/* Image background */}
      {variant !== "video" && variant !== "webgl" && (
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            y,
            scale,
            x: variant === "parallax" ? imageX : 0,
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}
      {/* WebGL or Parallax Pattern Overlay */}
      {(variant === "webgl" || variant === "parallax") && (
        <ParallaxBackground 
          pattern={pattern}
          intensity={1.5}
          interactive={true}
          className="z-[1]"
        />
      )}
      {/* Overlay for contrast */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          opacity,
        }}
      />
      {/* Grid pattern overlay */}
      {variant === "pattern" && pattern === "grid" && (
        <div className="absolute inset-0 z-[3] bg-[url('/images/grid.svg')] opacity-30" />
      )}
      {/* Content wrapper */}
      <motion.div
        className="relative z-[10] container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        style={{
          opacity,
          x: useParallaxText ? contentX : 0,
          y: useParallaxText ? contentY : 0,
        }}
      >
        {/* Logo element */}
        {showLogo && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/images/logo.svg"
              alt="LOTA Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
            />
          </motion.div>
        )}
        {/* Title with animation (using Liquid Text for advanced effects) */}
        {useLiquidText ? (
          <div className={cn("mb-6 w-full max-w-4xl mx-auto", titleAnimation === "gradient" ? "text-transparent" : textColor)}>
            <LiquidText
              text={title}
              variant={titleAnimation === "liquid" ? "liquid" : 
                            titleAnimation === "bounce" ? "bounce" : 
                            titleAnimation === "wave" ? "wave" : 
                            titleAnimation === "reveal" ? "reveal" : "gradient"}
              size="6xl"
              className="font-bold tracking-tight text-center"
              delay={0.1}
              staggerChildren={0.03}
              interactive={true}
            />
          </div>
        ) : (
          <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 w-full max-w-4xl mx-auto", textColor)}>
            {titleAnimation === "words" ? (
              <span className="inline-block whitespace-pre-wrap">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.25em] last:mr-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ) : titleAnimation === "chars" ? (
              <span>
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ marginRight: char === " " ? "0.25em" : "0" }}
                    initial={{ opacity: 0, y: 20, rotateZ: 10 }}
                    animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            ) : titleAnimation === "fade" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {title}
              </motion.span>
            ) : titleAnimation === "slide" ? (
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {title}
              </motion.span>
            ) : (
              title
            )}
          </h1>
        )}
        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className={cn("text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90", textColor)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
        {/* Call-to-action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <AnimatedButton
            href={ctaHref}
            variant="primary"
            size="lg"
            className="rounded-full px-8"
          >
            {ctaText}
          </AnimatedButton>
          <AnimatedButton
            href={secondaryCtaHref}
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-white border-white hover:bg-white/20"
          >
            {secondaryCtaText}
          </AnimatedButton>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-white/80 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      </motion.div>
    </div>
  )
}
