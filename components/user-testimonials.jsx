import Image from "next/image";
const testimonials = [
    {
        id: 1,
        name: "Alex Carter",
        role: "Entrepreneur, 2023",
        quote: "This hub transformed how I manage my business!",
        avatar: "/placeholder.svg?height=200&width=200",
    },
    {
        id: 2,
        name: "Sofia Nguyen",
        role: "Freelancer, 2022",
        quote: "The integrations are seamless and powerful.",
        avatar: "/placeholder.svg?height=200&width=200",
    },
    {
        id: 3,
        name: "Liam Patel",
        role: "Designer, 2023",
        quote: "I love the auto-updating blogs!",
        avatar: "/placeholder.svg?height=200&width=200",
    },
];
export function UserTestimonials() {
    return (<section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 underline-accent">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (<div key={testimonial.id} className="bg-secondary rounded-lg p-6 transition-all duration-300 glow-hover">
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover"/>
                </div>
              </div>

              <div className="text-center">
                <div className="text-accent text-4xl mb-4">"</div>
                <p className="text-muted-foreground italic mb-4">{testimonial.quote}</p>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-accent text-sm">{testimonial.role}</p>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
