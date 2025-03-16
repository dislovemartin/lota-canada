"use client";


import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Twitter,
    Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Knowledge", href: "/knowledge" },
    { name: "Contact", href: "/contact" },
  ],
  programs: [
    { name: "Mentorship Program", href: "/programs/mentorship" },
    { name: "Leadership Workshops", href: "/programs/leadership-workshops" },
    { name: "Community Engagement", href: "/programs/community-engagement" },
  ],
  knowledge: [
    { name: "Articles", href: "/knowledge/articles" },
    { name: "Resources", href: "/knowledge/resources" },
    { name: "Research", href: "/knowledge/research" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: Video,
    },
  ],
};

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <footer className="bg-black text-white" role="contentinfo">
      {/* Enhanced top pattern with business-formal aesthetic */}
      <div className="h-28 bg-gradient-to-b from-black/0 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        {/* Decorative top border with gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden="true" />
        <div className="absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden="true" />
        <div className="grid grid-cols-20 h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5" />
          ))}
        </div>
      </div>
      
      <div className="container-wide pt-16 pb-10 relative">
        {/* Enhanced background accents with business-formal aesthetic */}
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-white/10 to-transparent blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-gradient-radial from-white/10 to-transparent blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {/* Decorative diagonal lines - Business formal aesthetic */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] border-t border-l border-white/20 rounded-tl-[100px] transform -rotate-6"></div>
          <div className="absolute -bottom-[5%] -right-[5%] w-[110%] h-[110%] border-b border-r border-white/20 rounded-br-[100px] transform -rotate-6"></div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16 pt-10 relative z-10"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand column - Business formal aesthetic */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <Link href="/" className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md group">
              <div className="relative p-1 mb-4 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-md border border-white/20 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
                <Image
                  src="/images/brand/image.png"
                  alt="LOTA Canada logo"
                  width={180}
                  height={30}
                  className="relative z-10"
                />
              </div>
              <div className="relative">
                <div className="absolute -top-2 left-0 w-12 h-px bg-gradient-to-r from-white/50 to-transparent" aria-hidden="true"></div>
                <h3 className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{siteConfig.name}</h3>
              </div>
            </Link>
            <p className="text-gray-300 max-w-xs mb-6 leading-relaxed border-l-2 border-white/30 pl-4">
              Empowering professionals through networking, mentorship, and leadership development opportunities across Canada.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Navigation columns - Business formal aesthetic */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="relative mb-5">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-navigation">Navigation</h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-navigation">
              {navigation.main.map((item, index) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md"
                  >
                    <span className="relative overflow-hidden pr-6">
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="relative mb-5">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-programs">Programs</h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-programs">
              {navigation.programs.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md"
                  >
                    <span className="relative overflow-hidden pr-6">
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="relative mb-5">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-resources">Resources</h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-resources">
              {navigation.knowledge.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md"
                  >
                    <span className="relative overflow-hidden pr-6">
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / Newsletter */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="relative mb-5">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-contact">Contact Us</h3>
            </div>
            <div className="space-y-4" aria-labelledby="footer-contact">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center border border-white/30 shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Mail className="h-4 w-4 text-white group-hover:text-gray-300 transition-colors duration-300" aria-hidden="true" />
                </div>
                <a href="mailto:info@lotacanada.org" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md">
                  info@lotacanada.org
                </a>
              </div>
              <form className="mt-8" aria-labelledby="newsletter-heading">
                <div className="relative mb-4">
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 to-transparent" aria-hidden="true"></div>
                  <h4 id="newsletter-heading" className="text-sm font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Subscribe to our newsletter</h4>
                </div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative p-0.5 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row gap-2 bg-black rounded-md p-1">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto rounded-md border border-white/20 bg-black/50 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-gray-400 transition-colors duration-200"
                      placeholder="Your email address"
                      aria-describedby="email-description"
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-gradient-to-r from-white to-gray-300 px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:from-gray-300 hover:to-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 group relative overflow-hidden"
                      aria-label="Subscribe to newsletter"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></span>
                      <span className="relative flex items-center justify-center">
                        Subscribe
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="mt-20 pt-10 border-t border-white/20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Decorative top border with gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden="true" />
          
          {/* Back to top button */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <a 
              href="#top" 
              className="group flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-black to-gray-900 border border-white/30 shadow-lg hover:shadow-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Back to top"
            >
              <span className="sr-only">Back to top</span>
              <svg className="w-5 h-5 text-white group-hover:text-gray-300 transform group-hover:-translate-y-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-white transform group-hover:-translate-y-1 transition-all duration-300">Top</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 border border-white/30 shadow-sm" aria-hidden="true"></div>
                <p className="text-white/70 text-sm font-light">
                  &copy; {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{siteConfig.name}</span>. All rights reserved.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group text-gray-400 hover:text-white text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative overflow-hidden"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
