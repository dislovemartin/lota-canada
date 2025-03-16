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
import { useEffect } from "react";
import { ArrowRight, Calendar, ChevronRight, Download, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Since we're using "use client", we can't export metadata this way
// We'll use a separate file or custom SEO components
const pageMetadata = {
  title: "Our Impact | LOTA Canada",
  description: "Discover the measurable impact of LOTA Canada's initiatives on communities, businesses, and individuals across the country.",
};

// Impact structured data component
function ImpactStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Our Impact | LOTA Canada',
          'description': 'Discover the measurable impact of LOTA Canada\'s initiatives on communities, businesses, and individuals across the country.',
          'url': 'https://lota-canada.vercel.app/impact',
          'mainEntity': {
            '@type': 'Organization',
            'name': 'LOTA Canada',
            'url': 'https://lota-canada.vercel.app',
            'sameAs': [
              'https://twitter.com/lotacanada',
              'https://www.linkedin.com/company/lota-canada',
              'https://www.facebook.com/lotacanada'
            ]
          }
        })
      }}
    />
  );
}

export default function ImpactPage() {
  // State for success stories carousel
  const [activeStory, setActiveStory] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);
  
  // Impact initiatives data
  const impactInitiatives = [
    {
      title: "Youth Leadership Development",
      description: "Empowering the next generation of leaders through mentorship, workshops, and hands-on experience.",
      image: "/images/impact/1.svg",
      category: "Education",
      href: "/impact/youth-leadership",
    },
    {
      title: "Small Business Support Program",
      description: "Providing resources, training, and networking opportunities to help small businesses thrive.",
      image: "/images/impact/2.svg",
      category: "Economic",
      href: "/impact/business-support",
    },
    {
      title: "Community Health Initiatives",
      description: "Promoting wellness and health education through community-based programs and partnerships.",
      image: "/images/impact/3.svg",
      category: "Health",
      href: "/impact/community-health",
    },
    {
      title: "Digital Literacy Campaign",
      description: "Bridging the digital divide by providing technology access and education to underserved communities.",
      image: "/images/impact/mentorship-icon.svg",
      category: "Education",
      href: "/impact/digital-literacy",
    },
    {
      title: "Environmental Conservation Projects",
      description: "Protecting natural resources through sustainable practices and community engagement.",
      image: "/images/impact/partners-icon.svg",
      category: "Environment",
      href: "/impact/environmental",
    },
    {
      title: "Cultural Heritage Preservation",
      description: "Celebrating and preserving diverse cultural traditions through documentation and education.",
      image: "/images/impact/events-icon.svg",
      category: "Cultural",
      href: "/impact/cultural-heritage",
    },
  ];

  // Success stories data
  const successStories = [
    {
      title: "Transforming Tech Education in Rural Communities",
      description: "Our digital literacy program has reached over 5,000 individuals in rural areas, providing essential technology skills and career opportunities.",
      impact: "5,000+ individuals trained, 72% reporting improved job prospects",
      image: "/images/impact/impact-stat-1.svg",
      testimonial: "The digital literacy program changed my life. I was able to start my own online business and now employ three people from my community.",
      author: "Maria Chen",
      location: "Northern Ontario"
    },
    {
      title: "Revitalizing Local Economies Through Small Business",
      description: "Our small business accelerator has helped launch and scale over 120 local businesses, creating jobs and economic growth in underserved communities.",
      impact: "120+ businesses supported, 350+ new jobs created",
      image: "/images/impact/impact-stat-2.svg",
      testimonial: "The mentorship and resources provided by LOTA gave me the confidence and skills to grow my business from 2 to 15 employees in just 18 months.",
      author: "James Wilson",
      location: "Vancouver, BC"
    },
    {
      title: "Environmental Innovation in Urban Communities",
      description: "Our green spaces initiative has transformed abandoned lots into community gardens, improving environmental conditions and food security.",
      impact: "15 community gardens established, 2,500+ residents benefiting",
      image: "/images/impact/impact-stat-3.svg",
      testimonial: "The community garden has become the heart of our neighborhood, providing fresh food and bringing people together across generations.",
      author: "Sophia Rodriguez",
      location: "Montreal, QC"
    },
  ];

  // State for impact initiatives filtering
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredInitiatives, setFilteredInitiatives] = useState(impactInitiatives);

  // Get unique categories from impact initiatives
  const categories = ["all", ...Array.from(new Set(impactInitiatives.map(initiative => initiative.category)))];
  
  // Filter initiatives by category
  // Fix the useState hook to useEffect
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredInitiatives(impactInitiatives);
    } else {
      setFilteredInitiatives(impactInitiatives.filter(initiative => initiative.category === activeCategory));
    }
  }, [activeCategory, impactInitiatives]);

  // Handle success stories carousel
  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
  };

  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <PageTransition>
      {/* Structured Data for SEO */}
      <ImpactStructuredData />
      
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Impact", href: "/impact", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Section - Netflix Inspired */}
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
          
          {/* Background gradient - Netflix inspired red */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-red-800/20 mix-blend-multiply" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <motion.div 
            className="container-wide relative z-10"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                className="text-red-500 font-bold tracking-wide uppercase mb-4 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-black mr-3" />
                Measuring Our Success
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-black ml-3" />
              </motion.p>
              
              <AnimatedHeading
                title="Our Impact"
                subtitle="Discover how LOTA Canada is making a meaningful difference through strategic initiatives and community partnerships."
                variant="gradient"
                highlight
                align="center"
                size="xl"
                animated={true}
                staggerDelay={0.03}
                className="mb-8"
              />
              
              <div className="w-20 h-1 bg-gradient-to-r from-black to-gray-700 mx-auto mb-8 rounded-full"></div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="#statistics" 
                  variant="gradient" 
                  size="lg"
                  className="px-8 shadow-lg shadow-black/20 bg-black hover:bg-gray-800 font-bold"
                  aria-label="View our impact statistics"
                >
                  Impact Statistics
                </AnimatedButton>
                <AnimatedButton 
                  href="#stories" 
                  variant="outline" 
                  size="lg"
                  className="px-8 border-black hover:border-gray-800 text-black hover:text-gray-800 hover:bg-gray-100/10 font-bold"
                  aria-label="Read our success stories"
                >
                  Success Stories
                </AnimatedButton>
                <AnimatedButton 
                  href="#initiatives" 
                  variant="glass" 
                  size="lg"
                  className="px-8 text-gray-300 hover:text-white font-bold"
                  aria-label="Explore our impact initiatives"
                >
                  Impact Initiatives
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
            <div className="w-12 h-12 rounded-full bg-black shadow-md flex items-center justify-center border border-gray-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LOTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics - Netflix Inspired */}
        <section id="statistics" className="py-24 bg-black text-white">
          <div className="container-wide">
            <AnimatedHeading
              title="Impact By The Numbers"
              subtitle="Quantifiable results that demonstrate our commitment to creating positive change."
              align="center"
              variant="gradient"
              highlight
              animated={true}
              staggerDelay={0.03}
            />
            
            <div className="w-20 h-1 bg-gradient-to-r from-black to-gray-700 mx-auto mb-12 rounded-full"></div>

            <div className="bg-gray-900 rounded-xl shadow-md border border-gray-800 p-6 mb-12">
              <AnimatedStats
                stats={[
                  { value: 12000, label: "Individuals Impacted", suffix: "+", decimal: 0 },
                  { value: 85, label: "Community Partners", suffix: "", decimal: 0 },
                  { value: 92, label: "Success Rate", suffix: "%", decimal: 0 },
                  { value: 4.2, label: "Million in Resources", prefix: "$", decimal: 1 },
                ]}
                variant="cards"
                columns={4}
                animated={true}
                duration={2}
                delay={0.3}
                className="gap-6"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden hover:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative gradient border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-700"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-white text-sm font-bold">01</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Economic Impact</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Our initiatives have contributed significantly to local economies through job creation, skills development, and business growth support.
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">250</span>
                      </div>
                      <span className="text-sm text-gray-400">New Jobs Created</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">45</span>
                      </div>
                      <span className="text-sm text-gray-400">Businesses Supported</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden hover:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Decorative gradient border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-700"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-white text-sm font-bold">02</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Social Impact</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                  We've fostered stronger communities through mentorship programs, educational initiatives, and support for vulnerable populations.
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">5K+</span>
                      </div>
                      <span className="text-sm text-gray-400">Mentorship Hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">35</span>
                      </div>
                      <span className="text-sm text-gray-400">Community Programs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden hover:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Decorative gradient border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-700"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-white text-sm font-bold">03</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Environmental Impact</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Our sustainability initiatives have contributed to environmental conservation and promoted eco-friendly practices across communities.
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">15</span>
                      </div>
                      <span className="text-sm text-gray-400">Green Initiatives</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center mr-2">
                        <span className="text-gray-300 text-xs font-medium">20%</span>
                      </div>
                      <span className="text-sm text-gray-400">Carbon Reduction</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 text-center">
              <AnimatedButton
                href="/reports/annual-impact-2024.pdf"
                variant="outline"
                size="lg"
                className="px-8 shadow-sm bg-black hover:bg-gray-800 text-white border-none font-bold"
                aria-label="Download our full impact report"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Full Impact Report
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Success Stories - Netflix Inspired */}
        <section id="stories" className="py-24 bg-black text-white relative">
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeading
                title="Success Stories"
                subtitle="Real examples of how our initiatives are creating meaningful change across communities."
                variant="gradient"
                highlight
                align="center"
                animated={true}
              />
              <div className="w-20 h-1 bg-gradient-to-r from-black to-gray-700 mx-auto mt-6 mb-12 rounded-full"></div>
            </div>
            
            {/* Success Stories Carousel */}
            <div className="relative" ref={storyRef}>
              <div className="overflow-hidden">
                {successStories.map((story, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                      index === activeStory ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                    )}
                    style={{ 
                      display: index === activeStory ? "block" : "none" 
                    }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: index === activeStory ? 1 : 0,
                      x: index === activeStory ? 0 : 100
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-800 relative overflow-hidden hover:bg-gray-800 transition-colors duration-300">
                        {/* Decorative gradient border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-700"></div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">{story.title}</h3>
                        
                        <p className="text-gray-300 mb-6">
                          {story.description}
                        </p>
                        
                        <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center mr-2 shadow-sm">
                              <ChevronRight className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="text-sm font-semibold text-white">Impact Metrics</h4>
                          </div>
                          <p className="text-red-400 font-medium">
                            {story.impact}
                          </p>
                        </div>
                        
                        <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-300 mb-6">
                          "{story.testimonial}"
                        </blockquote>
                        
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-medium">
                            {story.author.split(' ').map(name => name[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">{story.author}</p>
                            <p className="text-sm text-gray-400">{story.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl group">
                        {/* Decorative border */}
                        <div className="absolute inset-0 border-2 border-red-600/30 rounded-xl z-10 pointer-events-none" aria-hidden="true" />
                        
                        <Image
                          src={story.image}
                          alt={`LOTA Impact: ${story.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Netflix-inspired overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10" />
                        
                        {/* Corner decorative elements */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-red-600/40 rounded-tl-xl z-20 pointer-events-none" aria-hidden="true" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-red-600/40 rounded-tr-xl z-20 pointer-events-none" aria-hidden="true" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-red-600/40 rounded-bl-xl z-20 pointer-events-none" aria-hidden="true" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-red-600/40 rounded-br-xl z-20 pointer-events-none" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-center mt-12 gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-red-600 text-red-600 hover:bg-red-900/20 hover:text-red-500"
                  onClick={prevStory}
                  aria-label="Previous success story"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </Button>
                
                <div className="flex items-center gap-2">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        index === activeStory
                          ? "w-8 bg-red-600"
                          : "w-2 bg-gray-700 hover:bg-red-900"
                      )}
                      onClick={() => setActiveStory(index)}
                      aria-label={`Go to success story ${index + 1}`}
                      aria-current={index === activeStory ? "true" : "false"}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-red-600 text-red-600 hover:bg-red-900/20 hover:text-red-500"
                  onClick={nextStory}
                  aria-label="Next success story"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <AnimatedButton
                href="/impact/stories"
                variant="primary"
                size="lg"
                className="shadow-lg shadow-black/10 px-8"
                aria-label="View all success stories"
              >
                View All Success Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        <div className="relative">
          <SectionDivider 
            variant="wave" 
            color="primary" 
            height="md" 
            animated={true}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-black shadow-md flex items-center justify-center border border-gray-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LOTA</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Community Initiatives - Netflix Inspired */}
        <section id="initiatives" className="py-24 bg-black text-white relative">
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeading
                title="Community Initiatives"
                subtitle="Explore our ongoing programs and initiatives making a difference across Canada."
                variant="gradient"
                highlight
                align="center"
                animated={true}
              />
              <div className="w-20 h-1 bg-gradient-to-r from-black to-gray-700 mx-auto mt-6 mb-12 rounded-full"></div>
            </div>
            
            {/* Filter buttons - Netflix Inspired */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full px-6 capitalize font-medium",
                    activeCategory === category 
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md" 
                      : "hover:bg-red-900/20 border-red-600 text-red-600 hover:text-red-500"
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Initiatives grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ModernCard
                    title={initiative.title}
                    description={initiative.description}
                    imageSrc={initiative.image}
                    imageAlt={`LOTA Initiative: ${initiative.title}`}
                    href={initiative.href}
                    className="h-full bg-card hover:bg-card/80 transition-colors duration-300 border-gold/30 text-foreground"
                    variant="elevated"
                  />
                  {/* Add badge separately if needed */}
                </motion.div>
              ))}
            </div>
            
            {filteredInitiatives.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No initiatives found in this category.</p>
              </div>
            )}
            
            <div className="mt-16 text-center">
              <AnimatedButton
                href="/programs"
                variant="outline"
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border-none font-bold px-8 shadow-sm"
                aria-label="Explore all our programs"
              >
                Explore All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Get Involved CTA */}
        <section id="get-involved" className="py-24 bg-gradient-to-r from-black to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedHeading
                title="Join Us in Creating Change"
                subtitle="Together, we can build stronger communities and create lasting impact across Canada."
                variant="gradient"
                align="center"
                animated={true}
              />
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/get-involved/volunteer"
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-gray-500/20 px-8"
                  aria-label="Volunteer with LOTA Canada"
                >
                  Volunteer With Us
                </AnimatedButton>
                
                <AnimatedButton
                  href="/get-involved/donate"
                  variant="outline"
                  size="lg"
                  className="border-white/30 hover:bg-white/10 px-8"
                  aria-label="Donate to LOTA Canada"
                >
                  Make a Donation
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
