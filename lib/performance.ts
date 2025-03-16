/**
 * Debounce function to limit the rate at which a function can fire
 * @param func The function to debounce
 * @param wait The time to wait in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Memoize function to cache results of expensive function calls
 * @param func The function to memoize
 * @returns A memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    return result;
  };
}

/**
 * Lazy load an image and return a promise that resolves when the image is loaded
 * @param src The image source URL
 * @returns A promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

/**
 * Batch DOM operations to reduce layout thrashing
 * @param callback The callback function to execute in the next animation frame
 * @returns A function to cancel the scheduled callback
 */
export function scheduleDOMOperation(
  callback: () => void
): () => void {
  const requestId = requestAnimationFrame(() => {
    callback();
  });
  
  return () => cancelAnimationFrame(requestId);
}

/**
 * Check if the Intersection Observer API is supported
 * @returns Whether the Intersection Observer API is supported
 */
export function isIntersectionObserverSupported(): boolean {
  return 'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;
}

/**
 * Check if the browser supports the WebP image format
 * @returns A promise that resolves to a boolean indicating WebP support
 */
export async function supportsWebP(): Promise<boolean> {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
}

/**
 * Get the optimal image format based on browser support
 * @returns The optimal image format extension
 */
export async function getOptimalImageFormat(): Promise<'webp' | 'jpg'> {
  return (await supportsWebP()) ? 'webp' : 'jpg';
} 