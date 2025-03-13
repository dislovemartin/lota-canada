import { useEffect, useRef, useState } from 'react';
/**
 * LazyLoad component that renders children only when they enter the viewport
 *
 * @param children - Content to lazy load
 * @param placeholder - Optional placeholder to show while loading
 * @param threshold - Intersection observer threshold (0-1)
 * @param rootMargin - Intersection observer root margin
 * @param className - CSS class for the container
 * @param placeholderClassName - CSS class for the placeholder
 * @param onVisible - Callback function when content becomes visible
 * @param height - Container height
 * @param width - Container width
 * @param once - Whether to disconnect observer after first visibility
 */
export function LazyLoad({ children, placeholder, threshold = 0.1, rootMargin = '200px 0px', className = '', placeholderClassName = 'animate-pulse bg-gray-200 dark:bg-gray-800 rounded', onVisible, height, width, once = true, }) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        const current = containerRef.current;
        // Skip if already visible (for once=true)
        if (once && hasBeenVisible)
            return;
        // Skip if no container or IntersectionObserver not supported
        if (!current || typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                setHasBeenVisible(true);
                if (onVisible)
                    onVisible();
                if (once)
                    observer.disconnect();
            }
            else if (!once) {
                setIsVisible(false);
            }
        }, { threshold, rootMargin });
        observer.observe(current);
        return () => {
            if (current)
                observer.unobserve(current);
        };
    }, [threshold, rootMargin, once, onVisible, hasBeenVisible]);
    // For SSR, render placeholder on first pass
    useEffect(() => {
        // Check if we're in a browser environment with requestIdleCallback
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            // Use requestIdleCallback with proper typing
            window.requestIdleCallback(() => {
                // If still not visible after idle, check if it's in viewport now
                if (!isVisible && containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) +
                        parseInt(rootMargin) &&
                        rect.bottom >= 0;
                    if (isInViewport) {
                        setIsVisible(true);
                        setHasBeenVisible(true);
                        if (onVisible)
                            onVisible();
                    }
                }
            });
        }
    }, [isVisible, rootMargin, onVisible]);
    const containerStyle = {
        height: !isVisible && height ? height : undefined,
        width: !isVisible && width ? width : undefined,
        minHeight: !isVisible && height ? height : undefined,
        minWidth: !isVisible && width ? width : undefined,
    };
    return (<div ref={containerRef} className={className} style={containerStyle} data-loaded={isVisible}>
      {isVisible ? (children) : placeholder ? (placeholder) : (<div className={placeholderClassName} style={{ height: height || '100%', width: width || '100%' }} aria-hidden="true"/>)}
    </div>);
}
