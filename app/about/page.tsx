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
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/30 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
      whileHover={{ y: -5 }}
    >
      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-sm border border-blue-100 dark:border-blue-800/30">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 tracking-tight">{title}</h3>
      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mb-3 rounded-full"></div>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
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
        <div className="relative h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/placeholder.svg?height=1080&width=1920" 
              alt="LOTA leadership team" 
              fill 
              className="object-cover" 
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-gray-900/90 to-blue-900/95 dark:from-blue-950/98 dark:via-gray-900/95 dark:to-blue-900/98" />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay" />
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="absolute top-8 left-8 w-32 h-32 border border-blue-400/20 rounded-full" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-blue-400/20 rounded-full" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
          </div>

          <div className="container-wide relative z-10 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-block mb-3 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wide">
                LEADERS OF TOMORROW ASSOCIATION
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">Illuminating leadership through mentorship</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Fostering the next generation of business leaders and
                professionals across Canada through mentorship and professional development.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <AnimatedButton href="/mission" variant="glass" size="lg" className="backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg">
                  Our Mission
                </AnimatedButton>
                <AnimatedButton href="/contact" variant="outline" size="lg" className="border-white/30 hover:border-white/60 shadow-lg">
                  Contact Us
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-24">
          <div className="container-wide mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide border border-blue-100 dark:border-blue-800/30">
                  OUR STORY
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400">By leaders, for leaders</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  The Leaders of Tomorrow Association (LOTA) is dedicated to fostering professional growth and leadership development across Canada.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-blue-50/50 dark:bg-blue-900/20 blur-2xl"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-blue-50/50 dark:bg-blue-900/20 blur-2xl"></div>
                
                <AnimatedText>
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    We connect emerging leaders with established professionals,
                    creating opportunities for mentorship, networking, and skill
                    development. Our community spans diverse industries and
                    backgrounds, united by a commitment to excellence and growth.
                  </p>
  
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Founded with the vision of bridging gaps and creating
                    opportunities, LOTA has grown into a vibrant community of
                    professionals at various stages of their careers. We believe in
                    the power of connection, education, and mentorship to transform
                    careers and lives.
                  </p>
                  
                  <div className="flex items-center justify-center mt-12">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                    <div className="mx-4 px-4 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm border border-blue-100 dark:border-blue-800/30">LOTA</div>
                    <div className="w-20 h-0.5 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></div>
                  </div>
                </AnimatedText>
              </div>
            </div>

            <div className="relative my-24">
              <SectionDivider variant="curve" color="accent" height="sm" animated />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.1] mix-blend-overlay"></div>
                    <span className="text-white text-sm font-bold tracking-wide">LOTA</span>
                  </div>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 border border-blue-200 dark:border-blue-800/30 rounded-lg opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border border-blue-200 dark:border-blue-800/30 rounded-lg opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide border border-blue-100 dark:border-blue-800/30">
                    OUR MISSION
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-400 dark:to-blue-300">
                      Empowering future leaders through connection
                    </span>
                  </h2>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mb-8 rounded-full"></div>

                  <AnimatedText>
                    <div className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
                      
                      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        To empower the next generation of leaders by providing
                        resources, connections, and experiences that accelerate
                        professional growth and foster leadership excellence.
                      </p>

                      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        We are committed to creating an inclusive environment where
                        diverse perspectives are valued and where every member has the
                        opportunity to develop their leadership potential.
                      </p>
                    </div>

                    <AnimatedButton 
                      href="/programs" 
                      variant="primary"
                      className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg group flex items-center gap-2"
                    >
                      Explore Our Programs
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </AnimatedButton>
                  </AnimatedText>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent mix-blend-overlay"></div>
                <AnimatedImage 
                  src="/placeholder.svg?height=800&width=800" 
                  alt="LOTA mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                  Leadership in action
                </div>
              </div>
            </div>

            <div className="relative my-24">
              <SectionDivider variant="curve" color="accent" height="sm" animated flip/>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.1] mix-blend-overlay"></div>
                    <span className="text-white text-sm font-bold tracking-wide">LOTA</span>
                  </div>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50 order-1 md:order-2">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent mix-blend-overlay"></div>
                <AnimatedImage 
                  src="/placeholder.svg?height=800&width=800" 
                  alt="LOTA vision" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                  Shaping the future
                </div>
              </div>

              <div className="order-2 md:order-1 relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 border border-blue-200 dark:border-blue-800/30 rounded-lg opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border border-blue-200 dark:border-blue-800/30 rounded-lg opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide border border-blue-100 dark:border-blue-800/30">
                    OUR VISION
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-400 dark:to-blue-300">
                      Building tomorrow's leadership today
                    </span>
                  </h2>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mb-8 rounded-full"></div>

                  <AnimatedText>
                    <div className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
                      
                      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        A thriving professional community where emerging leaders have
                        access to the resources, mentorship, and opportunities they need
                        to reach their full potential and make meaningful contributions
                        to their industries and communities.
                      </p>

                      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        We envision a future where leadership excellence is accessible
                        to all, and where diverse perspectives drive innovation and
                        positive change.
                      </p>
                    </div>

                    <AnimatedButton 
                      href="/contact" 
                      variant="outline"
                      className="mt-8 border-blue-300 hover:border-blue-500 dark:border-blue-700 dark:hover:border-blue-500 shadow-lg group flex items-center gap-2"
                    >
                      Get Involved
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </AnimatedButton>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-gray-900 py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-blue-50/50 dark:bg-blue-900/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-50/50 dark:bg-blue-900/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
          
          <div className="container-wide relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide border border-blue-100 dark:border-blue-800/30">
                OUR CORE VALUES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400">Principles that guide us</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                The principles that guide our organization and community in fostering leadership excellence across Canada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="group relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-400 flex items-center justify-center text-white shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.1] mix-blend-overlay"></div>
                      <value.icon className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-1 -left-1 w-4 h-4 border border-blue-200 dark:border-blue-800/30 rounded-md opacity-50"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {value.description}
                  </p>
                  
                  {/* Decorative number */}
                  <div className="absolute -bottom-6 -right-6 text-[80px] font-bold text-blue-100 dark:text-blue-900/30 opacity-50">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-50/30 dark:bg-blue-900/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-50/30 dark:bg-blue-900/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
          
          <div className="container-wide relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium tracking-wide border border-blue-100 dark:border-blue-800/30">
                OUR IMPACT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400">What we've accomplished together</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Our collective achievements in fostering leadership excellence and building a strong professional community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                { value: 500, label: "Active Members", suffix: "+", decimal: 0, icon: "👥" },
                { value: 48, label: "Events Hosted", suffix: "", decimal: 0, icon: "🎯" },
                { value: 120, label: "Mentorship Connections", suffix: "+", decimal: 0, icon: "🤝" },
                { value: 25, label: "Corporate Partners", suffix: "", decimal: 0, icon: "🏢" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 text-center overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="mb-4 inline-flex">
                    <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl">
                      {stat.icon}
                    </div>
                  </div>
                  
                  {/* Stat */}
                  <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}{stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                    {stat.label}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 border border-blue-200 dark:border-blue-800/30 rounded-lg opacity-30 rotate-12"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-20">
              <AnimatedButton 
                href="/events" 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg group flex items-center gap-2 mx-auto"
              >
                View Our Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </AnimatedButton>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6 text-sm max-w-md mx-auto">
                Join us at our next event to connect with like-minded professionals and expand your network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
