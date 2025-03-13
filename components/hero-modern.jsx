"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export function HeroModern({ title, subtitle, imageSrc, imageAlt, ctaText = "Learn More", ctaHref = "/about", secondaryCtaText = "Join Now", secondaryCtaHref = "/contact", className, showLogo = true, overlayOpacity = 0.5, }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const titleWords = title.split(" ");
    return (<div ref={ref} className={cn("relative h-screen w-full flex items-center overflow-hidden mt-0", className)} style={{ marginTop: 0 }} role="banner" aria-label="Hero section">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" quality={90}/>
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}/>
      </motion.div>

      {/* Logo Watermark (Optional) */}
      {showLogo && (<div className="absolute right-10 bottom-10 opacity-20 z-0 hidden md:block">
          <div className="relative h-auto w-auto overflow-hidden rounded-md bg-white/5">
            <Image src="/images/brand/image.png" alt="LOTA Logo Watermark" width={325} height={48} className="object-contain"/>
          </div>
        </div>)}

      {/* Content */}
      <div className="container-wide relative z-10 text-white pt-24 md:pt-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-wide text-white">
            {isMounted ? (<>
                {titleWords.map((word, i) => (<motion.span key={i} className="inline-block mr-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                }}>
                    {word}
                  </motion.span>))}
              </>) : (title)}
          </h1>

          {subtitle && (<motion.p className="text-xl mb-8 text-white/90 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              {subtitle}
            </motion.p>)}

          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
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
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} aria-hidden="true">
        <motion.div className="w-8 h-12 border-2 border-white rounded-full flex items-center justify-center" animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}>
          <motion.div className="w-1 h-2 bg-white rounded-full" animate={{ y: [0, 6, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}/>
        </motion.div>
      </motion.div>
    </div>);
}
