import dynamic from 'next/dynamic';
/**
 * Creates a dynamically imported component with configurable loading state
 *
 * @param importFunc - Function that imports the component
 * @param options - Configuration options
 * @returns Dynamically loaded component
 */
export function createDynamicComponent(importFunc, options = {}) {
    const { loading = <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded min-h-[100px] w-full"/>, ssr = false, suspense = false, } = options;
    return dynamic(importFunc, {
        loading: () => <>{loading}</>,
        ssr,
        // Remove suspense property as it's not supported in this version of Next.js
    });
}
/**
 * Preloads a component to improve perceived performance
 *
 * @param importFunc - Function that imports the component
 */
export function preloadComponent(importFunc) {
    // This will trigger the import but not render anything
    // In Next.js 15, we can't use preload directly, so we'll use the import directly
    void importFunc();
}
/**
 * Dynamically imports a component when it's needed
 *
 * @param path - Path to the component
 * @param options - Configuration options
 * @returns Dynamically loaded component
 */
export function lazyComponent(path, options = {}) {
    return createDynamicComponent(() => import(path), options);
}
// Common components that might benefit from dynamic loading
export const DynamicHeroSection = lazyComponent('../components/hero-section');
export const DynamicProgramCard = lazyComponent('../components/program-card');
export const DynamicArticleCard = lazyComponent('../components/article-card');
export const DynamicEventCard = lazyComponent('../components/event-card');
export const DynamicUserTestimonials = lazyComponent('../components/user-testimonials');
export const DynamicIndustryInfo = lazyComponent('../components/industry-info');
export const DynamicAnnualEvent = lazyComponent('../components/annual-event');
export const DynamicAutoUpdatingBlogs = lazyComponent('../components/auto-updating-blogs');
