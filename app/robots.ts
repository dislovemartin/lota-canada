import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/private/', '/api/'],
        },
        sitemap: 'https://lota-canada.vercel.app/sitemap.xml',
    }
} 