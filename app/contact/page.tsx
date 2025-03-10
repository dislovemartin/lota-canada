"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import { AnimatedHeading } from "@/components/ui/animated-heading"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <div className="container-wide mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <AnimatedHeading title="GET IN TOUCH" underline />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <a
              href="mailto:info@lotacanada.com"
              className="inline-flex items-center text-foreground hover:text-primary transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              info@lotacanada.com
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 mb-8">
            <div className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Our Location</p>
                <p className="text-muted-foreground">Toronto, Ontario, Canada</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="mr-2 h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Contact Number</p>
                <p className="text-muted-foreground">Available upon request</p>
              </div>
            </div>
          </motion.div>

          <motion.form variants={containerVariants} className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <p className="mb-2">
                Name <span className="text-sm text-muted-foreground">(required)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-1">First Name</p>
                  <Input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <p className="text-sm mb-1">Last Name</p>
                  <Input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mb-2">
                Email <span className="text-sm text-muted-foreground">(required)</span>
              </p>
              <Input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mb-2">
                Message <span className="text-sm text-muted-foreground">(required)</span>
              </p>
              <Textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full min-h-[150px] border border-gray-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <AnimatedButton
                type="submit"
                className="bg-black hover:bg-black/80 text-white rounded-none px-8"
                icon={false}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    SENDING...
                  </span>
                ) : (
                  <span className="flex items-center">
                    SEND <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </AnimatedButton>

              {isSubmitted && (
                <motion.div
                  className="absolute top-full left-0 mt-2 text-green-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Message sent successfully!
                </motion.div>
              )}
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative h-full min-h-[600px] overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Modern furniture" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

