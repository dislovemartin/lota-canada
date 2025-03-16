"use client";

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Add type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This function will be called on route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    // Track page view - you can implement your analytics platform here
    // Example for Google Analytics:
    window.gtag?.("config", "G-XXXXXXXXXX", {
      page_path: url,
    });
    
    // You can add other analytics tracking here as needed
  }, [pathname, searchParams]);

  return (
    <>
      {/* Google Analytics Script - Replace XXXXXXXXXX with your actual GA ID */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Vercel Analytics */}
      <VercelAnalytics />
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </>
  );
} 