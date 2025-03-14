import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

// Custom SVG icons to replace Lucide icons
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export const metadata: Metadata = {
  title: "Page Not Found | LOTA Canada",
  description: "The page you are looking for could not be found. Please check the URL or navigate back to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-24 text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        The page you are looking for could not be found. It might have been moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
