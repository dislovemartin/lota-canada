import { TestimonialCard } from "@/components/ui/testimonial-card"

export default function TestimonialDemo() {
  return (
    <div className="container-wide py-16">
      <h1 className="text-3xl font-normal mb-8">Testimonial Card Component Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          name="Sarah Chen"
          title="Program Participant, 2023"
          testimonial="The mentorship and networking opportunities provided by LOTA have been instrumental in my professional development. The connections I've made and the skills I've gained have truly transformed my career trajectory."
          rating={5}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />

        <TestimonialCard
          name="Michael Zhang"
          title="Marketing Director, Tech Innovations Inc."
          testimonial="The Executive Mentorship Program provided me with invaluable guidance at a critical point in my career. My mentor helped me navigate complex challenges and identify opportunities for growth that I might have otherwise missed."
          rating={4}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />

        <TestimonialCard
          name="Priya Sharma"
          title="Operations Manager, Global Solutions"
          testimonial="Participating in the Leadership Workshop Series transformed my approach to team management. The practical strategies I learned have helped me build a more collaborative and productive work environment."
          rating={5}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />
      </div>
    </div>
  )
}

