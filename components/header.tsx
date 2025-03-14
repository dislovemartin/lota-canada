"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for navigation items
interface SubmenuItem {
  name: string;
  href: string;
  description?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubmenuItem[];
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "Our Mission", href: "/mission", description: "Learn about our vision and values" },
      { name: "Board of Directors", href: "/board", description: "Meet our leadership team" },
      { name: "Impact", href: "/impact", description: "See how we're making a difference" },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    submenu: [
      { name: "Executive Mentorship", href: "/programs/executive-mentorship", description: "Strategic leadership development for executives" },
      { name: "Leadership Workshops", href: "/programs/leadership-workshops", description: "Enhance your professional skills and competencies" },
      { name: "Community Engagement", href: "/programs/community-engagement", description: "Connect with industry professionals and leaders" },
    ],
  },
  {
    name: "Events",
    href: "/events",
    submenu: [
      { name: "Upcoming Events", href: "/events", description: "See what's happening next" },
      { name: "Leadership Summit", href: "/events/leadership-summit-2025", description: "Our annual flagship event" },
      { name: "Past Events", href: "/events/past", description: "Browse our previous events" },
    ],
  },
  {
    name: "Knowledge",
    href: "/knowledge",
    submenu: [
      { name: "Articles", href: "/knowledge", description: "Insights and resources for professional growth" },
      { name: "Leadership Resources", href: "/knowledge/leadership", description: "Tools and guides for effective leadership" },
      { name: "Career Development", href: "/knowledge/career", description: "Resources for advancing your career" },
    ],
  },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const height = useTransform(scrollY, [0, 50], ["100px", "80px"]);
  const padding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9]);

  // Track scroll position with useEffect instead of useMotionValueEvent
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 10);
    });
    
    return () => unsubscribe();
  }, [scrollY]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu((prev) => (prev === name ? null : name));
  };

  const headerVariants = {
    initial: { y: -100 },
    enter: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full mt-3">
      {/* Backdrop Layer */}
      <motion.div 
        className="absolute inset-0 bg-gray-900 dark:bg-gray-950 backdrop-blur-md backdrop-saturate-150 shadow-sm border-b border-gray-800"
        style={{ opacity }}
      />

      {/* Main Header Content */}
      <motion.div 
        className="container-wide relative z-10"
        style={{ height, padding }}
        variants={headerVariants}
        initial="initial"
        animate="enter"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pt-2">
            <motion.div style={{ scale: logoScale }}>
              <Image 
                src="/images/brand/image.png" 
                alt={siteConfig.name} 
                width={240} 
                height={40} 
                className="transition-transform hover:scale-105 brightness-125"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md font-medium transition-colors",
                    "flex items-center gap-1",
                    "hover:bg-gray-800 dark:hover:bg-gray-700",
                    "active:bg-blue-800 active:text-blue-100 dark:active:bg-blue-700 dark:active:text-blue-100",
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-gray-200 dark:text-gray-200"
                  )}
                  onClick={() => item.submenu && toggleSubmenu(item.name)}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="h-4 w-4 ml-0.5 text-gray-300 group-hover:text-white dark:group-hover:text-white transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-72 origin-top-left rounded-md bg-gray-900 dark:bg-gray-900 shadow-lg ring-1 ring-gray-700 dark:ring-gray-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
                    <div className="p-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-md transition-colors",
                            "hover:bg-gray-800 dark:hover:bg-gray-800",
                            "active:bg-blue-800 active:text-blue-100 dark:active:bg-blue-800 dark:active:text-blue-100",
                            pathname === subitem.href
                              ? "text-white font-medium bg-gray-800 dark:bg-gray-800"
                              : "text-gray-200 dark:text-gray-200"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{subitem.name}</span>
                            {subitem.description && (
                              <span className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
                                {subitem.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "bg-blue-600 text-white hover:bg-blue-700",
                "active:bg-blue-800 active:text-white active:ring-2 active:ring-blue-300",
                "shadow-md px-4 py-2 leading-none font-bold"
              )}
            >
              Become a Member
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-white dark:text-white lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <motion.div 
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu (Slide-in Panel) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gray-900 dark:bg-gray-950 shadow-xl z-50 lg:hidden overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <Image 
                  src="/images/brand/image.png" 
                  alt={siteConfig.name} 
                  width={180} 
                  height={30}
                  className="brightness-125" 
                />
              </Link>
              <button
                type="button"
                className="p-2 rounded-md text-white dark:text-white"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name} className="py-1">
                    {item.submenu ? (
                      <div>
                        <button
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-left rounded-md",
                            "text-white dark:text-white font-medium",
                            "hover:bg-gray-800 dark:hover:bg-gray-800",
                            activeSubmenu === item.name && "bg-gray-800 dark:bg-gray-800"
                          )}
                          onClick={() => toggleSubmenu(item.name)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeSubmenu === item.name && "rotate-180"
                            )} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-1 ml-4 pl-4 border-l border-gray-700 dark:border-gray-700 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subitem) => (
                                <li key={subitem.name}>
                                  <Link
                                    href={subitem.href}
                                    className={cn(
                                      "block px-4 py-3 rounded-md",
                                      "text-gray-200 dark:text-gray-200",
                                      "hover:bg-gray-800 dark:hover:bg-gray-800",
                                      pathname === subitem.href && "bg-gray-800 dark:bg-gray-800 text-white dark:text-white font-medium"
                                    )}
                                    onClick={toggleMenu}
                                  >
                                    <div>
                                      <div>{subitem.name}</div>
                                      {subitem.description && (
                                        <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
                                          {subitem.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-md",
                          "text-white dark:text-white",
                          "hover:bg-gray-800 dark:hover:bg-gray-800",
                          pathname === item.href && "bg-gray-800 dark:bg-gray-800 font-medium"
                        )}
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-800 dark:border-gray-800">
                <Link
                  href="/contact"
                  className={cn(
                    "block w-full px-4 py-3 text-center rounded-md",
                    "bg-blue-600 text-white font-bold",
                    "hover:bg-blue-700"
                  )}
                  onClick={toggleMenu}
                >
                  Become a Member
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
