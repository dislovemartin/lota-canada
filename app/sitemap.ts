import { MetadataRoute } from 'next'

// Import article and program data
// In a real application, you would fetch this from your API or database
import { articles } from './knowledge/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lota-canada.vercel.app'

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/mission',
        '/programs',
        '/resources',
        '/knowledge',
        '/events',
        '/testimonials',
        '/sponsors',
        '/contact',
        '/login',
        '/faq',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes for knowledge articles
    const articleRoutes = articles.map(article => ({
        url: `${baseUrl}/knowledge/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Event routes
    const eventRoutes = [
        {
            url: `${baseUrl}/events/leadership-summit-2025`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }
    ]

    // Combine all routes
    return [
        ...staticRoutes,
        ...articleRoutes,
        ...eventRoutes,
    ]
} 