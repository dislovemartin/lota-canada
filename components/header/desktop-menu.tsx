"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { NavigationItem } from "./types";

interface DesktopMenuProps {
  navigation: NavigationItem[];
}

export function DesktopMenu({ navigation }: DesktopMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigation.map((item) => (
        <motion.div
          key={item.name}
          className="relative"
          onMouseEnter={() => setActiveSubmenu(item.name)}
          onMouseLeave={() => setActiveSubmenu(null)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link
            href={item.href}
            className={`
              relative text-sm font-medium py-2
              transition-colors duration-300
              group
              ${
                activeSubmenu === item.name
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }
            `}
          >
            {item.name}
            <motion.span
              className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent rounded-full"
              initial={false}
              animate={{ width: activeSubmenu === item.name ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </Link>

          {item.submenu && activeSubmenu === item.name && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 mt-2 w-48 rounded-md bg-popover shadow-lg ring-1 ring-border backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--popover)) 0%, hsl(var(--popover)/0.98) 100%)",
                  boxShadow:
                    "0 4px 24px -4px hsl(var(--border)/0.1), 0 2px 8px -2px hsl(var(--border)/0.1)",
                }}
              >
                <div className="py-2">
                  {item.submenu.map((subItem) => (
                    <motion.div
                      key={subItem.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={subItem.href}
                        className="
                          block px-4 py-2 text-sm text-popover-foreground
                          transition-colors duration-200
                          hover:bg-accent hover:text-accent-foreground
                          focus:bg-accent focus:text-accent-foreground focus:outline-none
                        "
                      >
                        {subItem.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      ))}
    </nav>
  );
}
