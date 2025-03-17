import { Analytics } from "@/components/analytics";
import Announcement from "@/components/announcement";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LOTALLMChat from "@/components/LOTALLMChat";
import {
    LocalBusinessStructuredData,
    OrganizationStructuredData,
    WebSiteStructuredData,
} from "@/components/structured-data";
import SubtleBackground from "@/components/subtle-background";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import FEATURE_FLAGS from "@/lib/featureFlags";
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
      "en-CA": "https://lota-canada.vercel.app",
    },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#121212" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="color-scheme" content="light dark" />

        {/* Preload critical resources for better LCP */}
        <link
          rel="preload"
          href="/images/hero/diverse-professionals.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/images/brand/lota-logo.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Accessibility Skip Link (placed at the top for keyboard users) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        >
          Skip to main content
        </a>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div>
            <Announcement
              messages={[
                "Join us for our upcoming Leadership Workshop - Register Now!",
                "New mentorship opportunities available - Apply Today!",
                "Visit lotacanada.com for more information about our programs.",
              ]}
              role="region"
              aria-label="Announcements"
            />
            <Header />
            <main id="main-content" className="flex-1 relative" tabIndex={-1}>
              <SubtleBackground className="z-0" />
              <div className="relative z-10">
                {children}
              </div>
            </main>
            <Footer />

            {/* LOTA-LLM Chat Widget */}
            {/* 
              Note: Replace 'your-embed-id-here' with your actual embed ID from your LOTA-LLM workspace.
              To get your embed ID:
              1. Access your LOTA-LLM instance at http://localhost:3000
              2. Create an account (if multi-user mode is enabled)
              3. Create a workspace
              4. Upload documents to the workspace
              5. Go to Settings > Embedding in the workspace
              6. Enable embedding and copy the embed ID
            */}
            <LOTALLMChat
              embedId="your-embed-id-here"
              disabled={!FEATURE_FLAGS.ENABLE_LOTA_LLM_CHAT}
              assistantName="LOTA AI Assistant"
              greeting="Hello! I'm the LOTA AI Assistant. How can I help you today?"
              buttonColor="#4a6cf7"
              apiUrl="http://localhost:3000/api/embed"
              scriptUrl="http://localhost:3000/embed/lota-llm-chat-widget.min.js"
            />

            {/* Skip link moved to top of document for better keyboard accessibility */}

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
                "https://www.instagram.com/lotacanada",
              ]}
              address={{
                streetAddress: "123 Leadership Avenue",
                addressLocality: "Toronto",
                addressRegion: "ON",
                postalCode: "M5V 2N4",
                addressCountry: "CA",
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
                addressCountry: "CA",
              }}
              geo={{
                latitude: 43.6532,
                longitude: -79.3832,
              }}
              telephone="+14165551234"
              email="info@lotacanada.org"
              openingHours={[
                "Monday-Friday 09:00-17:00",
                "Saturday 10:00-15:00",
              ]}
              sameAs={[
                "https://twitter.com/lotacanada",
                "https://www.facebook.com/lotacanada",
                "https://www.linkedin.com/company/lotacanada",
                "https://www.instagram.com/lotacanada",
              ]}
            />

            <WebSiteStructuredData
              name="LOTA Canada - Leaders of Tomorrow Association"
              url="https://lota-canada.vercel.app"
              description="Empowering the next generation of business leaders and professionals in Toronto and beyond."
              publisher={{
                name: "LOTA Canada",
                logo: "https://lota-canada.vercel.app/images/brand/lota-logo.svg",
              }}
              potentialAction={{
                target: "https://lota-canada.vercel.app/search?q={search_term}",
              }}
            />

            <Suspense
              fallback={<div className="hidden">Loading analytics...</div>}
            >
              <Analytics />
            </Suspense>
            <TailwindIndicator />

            {/* Immersive effects script - deferred for better performance */}
            <script
              src="/scripts/immersive-effects.js"
              async
              defer
              data-priority="low"
            ></script>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
