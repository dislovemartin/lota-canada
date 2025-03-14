
interface OrganizationStructuredDataProps {
    name: string
    url: string
    logo: string
    description: string
    sameAs?: string[]
    address?: {
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
    }
    telephone?: string
    email?: string
}

export function OrganizationStructuredData({
    name,
    url,
    logo,
    description,
    sameAs = [],
    address,
    telephone,
    email,
}: OrganizationStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        sameAs,
        ...(address && {
            address: {
                '@type': 'PostalAddress',
                ...address,
            },
        }),
        ...(telephone && { telephone }),
        ...(email && { email }),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface LocalBusinessStructuredDataProps {
    name: string
    url: string
    logo: string
    description: string
    image?: string
    priceRange?: string
    address: {
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
    }
    geo?: {
        latitude: number
        longitude: number
    }
    telephone: string
    email?: string
    openingHours?: string[]
    sameAs?: string[]
}

export function LocalBusinessStructuredData({
    name,
    url,
    logo,
    description,
    image,
    priceRange,
    address,
    geo,
    telephone,
    email,
    openingHours,
    sameAs = [],
}: LocalBusinessStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name,
        url,
        logo,
        description,
        ...(image && { image }),
        ...(priceRange && { priceRange }),
        address: {
            '@type': 'PostalAddress',
            ...address,
        },
        ...(geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: geo.latitude,
                longitude: geo.longitude,
            },
        }),
        telephone,
        ...(email && { email }),
        ...(openingHours && { openingHoursSpecification: openingHours }),
        sameAs,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface WebSiteStructuredDataProps {
    name: string
    url: string
    description: string
    publisher: {
        name: string
        logo: string
    }
    potentialAction?: {
        target: string
    }
}

export function WebSiteStructuredData({
    name,
    url,
    description,
    publisher,
    potentialAction,
}: WebSiteStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        description,
        publisher: {
            '@type': 'Organization',
            name: publisher.name,
            logo: {
                '@type': 'ImageObject',
                url: publisher.logo,
            },
        },
        ...(potentialAction && {
            potentialAction: {
                '@type': 'SearchAction',
                target: potentialAction.target,
                'query-input': 'required name=search_term',
            },
        }),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface EventStructuredDataProps {
    name: string
    description: string
    startDate: string
    endDate: string
    location: {
        name: string
        address: string
    }
    image: string
    url: string
    organizer: {
        name: string
        url: string
    }
    offers?: {
        price: string
        priceCurrency: string
        availability: string
        url: string
        validFrom: string
    }
    performer?: string
    eventStatus?: string
    eventAttendanceMode?: string
}

export function EventStructuredData({
    name,
    description,
    startDate,
    endDate,
    location,
    image,
    url,
    organizer,
    offers,
    performer,
    eventStatus = 'https://schema.org/EventScheduled',
    eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode',
}: EventStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        endDate,
        location: {
            '@type': 'Place',
            name: location.name,
            address: location.address,
        },
        image,
        url,
        organizer: {
            '@type': 'Organization',
            name: organizer.name,
            url: organizer.url,
        },
        ...(offers && {
            offers: {
                '@type': 'Offer',
                ...offers,
            },
        }),
        ...(performer && { performer }),
        eventStatus,
        eventAttendanceMode,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface ArticleStructuredDataProps {
    headline: string
    description: string
    image: string
    datePublished: string
    dateModified?: string
    author: {
        name: string
        url?: string
    }
    publisher: {
        name: string
        logo: string
    }
    url: string
    keywords?: string[]
    articleSection?: string
    isAccessibleForFree?: boolean
}

export function ArticleStructuredData({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    publisher,
    url,
    keywords,
    articleSection,
    isAccessibleForFree = true,
}: ArticleStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Person',
            name: author.name,
            ...(author.url && { url: author.url }),
        },
        publisher: {
            '@type': 'Organization',
            name: publisher.name,
            logo: {
                '@type': 'ImageObject',
                url: publisher.logo,
            },
        },
        url,
        ...(keywords && { keywords }),
        ...(articleSection && { articleSection }),
        isAccessibleForFree,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface FAQStructuredDataProps {
    questions: Array<{
        question: string
        answer: string
    }>
}

export function FAQStructuredData({ questions }: FAQStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

interface BreadcrumbStructuredDataProps {
    items: Array<{
        name: string
        item: string
    }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
} 