"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, FileText, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// Sample article data - would typically come from an API or CMS
const articles = [
  {
    id: 1,
    title: "Effective Leadership in the Digital Age",
    excerpt: "Discover how leadership roles have evolved in the digital era and strategies for leading remote teams effectively.",
    category: "Leadership",
    author: "Jane Smith",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "effective-leadership-digital-age",
    featured: true,
  },
  {
    id: 2,
    title: "Building Professional Networks That Last",
    excerpt: "Learn how to create meaningful professional connections that enhance your career opportunities and growth.",
    category: "Networking",
    author: "Michael Brown",
    date: "February 28, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "building-professional-networks",
    featured: true,
  },
  {
    id: 3,
    title: "The Future of Work: Trends and Predictions",
    excerpt: "Explore emerging workplace trends and how professionals can prepare for the changing landscape of work.",
    category: "Career Development",
    author: "Sarah Johnson",
    date: "February 10, 2025",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "future-of-work-trends",
    featured: false,
  },
  {
    id: 4,
    title: "Mastering Public Speaking for Professionals",
    excerpt: "Tips and techniques to overcome nervousness and deliver impactful presentations in professional settings.",
    category: "Skill Development",
    author: "David Lee",
    date: "January 25, 2025",
    readTime: "7 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "mastering-public-speaking",
    featured: false,
  },
  {
    id: 5,
    title: "Diversity and Inclusion in the Workplace",
    excerpt: "How organizations can create more inclusive environments and the benefits of diverse teams.",
    category: "Workplace Culture",
    author: "Maria Gomez",
    date: "January 15, 2025",
    readTime: "9 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "diversity-inclusion-workplace",
    featured: false,
  },
  {
    id: 6,
    title: "Navigating Career Transitions Successfully",
    excerpt: "Strategies for managing career changes, industry shifts, and professional pivots with confidence.",
    category: "Career Development",
    author: "Robert Chen",
    date: "December 28, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=600&width=800",
    slug: "navigating-career-transitions",
    featured: false,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Leadership",
  "Networking",
  "Career Development",
  "Skill Development",
  "Workplace Culture",
];

function FeaturedArticleCard({ article }) {
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
      className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/knowledge/${article.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {article.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground mb-4">{article.excerpt}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime}
            </div>
          </div>
          <div className="mt-5 flex items-center text-blue-600 dark:text-blue-400 font-medium">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleCard({ article, index }) {
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
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/knowledge/${article.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {article.category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {article.readTime}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <PageTransition variant="fade">
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/knowledge", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Banner */}
        <div className="relative py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100L100 0H0V100Z" fill="white" />
              <path d="M100 100L0 0H100V100Z" fill="white" />
            </svg>
          </div>
          
          <div className="container-wide relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <FileText className="h-12 w-12 mx-auto mb-6 text-blue-300" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Knowledge Hub
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Insights, resources, and articles to help you develop your leadership skills and advance your career.
              </p>
              
              <div className="relative max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="subtle-bg py-16">
          <div className="container-wide mx-auto">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full",
                    selectedCategory === category 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "hover:bg-blue-50 dark:hover:bg-gray-800"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Featured Articles Section */}
            <AnimatedHeading
              title="Featured Articles"
              subtitle="Handpicked resources to help you on your professional journey"
              underline
              animated
              align="center"
              className="mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredArticles.map((article) => (
                <FeaturedArticleCard key={article.id} article={article} />
              ))}
            </div>

            <SectionDivider variant="wave" color="accent" height="sm" animated className="my-16" />

            {/* All Articles Grid */}
            <AnimatedHeading
              title={`${selectedCategory === 'All' ? 'All' : selectedCategory} Articles`}
              subtitle="Explore our collection of resources and insights"
              underline
              animated
              align="center"
              className="mb-10"
            />

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No articles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* More Articles Button */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <AnimatedButton href="/knowledge/archive" variant="outline" size="lg">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-50 dark:bg-gray-800 py-16">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedHeading
                title="Stay Updated"
                subtitle="Subscribe to our newsletter for the latest articles and resources"
                animated
                align="center"
                className="mb-8"
              />

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

