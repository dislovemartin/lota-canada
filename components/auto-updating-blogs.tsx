"use client"

import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"
import { useState, useEffect } from "react"

// Mock blog data - in a real app, this would come from an API
const blogData = [
  {
    id: 1,
    title: "Productive Design Skills",
    description: "Boost your design productivity with these expert tips",
    image: "/placeholder.svg?height=400&width=600",
    url: "/blogs/productive-design-skills",
  },
  {
    id: 2,
    title: "Freelancing in Digital",
    description: "How to thrive as a freelancer in the digital age",
    image: "/placeholder.svg?height=400&width=600",
    url: "/blogs/freelancing-digital",
  },
  {
    id: 3,
    title: "A New Era of Entrepreneurship",
    description: "The evolving landscape of modern entrepreneurship",
    image: "/placeholder.svg?height=400&width=600",
    url: "/blogs/new-era-entrepreneurship",
  },
]

export function AutoUpdatingBlogs() {
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    // Set current time in format "09:25 AM"
    const now = new Date()
    setLastUpdated(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    )
  }, [])

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 underline-accent">Auto-Updating Blogs</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Fresh insights and updates on design, tech, and business delivered daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="bg-background rounded-lg overflow-hidden transition-all duration-300 glow-hover"
            >
              <div className="relative h-48">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-accent/20"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                <p className="text-muted-foreground mb-6">{blog.description}</p>
                <Link href={blog.url} className="flex items-center text-accent hover:text-accent/80 transition-colors">
                  <Eye className="mr-2" size={16} />
                  Read Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-muted-foreground">
          <p>Updated: {lastUpdated}</p>
        </div>
      </div>
    </section>
  )
}

