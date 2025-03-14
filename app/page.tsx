"use client";
import { HeroModern } from "@/components/hero-modern";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CommunityEngagementSection } from "@/components/ui/community-engagement-section";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { LiquidText } from "@/components/ui/liquid-text";
import { ModernCard } from "@/components/ui/modern-card";
import { ScrollTransition } from "@/components/ui/scroll-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
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
        imageSrc="/images/hero/image-asset.jpeg"
        imageAlt="LOTA Hero Background - Professional Leadership"
        ctaText="Learn More"
        ctaHref="/about"
        secondaryCtaText="Join Us"
        secondaryCtaHref="/contact"
        showLogo={true}
        overlayOpacity={0.4}
        className="home-hero"
        variant="parallax"
        titleAnimation="liquid"
        pattern="waves"
        height="full"
        textColor="text-white"
        hoverColor="text-blue-300"
      />
      {/* Stats Section - Using enhanced AnimatedStats component */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-wide relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-3xl"
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
              className="absolute top-[60%] -right-[5%] w-[25%] h-[25%] rounded-full bg-purple-500/5 blur-3xl"
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
          </div>
          <ScrollTransition type="fade" direction="up">
            <AnimatedHeading
              title="Our Impact"
              subtitle="LOTA has been fostering professional growth and leadership development since our founding."
              align="center"
              underline
              gradient
              animated={true}
              variant="gradient"
              size="lg"
            />
          </ScrollTransition>
          <ScrollTransition type="slide" direction="up" delay={0.3}>
            <AnimatedStats
              stats={[
                { value: 500, label: "Members", suffix: "+", decimal: 0 },
                { value: 48, label: "Events Hosted", suffix: "", decimal: 0 },
                { value: 120, label: "Mentorship Connections", suffix: "+", decimal: 0 },
                { value: 25, label: "Corporate Partners", suffix: "", decimal: 0 },
              ]}
              variant="cards"
              columns={4}
              animated={true}
              duration={2}
              delay={0.3}
            />
          </ScrollTransition>
        </div>
      </section>
      <SectionDivider 
        variant="wave" 
        className="text-gray-50 dark:text-gray-950"
        height="lg"
      />
      {/* Programs Section - Enhanced with interactive cards and scroll transitions */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container-wide">
          <ScrollTransition type="fade">
            <AnimatedHeading
              title="Our Programs"
              subtitle="Explore LOTA's range of opportunities designed to support professional development and leadership growth."
              align="center"
              variant="default"
              size="lg"
            />
          </ScrollTransition>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <ScrollTransition type="slide" direction="up" delay={0.1}>
              <InteractiveCard 
                className="p-6 h-full" 
                glare={true}
                border={true}
                intensity={10}
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-xl bg-blue-100 dark:bg-blue-950/30 p-4 mb-4 w-14 h-14 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Leadership Development</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Structured programs to develop essential leadership skills through workshops, mentorships, and practical experiences.
                  </p>
                  <AnimatedButton href="/programs/leadership" variant="outline" size="sm" className="mt-auto w-full">
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
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-xl bg-purple-100 dark:bg-purple-950/30 p-4 mb-4 w-14 h-14 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Professional Networking</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Connect with professionals across different industries through networking events, conferences, and social gatherings.
                  </p>
                  <AnimatedButton href="/programs/networking" variant="outline" size="sm" className="mt-auto w-full">
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
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-xl bg-green-100 dark:bg-green-950/30 p-4 mb-4 w-14 h-14 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Mentorship Program</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Gain insights and guidance from experienced professionals through our structured mentorship program.
                  </p>
                  <AnimatedButton href="/programs/mentorship" variant="outline" size="sm" className="mt-auto w-full">
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
              <Image
                src="/images/summit/leadership-summit.jpg"
                alt="Leadership Summit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
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
      <section className="py-24 relative">
        <div className="container-wide">
          <AnimatedHeading
            title="Knowledge"
            subtitle="Insights, research, and resources to support your professional development journey."
            underline
            gradient
            animated={true}
            variant="gradient"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
                variant={index === 0 ? "elevated" : index === 1 ? "glass" : "bordered"}
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
      {/* Testimonial Section - Enhanced with liquid text */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-wide">
          <ScrollTransition type="fade">
            <div className="mb-12 text-center">
              <LiquidText
                text="What Our Members Say"
                variant="gradient"
                size="5xl"
                className="font-bold tracking-tight text-center"
                delay={0.1}
                staggerChildren={0.03}
                interactive={true}
              />
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Hear from professionals who have experienced the benefits of LOTA membership.
              </p>
            </div>
          </ScrollTransition>
          <div ref={testimonialsSectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollTransition type="slide" direction="up" delay={0.1}>
              <TestimonialCard
                quote="LOTA provided me with invaluable connections and mentorship that accelerated my career growth significantly."
                author="Sarah Johnson"
                role="Marketing Director"
                avatarSrc="/images/testimonials/testimonial-1.jpg"
                rating={5}
              />
            </ScrollTransition>
            <ScrollTransition type="slide" direction="up" delay={0.2}>
              <TestimonialCard
                quote="The leadership workshops were transformative. I've applied those skills daily in my role as a team leader."
                author="Michael Chen"
                role="Project Manager"
                avatarSrc="/images/testimonials/testimonial-2.jpg"
                rating={5}
              />
            </ScrollTransition>
            <ScrollTransition type="slide" direction="up" delay={0.3}>
              <TestimonialCard
                quote="Being part of LOTA has opened doors I never thought possible. The network I've built is priceless."
                author="Priya Patel"
                role="Software Engineer"
                avatarSrc="/images/testimonials/testimonial-3.jpg"
                rating={5}
              />
            </ScrollTransition>
          </div>
          <ScrollTransition type="fade">
            <div className="mb-12 text-center">
              <LiquidText
                text="What Our Members Say"
                variant="gradient"
                size="5xl"
                className="font-bold tracking-tight text-center"
                interactive={true}
                delay={0.1}
                staggerChildren={0.03}
              />
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Hear from professionals who have experienced the benefits of LOTA membership.
              </p>
            </div>
          </ScrollTransition>
        </div>
      </section>
      {/* Newsletter Section - Enhanced with modern styling */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <motion.div 
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
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
            className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
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
              <AnimatedButton variant="gradient" size="md">Subscribe</AnimatedButton>
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
    image: "/images/programs/mentorship.svg",
    href: "/programs/mentorship",
  },
  {
    title: "Leadership Workshop Series",
    description:
      "Develop essential leadership skills through interactive workshops led by industry experts and thought leaders.",
    image: "/images/programs/leadership.svg",
    href: "/programs/leadership-workshops",
  },
  {
    title: "Community Engagement",
    description:
      "Participate in volunteer opportunities and community initiatives that make a positive impact while building valuable skills.",
    image: "/images/programs/community.svg",
    href: "/programs/community-engagement",
  },
];
const articles = [
  {
    title: "The Role of Emotional Intelligence in Leadership",
    excerpt:
      "Explore how emotional intelligence contributes to effective leadership and strategies for developing this critical skill.",
    image: "/images/knowledge/emotional-intelligence.svg",
    href: "/knowledge/emotional-intelligence",
    category: "Leadership",
  },
  {
    title: "Navigating Career Transitions Successfully",
    excerpt:
      "Practical advice for professionals considering or experiencing career changes, from assessing your skills to adapting to new environments.",
    image: "/images/knowledge/career-transitions.svg",
    href: "/knowledge/career-transitions",
    category: "Career Development",
  },
  {
    title: "Building Your Professional Network",
    excerpt:
      "Strategies for creating and maintaining meaningful professional connections that support your career growth and development.",
    image: "/images/knowledge/networking.svg",
    href: "/knowledge/networking",
    category: "Networking",
  },
];
