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
import React from "react";

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
        {/* Enhanced grid pattern with LOTA emblem */}
        <div className="grid grid-cols-20 h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5 relative" />
          ))}
        </div>
        {/* Decorative LOTA emblem */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-5">
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse-slow"></div>
          <div className="absolute inset-2 rounded-full border border-white/20"></div>
          <div className="absolute inset-4 rounded-full border border-white/10"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-serif tracking-widest">LOTA</div>
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
        {/* Enhanced decorative elements - Business formal aesthetic */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Diagonal border lines */}
          <div className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] border-t border-l border-white/20 rounded-tl-[100px] transform -rotate-6"></div>
          <div className="absolute -bottom-[5%] -right-[5%] w-[110%] h-[110%] border-b border-r border-white/20 rounded-br-[100px] transform -rotate-6"></div>
          
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-8 left-8 w-1 h-10 bg-gradient-to-b from-white/40 to-transparent" aria-hidden="true"></div>
            <div className="absolute top-8 left-8 w-10 h-1 bg-gradient-to-r from-white/40 to-transparent" aria-hidden="true"></div>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-8 right-8 w-1 h-10 bg-gradient-to-b from-white/40 to-transparent" aria-hidden="true"></div>
            <div className="absolute top-8 right-8 w-10 h-1 bg-gradient-to-l from-white/40 to-transparent" aria-hidden="true"></div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16 pt-10 relative z-10"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Enhanced Brand column with business-formal aesthetic */}
          <motion.div className="lg:col-span-1 footer-column" variants={itemVariants}>
            <Link href="/" className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md group">
              {/* Enhanced logo container with sophisticated gradients and animations */}
              <div className="relative p-2 mb-4 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-md border border-white/20 shadow-lg overflow-hidden group-hover:shadow-white/5 transition-all duration-300">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" aria-hidden="true"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" aria-hidden="true"></div>
                <Image
                  src="/images/brand/lota-logo-new.svg"
                  alt="LOTA Canada logo"
                  width={180}
                  height={45}
                  className="relative z-10 transform group-hover:scale-105 transition-transform duration-300 brand-logo"
                />
              </div>
              {/* Enhanced title with decorative elements */}
              <div className="relative">
                <div className="absolute -top-2 left-0 w-20 h-px bg-gradient-to-r from-white/50 to-transparent" aria-hidden="true"></div>
                <div className="absolute -bottom-2 right-0 w-12 h-px bg-gradient-to-l from-white/30 to-transparent" aria-hidden="true"></div>
                <h3 className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{siteConfig.name}</h3>
              </div>
            </Link>
            {/* Enhanced description with decorative elements */}
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              <p className="text-gray-300 max-w-xs leading-relaxed pl-4">
                Empowering professionals through networking, mentorship, and leadership development opportunities across Canada.
              </p>
            </div>
            {/* Enhanced social icons with sophisticated hover effects */}
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md"
                  aria-label={item.name}
                >
                  {/* Decorative hover effect */}
                  <span className="absolute -inset-2 rounded-full bg-white/0 group-hover:bg-white/5 transform scale-0 group-hover:scale-100 transition-all duration-300" aria-hidden="true"></span>
                  <item.icon className="h-5 w-5 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Navigation columns with business-formal aesthetic */}
          <motion.div className="lg:col-span-1 footer-column" variants={itemVariants}>
            <div className="relative mb-5">
              {/* Enhanced vertical accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              {/* Decorative dot accent */}
              <div className="absolute -left-4 top-0 w-1 h-1 bg-white/80 rounded-full shadow-glow-sm" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-navigation">
                <span className="relative">
                  Navigation
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                </span>
              </h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-navigation">
              {navigation.main.map((item, index) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative"
                  >
                    {/* Subtle hover background effect */}
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-md transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
                    {/* Enhanced link text with sophisticated hover effects */}
                    <span className="relative overflow-hidden pr-6 py-1">
                      <span className="relative z-10 flex items-center">
                        {/* Subtle dot indicator that appears on hover */}
                        <span className="w-0 h-0 group-hover:w-1 group-hover:h-1 mr-0 group-hover:mr-2 bg-white rounded-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                        {item.name}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white/80 to-white/20 group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1 footer-column" variants={itemVariants}>
            <div className="relative mb-5">
              {/* Enhanced vertical accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              {/* Decorative dot accent */}
              <div className="absolute -left-4 top-0 w-1 h-1 bg-white/80 rounded-full shadow-glow-sm" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-programs">
                <span className="relative">
                  Programs
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                </span>
              </h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-programs">
              {navigation.programs.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative"
                  >
                    {/* Subtle hover background effect */}
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-md transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
                    {/* Enhanced link text with sophisticated hover effects */}
                    <span className="relative overflow-hidden pr-6 py-1">
                      <span className="relative z-10 flex items-center">
                        {/* Subtle dot indicator that appears on hover */}
                        <span className="w-0 h-0 group-hover:w-1 group-hover:h-1 mr-0 group-hover:mr-2 bg-white rounded-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                        {item.name}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white/80 to-white/20 group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1 footer-column" variants={itemVariants}>
            <div className="relative mb-5">
              {/* Enhanced vertical accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              {/* Decorative dot accent */}
              <div className="absolute -left-4 top-0 w-1 h-1 bg-white/80 rounded-full shadow-glow-sm" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-resources">
                <span className="relative">
                  Resources
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                </span>
              </h3>
            </div>
            <ul className="space-y-3" aria-labelledby="footer-resources">
              {navigation.knowledge.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative"
                  >
                    {/* Subtle hover background effect */}
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-md transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
                    {/* Enhanced link text with sophisticated hover effects */}
                    <span className="relative overflow-hidden pr-6 py-1">
                      <span className="relative z-10 flex items-center">
                        {/* Subtle dot indicator that appears on hover */}
                        <span className="w-0 h-0 group-hover:w-1 group-hover:h-1 mr-0 group-hover:mr-2 bg-white rounded-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                        {item.name}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white/80 to-white/20 group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                    </span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out text-white opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Contact / Newsletter section with business-formal aesthetic */}
          <motion.div className="lg:col-span-1 footer-column" variants={itemVariants}>
            <div className="relative mb-5">
              {/* Enhanced vertical accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" aria-hidden="true"></div>
              {/* Decorative dot accent */}
              <div className="absolute -left-4 top-0 w-1 h-1 bg-white/80 rounded-full shadow-glow-sm" aria-hidden="true"></div>
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide" id="footer-contact">
                <span className="relative">
                  Contact Us
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                </span>
              </h3>
            </div>
            <div className="space-y-4" aria-labelledby="footer-contact">
              {/* Enhanced email contact with sophisticated hover effects */}
              <div className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center border border-white/30 shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
                  <Mail className="h-4 w-4 text-white group-hover:text-gray-300 transition-colors duration-300 relative z-10" aria-hidden="true" />
                </div>
                <a href="mailto:info@lotacanada.org" className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative overflow-hidden">
                  <span className="relative">
                    info@lotacanada.org
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white/80 to-white/20 group-hover:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                  </span>
                </a>
              </div>
              
              {/* Enhanced newsletter form with business-formal aesthetic */}
              <form className="mt-8" aria-labelledby="newsletter-heading">
                <div className="relative mb-4">
                  {/* Decorative vertical accent */}
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 to-transparent" aria-hidden="true"></div>
                  {/* Decorative dot accent */}
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full" aria-hidden="true"></div>
                  <h4 id="newsletter-heading" className="text-sm font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-wide">
                    <span className="relative">
                      Subscribe to our newsletter
                      <span className="absolute -bottom-1 left-0 w-8 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                    </span>
                  </h4>
                </div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                {/* Enhanced input container with sophisticated gradients and decorative elements */}
                <div className="relative p-0.5 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-lg shadow-md">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 rounded-tl" aria-hidden="true"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 rounded-tr" aria-hidden="true"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 rounded-bl" aria-hidden="true"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 rounded-br" aria-hidden="true"></div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 bg-black rounded-md p-1">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto rounded-md border border-white/20 bg-black/50 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-gray-400 transition-colors duration-300"
                      placeholder="Your email address"
                      aria-describedby="email-description"
                    />
                    {/* Enhanced submit button with sophisticated hover effects */}
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-gradient-to-r from-white to-gray-300 px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:from-gray-300 hover:to-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 group relative overflow-hidden"
                      aria-label="Subscribe to newsletter"
                    >
                      {/* Animated gradient overlay */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></span>
                      {/* Button text with decorative elements */}
                      <span className="relative flex items-center justify-center">
                        <span className="mr-1.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                        <span>Subscribe</span>
                      </span>
                    </button>
                  </div>
                </div>
                {/* Privacy notice with subtle styling */}
                <p className="mt-2 text-xs text-gray-400 pl-1">
                  <span className="relative">
                    We respect your privacy. Unsubscribe anytime.
                  </span>
                </p>
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
          
          {/* Enhanced back to top button with business-formal aesthetic */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <a 
              href="#top" 
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-black to-gray-900 border border-white/30 shadow-lg hover:shadow-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
              aria-label="Back to top"
            >
              {/* Decorative animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
              
              {/* Decorative pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transform scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-in-out" aria-hidden="true"></div>
              
              <span className="sr-only">Back to top</span>
              
              {/* Enhanced arrow icon with sophisticated animation */}
              <div className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white group-hover:text-gray-300 transform group-hover:-translate-y-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                
                {/* Subtle dot accent that appears on hover */}
                <div className="absolute -top-1 w-1 h-1 bg-white/0 group-hover:bg-white/80 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300 delay-150" aria-hidden="true"></div>
              </div>
              
              {/* Enhanced tooltip with gradient text */}
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 transform group-hover:-translate-y-1 transition-all duration-300 font-medium tracking-wide">Top</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social media links - Enhanced with business-formal aesthetic */}
            <div className="mb-6 md:mb-0 md:order-2">
              <div className="relative">
                <h3 className="text-sm font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide hidden md:block">
                  <span className="relative">
                    Connect With Us
                    <span className="absolute -bottom-1 left-0 w-16 h-px bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true"></span>
                  </span>
                </h3>
                <div className="flex space-x-4">
                  {navigation.social.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-md hover:shadow-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black overflow-hidden" 
                      aria-label={item.name}
                    >
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
                      
                      {/* Decorative pulsing ring */}
                      <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transform scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out" aria-hidden="true"></div>
                      
                      <item.icon className="h-4 w-4 text-white group-hover:text-gray-300 transition-colors duration-300 relative z-10 transform group-hover:scale-110" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced copyright section */}
            <div className="md:order-1">
              <div className="relative">
                {/* Enhanced decorative dot with subtle glow */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-white/80 to-white/60 border border-white/30 shadow-glow-sm" aria-hidden="true"></div>
                
                {/* Enhanced copyright text with decorative elements */}
                <p className="text-white/70 text-sm font-light relative">
                  <span className="relative inline-flex items-center">
                    <span className="mr-1 opacity-60">&copy;</span> {new Date().getFullYear()} 
                    <span className="mx-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-medium">{siteConfig.name}</span>
                    <span className="relative">
                      All rights reserved.
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-white/30 via-white/10 to-transparent" aria-hidden="true"></span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end md:ml-6">
              <div className="relative p-1 rounded-md bg-gradient-to-r from-transparent via-white/5 to-transparent">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl" aria-hidden="true"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br" aria-hidden="true"></div>
                
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 px-2">
                  {navigation.legal.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <Link
                        href={item.href}
                        className="group text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md relative overflow-hidden"
                      >
                        {/* Subtle hover background effect */}
                        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-md transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
                        
                        {/* Enhanced link text with sophisticated hover effects */}
                        <span className="relative z-10 px-2 py-1 flex items-center">
                          {/* Subtle dot indicator that appears on hover */}
                          <span className="w-0 h-0 group-hover:w-1 group-hover:h-1 mr-0 group-hover:mr-1 bg-white rounded-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
                          {item.name}
                        </span>
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/80 to-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" aria-hidden="true"></span>
                      </Link>
                      
                      {/* Add decorative separator between items except for the last one */}
                      {index < navigation.legal.length - 1 && (
                        <span className="text-gray-600 text-xs px-1 flex items-center">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
