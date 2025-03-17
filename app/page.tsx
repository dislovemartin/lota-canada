"use client";
import { HeroModern } from "@/components/hero-modern";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CommunityEngagementSection } from "@/components/ui/community-engagement-section";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { LiquidText } from "@/components/ui/liquid-text";
import { ModernCard } from "@/components/ui/modern-card";
import { ProfessionalImage } from "@/components/ui/professional-image";
import { ScrollTransition } from "@/components/ui/scroll-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { imageFallbacks } from "@/lib/image-fallbacks";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRef } from "react";
export default function Home() {
  // Create a reference for horizontal scroll animation
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {/* Hero Section - Enhanced with parallax and liquid text animation */}
      <HeroModern
        title="Leaders of Tomorrow Association"
        subtitle="Empowering professionals through networking, mentorship, and leadership development opportunities across Canada."
        imageSrc="/images/hero/diverse-professionals.jpg"
        imageAlt="LOTA Hero Background - Professional Leadership"
        ctaText="Learn More"
        ctaHref="/about"
        secondaryCtaText="Become a Member"
        secondaryCtaHref="/contact"
        showLogo={true}
        overlayOpacity={0.8}
        className="home-hero"
        variant="default"
        titleAnimation="fade"
        pattern="grid"
        height="full"
        textColor="text-white"
        hoverColor="text-amber-100"
        decorativeBorder={true}
        accentLine={true}
      />
      {/* Stats Section - Using enhanced AnimatedStats component */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
        <div className="container-wide relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <motion.div
              className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gray-700/5 blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute top-[60%] -right-[5%] w-[25%] h-[25%] rounded-full bg-gray-900/5 blur-3xl"
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute top-10 left-10 w-20 h-20 border border-black/5 rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-black/5 rounded-full" />
          </div>
          <ScrollTransition type="fade" direction="up">
            <AnimatedHeading
              title="Our Impact"
              subtitle="LOTA has been fostering professional growth and leadership development since our founding."
              align="center"
              underline
              animated={true}
              variant="default"
              size="lg"
              decorativeBorder={true}
              accentLine={true}
              highlightWords={["Impact"]}
            />
          </ScrollTransition>
          <ScrollTransition type="slide" direction="up" delay={0.3}>
            <div className="relative z-10">
              <AnimatedStats
                stats={[
                  {
                    value: 750,
                    label: "Active Members",
                    suffix: "+",
                    decimal: 0,
                  },
                  {
                    value: 65,
                    label: "Professional Events",
                    suffix: "",
                    decimal: 0,
                  },
                  {
                    value: 180,
                    label: "Mentorship Connections",
                    suffix: "+",
                    decimal: 0,
                  },
                  {
                    value: 32,
                    label: "Industry Partners",
                    suffix: "",
                    decimal: 0,
                  },
                ]}
                variant="cards"
                columns={4}
                animated={true}
                duration={1.5}
                delay={0.2}
                className="gap-6"
              />
            </div>
          </ScrollTransition>
        </div>
      </section>
      <SectionDivider
        variant="curve"
        className="text-gray-100 dark:text-gray-950"
        height="md"
      />

      {/* Mid-page CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Ready to Advance Your Leadership Journey?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join LOTA today and connect with a community of professionals
              dedicated to leadership excellence and career growth.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedButton
                href="/contact"
                variant="primary"
                size="lg"
                className="bg-white hover:bg-gray-100 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white relative overflow-hidden group"
                style={{
                  textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Become a Member
              </AnimatedButton>
              <AnimatedButton
                href="/programs"
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore Programs
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Programs Section - Enhanced with interactive cards and scroll transitions */}
      <section className="py-28 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute top-10 right-10 w-24 h-24 border border-black/5 rounded-full" />
          <div className="absolute bottom-10 left-10 w-40 h-40 border border-black/5 rounded-full" />
        </div>
        <div className="container-wide relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>
          <ScrollTransition type="fade">
            <AnimatedHeading
              title="Our Programs"
              subtitle="Explore LOTA's range of opportunities designed to support professional development and leadership growth."
              align="center"
              variant="default"
              size="lg"
              className="mb-4"
              underline
              decorativeBorder={true}
              accentLine={true}
              highlightWords={["Programs"]}
            />
          </ScrollTransition>
          <div className="relative z-10 mt-4 mb-8 mx-auto max-w-xs">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
            <div className="h-px w-3/4 mx-auto mt-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <ScrollTransition type="slide" direction="up" delay={0.1}>
              <InteractiveCard
                className="p-6 h-full"
                glare={true}
                border={true}
                intensity={10}
                hoverScale={1.02}
              >
                <div className="flex flex-col h-full relative">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 mb-4 w-16 h-16 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 relative group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-black/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white tracking-tight">
                    Leadership Development
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-600 mb-3 rounded-full"></div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    Structured programs to develop essential leadership skills
                    through workshops, mentorships, and practical experiences.
                  </p>
                  <AnimatedButton
                    href="/programs/leadership"
                    variant="primary"
                    size="sm"
                    className="mt-auto w-full bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium text-base py-3 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Learn More
                  </AnimatedButton>
                </div>
              </InteractiveCard>
            </ScrollTransition>
            <ScrollTransition type="slide" direction="up" delay={0.2}>
              <InteractiveCard
                className="p-6 h-full"
                glare={true}
                border={true}
                intensity={10}
                hoverScale={1.02}
              >
                <div className="flex flex-col h-full relative">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 mb-4 w-16 h-16 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 relative group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-black/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white tracking-tight">
                    Professional Networking
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-600 mb-3 rounded-full"></div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    Connect with professionals across different industries
                    through networking events, conferences, and social
                    gatherings.
                  </p>
                  <AnimatedButton
                    href="/programs/networking"
                    variant="outline"
                    size="sm"
                    className="mt-auto w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 text-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-300 font-medium text-base py-2.5"
                  >
                    Learn More
                  </AnimatedButton>
                </div>
              </InteractiveCard>
            </ScrollTransition>
            <ScrollTransition type="slide" direction="up" delay={0.3}>
              <InteractiveCard
                className="p-6 h-full"
                glare={true}
                border={true}
                intensity={10}
                hoverScale={1.02}
              >
                <div className="flex flex-col h-full relative">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-200 dark:border-gray-700 opacity-50"></div>
                  <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 mb-4 w-16 h-16 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 relative group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-black/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white tracking-tight">
                    Mentorship Program
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-600 mb-3 rounded-full"></div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    Gain insights and guidance from experienced professionals
                    through our structured mentorship program.
                  </p>
                  <AnimatedButton
                    href="/programs/mentorship"
                    variant="outline"
                    size="sm"
                    className="mt-auto w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 text-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Learn More
                  </AnimatedButton>
                </div>
              </InteractiveCard>
            </ScrollTransition>
          </div>
        </div>
      </section>
      {/* Community Engagement Section - Enhanced with tabs and interactive content */}
      <CommunityEngagementSection />
      {/* Featured Event - Enhanced with modern design and animations */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay" />
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5" />
            ))}
          </div>
        </div>
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-sm uppercase tracking-wider text-white/60 mb-2">
                Featured Event
              </span>
              <AnimatedHeading
                title="Annual Leadership Summit 2025"
                className="text-white"
                subtitleClassName="text-white/70"
                subtitle="Join industry leaders, innovators, and emerging professionals for three days of inspiring keynotes, workshops, and networking opportunities."
                underline
                highlight
                animated={true}
                staggerDelay={0.03}
                variant="accent"
              />
              <div className="space-y-4 mb-8 mt-8">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  <div className="w-32 font-medium text-white/80">Date</div>
                  <div>June 2025</div>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <div className="w-32 font-medium text-white/80">Location</div>
                  <div>Toronto, Canada</div>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <div className="w-32 font-medium text-white/80">
                    Registration
                  </div>
                  <div>Updates Coming Soon</div>
                </motion.div>
              </div>
              <AnimatedButton
                href="/events/leadership-summit-2025"
                variant="glass"
                size="lg"
              >
                Stay Tuned
              </AnimatedButton>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProfessionalImage
                src={imageFallbacks.conference}
                alt="Leadership Summit"
                fill
                className="object-cover"
                gradientOverlay={true}
                noiseTexture={true}
                decorativeBorder={true}
                variant="default"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 z-20">
                <div className="text-white">
                  <div className="text-sm uppercase tracking-wider mb-2">
                    June 2025
                  </div>
                  <div className="text-2xl font-bold">
                    ONE NIGHT, UNLIMITED OPPORTUNITIES
                  </div>
                </div>
              </div>
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 w-full h-[2px] bg-white/70"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-[2px] h-full bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <motion.div
                  className="absolute top-0 right-0 w-full h-[2px] bg-white/70"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-[2px] h-full bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white/70"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-[2px] h-full bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-[2px] bg-white/70"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-[2px] h-full bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider
        variant="angle"
        color="accent"
        height="md"
        animated={true}
      />
      {/* Knowledge Section - Enhanced with 3D cards */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute top-20 left-20 w-32 h-32 border border-black/5 rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-black/5 rounded-full" />
        </div>
        <div className="container-wide relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>
          <AnimatedHeading
            title="Knowledge"
            subtitle="Insights, research, and resources to support your professional development journey."
            underline
            gradient
            animated={true}
            variant="gradient"
            decorativeBorder={true}
            accentLine={true}
            highlightWords={["Knowledge"]}
          />
          <div className="relative z-10 mt-4 mb-8 mx-auto max-w-xs">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
            <div className="h-px w-3/4 mx-auto mt-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {articles.map((article, index) => (
              <ModernCard
                key={article.title}
                title={article.title}
                description={article.excerpt}
                imageSrc={article.image}
                imageAlt={article.title}
                href={article.href}
                category={article.category}
                aspectRatio="square"
                featured={index === 0}
                variant={
                  index === 0 ? "elevated" : index === 1 ? "glass" : "bordered"
                }
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <AnimatedButton href="/knowledge" variant="outline" size="lg">
              View all articles
            </AnimatedButton>
          </div>
        </div>
      </section>
      {/* Testimonial Section - Enhanced with carousel-like layout */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          <div className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gray-500/5 blur-3xl" />
          <div className="absolute top-[60%] -right-[5%] w-[25%] h-[25%] rounded-full bg-gray-500/5 blur-3xl" />
        </div>

        <div className="container-wide relative z-10">
          <ScrollTransition type="fade">
            <div className="mb-16 text-center">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-full text-gray-800 dark:text-gray-300 text-sm font-medium border border-gray-300 dark:border-gray-700 shadow-md relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Testimonials
              </div>
              <LiquidText
                text="What Our Members Say"
                variant="gradient"
                size="5xl"
                className="font-bold tracking-tight text-center"
                delay={0.1}
                staggerChildren={0.03}
                interactive={true}
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Hear from professionals who have experienced the benefits of
                LOTA membership.
              </p>

              {/* Decorative accent line */}
              <div className="mt-8 flex items-center justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-600 rounded-full" />
                <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-300 dark:from-gray-600 dark:to-gray-800 rounded-full mt-1 mx-auto" />
              </div>
            </div>
          </ScrollTransition>

          {/* Testimonial carousel-like layout */}
          <div className="relative px-4 py-8">
            {/* Large featured testimonial */}
            <ScrollTransition type="fade" delay={0.2}>
              <div className="mb-12">
                <TestimonialCard
                  quote="LOTA provided me with invaluable connections and mentorship that accelerated my career growth significantly. The community has been instrumental in helping me navigate challenges and seize opportunities in my professional journey."
                  author="Sarah Johnson"
                  role="Marketing Director"
                  company="TechVision Inc."
                  avatarSrc={imageFallbacks.avatarFemale1}
                  rating={5}
                  featured={true}
                  variant="gradient"
                  size="lg"
                />
              </div>
            </ScrollTransition>

            {/* Row of additional testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollTransition type="slide" direction="up" delay={0.3}>
                <TestimonialCard
                  quote="The leadership workshops were transformative. I've applied those skills daily in my role as a team leader."
                  author="Michael Chen"
                  role="Project Manager"
                  company="InnovateCorp"
                  avatarSrc={imageFallbacks.avatarMale1}
                  rating={5}
                  variant="bordered"
                  size="md"
                />
              </ScrollTransition>
              <ScrollTransition type="slide" direction="up" delay={0.4}>
                <TestimonialCard
                  quote="Being part of LOTA has opened doors I never thought possible. The network I've built is priceless."
                  author="Priya Patel"
                  role="Software Engineer"
                  company="GlobalTech Solutions"
                  avatarSrc={imageFallbacks.avatar}
                  rating={5}
                  variant="default"
                  size="md"
                />
              </ScrollTransition>
              <ScrollTransition type="slide" direction="up" delay={0.5}>
                <TestimonialCard
                  quote="The mentorship program connected me with an industry leader who helped me refine my career goals and strategy."
                  author="David Wilson"
                  role="Financial Analyst"
                  company="Capital Investments"
                  avatarSrc={imageFallbacks.avatarMale2}
                  rating={5}
                  variant="glass"
                  size="md"
                />
              </ScrollTransition>
            </div>

            {/* View all testimonials button */}
            <div className="mt-12 text-center">
              <AnimatedButton
                href="/testimonials"
                variant="outline"
                size="lg"
                className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/30 shadow-sm"
              >
                View All Testimonials
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Section - Enhanced with modern styling */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" />
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5" />
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full" />
          <motion.div
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-gray-500/10 to-gray-700/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-gray-700/10 to-gray-500/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <AnimatedHeading
              title="Stay Connected"
              subtitle="Subscribe to our newsletter to receive updates on upcoming events, program opportunities, and leadership insights."
              align="center"
              className="text-white"
              subtitleClassName="text-white/70"
              underline
              highlight
              animated={true}
              variant="accent"
            />
            <motion.form
              className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md backdrop-blur-sm transition-all duration-300"
                required
              />
              <AnimatedButton variant="gradient" size="md">
                Subscribe
              </AnimatedButton>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
const programs = [
  {
    title: "Mentorship Program",
    description:
      "Connect with experienced professionals who provide guidance, support, and insights to help you navigate your career path.",
    image: imageFallbacks.mentorship,
    href: "/programs/mentorship",
  },
  {
    title: "Leadership Workshop Series",
    description:
      "Develop essential leadership skills through interactive workshops led by industry experts and thought leaders.",
    image: imageFallbacks.workshop,
    href: "/programs/leadership-workshops",
  },
  {
    title: "Community Engagement",
    description:
      "Participate in volunteer opportunities and community initiatives that make a positive impact while building valuable skills.",
    image: imageFallbacks.networking,
    href: "/programs/community-engagement",
  },
];
const articles = [
  {
    title: "The Role of Emotional Intelligence in Leadership",
    excerpt:
      "Explore how emotional intelligence contributes to effective leadership and strategies for developing this critical skill.",
    image: imageFallbacks.emotionalIntelligence,
    href: "/knowledge/emotional-intelligence",
    category: "Leadership",
  },
  {
    title: "Navigating Career Transitions Successfully",
    excerpt:
      "Practical advice for professionals considering or experiencing career changes, from assessing your skills to adapting to new environments.",
    image: imageFallbacks.careerTransition,
    href: "/knowledge/career-transitions",
    category: "Career Development",
  },
  {
    title: "Building Your Professional Network",
    excerpt:
      "Strategies for creating and maintaining meaningful professional connections that support your career growth and development.",
    image: imageFallbacks.networking,
    href: "/knowledge/networking",
    category: "Networking",
  },
];
