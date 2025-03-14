"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// Sample event data - would typically come from an API or CMS
const upcomingEvents = [
  {
    id: 1,
    title: "Annual Leadership Summit",
    date: "June 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Toronto, Canada",
    description: "Join us for our flagship event featuring keynote speakers, workshops, and networking opportunities.",
    image: "/images/summit/2024 VC - First Event/Edited Photos/LOTA 16.svg",
    status: "Coming Soon",
    slug: "leadership-summit-2025",
  },
  {
    id: 2,
    title: "Networking Masterclass",
    date: "August 2025",
    time: "6:30 PM - 9:00 PM",
    location: "Virtual Event",
    description: "Learn effective networking strategies from industry experts to advance your career.",
    image: "/placeholder.svg?height=800&width=1200",
    status: "Registration Open",
    slug: "networking-masterclass-2025",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Networking Mixer",
    date: "November 2024",
    image: "/images/summit/2024 VC - First Event/Edited Photos/LOTA 13.svg",
    slug: "networking-mixer-2024",
  },
  {
    id: 2,
    title: "Leadership Workshop",
    date: "September 2024",
    image: "/images/summit/2024 VC - First Event/Edited Photos/LOTA 6.svg",
    slug: "leadership-workshop-2024",
  },
  {
    id: 3,
    title: "Industry Panel Discussion",
    date: "July 2024",
    image: "/images/summit/2024 VC - First Event/Edited Photos/LOTA 18.svg",
    slug: "industry-panel-2024",
  },
  {
    id: 4,
    title: "Career Development Seminar",
    date: "May 2024",
    image: "/placeholder.svg?height=600&width=800",
    slug: "career-development-2024",
  },
];

function UpcomingEventCard({ event }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm rounded-full">
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

          <div className="flex space-x-4">
            <AnimatedButton href={`/events/${event.slug}`} variant="primary">
              Learn More
            </AnimatedButton>
            <AnimatedButton href="/contact" variant="outline">
              Register
            </AnimatedButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PastEventCard({ event, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-[4/3]">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
            <h3 className="text-white text-xl font-medium mb-1">{event.title}</h3>
            <p className="text-white/80 text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1 opacity-70" />
              {event.date}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function EventsPage() {
  return (
    <PageTransition variant="fade">
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Banner */}
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <div className="absolute inset-0 bg-black">
            <Image
              src="/images/summit/2024 VC - First Event/Edited Photos/LOTA 2.svg"
              alt="Event venue"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
          </div>

          <div className="absolute inset-0 flex flex-col">
            <div className="bg-black/80 py-4 text-white text-center">
              <p className="text-xl font-light tracking-wide">"ONE NIGHT, UNLIMITED OPPORTUNITIES"</p>
            </div>

            <div className="flex-1 flex items-end justify-center p-8">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-light text-white mb-4">
                  LOTA EVENTS
                </h1>
                <p className="text-white/90 text-xl max-w-3xl mx-auto">
                  Connect, learn, and grow with industry leaders and peers
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="subtle-bg py-16">
          <div className="container-wide mx-auto">
            <AnimatedHeading
              title="Upcoming Events"
              subtitle="Join us for our upcoming events designed to connect, inspire, and develop professionals."
              underline
              animated
              variant="gradient"
            />

            <div className="mt-12 space-y-8">
              {upcomingEvents.map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))}
            </div>

            <SectionDivider variant="wave" color="accent" height="sm" animated className="my-16" />

            <AnimatedHeading
              title="Past Events"
              subtitle="Explore our previous events and the impact they've made on our community."
              underline
              animated
              variant="gradient"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
              {pastEvents.map((event, index) => (
                <PastEventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            <div className="text-center mt-16">
              <AnimatedButton href="/contact" variant="primary" size="lg">
                Host an Event with Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
