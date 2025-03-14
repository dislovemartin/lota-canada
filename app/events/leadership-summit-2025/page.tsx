"use client";

import { BreadcrumbStructuredData, EventStructuredData } from "@/components/structured-data";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// Define the speakers for the event
const speakers = [
    {
        name: "Dr. Sarah Johnson",
        role: "CEO, Future Leaders Institute",
        image: "/images/summit/speaker1.jpg",
        bio: "Dr. Johnson is a renowned leadership expert with over 20 years of experience in executive coaching and organizational development.",
    },
    {
        name: "Michael Chen",
        role: "Founder, TechInnovate",
        image: "/images/summit/speaker2.jpg",
        bio: "Michael is a serial entrepreneur who has founded three successful tech startups and mentors emerging business leaders.",
    },
    {
        name: "Amara Patel",
        role: "Chief Strategy Officer, Global Ventures",
        image: "/images/summit/speaker3.jpg",
        bio: "Amara specializes in strategic leadership and has guided numerous organizations through digital transformation.",
    },
    {
        name: "Robert Williams",
        role: "Executive Director, Leadership Academy",
        image: "/images/summit/speaker4.jpg",
        bio: "Robert has dedicated his career to developing inclusive leadership practices and building diverse teams.",
    },
];

// Define the schedule for the event
const schedule = [
    {
        day: "Day 1 - June 15, 2025",
        events: [
            { time: "8:00 AM - 9:00 AM", title: "Registration & Breakfast" },
            { time: "9:00 AM - 10:00 AM", title: "Opening Keynote: The Future of Leadership", speaker: "Dr. Sarah Johnson" },
            { time: "10:15 AM - 11:45 AM", title: "Workshop: Emotional Intelligence in Leadership", speaker: "Amara Patel" },
            { time: "12:00 PM - 1:30 PM", title: "Networking Lunch" },
            { time: "1:30 PM - 3:00 PM", title: "Panel Discussion: Navigating Change in Uncertain Times", speaker: "Multiple Speakers" },
            { time: "3:15 PM - 4:45 PM", title: "Workshop: Strategic Decision Making", speaker: "Michael Chen" },
            { time: "5:00 PM - 7:00 PM", title: "Welcome Reception & Networking" },
        ],
    },
    {
        day: "Day 2 - June 16, 2025",
        events: [
            { time: "8:30 AM - 9:00 AM", title: "Morning Coffee" },
            { time: "9:00 AM - 10:00 AM", title: "Keynote: Building Inclusive Leadership", speaker: "Robert Williams" },
            { time: "10:15 AM - 11:45 AM", title: "Workshop: Leading High-Performance Teams", speaker: "Dr. Sarah Johnson" },
            { time: "12:00 PM - 1:30 PM", title: "Lunch & Roundtable Discussions" },
            { time: "1:30 PM - 3:00 PM", title: "Workshop: Digital Leadership Strategies", speaker: "Michael Chen" },
            { time: "3:15 PM - 4:15 PM", title: "Closing Keynote: Your Leadership Journey", speaker: "Amara Patel" },
            { time: "4:15 PM - 5:00 PM", title: "Closing Remarks & Next Steps" },
            { time: "5:00 PM - 7:00 PM", title: "Farewell Networking Reception" },
        ],
    },
];

// Define the ticket options
const tickets = [
    {
        name: "Early Bird",
        price: "$499",
        features: [
            "Full 3-day access to all sessions",
            "Networking events",
            "Lunch and refreshments",
            "Digital conference materials",
        ],
        available: true,
        popular: false,
    },
    {
        name: "Standard",
        price: "$699",
        features: [
            "Full 3-day access to all sessions",
            "Networking events",
            "Lunch and refreshments",
            "Digital conference materials",
            "Gala dinner attendance",
        ],
        available: true,
        popular: true,
    },
    {
        name: "VIP",
        price: "$999",
        features: [
            "Full 3-day access to all sessions",
            "Networking events",
            "Lunch and refreshments",
            "Digital conference materials",
            "Gala dinner attendance",
            "Exclusive VIP reception",
            "One-on-one session with a speaker",
            "Premium seating",
        ],
        available: true,
        popular: false,
    },
];

// Event details for structured data
const eventDetails = {
    name: "Leadership Summit 2025",
    description: "Join us for the premier leadership development event of the year, featuring world-class speakers, interactive workshops, and unparalleled networking opportunities.",
    startDate: "2025-06-15T08:00:00-04:00",
    endDate: "2025-06-16T19:00:00-04:00",
    location: {
        name: "Vancouver Convention Centre",
        address: "1055 Canada Pl, Vancouver, BC V6C 0C3, Canada"
    },
    image: "https://lota-canada.vercel.app/images/summit/hero-image.jpg",
    url: "https://lota-canada.vercel.app/events/leadership-summit-2025",
    organizer: {
        name: "LOTA Canada - Leaders of Tomorrow Association",
        url: "https://lota-canada.vercel.app"
    },
    offers: {
        price: "599.00",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: "https://lota-canada.vercel.app/events/leadership-summit-2025#register",
        validFrom: "2024-09-01T00:00:00-04:00"
    },
    performer: "Multiple industry experts and thought leaders",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"
};

// Create breadcrumb items
const breadcrumbItems = [
    {
        name: "Events",
        item: "https://lota-canada.vercel.app/events",
    },
    {
        name: "Leadership Summit 2025",
        item: "https://lota-canada.vercel.app/events/leadership-summit-2025",
    },
];

export default function LeadershipSummit2025Page() {
    // Add page metadata
    useEffect(() => {
        // Add meta description
        const metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = eventDetails.description;
        document.head.appendChild(metaDescription);

        // Add meta keywords
        const metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = 'leadership summit, leadership conference, professional development, networking event, business leadership, Vancouver event';
        document.head.appendChild(metaKeywords);

        // Add canonical link
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = eventDetails.url;
        document.head.appendChild(canonicalLink);

        // Clean up on unmount
        return () => {
            document.head.removeChild(metaDescription);
            document.head.removeChild(metaKeywords);
            document.head.removeChild(canonicalLink);
        };
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/summit/hero-bg.jpg"
                        alt="Leadership Summit 2025"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container-wide relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <span className="inline-block text-primary font-medium text-lg uppercase tracking-wider">
                            June 15-17, 2025 • Toronto, Canada
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Annual Leadership Summit 2025
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                            Connecting Leaders, Inspiring Change, Building the Future
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <AnimatedButton size="lg">
                                <Link href="#register">Register Now</Link>
                            </AnimatedButton>
                            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                                <Link href="#schedule">View Schedule</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Event Details */}
            <section className="py-16 bg-gray-50">
                <div className="container-wide">
                    <AnimatedHeading
                        title="About the Summit"
                        subtitle="Join industry leaders, innovators, and emerging professionals for three days of inspiring keynotes, workshops, and networking opportunities."
                        align="center"
                        underline
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Calendar className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">When</h3>
                            <p className="text-gray-600">June 15-17, 2025</p>
                            <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Where</h3>
                            <p className="text-gray-600">Metro Toronto Convention Centre</p>
                            <p className="text-gray-600">Toronto, Ontario, Canada</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Who</h3>
                            <p className="text-gray-600">Business Leaders</p>
                            <p className="text-gray-600">Emerging Professionals</p>
                            <p className="text-gray-600">Industry Experts</p>
                        </motion.div>
                    </div>

                    <div className="mt-16">
                        <AnimatedStats
                            stats={[
                                { value: 500, label: "Attendees", suffix: "+" },
                                { value: 20, label: "Speakers", suffix: "" },
                                { value: 15, label: "Workshops", suffix: "" },
                                { value: 3, label: "Days", suffix: "" },
                            ]}
                            variant="minimal"
                        />
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Featured Speakers */}
            <section className="py-16" id="speakers">
                <div className="container-wide">
                    <AnimatedHeading
                        title="Featured Speakers"
                        subtitle="Learn from industry leaders and experts who are shaping the future of leadership."
                        align="center"
                        underline
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {speakers.map((speaker, index) => (
                            <motion.div
                                key={speaker.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="aspect-square relative">
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold">{speaker.name}</h3>
                                    <p className="text-primary font-medium mt-1">{speaker.role}</p>
                                    <p className="text-gray-600 mt-4 text-sm">{speaker.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Schedule */}
            <section className="py-16 bg-gray-50" id="schedule">
                <div className="container-wide">
                    <AnimatedHeading
                        title="Event Schedule"
                        subtitle="Three days of inspiring keynotes, interactive workshops, and valuable networking opportunities."
                        align="center"
                        underline
                    />

                    <div className="mt-12">
                        <Tabs defaultValue={schedule[0].day} className="w-full">
                            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
                                {schedule.map((day) => (
                                    <TabsTrigger key={day.day} value={day.day} className="text-sm md:text-base">
                                        {day.day.split(" - ")[0]}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {schedule.map((day) => (
                                <TabsContent key={day.day} value={day.day} className="mt-0">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-semibold mb-6">{day.day}</h3>
                                        <div className="space-y-6">
                                            {day.events.map((event, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.05 * index }}
                                                    className="flex flex-col md:flex-row md:items-start border-l-4 border-primary pl-4 py-2"
                                                >
                                                    <div className="md:w-48 flex-shrink-0 font-medium text-gray-600">
                                                        {event.time}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-semibold">{event.title}</h4>
                                                        {event.speaker && (
                                                            <p className="text-primary mt-1">{event.speaker}</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Registration */}
            <section className="py-16" id="register">
                <div className="container-wide">
                    <AnimatedHeading
                        title="Register Now"
                        subtitle="Secure your spot at the Annual Leadership Summit 2025 and take the next step in your leadership journey."
                        align="center"
                        underline
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {tickets.map((ticket, index) => (
                            <motion.div
                                key={ticket.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className={`bg-white rounded-lg shadow-md overflow-hidden border ${ticket.popular ? "border-primary" : "border-transparent"
                                    } relative`}
                            >
                                {ticket.popular && (
                                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                                        Popular
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold">{ticket.name}</h3>
                                    <div className="mt-2 mb-6">
                                        <span className="text-3xl font-bold">{ticket.price}</span>
                                        <span className="text-gray-600 ml-1">CAD</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {ticket.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <Award className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <AnimatedButton size="lg" className="bg-white text-primary hover:bg-white/90">
                                        <Link href="#register">Register Now</Link>
                                    </AnimatedButton>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">
                            For group registrations or special accommodations, please contact us directly.
                        </p>
                        <Button asChild variant="outline">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-primary text-white">
                <div className="container-wide text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Elevate Your Leadership?
                        </h2>
                        <p className="text-xl mb-8">
                            Join us at the Annual Leadership Summit 2025 and connect with like-minded professionals,
                            learn from industry experts, and take your leadership skills to the next level.
                        </p>
                        <AnimatedButton size="lg" className="bg-white text-primary hover:bg-white/90">
                            <Link href="#register">Register Now</Link>
                        </AnimatedButton>
                    </motion.div>
                </div>
            </section>

            {/* Event Structured Data */}
            <EventStructuredData
                name={eventDetails.name}
                description={eventDetails.description}
                startDate={eventDetails.startDate}
                endDate={eventDetails.endDate}
                location={eventDetails.location}
                image={eventDetails.image}
                url={eventDetails.url}
                organizer={eventDetails.organizer}
                offers={eventDetails.offers}
                performer={eventDetails.performer}
                eventStatus={eventDetails.eventStatus}
                eventAttendanceMode={eventDetails.eventAttendanceMode}
            />

            {/* Breadcrumb Structured Data */}
            <BreadcrumbStructuredData items={breadcrumbItems} />
        </>
    );
} 