"use client";

import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Suspense } from "react";

export default function TestimonialDemo() {
  return (
    <Suspense fallback={<div>Loading testimonial demo...</div>}>
      <TestimonialDemoContent />
    </Suspense>
  );
}

function TestimonialDemoContent() {
  return (
    <div className="container-wide py-16">
      <h1 className="text-3xl font-normal mb-8">Testimonial Card Component Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          author="Sarah Chen"
          role="Program Participant, 2023"
          quote="The mentorship and networking opportunities provided by LOTA have been instrumental in my professional development. The connections I've made and the skills I've gained have truly transformed my career trajectory."
          rating={5}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />

        <TestimonialCard
          author="Michael Zhang"
          role="Marketing Director, Tech Innovations Inc."
          quote="The Executive Mentorship Program provided me with invaluable guidance at a critical point in my career. My mentor helped me navigate complex challenges and identify opportunities for growth that I might have otherwise missed."
          rating={4}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />

        <TestimonialCard
          author="Priya Sharma"
          role="Operations Manager, Global Solutions"
          quote="Participating in the Leadership Workshop Series transformed my approach to team management. The practical strategies I learned have helped me build a more collaborative and productive work environment."
          rating={5}
          avatarSrc="/placeholder.svg?height=40&width=40"
        />
      </div>
    </div>
  )
}

