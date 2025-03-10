"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const navigation = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "Our Mission", href: "/mission" },
      { name: "Board of Directors", href: "/board" },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
  },
  { name: "Events", href: "/events" },
  {
    name: "Resources",
    href: "/resources",
    submenu: [
      { name: "Knowledge Hub", href: "/knowledge" },
      { name: "Downloads", href: "/resources" },
    ],
  },
  { name: "Sponsors", href: "/sponsors" },
];
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };
  const handleKeyDown = (e, name) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubmenu(name);
    }
  };
  // Check if the current path matches a navigation item or its submenu
  const isActive = (item) => {
    var _a;
    if (pathname === item.href) return true;
    if (
      (_a = item.submenu) === null || _a === void 0
        ? void 0
        : _a.some((subItem) => pathname === subItem.href)
    )
      return true;
    return false;
  };
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-gray-800 backdrop-blur-md shadow-md py-2 text-white"
          : "bg-gray-800/90 py-4 text-white"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
              <Image
                src={
                  isScrolled
                    ? "/LOTA LOGO white backgroud.png"
                    : "/LOTA LOGO transparent background.png"
                }
                alt="LOTA Canada Logo"
                width={64}
                height={64}
                className="object-contain scale-110"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-bold text-2xl leading-tight tracking-wide transition-colors duration-300",
                  "text-white"
                )}
              >
                LOTA
              </span>
              <span
                className={cn(
                  "text-sm font-medium tracking-wider transition-colors duration-300",
                  "text-primary"
                )}
              >
                CANADA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      onKeyDown={(e) => handleKeyDown(e, item.name)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item)
                          ? "text-primary bg-gray-700"
                          : "text-white hover:text-primary hover:bg-gray-700",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      )}
                      aria-expanded={openSubmenu === item.name}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          openSubmenu === item.name ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                        >
                          <div className="py-1" role="none">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  "block px-4 py-2 text-sm",
                                  pathname === subItem.href
                                    ? "bg-gray-100 dark:bg-gray-700 text-primary font-medium"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                                role="menuitem"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
                      isActive(item)
                        ? "text-primary bg-gray-700"
                        : "text-white hover:text-primary hover:bg-gray-700",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full transition-colors duration-300 h-12 w-12",
                    "text-white hover:bg-gray-700"
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] sm:w-[350px] pt-16 bg-gray-800 text-white border-l border-gray-700"
              >
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <div key={item.name} className="space-y-2">
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className={cn(
                              "flex items-center justify-between w-full px-2 py-2 text-base font-medium rounded-md",
                              isActive(item)
                                ? "text-primary bg-gray-700"
                                : "text-white hover:bg-gray-700/50 hover:text-primary"
                            )}
                          >
                            {item.name}
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform",
                                openSubmenu === item.name ? "rotate-180" : ""
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-4"
                              >
                                <div className="py-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-1">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className={cn(
                                        "block py-2 text-sm rounded-md",
                                        pathname === subItem.href
                                          ? "text-primary font-medium"
                                          : "text-gray-600 dark:text-gray-300 hover:text-primary"
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-2 py-2 text-base font-medium rounded-md",
                            isActive(item)
                              ? "text-primary bg-gray-700"
                              : "text-white hover:bg-gray-700/50 hover:text-primary"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button className="w-full" size="lg">
                    Join Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className={cn(
                "transition-all duration-300 border-white/30 text-white hover:bg-gray-700 hover:border-white/50"
              )}
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="transition-transform hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90"
            >
              <Link href="/contact">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
