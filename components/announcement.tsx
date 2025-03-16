"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AnnouncementProps {
  messages: string[];
  interval?: number;
  className?: string;
  showCloseButton?: boolean;
  storageKey?: string;
  // Allow any HTML attributes to be passed to the component
  [key: string]: any;
}

export default function Announcement({
  messages,
  interval = 5000,
  className,
  showCloseButton = true,
  storageKey = "announcement-dismissed",
  ...props
}: AnnouncementProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        setIsVisible(false);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isVisible || isPaused || messages.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isPaused, messages.length, interval]);

  const handleClose = () => {
    setIsVisible(false);
    // Save to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
    }
  };

  if (!isVisible || messages.length === 0) return null;

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-2 relative overflow-hidden",
        "fixed top-0 left-0 right-0 z-50 h-[40px] flex items-center shadow-md",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Announcements"
      aria-live="polite"
      {...props}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-500/10 to-transparent"></div>
      </div>
      <div className="container-wide relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4 sm:px-8 py-1 flex items-center"
          >
            {/* Decorative dot */}
            <div className="hidden sm:block w-2 h-2 rounded-full bg-blue-300 mr-3"></div>
            <span className="text-sm sm:text-base font-medium tracking-wide"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {messages[currentIndex]}
            </span>
            {/* Decorative dot */}
            <div className="hidden sm:block w-2 h-2 rounded-full bg-blue-300 ml-3"></div>
          </motion.div>
        </AnimatePresence>

        {showCloseButton && (
          <button
            type="button"
            className="absolute right-4 p-1.5 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-500/30 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white group"
            onClick={handleClose}
            aria-label="Close announcement"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClose();
              }
            }}
          >
            <span className="sr-only">Close</span>
            <X className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Progress indicator */}
      {messages.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700/30 via-blue-600/30 to-blue-700/30">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: interval / 1000,
              ease: "linear",
              repeat: isPaused ? 0 : 1,
              repeatType: "loop",
              repeatDelay: 0,
            }}
            key={currentIndex}
          />
        </div>
      )}
      
      {/* Decorative dots for visual interest */}
      <div className="absolute top-1 left-4 w-1.5 h-1.5 rounded-full bg-blue-400/40"></div>
      <div className="absolute top-3 left-8 w-1 h-1 rounded-full bg-blue-400/30"></div>
      <div className="absolute top-2 right-12 w-1 h-1 rounded-full bg-blue-400/30"></div>
      <div className="absolute top-4 right-6 w-1.5 h-1.5 rounded-full bg-blue-400/40"></div>
    </div>
  );
}
