"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NavigationItem } from "./types";

interface MobileMenuProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ navigation, isOpen, onClose }: MobileMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="
              fixed right-0 top-0 h-full w-full max-w-sm 
              bg-gradient-to-b from-background to-background/98
              border-l border-border shadow-2xl z-50
              backdrop-blur-sm
            "
          >
            <div className="flex flex-col h-full">
              <div className="overflow-y-auto flex-1 p-6">
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="border-b border-border/50 last:border-0"
                    >
                      {item.submenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="
                            flex items-center justify-between w-full py-3
                            text-foreground hover:text-accent
                            transition-colors duration-200
                          "
                        >
                          <span className="text-base font-medium">
                            {item.name}
                          </span>
                          <motion.span
                            animate={{
                              rotate: activeSubmenu === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "anticipate" }}
                          >
                            <ChevronDown className="h-5 w-5" />
                          </motion.span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="
                            block py-3 text-base font-medium
                            text-foreground hover:text-accent
                            transition-colors duration-200
                          "
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      )}

                      {item.submenu && (
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.3 },
                                  opacity: { duration: 0.2, delay: 0.1 },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.3 },
                                  opacity: { duration: 0.2 },
                                },
                              }}
                              className="overflow-hidden bg-muted/30 rounded-md"
                            >
                              <div className="py-2 px-4 space-y-2">
                                {item.submenu.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: subIndex * 0.1,
                                      duration: 0.2,
                                    }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      className="
                                        block py-2 text-sm
                                        text-muted-foreground hover:text-accent
                                        transition-colors duration-200
                                      "
                                      onClick={onClose}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
