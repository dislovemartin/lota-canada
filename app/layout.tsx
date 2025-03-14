import { Analytics } from "@/components/analytics";
import Announcement from "@/components/announcement";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocalBusinessStructuredData, OrganizationStructuredData, WebSiteStructuredData } from "@/components/structured-data";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | LOTA Canada - Leaders of Tomorrow Association",
    default: "LOTA Canada - Leaders of Tomorrow Association",
  },
  description:
    "Empowering the next generation of business leaders and professionals in Toronto and beyond.",
  generator: "Next.js",
  applicationName: "LOTA Canada",
  referrer: "origin-when-cross-origin",
  keywords: [
    "leadership",
    "business networking",
    "professional development",
    "Toronto",
    "Canada",
    "mentorship",
    "leadership development",
    "career advancement",
    "professional growth",
    "business leaders",
    "networking events",
    "leadership workshops",
    "business community",
    "leadership skills",
  ],
  authors: [{ name: "LOTA Canada" }],
  creator: "LOTA Canada",
  publisher: "LOTA Canada",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "LOTA Canada - Leaders of Tomorrow Association",
    description:
      "Empowering the next generation of business leaders and professionals in Toronto and beyond.",
    url: "https://lota-canada.vercel.app",
    siteName: "LOTA Canada",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://lota-canada.vercel.app/images/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LOTA Canada - Leaders of Tomorrow Association",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOTA Canada - Leaders of Tomorrow Association",
    description:
      "Empowering the next generation of business leaders and professionals in Toronto and beyond.",
    images: ["https://lota-canada.vercel.app/images/brand/twitter-image.jpg"],
    creator: "@lotacanada",
  },
  alternates: {
    canonical: "https://lota-canada.vercel.app",
    languages: {
      'en-CA': 'https://lota-canada.vercel.app',
    },
  },
  category: 'business'
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Announcement
            messages={[
              "Join us for our upcoming Leadership Workshop - Register Now!",
              "New mentorship opportunities available - Apply Today!",
              "Visit lotacanada.com for more information about our programs.",
            ]}
          />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          
          {/* Accessibility Skip Link (hidden visually but available for screen readers) */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
          >
            Skip to main content
          </a>

          {/* Structured Data for SEO */}
          <OrganizationStructuredData
            name="LOTA Canada - Leaders of Tomorrow Association"
            url="https://lota-canada.vercel.app"
            logo="https://lota-canada.vercel.app/images/brand/lota-logo.svg"
            description="Empowering the next generation of business leaders and professionals in Toronto and beyond."
            sameAs={[
              "https://twitter.com/lotacanada",
              "https://www.facebook.com/lotacanada",
              "https://www.linkedin.com/company/lotacanada",
              "https://www.instagram.com/lotacanada"
            ]}
            address={{
              streetAddress: "123 Leadership Avenue",
              addressLocality: "Toronto",
              addressRegion: "ON",
              postalCode: "M5V 2N4",
              addressCountry: "CA"
            }}
            telephone="+14165551234"
            email="info@lotacanada.org"
          />

          <LocalBusinessStructuredData
            name="LOTA Canada - Leaders of Tomorrow Association"
            url="https://lota-canada.vercel.app"
            logo="https://lota-canada.vercel.app/images/brand/lota-logo.svg"
            description="Empowering the next generation of business leaders and professionals in Toronto and beyond."
            image="https://lota-canada.vercel.app/images/brand/office-location.jpg"
            priceRange="$$"
            address={{
              streetAddress: "123 Leadership Avenue",
              addressLocality: "Toronto",
              addressRegion: "ON",
              postalCode: "M5V 2N4",
              addressCountry: "CA"
            }}
            geo={{
              latitude: 43.6532,
              longitude: -79.3832
            }}
            telephone="+14165551234"
            email="info@lotacanada.org"
            openingHours={[
              "Monday-Friday 09:00-17:00",
              "Saturday 10:00-15:00"
            ]}
            sameAs={[
              "https://twitter.com/lotacanada",
              "https://www.facebook.com/lotacanada",
              "https://www.linkedin.com/company/lotacanada",
              "https://www.instagram.com/lotacanada"
            ]}
          />

          <WebSiteStructuredData
            name="LOTA Canada - Leaders of Tomorrow Association"
            url="https://lota-canada.vercel.app"
            description="Empowering the next generation of business leaders and professionals in Toronto and beyond."
            publisher={{
              name: "LOTA Canada",
              logo: "https://lota-canada.vercel.app/images/brand/lota-logo.svg"
            }}
            potentialAction={{
              target: "https://lota-canada.vercel.app/search?q={search_term}"
            }}
          />
          
          <Suspense fallback={<div className="hidden">Loading analytics...</div>}>
            <Analytics />
          </Suspense>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
