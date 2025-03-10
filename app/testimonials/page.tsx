"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { AnimatedHeading } from "@/components/ui/animated-heading"
import { SectionDivider } from "@/components/ui/section-divider"
import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/ui/testimonial-card"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Program Participant, 2023",
    testimonial:
      "The mentorship and networking opportunities provided by LOTA have been instrumental in my professional development. The connections I've made and the skills I've gained have truly transformed my career trajectory.",
    rating: 5,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Zhang",
    title: "Marketing Director, Tech Innovations Inc.",
    testimonial:
      "The Executive Mentorship Program provided me with invaluable guidance at a critical point in my career. My mentor helped me navigate complex challenges and identify opportunities for growth.",
    rating: 4,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: false,
  },
  {
    id: 3,
    name: "Priya Sharma",
    title: "Operations Manager, Global Solutions",
    testimonial:
      "Participating in the Leadership Workshop Series transformed my approach to team management. The practical strategies I learned have helped me build a more collaborative and productive work environment.",
    rating: 5,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Entrepreneur & Startup Founder",
    testimonial:
      "LOTA's networking events connected me with like-minded professionals who have become valuable partners and advisors for my business. The community is supportive, engaged, and genuinely interested in helping each other succeed.",
    rating: 5,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: false,
  },
  {
    id: 5,
    name: "Jennifer Lopez",
    title: "HR Director, Financial Services",
    testimonial:
      "The resources and connections I've gained through LOTA have been invaluable. The organization truly understands the challenges facing today's professionals and provides targeted support to help navigate them.",
    rating: 4,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: false,
  },
  {
    id: 6,
    name: "Robert Chen",
    title: "Technology Consultant",
    testimonial:
      "As someone transitioning to a leadership role, LOTA's programs provided me with the confidence and skills I needed to succeed. The community of peers facing similar challenges has been an incredible support system.",
    rating: 5,
    avatarSrc: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
]

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredTestimonials = testimonials.filter((t) => t.featured)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredTestimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredTestimonials.length)
  }

  return (
    <div className="container-wide mx-auto py-16">
      <AnimatedHeading
        title="Member Testimonials"
        subtitle="Hear from our community about their experiences with LOTA programs and events."
        align="center"
        underline
      />

      {/* Featured Testimonial Carousel */}
      <div className="relative max-w-4xl mx-auto mt-16 mb-24">
        <div className="absolute -top-12 left-0 text-6xl text-primary/10">
          <Quote />
        </div>

        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait">
            {featuredTestimonials.map(
              (testimonial, index) =>
                index === currentIndex && (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 md:p-12 rounded-lg shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.avatarSrc || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-lg md:text-xl italic mb-6">{testimonial.testimonial}</p>

                        <div>
                          <h3 className="text-lg font-medium">{testimonial.name}</h3>
                          <p className="text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Previous testimonial">
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 mx-4">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonial">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <SectionDivider />

      {/* All Testimonials Grid */}
      <div className="mt-16">
        <AnimatedHeading title="More Success Stories" align="center" size="md" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-24 text-center">
        <AnimatedHeading
          title="Share Your Story"
          subtitle="Are you a LOTA member with a success story to share? We'd love to hear about your experience."
          align="center"
          size="md"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Button asChild size="lg">
            <a href="/contact">Submit Your Testimonial</a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

interface TestimonialItemProps {
  testimonial: (typeof testimonials)[0]
  index: number
}

function TestimonialItem({ testimonial, index }: TestimonialItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TestimonialCard
        name={testimonial.name}
        title={testimonial.title}
        testimonial={testimonial.testimonial}
        rating={testimonial.rating}
        avatarSrc={testimonial.avatarSrc}
      />
    </motion.div>
  )
}

