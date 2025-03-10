"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

function TorontoSkylineShape({
  className,
  delay = 0,
  width = 400,
  height = 300,
  rotate = 0,
  imageSrc,
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  imageSrc: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
        rotate: rotate - 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt="Toronto skyline at night"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HeroGeometric({
  badge = "LOTA Canada",
  title1 = "Developing",
  title2 = "Leaders of Tomorrow",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.1] via-transparent to-purple-900/[0.1] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <TorontoSkylineShape
          delay={0.3}
          width={600}
          height={400}
          rotate={2}
          imageSrc="/toronto-night-1.jpg"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <TorontoSkylineShape
          delay={0.5}
          width={500}
          height={350}
          rotate={-3}
          imageSrc="/toronto-night-2.jpg"
          className="right-[-5%] md:right-[0%] top-[60%] md:top-[65%]"
        />

        <TorontoSkylineShape
          delay={0.4}
          width={450}
          height={300}
          rotate={-1}
          imageSrc="/toronto-night-3.jpg"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <TorontoSkylineShape
          delay={0.6}
          width={400}
          height={250}
          rotate={3}
          imageSrc="/toronto-night-4.jpg"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Image src="/lota-logo.svg" alt="LOTA" width={20} height={20} />
            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight font-serif">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Developing</span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-purple-300 font-normal",
                )}
              >
                Leaders of Tomorrow
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Empowering the next generation of Canadian leaders through mentorship, education, and professional
              development opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none" />
    </div>
  )
}

