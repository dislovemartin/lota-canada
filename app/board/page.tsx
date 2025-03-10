"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"
import { AnimatedHeading } from "@/components/ui/animated-heading"
import { SectionDivider } from "@/components/ui/section-divider"

const directors = [
  {
    id: 1,
    name: "Director Name",
    position: "Position Title",
    bio: "Brief professional biography and background information about the director.",
    image: "/placeholder.svg?height=600&width=500",
    linkedin: "#",
    email: "director@lotacanada.com",
  },
  {
    id: 2,
    name: "Director Name",
    position: "Position Title",
    bio: "Brief professional biography and background information about the director.",
    image: "/placeholder.svg?height=600&width=500",
    linkedin: "#",
    email: "director@lotacanada.com",
  },
]

export default function BoardPage() {
  return (
    <div className="container-wide mx-auto py-16">
      <AnimatedHeading
        title="BOARD OF DIRECTORS"
        subtitle="Meet the leadership team guiding the Leaders of Tomorrow Association."
        align="center"
        underline
      />

      <SectionDivider className="mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {directors.map((director, index) => (
          <DirectorCard key={director.id} director={director} index={index} />
        ))}
      </div>
    </div>
  )
}

interface DirectorCardProps {
  director: (typeof directors)[0]
  index: number
}

function DirectorCard({ director, index }: DirectorCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden group">
        <Image
          src={director.image || "/placeholder.svg"}
          alt={director.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-4">
            <a
              href={director.linkedin}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
              aria-label={`${director.name}'s LinkedIn`}
            >
              <Linkedin className="h-5 w-5 text-black" />
            </a>
            <a
              href={`mailto:${director.email}`}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
              aria-label={`Email ${director.name}`}
            >
              <Mail className="h-5 w-5 text-black" />
            </a>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-medium text-center">{director.name}</h2>
      <p className="text-muted-foreground text-center mb-2">{director.position}</p>
      <p className="text-sm text-center text-muted-foreground">{director.bio}</p>
    </motion.div>
  )
}

