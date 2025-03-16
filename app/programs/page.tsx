"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModernCard } from "@/components/ui/modern-card";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Since we're using "use client", we can't export metadata this way
// We'll use a separate file or custom SEO components
const pageMetadata = {
  title: "Programs | LOTA Canada",
  description: "Explore our professional development programs including mentorship, leadership workshops, and community engagement initiatives.",
};

// Programs structured data component
function ProgramsStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'item': {
                '@type': 'Course',
                'name': 'Mentorship Program',
                'description': 'Connect with experienced professionals who provide guidance, support, and insights to help you navigate your career path.',
                'provider': {
                  '@type': 'Organization',
                  'name': 'LOTA Canada',
                  'sameAs': 'https://lota-canada.vercel.app'
                },
                'url': 'https://lota-canada.vercel.app/programs/mentorship'
              }
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item': {
                '@type': 'Course',
                'name': 'Leadership Workshop Series',
                'description': 'Develop essential leadership skills through interactive workshops led by industry experts and thought leaders.',
                'provider': {
                  '@type': 'Organization',
                  'name': 'LOTA Canada',
                  'sameAs': 'https://lota-canada.vercel.app'
                },
                'url': 'https://lota-canada.vercel.app/programs/leadership-workshops'
              }
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'item': {
                '@type': 'Course',
                'name': 'Community Engagement',
                'description': 'Participate in volunteer opportunities and community initiatives that make a positive impact while building valuable skills.',
                'provider': {
                  '@type': 'Organization',
                  'name': 'LOTA Canada',
                  'sameAs': 'https://lota-canada.vercel.app'
                },
                'url': 'https://lota-canada.vercel.app/programs/community-engagement'
              }
            }
          ]
        })
      }}
    />
  );
}

export default function ProgramsPage() {
  // State for testimonials carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  // State for community projects filtering
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(communityProjects);

  // Get unique categories from community projects
  const categories = ["all", ...Array.from(new Set(communityProjects.map(project => project.category)))];
  
  // Filter projects by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(communityProjects);
    } else {
      setFilteredProjects(communityProjects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle testimonial carousel
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <PageTransition>
      {/* Structured Data for SEO */}
      <ProgramsStructuredData />
      
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay" />
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5" />
              ))}
            </div>
          </div>
          
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-gray-800/30 mix-blend-multiply" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />

          <motion.div 
            className="container-wide relative z-10"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                className="text-blue-300 font-medium tracking-wide uppercase mb-4 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400 mr-3" />
                Professional Development
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400 ml-3" />
              </motion.p>
              
              <AnimatedHeading
                title="Our Programs"
                subtitle="Comprehensive development opportunities designed to nurture leadership skills, professional growth, and community engagement."
                variant="gradient"
                highlight
                align="center"
                size="xl"
                animated={true}
                staggerDelay={0.03}
                className="mb-8"
              />
              
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-auto mb-8 rounded-full"></div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="#mentorship" 
                  variant="gradient" 
                  size="lg"
                  className="px-8 shadow-lg shadow-blue-500/20"
                  aria-label="Learn about our Mentorship Program"
                >
                  Mentorship Program
                </AnimatedButton>
                <AnimatedButton 
                  href="#leadership" 
                  variant="outline" 
                  size="lg"
                  className="px-8 border-white/30 hover:border-white/60"
                  aria-label="Explore our Leadership Workshops"
                >
                  Leadership Workshops
                </AnimatedButton>
                <AnimatedButton 
                  href="#community" 
                  variant="glass" 
                  size="lg"
                  className="px-8"
                  aria-label="Discover Community Engagement opportunities"
                >
                  Community Engagement
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <div className="relative">
          <SectionDivider 
            variant="angle" 
            color="primary" 
            height="md" 
            animated={true}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LOTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container-wide">
            <AnimatedHeading
              title="Program Impact"
              subtitle="Our programs have made a significant impact on the professional development of our members."
              align="center"
              variant="gradient"
              highlight
              animated={true}
              staggerDelay={0.03}
            />
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mb-12 rounded-full"></div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 mb-12">
              <AnimatedStats
                stats={[
                  { value: 500, label: "Program Participants", suffix: "+", decimal: 0 },
                  { value: 95, label: "Satisfaction Rate", suffix: "%", decimal: 0 },
                  { value: 80, label: "Career Advancement", suffix: "%", decimal: 0 },
                  { value: 25, label: "Corporate Partners", suffix: "", decimal: 0 },
                ]}
                variant="cards"
                columns={4}
                animated={true}
                duration={2}
                delay={0.3}
                className="gap-6"
              />
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our commitment to excellence and professional development has resulted in measurable success across all our programs. We continuously evaluate and improve our offerings to ensure maximum impact for our members.
              </p>
            </div>
          </div>
        </section>

        {/* Mentorship Program */}
        <section id="mentorship" className="py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <div className="container-wide relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <AnimatedHeading
                  title="Mentorship Program"
                  subtitle="Connect with experienced professionals who provide guidance, support, and insights to help you navigate your career path."
                  variant="gradient"
                  highlight
                  animated={true}
                />
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mb-6 rounded-full"></div>
                
                <div className="mt-6 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      Our mentorship program pairs emerging professionals with seasoned industry leaders for personalized guidance and support. Through structured interactions and goal-setting, participants accelerate their professional development and expand their networks.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">One-on-One Mentorship</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Personalized guidance from experienced professionals in your field
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Goal Setting & Tracking</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Structured approach to defining and achieving your professional objectives
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Networking Opportunities</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Expand your professional connections through mentor-facilitated introductions
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <AnimatedButton 
                      href="/programs/mentorship" 
                      variant="primary" 
                      size="lg"
                      className="shadow-lg shadow-blue-500/10 px-8"
                      aria-label="Learn more about the Mentorship Program"
                    >
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl z-10 pointer-events-none" aria-hidden="true" />
                
                <Image
                  src="/images/programs/mentorship.svg"
                  alt="LOTA Mentorship Program - Professionals in a mentoring session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                />
                
                {/* Corner decorative elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/40 rounded-tr-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/40 rounded-bl-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/40 rounded-br-2xl z-20 pointer-events-none" aria-hidden="true" />
                
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-900/70 to-transparent pointer-events-none" aria-hidden="true" />
                
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
                    <blockquote className="text-white">
                      <div className="w-10 h-8 text-blue-300 mb-2" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium italic">
                        "The mentorship program provided me with invaluable guidance at a critical point in my career."
                      </p>
                      <footer className="mt-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold" aria-hidden="true">
                            MZ
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">Michael Zhang</p>
                            <p className="text-sm text-white/70">Program Participant, 2023</p>
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="relative">
          <SectionDivider 
            variant="wave" 
            color="accent" 
            height="md" 
            animated={true}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LOTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Workshops */}
        <section id="leadership" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
          <div className="container-wide relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-2xl z-10 pointer-events-none" aria-hidden="true" />
                
                <Image
                  src="/images/programs/leadership.svg"
                  alt="LOTA Leadership Workshops - Group discussion and skill building"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw)"
                  className="object-cover"
                />
                
                {/* Corner decorative elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-indigo-500/40 rounded-tr-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-indigo-500/40 rounded-bl-2xl z-20 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-indigo-500/40 rounded-br-2xl z-20 pointer-events-none" aria-hidden="true" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-transparent mix-blend-overlay" aria-hidden="true" />
                
                {/* Workshop calendar preview */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-5 shadow-lg border border-indigo-100 dark:border-indigo-900/30"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center mr-3 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Upcoming Workshops</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      <span className="font-medium text-indigo-700 dark:text-indigo-300">Emotional Intelligence</span>
                      <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">June 15</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      <span className="font-medium text-indigo-700 dark:text-indigo-300">Crisis Management</span>
                      <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">July 10</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      <span className="font-medium text-indigo-700 dark:text-indigo-300">Strategic Thinking</span>
                      <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">August 5</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <AnimatedHeading
                  title="Leadership Workshop Series"
                  subtitle="Develop essential leadership skills through interactive workshops led by industry experts and thought leaders."
                  variant="gradient"
                  highlight
                  animated={true}
                />
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 mb-6 rounded-full"></div>
                
                <div className="mt-6 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      Our workshop series offers practical, hands-on learning experiences focused on developing critical leadership competencies. Led by industry experts, these interactive sessions provide actionable strategies that can be immediately applied in professional settings.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Interactive Sessions</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Engage in hands-on activities designed to develop practical leadership skills
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Expert Facilitators</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Learn from recognized authorities and seasoned professionals in leadership development
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mt-1 shadow-sm" aria-hidden="true">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Diverse Topics</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Explore a wide range of leadership subjects, from emotional intelligence to strategic planning
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <AnimatedButton 
                      href="/programs/leadership-workshops" 
                      variant="primary" 
                      size="lg"
                      aria-label="View the schedule of leadership workshops"
                    >
                      View Schedule
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider 
          variant="zigzag" 
          color="primary" 
          height="md" 
          animated={true}
        />

        {/* Testimonials Carousel */}
        <section className="py-20 bg-blue-50 dark:bg-blue-950/30 overflow-hidden relative">
          <div className="container-wide">
            <AnimatedHeading
              title="What Participants Say"
              subtitle="Hear from our program participants about their experiences"
              underline
              align="center"
              animated={true}
            />
            
            <div 
              className="mt-12 relative"
              ref={testimonialRef}
            >
              <div className="overflow-hidden py-10">
                <div className="relative mx-auto max-w-4xl">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                        index === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                      )}
                      style={{ 
                        display: index === activeTestimonial ? "block" : "none" 
                      }}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ 
                        opacity: index === activeTestimonial ? 1 : 0,
                        x: index === activeTestimonial ? 0 : 100
                      }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10">
                        <div className="flex items-center mb-6">
                          <div className="flex-shrink-0">
                            <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center">
                              <span className="text-white text-xl font-bold">{testimonial.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "h-4 w-4 mr-0.5", 
                                    i < testimonial.rating ? "text-blue-500" : "text-gray-300"
                                  )}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polygon
                                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                      fill={i < testimonial.rating ? "currentColor" : "none"}
                                    />
                                  </svg>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <blockquote>
                          <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl leading-relaxed italic">
                            "{testimonial.quote}"
                          </p>
                          <footer className="mt-6 text-sm text-gray-500">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-blue-700" />
                                <span>Program: {testimonial.program}</span>
                              </div>
                              <span className="hidden sm:inline-block">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                                <span>{testimonial.location}</span>
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-center mt-8 gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-blue-700 text-blue-700 hover:bg-blue-50"
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                  >
                    <ArrowRight className="h-5 w-5 rotate-180" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          index === activeTestimonial
                            ? "w-8 bg-blue-700"
                            : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-300"
                        )}
                        onClick={() => setActiveTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-current={index === activeTestimonial ? "true" : "false"}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-blue-700 text-blue-700 hover:bg-blue-50"
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <SectionDivider 
            variant="wave" 
            color="accent" 
            height="md" 
            animated={true}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LOTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community Engagement */}
        <section id="community" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <AnimatedHeading
                title="Community Engagement"
                subtitle="Participate in volunteer opportunities and community initiatives that make a positive impact while building valuable skills."
                variant="gradient"
                highlight
                align="center"
                animated={true}
              />
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mt-6 mb-12 rounded-full"></div>
            </div>
            
            {/* Category filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Projects</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all shadow-sm",
                      activeCategory === category 
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white" 
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    )}
                    onClick={() => setActiveCategory(category)}
                    role="button"
                    aria-pressed={activeCategory === category}
                  >
                    {category === "all" ? "All Projects" : category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ModernCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    imageSrc={project.image}
                    imageAlt={`${project.title} - Community engagement project by LOTA Canada`}
                    href={project.href}
                    category={project.category}
                    aspectRatio="square"
                    variant={index === 0 ? "gradient" : index === 1 ? "glass" : "bordered"}
                    priority={index === 0}
                    featured={index === 0}
                  />
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-20">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    We couldn't find any projects in the selected category.
                  </p>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="text-primary hover:underline"
                    aria-label="Show all projects"
                  >
                    View all projects
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 mb-4">Ready to make a difference in your community while developing valuable skills?</p>
                <AnimatedButton 
                  href="/programs/community-engagement" 
                  variant="primary" 
                  size="lg"
                  className="shadow-lg shadow-emerald-500/10 px-8"
                  aria-label="Get involved with our community engagement projects"
                >
                  Get Involved
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          
          {/* Animated background */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
            <motion.div 
              className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl"
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
              className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-indigo-600/20 to-blue-600/20 blur-3xl"
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
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                className="text-blue-300 font-medium tracking-wide uppercase mb-4 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400 mr-3" />
                Professional Growth
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400 ml-3" />
              </motion.p>
              
              <AnimatedHeading
                title="Ready to Take the Next Step?"
                subtitle="Apply to join our programs and accelerate your professional development journey."
                className="text-white"
                subtitleClassName="text-white/70"
                align="center"
                variant="gradient"
                highlight
                animated={true}
              />
              
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-auto mt-6 mb-8 rounded-full"></div>

              <motion.div 
                className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="/apply" 
                  variant="gradient" 
                  size="xl"
                  className="px-10 shadow-lg shadow-blue-500/20"
                  aria-label="Apply for LOTA programs"
                >
                  <span className="relative z-10">Apply Now</span>
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </AnimatedButton>
                <AnimatedButton 
                  href="/contact" 
                  variant="glass" 
                  size="xl"
                  className="px-8 border-white/30 hover:border-white/60"
                  aria-label="Contact us about our programs"
                >
                  Contact Us
                </AnimatedButton>
              </motion.div>
              
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  Join our community of leaders and professionals dedicated to excellence and growth.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

// Testimonials data for carousel
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    quote: "The Leadership Workshop Series transformed my approach to team management. The skills I gained have been instrumental in advancing my career and building a more cohesive team.",
    rating: 5,
    program: "Leadership Workshop Series",
    location: "Toronto"
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    quote: "Finding a mentor through LOTA's Mentorship Program was a game-changer. My mentor provided invaluable guidance that helped me navigate complex career decisions and develop professionally.",
    rating: 5,
    program: "Mentorship Program",
    location: "Vancouver"
  },
  {
    name: "Maya Patel",
    role: "Financial Analyst",
    quote: "Participating in community engagement projects gave me a new perspective on leadership and teamwork while making a positive impact. It's been incredibly rewarding both personally and professionally.",
    rating: 4,
    program: "Community Engagement",
    location: "Montreal"
  },
  {
    name: "Thomas Nguyen",
    role: "Healthcare Administrator",
    quote: "The quality of networking opportunities and professional connections I've made through LOTA programs has exceeded my expectations. It's opened doors I didn't know existed.",
    rating: 5,
    program: "Multiple Programs",
    location: "Calgary"
  }
];

const communityProjects = [
  {
    title: "Youth Mentorship Initiative",
    description:
      "Volunteer as a mentor to support youth in developing leadership skills and professional awareness.",
    image: "/images/programs/youth-mentorship.svg",
    category: "Education",
    href: "/programs/community-engagement/youth-mentorship",
  },
  {
    title: "Environmental Sustainability Projects",
    description:
      "Participate in community clean-up events and environmental education initiatives across Canada.",
    image: "/images/programs/environmental.svg",
    category: "Environment",
    href: "/programs/community-engagement/environmental",
  },
  {
    title: "Professional Skills Workshops",
    description:
      "Lead workshops that provide valuable skills training to underserved communities and newcomers to Canada.",
    image: "/images/programs/skills-workshops.svg",
    category: "Skills Development",
    href: "/programs/community-engagement/skills-workshops",
  },
  {
    title: "Community Health Initiatives",
    description:
      "Support health education and wellness programs in underserved communities through volunteer activities.",
    image: "/images/programs/community.svg",
    category: "Health",
    href: "/programs/community-engagement/health-initiatives",
  },
  {
    title: "Technology Access Program",
    description:
      "Help bridge the digital divide by teaching technology skills and providing access to digital resources.",
    image: "/images/programs/workshop.svg",
    category: "Technology",
    href: "/programs/community-engagement/technology-access",
  },
  {
    title: "Entrepreneurship Mentoring",
    description:
      "Support aspiring entrepreneurs from disadvantaged backgrounds with mentorship and business guidance.",
    image: "/images/programs/mentorship.svg",
    category: "Entrepreneurship",
    href: "/programs/community-engagement/entrepreneurship-mentoring",
  },
];

