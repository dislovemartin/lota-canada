"use client";

import { throttle } from "@/lib/performance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SmoothScrollProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function SmoothScroll({
  href,
  children,
  className,
  duration = 800,
  offset = 0,
  onClick,
}: SmoothScrollProps) {
  const router = useRouter();
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const isAnchor = href.startsWith('#');
  
  // Handle click event
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call the onClick prop if provided
    if (onClick) {
      onClick(e);
    }
    
    // If it's an external link or not an anchor link, let the default behavior happen
    if (isExternal || !isAnchor) {
      return;
    }
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      scrollToElement(targetElement);
    }
  };
  
  // Scroll to element function
  const scrollToElement = (element: HTMLElement) => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    
    // Calculate the distance to scroll
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    
    // Scroll animation function
    const easeInOutCubic = (t: number) => 
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    let start: number | null = null;
    
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const time = Math.min(1, progress / duration);
      
      window.scrollTo({
        top: startPosition + distance * easeInOutCubic(time),
        behavior: 'auto',
      });
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Update URL hash after scrolling is complete
        if (history.pushState) {
          history.pushState(null, '', href);
        } else {
          location.hash = href;
        }
        
        // Focus the element for accessibility
        element.tabIndex = -1;
        element.focus({ preventScroll: true });
      }
    };
    
    window.requestAnimationFrame(step);
  };
  
  // Handle hash changes in URL
  useEffect(() => {
    const handleHashChange = throttle(() => {
      const hash = window.location.hash;
      
      if (hash && hash === href) {
        const targetElement = document.getElementById(hash.substring(1));
        
        if (targetElement) {
          // Use a small timeout to ensure the DOM is fully loaded
          setTimeout(() => {
            scrollToElement(targetElement);
          }, 100);
        }
      }
    }, 100);
    
    // Check hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [href]);
  
  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
} 