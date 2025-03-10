"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

// Define types for navigation items
interface SubmenuItem {
  name: string
  href: string
}

interface NavigationItem {
  name: string
  href: string
  submenu?: SubmenuItem[]
}

const navigation: NavigationItem[] = [
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
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, name: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleSubmenu(name)
    } else if (e.key === "Escape") {
      e.preventDefault()
      setActiveSubmenu(null)
    }
  }

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-[9999] transition-all duration-300 top-[40px]",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-900/95" : "bg-transparent",
      )}
      role="banner"
    >
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:bg-white focus:text-black focus:p-4 focus:m-4 focus:rounded">
        Skip to main content
      </a>
      
      <div className="container-wide mx-auto">
        <nav
          className="flex items-center justify-between h-16 px-4 lg:px-6 py-4 mx-auto max-w-7xl whitespace-nowrap"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0 mr-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center" aria-label="LOTA - Leaders of Tomorrow Association - Home">
              <span className="sr-only">LOTA - Leaders of Tomorrow Association</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOTA%20LOGO%20transparent%20background-wgq7j7Ds3Bm7HWdTlI1nizMUcPicmN.png"
                alt="LOTA"
                width={150}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop navigation - centered */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
            <div className="flex items-center gap-1 xl:gap-2" role="menubar">
              {navigation.map((item, index) => (
                <div key={item.name} className="relative group px-2 xl:px-3" role="none">
                  {item.submenu ? (
                    <>
                      <button
                        className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors py-2 px-1"
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onClick={() => toggleSubmenu(item.name)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, item.name)}
                        aria-expanded={activeSubmenu === item.name}
                        aria-haspopup="menu"
                        aria-controls={`submenu-${item.name}`}
                        role="menuitem"
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "ml-1 h-4 w-4 transition-transform",
                            activeSubmenu === item.name ? "rotate-180" : "",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-20"
                            onMouseLeave={() => setActiveSubmenu(null)}
                            id={`submenu-${item.name}`}
                            role="menu"
                            aria-label={`${item.name} submenu`}
                          >
                            <div className="py-1">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                  role="menuitem"
                                  onClick={() => setActiveSubmenu(null)}
                                >
                                  {subitem.name}
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
                      className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2 px-1 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  )}
                  {index < navigation.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-px bg-gray-200 dark:bg-gray-700 hidden xl:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button and CTA Button container */}
          <div className="flex items-center space-x-4 flex-nowrap flex-shrink-0">
            {/* CTA Button */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground"
                  aria-label="Open main menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs" id="mobile-menu" aria-label="Main navigation">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5" aria-label="LOTA - Leaders of Tomorrow Association - Home">
                    <span className="sr-only">LOTA - Leaders of Tomorrow Association</span>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOTA%20LOGO%20transparent%20background-wgq7j7Ds3Bm7HWdTlI1nizMUcPicmN.png"
                      alt="LOTA"
                      width={150}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="space-y-1 py-6" role="menu">
                    {navigation.map((item) => (
                      <div key={item.name} role="none">
                        {item.submenu ? (
                          <>
                            <button
                              className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                              onClick={() => toggleSubmenu(item.name)}
                              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, item.name)}
                              aria-expanded={activeSubmenu === item.name}
                              aria-haspopup="menu"
                              aria-controls={`mobile-submenu-${item.name}`}
                              role="menuitem"
                            >
                              {item.name}
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  activeSubmenu === item.name ? "rotate-180" : "",
                                )}
                                aria-hidden="true"
                              />
                            </button>
                            <AnimatePresence>
                              {activeSubmenu === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                  id={`mobile-submenu-${item.name}`}
                                  role="menu"
                                  aria-label={`${item.name} submenu`}
                                >
                                  <div className="pl-6 space-y-1 py-2">
                                    {item.submenu.map((subitem) => (
                                      <Link
                                        key={subitem.name}
                                        href={subitem.href}
                                        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md"
                                        onClick={() => setMobileMenuOpen(false)}
                                        role="menuitem"
                                      >
                                        {subitem.name}
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
                            className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                            role="menuitem"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile CTA Button */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

