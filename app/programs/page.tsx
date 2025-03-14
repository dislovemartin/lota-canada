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
        <section className="py-24 lg:py-32 bg-black text-white relative overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20 mix-blend-multiply" />

          <motion.div 
            className="container-wide relative z-10"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                className="text-primary font-medium tracking-wide uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Professional Development
              </motion.p>
              
              <AnimatedHeading
                title="Our Programs"
                subtitle="Comprehensive development opportunities designed to nurture leadership skills, professional growth, and community engagement."
                variant="gradient"
                underline
                gradient
                align="center"
                size="xl"
                animated={true}
                staggerDelay={0.03}
                className="mb-8"
              />

              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="#mentorship" 
                  variant="gradient" 
                  size="lg"
                  aria-label="Learn about our Mentorship Program"
                >
                  Mentorship Program
                </AnimatedButton>
                <AnimatedButton 
                  href="#leadership" 
                  variant="outline" 
                  size="lg"
                  aria-label="Explore our Leadership Workshops"
                >
                  Leadership Workshops
                </AnimatedButton>
                <AnimatedButton 
                  href="#community" 
                  variant="secondary" 
                  size="lg"
                  aria-label="Discover Community Engagement opportunities"
                >
                  Community Engagement
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <SectionDivider 
          variant="angle" 
          color="primary" 
          height="md" 
          animated={true}
        />

        {/* Impact Stats */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container-wide">
            <AnimatedHeading
              title="Program Impact"
              subtitle="Our programs have made a significant impact on the professional development of our members."
              align="center"
              underline
              animated={true}
              staggerDelay={0.03}
            />

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
            />
          </div>
        </section>

        {/* Mentorship Program */}
        <section id="mentorship" className="py-24 relative">
          <div className="container-wide">
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
                  underline
                  animated={true}
                />
                
                <div className="mt-6 space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our mentorship program pairs emerging professionals with seasoned industry leaders for personalized guidance and support. Through structured interactions and goal-setting, participants accelerate their professional development and expand their networks.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">One-on-One Mentorship</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Personalized guidance from experienced professionals in your field
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Goal Setting & Tracking</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Structured approach to defining and achieving your professional objectives
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Networking Opportunities</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Expand your professional connections through mentor-facilitated introductions
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <AnimatedButton 
                      href="/programs/mentorship" 
                      variant="primary" 
                      size="lg"
                      aria-label="Learn more about the Mentorship Program"
                    >
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/images/programs/mentorship.svg"
                  alt="LOTA Mentorship Program - Professionals in a mentoring session"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                />
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none" aria-hidden="true" />
                
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <blockquote className="text-white">
                      <p className="text-lg font-medium italic">
                        "The mentorship program provided me with invaluable guidance at a critical point in my career."
                      </p>
                      <footer className="mt-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" aria-hidden="true" />
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

        <SectionDivider 
          variant="wave" 
          color="accent" 
          height="md" 
          animated={true}
        />

        {/* Leadership Workshops */}
        <section id="leadership" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/images/programs/leadership.svg"
                  alt="LOTA Leadership Workshops - Group discussion and skill building"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent mix-blend-overlay" aria-hidden="true" />
                
                {/* Workshop calendar preview */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Upcoming Workshops</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Emotional Intelligence</span>
                      <span className="text-gray-500 dark:text-gray-400">June 15</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Crisis Management</span>
                      <span className="text-gray-500 dark:text-gray-400">July 10</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Strategic Thinking</span>
                      <span className="text-gray-500 dark:text-gray-400">August 5</span>
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
                  underline
                  animated={true}
                />
                
                <div className="mt-6 space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our workshop series offers practical, hands-on learning experiences focused on developing critical leadership competencies. Led by industry experts, these interactive sessions provide actionable strategies that can be immediately applied in professional settings.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Interactive Sessions</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Engage in hands-on activities designed to develop practical leadership skills
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Expert Facilitators</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Learn from recognized authorities and seasoned professionals in leadership development
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1" aria-hidden="true">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Diverse Topics</h3>
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

        <SectionDivider 
          variant="wave" 
          color="accent" 
          height="md" 
          animated={true}
        />

        {/* Community Engagement */}
        <section id="community" className="py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <AnimatedHeading
                title="Community Engagement"
                subtitle="Participate in volunteer opportunities and community initiatives that make a positive impact while building valuable skills."
                underline
                split
                align="center"
                animated={true}
              />
            </div>
            
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Badge
                  key={category}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all",
                    activeCategory === category 
                      ? "bg-primary hover:bg-primary/90 text-white" 
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  )}
                  onClick={() => setActiveCategory(category)}
                  role="button"
                  aria-pressed={activeCategory === category}
                >
                  {category === "all" ? "All Projects" : category}
                </Badge>
              ))}
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
              <AnimatedButton 
                href="/programs/community-engagement" 
                variant="outline" 
                size="lg"
                aria-label="Get involved with our community engagement projects"
              >
                Get Involved
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-24 bg-black text-white relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0" aria-hidden="true">
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
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedHeading
                title="Ready to Take the Next Step?"
                subtitle="Apply to join our programs and accelerate your professional development journey."
                className="text-white"
                subtitleClassName="text-white/70"
                align="center"
                underline
                highlight
                animated={true}
                variant="accent"
              />

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
                  aria-label="Apply for LOTA programs"
                >
                  Apply Now
                </AnimatedButton>
                <AnimatedButton 
                  href="/contact" 
                  variant="outline" 
                  size="xl"
                  aria-label="Contact us about our programs"
                >
                  Contact Us
                </AnimatedButton>
              </motion.div>
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

