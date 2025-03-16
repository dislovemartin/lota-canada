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
  hoverColor = "text-gray-300",
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
      {/* Enhanced overlay with gradient for better contrast - more business formal */}
      <motion.div
        className="absolute inset-0 z-[2] bg-gradient-to-br from-black via-gray-900 to-blue-900/90"
        style={{
          opacity,
          backgroundBlendMode: "multiply",
        }}
      />
      {/* Subtle noise texture overlay for depth */}
      <div className="absolute inset-0 z-[2] opacity-20 mix-blend-overlay" 
           style={{ backgroundImage: 'url("/images/noise.png")', backgroundRepeat: 'repeat' }}></div>
      {/* Additional subtle accent gradient - enhanced for business formal look */}
      <motion.div
        className="absolute inset-0 z-[3] bg-gradient-to-tr from-blue-900/40 via-transparent to-blue-800/30"
        style={{
          opacity: opacity.get() * 0.8,
          backgroundBlendMode: "overlay",
        }}
      />
      {/* Decorative diagonal lines for business aesthetic */}
      <div className="absolute inset-0 z-[3] opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
             backgroundSize: '100px 100px'
           }}></div>
      {/* Grid pattern overlay */}
      {variant === "pattern" && pattern === "grid" && (
        <div className="absolute inset-0 z-[3] bg-[url('/images/grid.svg')] opacity-30" />
      )}
      {/* Content wrapper - enhanced with decorative elements */}
      <motion.div
        className="relative z-[10] container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        style={{
          opacity,
          x: useParallaxText ? contentX : 0,
          y: useParallaxText ? contentY : 0,
        }}
      >
        {/* Decorative corner elements for business formal look */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>
        {/* Logo element - enhanced with decorative elements */}
        {showLogo && (
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-blue-400/10 to-blue-600/20 rounded-full blur-md"></div>
            <div className="relative bg-black/30 p-3 rounded-full border border-white/10 shadow-lg">
              <Image
                src="/images/logo.svg"
                alt="LOTA Logo"
                width={120}
                height={60}
                className="h-16 w-auto"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
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
          <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 w-full max-w-4xl mx-auto leading-tight relative", textColor)}>
            {/* Decorative accent line above title */}
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-full"></span>
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
        {/* Enhanced Subtitle with decorative elements */}
        {subtitle && (
          <motion.p
            className={cn("text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 relative", textColor)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="relative inline-block">
              <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden md:block"></span>
              {subtitle}
              <span className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></span>
            </span>
          </motion.p>
        )}
        {/* Call-to-action buttons - enhanced with business formal styling */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Decorative element above buttons */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
          
          <AnimatedButton
            href={ctaHref}
            variant="primary"
            size="lg"
            className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-500/20 font-semibold group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {ctaText}
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute top-0 left-[calc(-100%)] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-[-20deg] group-hover:animate-shine"></span>
            </span>
          </AnimatedButton>
          
          <AnimatedButton
            href={secondaryCtaHref}
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-6 text-white border-2 border-white/80 hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {secondaryCtaText}
              <svg className="w-5 h-5 ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute top-0 left-[calc(-100%)] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-20deg] group-hover:animate-shine"></span>
            </span>
          </AnimatedButton>
          
          {/* Decorative element below buttons */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
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
