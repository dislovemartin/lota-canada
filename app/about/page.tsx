"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, Users } from "lucide-react";
import Image from "next/image";
import { ReactNode, useRef } from "react";

function AnimatedText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`overflow-hidden rounded-2xl shadow-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
      />
    </motion.div>
  );
}

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}

function ValueCard({ title, description, icon: Icon, index }: ValueCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/30 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  // Define values for the value cards
  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, setting high standards and continually seeking to improve.",
      icon: CheckCircle2,
    },
    {
      title: "Integrity",
      description: "We act with honesty, transparency, and ethical behavior in all our interactions.",
      icon: Award,
    },
    {
      title: "Inclusion",
      description: "We embrace diversity and create an environment where all perspectives are valued and respected.",
      icon: Users,
    },
    {
      title: "Growth",
      description: "We believe in continuous learning, personal development, and helping others reach their potential.",
      icon: ArrowRight,
    },
  ];

  return (
    <PageTransition variant="slide">
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Section */}
        <div className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/placeholder.svg?height=1080&width=1920" 
              alt="LOTA leadership team" 
              fill 
              className="object-cover" 
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 dark:from-black/80 dark:to-black/60" />
          </div>

          <div className="container-wide relative z-10 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                ABOUT LOTA
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Fostering the next generation of business leaders and
                professionals in Toronto and beyond.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="subtle-bg py-16">
          <div className="container-wide mx-auto">
            <div className="max-w-3xl mx-auto">
              <AnimatedHeading 
                title="Our Story" 
                subtitle="The Leaders of Tomorrow Association (LOTA) is dedicated to fostering professional growth and leadership development across Canada." 
                underline
                animated
              />

              <AnimatedText>
                <p className="mb-6">
                  We connect emerging leaders with established professionals,
                  creating opportunities for mentorship, networking, and skill
                  development. Our community spans diverse industries and
                  backgrounds, united by a commitment to excellence and growth.
                </p>

                <p className="mb-6">
                  Founded with the vision of bridging gaps and creating
                  opportunities, LOTA has grown into a vibrant community of
                  professionals at various stages of their careers. We believe in
                  the power of connection, education, and mentorship to transform
                  careers and lives.
                </p>
              </AnimatedText>
            </div>

            <SectionDivider variant="wave" color="accent" height="sm" animated className="my-16"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedHeading 
                  title="Our Mission" 
                  underline
                  animated
                  variant="gradient"
                />

                <AnimatedText>
                  <p className="mb-6">
                    To empower the next generation of leaders by providing
                    resources, connections, and experiences that accelerate
                    professional growth and foster leadership excellence.
                  </p>

                  <p className="mb-6">
                    We are committed to creating an inclusive environment where
                    diverse perspectives are valued and where every member has the
                    opportunity to develop their leadership potential.
                  </p>

                  <AnimatedButton 
                    href="/programs" 
                    variant="primary"
                    className="mt-4"
                  >
                    Explore Our Programs
                  </AnimatedButton>
                </AnimatedText>
              </div>

              <AnimatedImage 
                src="/placeholder.svg?height=800&width=800" 
                alt="LOTA mission"
              />
            </div>

            <SectionDivider variant="wave" color="accent" height="sm" animated className="my-16" flip/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <AnimatedImage 
                src="/placeholder.svg?height=800&width=800" 
                alt="LOTA vision" 
                className="order-1 md:order-2"
              />

              <div className="order-2 md:order-1">
                <AnimatedHeading 
                  title="Our Vision" 
                  underline
                  animated
                  variant="gradient"
                />

                <AnimatedText>
                  <p className="mb-6">
                    A thriving professional community where emerging leaders have
                    access to the resources, mentorship, and opportunities they need
                    to reach their full potential and make meaningful contributions
                    to their industries and communities.
                  </p>

                  <p className="mb-6">
                    We envision a future where leadership excellence is accessible
                    to all, and where diverse perspectives drive innovation and
                    positive change.
                  </p>

                  <AnimatedButton 
                    href="/contact" 
                    variant="outline"
                    className="mt-4"
                  >
                    Get Involved
                  </AnimatedButton>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-gray-900 py-20">
          <div className="container-wide">
            <AnimatedHeading 
              title="Our Values" 
              subtitle="The principles that guide our organization and community" 
              align="center"
              underline
              animated
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {values.map((value, index) => (
                <ValueCard
                  key={value.title}
                  title={value.title}
                  description={value.description}
                  icon={value.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container-wide">
            <AnimatedHeading 
              title="Our Impact" 
              subtitle="What we've accomplished together" 
              align="center"
              underline
              animated
            />

            <AnimatedStats
              stats={[
                { value: 500, label: "Active Members", suffix: "+", decimal: 0 },
                { value: 48, label: "Events Hosted", suffix: "", decimal: 0 },
                { value: 120, label: "Mentorship Connections", suffix: "+", decimal: 0 },
                { value: 25, label: "Corporate Partners", suffix: "", decimal: 0 },
              ]}
              variant="cards"
              columns={4}
              animated={true}
              className="mt-12"
            />

            <div className="text-center mt-16">
              <AnimatedButton href="/events" variant="primary" size="lg">
                View Our Events
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
