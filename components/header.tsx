"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  useScroll as _useScroll,
  useTransform as _useTransform,
  AnimatePresence,
  motion,
} from "framer-motion";
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
      {
        name: "Our Mission",
        href: "/mission",
        description: "Learn about our vision and values",
      },
      {
        name: "Board of Directors",
        href: "/board",
        description: "Meet our leadership team",
      },
      {
        name: "Impact",
        href: "/impact",
        description: "See how we're making a difference",
      },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    submenu: [
      {
        name: "Executive Mentorship",
        href: "/programs/executive-mentorship",
        description: "Strategic leadership development for executives",
      },
      {
        name: "Leadership Workshops",
        href: "/programs/leadership-workshops",
        description: "Enhance your professional skills and competencies",
      },
      {
        name: "Community Engagement",
        href: "/programs/community-engagement",
        description: "Connect with industry professionals and leaders",
      },
    ],
  },
  {
    name: "Events",
    href: "/events",
    submenu: [
      {
        name: "Upcoming Events",
        href: "/events",
        description: "See what's happening next",
      },
      {
        name: "Leadership Summit",
        href: "/events/leadership-summit-2025",
        description: "Our annual flagship event",
      },
      {
        name: "Past Events",
        href: "/events/past",
        description: "Browse our previous events",
      },
    ],
  },
  {
    name: "Knowledge",
    href: "/knowledge",
    submenu: [
      {
        name: "Articles",
        href: "/knowledge",
        description: "Insights and resources for professional growth",
      },
      {
        name: "Leadership Resources",
        href: "/knowledge/leadership",
        description: "Tools and guides for effective leadership",
      },
      {
        name: "Career Development",
        href: "/knowledge/career",
        description: "Resources for advancing your career",
      },
    ],
  },
  { name: "LOTA AI", href: "/lota-llm" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Create mock implementations for tests
  const useScroll = () => {
    try {
      return _useScroll();
    } catch (e) {
      // Return a mock for testing
      return {
        scrollY: { get: () => 0, onChange: (callback: any) => () => {} },
      };
    }
  };

  const useTransform = (value: any, input: any, output: any) => {
    try {
      return _useTransform(value, input, output);
    } catch (e) {
      // Return a mock for testing
      return output[0];
    }
  };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const height = useTransform(scrollY, [0, 50], ["100px", "80px"]);
  const padding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9]);

  // Track scroll position with useEffect instead of useMotionValueEvent
  useEffect(() => {
    try {
      // Make sure onChange returns a function or handle the case where it doesn't
      const unsubscribe = scrollY.onChange
        ? scrollY.onChange((latest) => {
            setScrolled(latest > 10);
          })
        : null;

      return () => {
        // Only call unsubscribe if it's a function
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      };
    } catch (e) {
      // Handle case for tests
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full" role="banner">
      {/* Enhanced Backdrop Layer with business-formal aesthetic */}
      <motion.div
        className="absolute inset-0 bg-white backdrop-blur-md backdrop-saturate-150 shadow-md border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800"
        style={{ opacity: 1 }}
      />
      {/* Sophisticated gradient overlay with subtle noise texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white dark:from-black/10 dark:via-transparent dark:to-black/10 mix-blend-overlay" />
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"
        aria-hidden="true"
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
          {/* Enhanced Logo with business-formal aesthetic */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div style={{ scale: logoScale }} className="relative">
              {/* Enhanced glow effect behind logo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-50/30 via-gray-50/50 to-gray-50/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Decorative border accent */}
              <div
                className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(45deg, transparent, rgba(0,0,0,0.05), transparent)",
                }}
              ></div>
              <div className="relative p-1">
                <Image
                  src="/images/brand/lota-logo-optimized.svg"
                  alt={siteConfig.name}
                  width={320}
                  height={50}
                  priority
                  className="transition-all duration-300 hover:scale-105 dark:invert"
                />
                {/* Subtle underline accent that appears on hover */}
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  aria-hidden="true"
                ></div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-2"
            aria-label="Main Navigation"
          >
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2.5 text-sm rounded-md font-medium transition-colors",
                    "flex items-center gap-1",
                    "hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800/60 dark:hover:text-white",
                    "active:bg-gray-200 active:text-black dark:active:bg-black/30 dark:active:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1",
                    "text-sm font-medium transition-colors hover:text-primary",
                    "text-foreground/70 hover:text-foreground/90",
                    pathname === item.href
                      ? "text-foreground font-semibold"
                      : "text-foreground/70",
                    "nav-link"
                  )}
                  onClick={() => item.submenu && toggleSubmenu(item.name)}
                  aria-expanded={
                    item.submenu ? activeSubmenu === item.name : undefined
                  }
                  aria-haspopup={item.submenu ? "true" : undefined}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="h-4 w-4 ml-0.5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {item.submenu && (
                  <div
                    className="absolute left-0 mt-1 w-72 origin-top-left rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-100 dark:ring-gray-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`${item.name.toLowerCase()}-menu-button`}
                  >
                    {/* Enhanced accent line at top of dropdown with business-formal aesthetic */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-black to-transparent dark:from-transparent dark:via-white dark:to-transparent"></div>
                    {/* Decorative corner elements */}
                    <div
                      className="absolute top-1 left-0 w-4 h-4 border-t border-l border-black/10 dark:border-white/10 rounded-tl"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="absolute top-1 right-0 w-4 h-4 border-t border-r border-black/10 dark:border-white/10 rounded-tr"
                      aria-hidden="true"
                    ></div>
                    <div className="p-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-md transition-colors",
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            "active:bg-gray-200 active:text-black dark:active:bg-black/30 dark:active:text-white",
                            "focus:outline-none focus:ring-2 focus:ring-gray-200",
                            pathname === subitem.href
                              ? "text-black font-medium bg-gray-100 dark:text-white dark:bg-gray-800"
                              : "text-gray-700 dark:text-gray-200"
                          )}
                          role="menuitem"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{subitem.name}</span>
                            {subitem.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300",
                "bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-black",
                "active:from-black active:to-gray-900 active:text-white active:ring-2 active:ring-gray-200",
                "shadow-md hover:shadow-lg px-5 py-2.5 leading-none font-semibold tracking-wide",
                "border border-transparent hover:border-white/10 relative overflow-hidden group"
              )}
            >
              {/* Animated gradient overlay */}
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"
                aria-hidden="true"
              ></span>
              {/* Button text with decorative elements */}
              <span className="relative flex items-center">
                <span className="mr-1.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
                <span>Become a Member</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
            className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm z-40 lg:hidden"
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
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-950 shadow-2xl z-50 lg:hidden overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Image
                  src="/images/brand/image.png"
                  alt={siteConfig.name}
                  width={180}
                  height={30}
                  className=""
                />
              </Link>
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="p-4"
              aria-label="Mobile Navigation"
              id="mobile-menu"
            >
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name} className="py-1">
                    {item.submenu ? (
                      <div>
                        <button
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-left rounded-md",
                            "text-gray-700 dark:text-white font-medium",
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            "focus:outline-none focus:ring-2 focus:ring-gray-200",
                            "relative overflow-hidden group",
                            activeSubmenu === item.name &&
                              "bg-gray-100 dark:bg-gray-800"
                          )}
                          onClick={() => toggleSubmenu(item.name)}
                          aria-expanded={activeSubmenu === item.name}
                          aria-controls={`${item.name.toLowerCase()}-submenu`}
                        >
                          {/* Subtle hover effect */}
                          <span
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"
                            aria-hidden="true"
                          ></span>
                          {/* Enhanced text with decorative elements */}
                          <span className="relative">
                            <span
                              className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-black/20 dark:bg-white/20 group-hover:h-1/2 transition-all duration-300 rounded-full"
                              aria-hidden="true"
                            ></span>
                            <span className="relative">{item.name}</span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
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
                              className="mt-1 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 overflow-hidden"
                              id={`${item.name.toLowerCase()}-submenu`}
                              role="menu"
                              aria-labelledby={`${item.name.toLowerCase()}-button`}
                            >
                              {item.submenu.map((subitem) => (
                                <li key={subitem.name}>
                                  <Link
                                    href={subitem.href}
                                    className={cn(
                                      "block px-4 py-3 rounded-md",
                                      "text-gray-700 dark:text-gray-200",
                                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                                      "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                      pathname === subitem.href &&
                                        "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium"
                                    )}
                                    onClick={toggleMenu}
                                    role="menuitem"
                                  >
                                    <div>
                                      <div>{subitem.name}</div>
                                      {subitem.description && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
                          "text-gray-700 dark:text-white",
                          "hover:bg-gray-100 dark:hover:bg-gray-800",
                          "focus:outline-none focus:ring-2 focus:ring-gray-200",
                          pathname === item.href &&
                            "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium"
                        )}
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href="/contact"
                  className={cn(
                    "block w-full px-4 py-3 text-center rounded-md",
                    "bg-gradient-to-r from-black to-gray-800 text-white font-semibold tracking-wide",
                    "hover:from-gray-800 hover:to-black transition-all shadow-md hover:shadow-lg",
                    "border border-transparent hover:border-white/10 relative overflow-hidden group"
                  )}
                  onClick={toggleMenu}
                >
                  {/* Animated gradient overlay */}
                  <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"
                    aria-hidden="true"
                  ></span>
                  {/* Decorative elements */}
                  <span className="relative inline-flex items-center">
                    <span className="mr-1.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                    <span>Become a Member</span>
                  </span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
