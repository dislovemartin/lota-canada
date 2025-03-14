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

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top pattern */}
      <div className="h-24 bg-gradient-to-b from-black/0 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="grid grid-cols-20 h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5" />
          ))}
        </div>
      </div>
      
      <div className="container-wide pt-12 pb-8 relative">
        {/* Background accents */}
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl"
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
          className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-3xl"
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
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-20 pt-10 relative z-10"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand column */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.svg"
                alt={siteConfig.name}
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold tracking-tight">{siteConfig.name}</h3>
            </Link>
            <p className="text-gray-400 max-w-xs mb-6">
              Empowering professionals through networking, mentorship, and leadership development opportunities across Canada.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Navigation columns */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Programs</h3>
            <ul className="space-y-3">
              {navigation.programs.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Resources</h3>
            <ul className="space-y-3">
              {navigation.knowledge.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / Newsletter */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@lotacanada.org" className="text-gray-400 hover:text-white transition-colors duration-200">
                  info@lotacanada.org
                </a>
              </div>
              <form className="mt-6">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border border-white/10 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-gray-400"
                    placeholder="Join our newsletter"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
