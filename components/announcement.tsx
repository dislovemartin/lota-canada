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
}

export default function Announcement({
  messages,
  interval = 5000,
  className,
  showCloseButton = true,
  storageKey = "announcement-dismissed",
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
        "bg-black text-white py-2 relative overflow-hidden",
        "fixed top-0 left-0 right-0 z-50 h-[40px] flex items-center",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="polite"
    >
      <div className="container-wide relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4 sm:px-8 py-1"
          >
            <span className="text-sm sm:text-base font-medium">
              {messages[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>

        {showCloseButton && (
          <button
            type="button"
            className="absolute right-4 p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={handleClose}
            aria-label="Close announcement"
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Progress indicator */}
      {messages.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
          <motion.div
            className="h-full bg-white"
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
    </div>
  );
}
