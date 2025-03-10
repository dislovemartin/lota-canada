import Link from "next/link"
import Image from "next/image"

export function IndustryInfo() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 underline-accent">Industry Info</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest trends and insights in the digital business world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tech Trends 2025 */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=400&width=600" alt="Tech Trends" fill className="object-cover" />
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Tech Trends 2025</h3>
              <p className="text-muted-foreground mb-6">
                Discover the technologies shaping the future of digital business
              </p>
              <Link href="/industry/tech-trends" className="text-accent hover:text-accent/80 transition-colors">
                Read More
              </Link>
            </div>
          </div>

          {/* E-Commerce Growth */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="E-Commerce Growth"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">E-Commerce Growth</h3>
              <p className="text-muted-foreground mb-6">Learn about the latest strategies driving e-commerce success</p>
              <Link href="/industry/ecommerce-growth" className="text-accent hover:text-accent/80 transition-colors">
                Read More
              </Link>
            </div>
          </div>

          {/* Freelancing Boom */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=400&width=600" alt="Freelancing Boom" fill className="object-cover" />
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Freelancing Boom</h3>
              <p className="text-muted-foreground mb-6">Explore how freelancing is transforming the gig economy</p>
              <Link href="/industry/freelancing-boom" className="text-accent hover:text-accent/80 transition-colors">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

