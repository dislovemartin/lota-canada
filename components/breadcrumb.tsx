import { BreadcrumbStructuredData } from "@/components/structured-data";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrent?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    // Create the structured data items
    const structuredDataItems = [
        {
            name: "Home",
            item: "https://lota-canada.vercel.app",
        },
        ...items.map((item) => ({
            name: item.label,
            item: `https://lota-canada.vercel.app${item.href}`,
        })),
    ];

    return (
        <>
            <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
                <ol className="flex items-center space-x-1">
                    <li>
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground flex items-center"
                        >
                            <Home className="h-4 w-4" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" aria-hidden="true" />
                            {item.isCurrent ? (
                                <span aria-current="page" className="font-medium">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Breadcrumb Structured Data */}
            <BreadcrumbStructuredData items={structuredDataItems} />
        </>
    );
} 