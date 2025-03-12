/**
 * Basic analytics module for tracking events
 */

interface TrackEventOptions {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
}

/**
 * Track an event for analytics purposes
 * This is a placeholder implementation that can be replaced with actual analytics tracking
 * like Google Analytics, Mixpanel, etc.
 */
export function trackEvent(
    eventName: string,
    options: TrackEventOptions = {}
): void {
    // In production, this would send data to an analytics service
    if (process.env.NODE_ENV === "production") {
        // Example implementation for when you add a real analytics service:
        // window.gtag?.("event", eventName, options);
        console.log(`[Analytics] ${eventName}`, options);
    } else {
        // In development, just log to console
        console.log(`[Analytics] ${eventName}`, options);
    }
}

/**
 * Track a page view
 */
export function trackPageView(url: string): void {
    trackEvent("page_view", { url });
}

/**
 * Initialize analytics
 */
export function initAnalytics(): void {
    // Initialize your analytics service here
    if (typeof window !== "undefined") {
        // Example: Setup listeners for route changes in Next.js
        // router.events.on("routeChangeComplete", trackPageView);
    }
} 