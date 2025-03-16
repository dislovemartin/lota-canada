"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
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

export function ResponsiveNavigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/images/brand/lota-logo.svg"
            alt="LOTA Canada Logo"
            width={120}
            height={40}
            className={cn(
              "transition-all duration-300",
              scrolled ? "h-8 w-auto" : "h-10 w-auto"
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <button
                  className={cn(
                    "flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  )}
                  onClick={() => toggleSubmenu(item.name)}
                  aria-expanded={activeSubmenu === item.name}
                  aria-controls={`submenu-${item.name}`}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === item.name ? "rotate-180" : ""
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-1 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              )}

              {/* Desktop Submenu */}
              {item.submenu && (
                <div
                  id={`submenu-${item.name}`}
                  className={cn(
                    "absolute left-0 mt-2 w-64 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all",
                    "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  )}
                >
                  <div className="grid gap-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === subItem.href
                            ? "bg-gray-100 text-primary"
                            : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                        )}
                      >
                        <div className="font-medium">{subItem.name}</div>
                        {subItem.description && (
                          <div className="mt-1 text-xs text-gray-500">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-10 p-2"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 z-40 bg-white lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-4 overflow-y-auto">
                <nav className="flex-1 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name} className="py-1">
                      {item.submenu ? (
                        <div>
                          <button
                            className={cn(
                              "flex w-full items-center justify-between py-2 text-base font-medium",
                              pathname === item.href
                                ? "text-primary"
                                : "text-gray-700"
                            )}
                            onClick={() => toggleSubmenu(item.name)}
                            aria-expanded={activeSubmenu === item.name}
                            aria-controls={`mobile-submenu-${item.name}`}
                          >
                            {item.name}
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform",
                                activeSubmenu === item.name ? "rotate-180" : ""
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {activeSubmenu === item.name && (
                              <motion.div
                                id={`mobile-submenu-${item.name}`}
                                className="mt-1 ml-4 space-y-1"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={cn(
                                      "block py-2 text-sm",
                                      pathname === subItem.href
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-primary"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-2 text-base font-medium",
                            pathname === item.href
                              ? "text-primary"
                              : "text-gray-700 hover:text-primary"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block w-full py-3 px-4 rounded-md bg-primary text-white text-center font-medium hover:bg-primary-dark transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 