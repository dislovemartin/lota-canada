"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedText } from "./animated-text";
import { MouseParallax } from "./mouse-parallax";
import { ScrollParallax } from "./scroll-parallax";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
  height?: "full" | "large" | "medium" | "small";
  textAnimation?:
    | "words"
    | "chars"
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right";
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
}

/**
 * HeroSection Component
 *
 * A simplified version of the HeroModern component that uses our custom animation components.
 *
 * @example
 * <HeroSection
 *   title="Welcome to Our Website"
 *   subtitle="Discover amazing content and services"
 *   imageSrc="/images/hero.jpg"
 *   imageAlt="Hero background"
 *   ctaText="Get Started"
 *   ctaHref="/start"
 * />
 */
export function HeroSection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ctaText = "Get Started",
  ctaHref = "/",
  secondaryCtaText,
  secondaryCtaHref,
  className,
  height = "full",
  textAnimation = "fade",
  overlayOpacity = 0.5,
  textAlign = "center",
}: HeroSectionProps) {
  // Height classes
  const heightClasses = {
    full: "h-screen",
    large: "h-[85vh]",
    medium: "h-[70vh]",
    small: "h-[50vh]",
  };

  // Text alignment classes
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      className={cn(
        "relative w-full flex items-center overflow-hidden",
        heightClasses[height],
        className
      )}
      role="banner"
      aria-label="Hero section"
    >
      {/* Background image with parallax effect */}
      <ScrollParallax
        className="absolute inset-0 w-full h-full z-0"
        speed={0.3}
        direction="up"
        scale={true}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </ScrollParallax>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-br from-black via-gray-900 to-blue-900/90"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <MouseParallax
        className={cn(
          "relative z-[10] container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col",
          alignClasses[textAlign]
        )}
        intensity={5}
        inverted={true}
      >
        {/* Title */}
        <div className="mb-6 max-w-4xl">
          <AnimatedText
            text={title}
            variant={textAnimation}
            tag="h1"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            delay={0.2}
            staggerChildren={0.05}
          />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Call-to-action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href={ctaHref}
            className="px-8 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300 text-center"
          >
            {ctaText}
          </Link>

          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="px-8 py-3 border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors duration-300 text-center"
            >
              {secondaryCtaText}
            </Link>
          )}
        </motion.div>
      </MouseParallax>

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
  );
}
