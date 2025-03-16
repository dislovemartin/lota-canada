"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface LazyComponentProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
  onVisible?: () => void;
  once?: boolean;
  disabled?: boolean;
}

export function LazyComponent({
  children,
  className,
  threshold = 0.1,
  rootMargin = "100px 0px",
  placeholder,
  onVisible,
  once = true,
  disabled = false,
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(disabled);
  const [hasBeenVisible, setHasBeenVisible] = useState(disabled);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasBeenVisible(true);
            
            if (onVisible) {
              onVisible();
            }
            
            if (once) {
              observer.unobserve(currentRef);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [disabled, once, onVisible, rootMargin, threshold]);

  // Fallback for browsers without Intersection Observer
  useEffect(() => {
    if (!('IntersectionObserver' in window) && !disabled) {
      setIsVisible(true);
      setHasBeenVisible(true);
      if (onVisible) {
        onVisible();
      }
    }
  }, [disabled, onVisible]);

  return (
    <div ref={ref} className={cn("transition-opacity duration-500", className)}>
      {(isVisible || hasBeenVisible) ? children : placeholder || (
        <div className="w-full h-full min-h-[100px] bg-neutral-100 animate-pulse rounded" />
      )}
    </div>
  );
} 