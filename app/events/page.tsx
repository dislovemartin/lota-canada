"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Leadership Summit",
    date: "June 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Toronto, Canada",
    description:
      "Join us for our flagship event featuring keynote speakers, workshops, and networking opportunities.",
    image: "/placeholder.svg?height=600&width=800",
    status: "Coming Soon",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Networking Mixer",
    date: "November 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Leadership Workshop",
    date: "September 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Industry Panel Discussion",
    date: "July 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/placeholder.svg?height=900&width=1600"
            alt="Event venue"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="absolute inset-0 flex flex-col">
          <div className="bg-black py-4 text-white text-center">
            <p className="text-xl">"ONE NIGHT, UNLIMITED OPPORTUNITIES"</p>
          </div>

          <div className="flex-1 flex items-end justify-center p-8">
            <motion.h1
              className="text-6xl md:text-8xl font-light text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LOTA
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container-wide mx-auto py-16">
        <AnimatedHeading
          title="Upcoming Events"
          subtitle="Join us for our upcoming events designed to connect, inspire, and develop professionals."
          underline
        />

        <div className="mt-12">
          {upcomingEvents.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>

        <SectionDivider className="my-16" />

        <AnimatedHeading
          title="Past Events"
          subtitle="Explore our previous events and the impact they've made on our community."
          underline
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pastEvents.map((event, index) => (
            <PastEventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

interface UpcomingEventCardProps {
  event: (typeof upcomingEvents)[0];
}

function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm">
            {event.status}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">{event.description}</p>

          <AnimatedButton href={`/events/${event.id}`}>
            Stay Tuned
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
}

interface PastEventCardProps {
  event: (typeof pastEvents)[0];
  index: number;
}

function PastEventCard({ event, index }: PastEventCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div className="text-white">
            <div className="text-sm">{event.date}</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      <a
        href={`/events/past/${event.id}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        View Recap <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </motion.div>
  );
}
