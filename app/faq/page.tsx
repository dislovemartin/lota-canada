"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { FAQStructuredData } from "@/components/structured-data";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, ChevronDown, MessageSquare, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { Suspense, useState, useEffect } from "react";

// Since we're using "use client", we can't export metadata this way
// Normally we'd create a separate file for metadata
const pageMetadata = {
    title: "Frequently Asked Questions | LOTA Canada",
    description: "Find answers to common questions about LOTA Canada's programs, events, membership, and more.",
    openGraph: {
        title: "Frequently Asked Questions | LOTA Canada",
        description: "Find answers to common questions about LOTA Canada's programs, events, membership, and more.",
        url: "https://lota-canada.vercel.app/faq",
        type: "website",
    },
};

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category_id?: number;
    category_name?: string;
    is_published?: boolean;
    created_at?: string;
    updated_at?: string;
}

interface FAQCategory {
    id: number;
    name: string;
    icon: ReactNode;
    description?: string;
    items: FAQItem[];
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    items?: T[];
    categories?: T[];
    errors?: Record<string, string[]>;
}

// Default icons for categories
const categoryIcons: Record<string, ReactNode> = {
    "General": <AlertCircle className="w-5 h-5" />,
    "Programs": <MessageSquare className="w-5 h-5" />,
    "Events": <MessageSquare className="w-5 h-5" />,
    "Membership": <ArrowRight className="w-5 h-5" />,
    "Partnerships": <ArrowRight className="w-5 h-5" />,
};

// Initial empty data structures
const initialFaqCategories: FAQCategory[] = [];
const initialFaqItems: FAQItem[] = [];

export default function FAQPage() {
    return (
        <Suspense fallback={<div>Loading FAQ...</div>}>
            <FAQContent />
        </Suspense>
    );
}

function FAQContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [faqItems, setFaqItems] = useState<FAQItem[]>(initialFaqItems);
    const [faqCategories, setFaqCategories] = useState<FAQCategory[]>(initialFaqCategories);
    const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>(initialFaqItems);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch FAQ data from API
    useEffect(() => {
        const fetchFAQData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Fetch FAQ categories
                const categoriesResponse = await fetch('/api/faq/categories');
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch FAQ categories');
                }
                
                const categoriesData: ApiResponse<FAQCategory> = await categoriesResponse.json();
                
                // Fetch FAQ items
                const itemsResponse = await fetch('/api/faq');
                if (!itemsResponse.ok) {
                    throw new Error('Failed to fetch FAQ items');
                }
                
                const itemsData: ApiResponse<FAQItem> = await itemsResponse.json();
                
                if (categoriesData.success && itemsData.success) {
                    // Process categories data
                    const categories = (categoriesData.categories || []).map(category => ({
                        id: category.id,
                        name: category.name,
                        description: category.description,
                        icon: categoryIcons[category.name] || <AlertCircle className="w-5 h-5" />,
                        items: [] as FAQItem[] // Will be populated below
                    }));
                    
                    // Process items data
                    const items = itemsData.items || [];
                    
                    // Group items by category
                    categories.forEach(category => {
                        category.items = items.filter(item => 
                            item.category_id === category.id && item.is_published !== false
                        );
                    });
                    
                    setFaqCategories(categories);
                    setFaqItems(items);
                    setFilteredFaqs(items);
                }
            } catch (err) {
                console.error('Error fetching FAQ data:', err);
                setError('Failed to load FAQ data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFAQData();
    }, []);

    // Get all FAQ items flattened for search functionality
    const allFaqItems = faqItems;

    // Filter FAQs based on search query
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query.trim() === "") {
            setFilteredFaqs(activeCategory === "all" 
                ? allFaqItems 
                : faqCategories.find(c => c.name.toLowerCase() === activeCategory.toLowerCase())?.items || []);
        } else {
            const filtered = allFaqItems.filter(
                item => 
                    item.question.toLowerCase().includes(query) || 
                    item.answer.toLowerCase().includes(query)
            );
            setFilteredFaqs(filtered);
            setActiveCategory("all"); // Reset category filter when searching
        }
    };

    // Filter FAQs based on category
    const filterByCategory = (category: string) => {
        setActiveCategory(category);
        setSearchQuery(""); // Clear search when changing categories
        
        if (category === "all") {
            setFilteredFaqs(allFaqItems);
        } else {
            const categoryFaqs = faqCategories.find(
                c => c.name.toLowerCase() === category.toLowerCase()
            )?.items || [];
            setFilteredFaqs(categoryFaqs);
        }
    };

    return (
        <PageTransition>
            <main id="main-content" role="main">
                <FAQStructuredData questions={faqItems} />
                
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "FAQ", href: "/faq" },
                    ]}
                    className="container-wide pt-4 pb-2"
                />

                <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/50 to-white dark:from-blue-950/40 dark:via-blue-900/20 dark:to-gray-950 py-24 overflow-hidden">
                    {/* Enhanced noise texture with lower opacity for subtlety */}
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" aria-hidden="true" />
                    
                    {/* Enhanced decorative top border with gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent" aria-hidden="true" />
                    <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" aria-hidden="true" />
                    
                    {/* Enhanced bottom fade with increased height */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
                    
                    {/* Enhanced decorative gradient orbs with larger size and subtle animation */}
                    <div className="absolute top-12 left-12 w-48 h-48 bg-gradient-radial from-blue-200/20 to-transparent dark:from-blue-400/10 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
                    <div className="absolute bottom-12 right-12 w-48 h-48 bg-gradient-radial from-blue-200/20 to-transparent dark:from-blue-400/10 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
                    <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-radial from-blue-300/10 to-transparent dark:from-blue-500/5 rounded-full blur-2xl animate-pulse-slow" aria-hidden="true" />
                    <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-radial from-blue-300/10 to-transparent dark:from-blue-500/5 rounded-full blur-2xl animate-pulse-slow" aria-hidden="true" />
                    
                    {/* Enhanced decorative diagonal lines */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
                        <div className="absolute -top-[10%] -left-[5%] w-[120%] h-[120%] border-t border-l border-blue-200/30 dark:border-blue-700/20 rounded-tl-[100px] transform -rotate-6"></div>
                        <div className="absolute -bottom-[10%] -right-[5%] w-[120%] h-[120%] border-b border-r border-blue-200/30 dark:border-blue-700/20 rounded-br-[100px] transform -rotate-6"></div>
                    </div>
                    
                    <div className="container-wide relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Enhanced heading with decorative elements */}
                            <div className="relative inline-block mb-3">
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" aria-hidden="true"></div>
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" aria-hidden="true"></div>
                                <div className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 font-medium mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-100/50 to-blue-50/50 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-800/30 shadow-sm">Knowledge Base</div>
                            </div>
                            
                            <AnimatedHeading
                                title="Frequently Asked Questions"
                                subtitle="Find answers to common questions about LOTA Canada"
                                animated
                                variant="gradient"
                                highlight
                                size="xl"
                                className="mb-8"
                            />
                            
                            {/* Enhanced decorative divider with embellishments */}
                            <div className="relative flex items-center justify-center mb-12">
                                <div className="absolute left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-blue-300 dark:to-blue-700" aria-hidden="true"></div>
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700 shadow-md flex items-center justify-center z-10 rotate-45 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center -rotate-45">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-300"></div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent" aria-hidden="true"></div>
                                </div>
                                <div className="absolute right-0 w-1/3 h-px bg-gradient-to-l from-transparent to-blue-300 dark:to-blue-700" aria-hidden="true"></div>
                            </div>

                            <div className="relative max-w-xl mx-auto" role="search">
                                {/* Enhanced search container with more sophisticated styling */}
                                <div className="relative bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-1.5 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700/50">
                                    {/* Enhanced hover gradient effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/70 via-blue-50/30 to-transparent dark:from-blue-900/20 dark:via-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                                    
                                    {/* Enhanced decorative corner elements */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-200 dark:border-blue-800/40 rounded-tl-xl opacity-60" aria-hidden="true"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-blue-200 dark:border-blue-800/40 rounded-tr-xl opacity-60" aria-hidden="true"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-200 dark:border-blue-800/40 rounded-bl-xl opacity-60" aria-hidden="true"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-200 dark:border-blue-800/40 rounded-br-xl opacity-60" aria-hidden="true"></div>
                                    
                                    {/* Enhanced search icon with more sophisticated styling */}
                                    <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center" aria-hidden="true">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-sm group-hover:shadow-md group-hover:from-blue-200 group-hover:to-blue-100 dark:group-hover:from-blue-800/40 dark:group-hover:to-blue-700/20 transition-all duration-300">
                                            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced input with more sophisticated styling */}
                                    <Input
                                        type="text"
                                        placeholder="Search for questions..."
                                        className="pl-14 py-6 text-lg rounded-xl border-transparent bg-transparent focus-visible:ring-blue-400/50 dark:focus-visible:ring-blue-500/50"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        disabled={isLoading}
                                        aria-label="Search for questions"
                                        aria-describedby="search-description"
                                    />
                                    
                                    {/* Enhanced clear button with more sophisticated styling */}
                                    {searchQuery && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setFilteredFaqs(activeCategory === "all" ? allFaqItems : faqCategories.find(c => c.name.toLowerCase() === activeCategory.toLowerCase())?.items || []);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow"
                                            aria-label="Clear search"
                                        >
                                            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        </button>
                                    )}
                                </div>
                                
                                {/* Enhanced bottom decorative element */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/5 h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent" aria-hidden="true" />
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" aria-hidden="true" />
                                <span id="search-description" className="sr-only">Type to search for frequently asked questions</span>
                            </div>
                            
                            <div className="mt-10 text-gray-600 dark:text-gray-400 text-sm">
                                <div className="relative inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-200/50 dark:border-blue-800/30 shadow-sm">
                                    <p>Can't find what you're looking for? <a href="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline relative inline-flex group">Contact us<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span></a> for assistance.</p>
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-200/5 to-transparent dark:from-blue-400/5 rounded-lg" aria-hidden="true"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container-wide py-12">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" role="status" aria-label="Loading"></div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading FAQ data...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-8 text-center max-w-2xl mx-auto">
                            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">{error}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Please try refreshing the page or contact our support team if the problem persists.
                            </p>
                            <AnimatedButton
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="border-red-200 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700/50"
                            >
                                Refresh Page
                            </AnimatedButton>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Category sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="lg:col-span-1"
                            >
                                <nav className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 sticky top-24 overflow-hidden backdrop-blur-sm" aria-label="FAQ Categories">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-5 border-b border-blue-200 dark:border-blue-800/30 relative overflow-hidden">
                                        {/* Enhanced decorative pattern */}
                                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" aria-hidden="true" />
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-blue-200/10 to-transparent dark:from-blue-400/5 rounded-full blur-xl" aria-hidden="true" />
                                        
                                        {/* Enhanced header with decorative elements */}
                                        <div className="relative">
                                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-300 dark:from-blue-500 dark:to-blue-400 rounded-full" aria-hidden="true"></div>
                                            <h3 className="font-medium text-blue-700 dark:text-blue-300 flex items-center pl-2" id="categories-heading">
                                                <span className="w-8 h-8 mr-3 bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-lg flex items-center justify-center shadow-md border border-blue-300/50 dark:border-blue-600/50">
                                                    <MessageSquare className="w-4 h-4 text-white" />
                                                </span>
                                                <span className="relative">
                                                    Categories
                                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent dark:from-blue-400/30" aria-hidden="true"></span>
                                                </span>
                                                <span className="ml-auto text-xs text-blue-500/70 dark:text-blue-400/70 bg-blue-100 dark:bg-blue-800/30 px-3 py-1 rounded-md border border-blue-200/50 dark:border-blue-700/30 shadow-sm">{faqCategories.length + 1}</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-5 relative">
                                        {/* Enhanced decorative elements */}
                                        <div className="absolute top-12 right-0 w-32 h-32 bg-gradient-radial from-blue-200/10 to-transparent dark:from-blue-400/5 rounded-full blur-xl" aria-hidden="true" />
                                        <div className="absolute bottom-12 left-0 w-24 h-24 bg-gradient-radial from-blue-200/10 to-transparent dark:from-blue-400/5 rounded-full blur-xl" aria-hidden="true" />
                                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                        <ul className="space-y-3" aria-labelledby="categories-heading">
                                            <li>
                                                <button
                                                    onClick={() => filterByCategory("all")}
                                                    className={cn(
                                                        "w-full text-left px-5 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group relative overflow-hidden",
                                                        activeCategory === "all"
                                                            ? "bg-gradient-to-r from-blue-50 via-blue-100/80 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 text-blue-700 dark:text-blue-300 font-medium shadow-md border border-blue-200 dark:border-blue-800/30"
                                                            : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-blue-100/30 hover:to-blue-50/50 dark:hover:from-blue-900/20 dark:hover:via-blue-800/10 dark:hover:to-blue-900/5 border border-transparent hover:border-blue-200/70 dark:hover:border-blue-800/20 hover:shadow-sm"
                                                    )}
                                                    aria-pressed={activeCategory === "all"}
                                                    aria-label="Show all questions"
                                                >
                                                    {/* Subtle decorative background pattern */}
                                                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                                    
                                                    {/* Enhanced icon with more sophisticated styling */}
                                                    <span className="mr-3 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-sm group-hover:shadow-md transition-all duration-300 text-blue-600 dark:text-blue-400" aria-hidden="true">
                                                        <AlertCircle className="w-4 h-4" />
                                                    </span>
                                                    
                                                    {/* Text with subtle underline effect when active */}
                                                    <span className="relative font-medium">
                                                        All Questions
                                                        {activeCategory === "all" && (
                                                            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent dark:from-blue-400/30" aria-hidden="true"></span>
                                                        )}
                                                    </span>
                                                    
                                                    {/* Enhanced count badge */}
                                                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 group-hover:border-blue-200/70 dark:group-hover:border-blue-800/30">{allFaqItems.length}</span>
                                                    
                                                    {/* Decorative corner accent when active */}
                                                    {activeCategory === "all" && (
                                                        <>
                                                            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-blue-200 dark:border-blue-700/40 rounded-tr-md opacity-60" aria-hidden="true"></div>
                                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-blue-200 dark:border-blue-700/40 rounded-bl-md opacity-60" aria-hidden="true"></div>
                                                        </>
                                                    )}
                                                </button>
                                            </li>
                                            {faqCategories.map((category, index) => (
                                                <li key={category.id || index}>
                                                    <button
                                                        onClick={() => filterByCategory(category.name.toLowerCase())}
                                                        className={cn(
                                                            "w-full text-left px-5 py-3 rounded-lg transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group relative overflow-hidden",
                                                            activeCategory === category.name.toLowerCase()
                                                                ? "bg-gradient-to-r from-blue-50 via-blue-100/80 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 text-blue-700 dark:text-blue-300 font-medium shadow-md border border-blue-200 dark:border-blue-800/30"
                                                                : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-blue-100/30 hover:to-blue-50/50 dark:hover:from-blue-900/20 dark:hover:via-blue-800/10 dark:hover:to-blue-900/5 border border-transparent hover:border-blue-200/70 dark:hover:border-blue-800/20 hover:shadow-sm"
                                                        )}
                                                        aria-pressed={activeCategory === category.name.toLowerCase()}
                                                        aria-label={`Show ${category.name} questions`}
                                                    >
                                                        {/* Subtle decorative background pattern */}
                                                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                                        
                                                        {/* Enhanced icon with more sophisticated styling */}
                                                        <span className="mr-3 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-sm group-hover:shadow-md transition-all duration-300 text-blue-600 dark:text-blue-400" aria-hidden="true">
                                                            {category.icon}
                                                        </span>
                                                        
                                                        {/* Text with subtle underline effect when active */}
                                                        <span className="relative font-medium">
                                                            {category.name}
                                                            {activeCategory === category.name.toLowerCase() && (
                                                                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent dark:from-blue-400/30" aria-hidden="true"></span>
                                                            )}
                                                        </span>
                                                        
                                                        {/* Enhanced count badge */}
                                                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 group-hover:border-blue-200/70 dark:group-hover:border-blue-800/30">{category.items.length}</span>
                                                        
                                                        {/* Decorative corner accent when active */}
                                                        {activeCategory === category.name.toLowerCase() && (
                                                            <>
                                                                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-blue-200 dark:border-blue-700/40 rounded-tr-md opacity-60" aria-hidden="true"></div>
                                                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-blue-200 dark:border-blue-700/40 rounded-bl-md opacity-60" aria-hidden="true"></div>
                                                            </>
                                                        )}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                                
                                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 relative">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4">
                                        <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-300 dark:from-blue-500 dark:to-blue-400 rounded-full mx-auto"></div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-blue-50 via-blue-100/80 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 p-6 rounded-xl border border-blue-200/80 dark:border-blue-800/30 shadow-lg relative overflow-hidden" role="complementary" aria-labelledby="help-heading">
                                        {/* Enhanced decorative corner elements */}
                                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-200 dark:border-blue-700/40 rounded-tl-lg opacity-60" aria-hidden="true"></div>
                                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-200 dark:border-blue-700/40 rounded-br-lg opacity-60" aria-hidden="true"></div>
                                        
                                        {/* Subtle background pattern */}
                                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-blue-200/10 to-transparent dark:from-blue-400/5 rounded-full blur-xl" aria-hidden="true" />
                                        
                                        <div className="relative">
                                            <h4 id="help-heading" className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                                                <span className="w-6 h-6 mr-2 bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-full flex items-center justify-center shadow-sm">
                                                    <MessageSquare className="w-3 h-3 text-white" />
                                                </span>
                                                Need more help?
                                                <span className="ml-2 h-px w-12 bg-gradient-to-r from-blue-400/40 to-transparent dark:from-blue-400/30" aria-hidden="true"></span>
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 pl-8">Our team is ready to assist you with any questions you may have.</p>
                                            <AnimatedButton 
                                                href="/contact" 
                                                size="sm" 
                                                variant="primary" 
                                                className="w-full justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg transition-all duration-300" 
                                                aria-label="Contact our support team for assistance"
                                            >
                                                <span className="flex items-center">
                                                    Contact Support
                                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </span>
                                            </AnimatedButton>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* FAQ Accordion */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="lg:col-span-3 relative"
                                    role="region"
                                    aria-label="FAQ Questions and Answers"
                                >
                                    {/* Decorative background elements */}
                                    <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-radial from-blue-200/5 to-transparent dark:from-blue-400/3 rounded-full blur-xl" aria-hidden="true" />
                                    <div className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-radial from-blue-200/5 to-transparent dark:from-blue-400/3 rounded-full blur-xl" aria-hidden="true" />
                                    {filteredFaqs.length > 0 ? (
                                        <div>
                                            <div className="flex items-center justify-between mb-8 relative" aria-live="polite">
                                                {/* Decorative line element */}
                                                <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-blue-200 via-transparent to-blue-200 dark:from-blue-800/30 dark:to-blue-800/30" aria-hidden="true"></div>
                                                
                                                <div className="flex items-center">
                                                    <div className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-blue-300 dark:from-blue-500 dark:to-blue-400 rounded-full mr-3" aria-hidden="true"></div>
                                                    <h2 id="faq-results-heading" className="text-xl font-semibold text-gray-900 dark:text-gray-100 relative">
                                                        {activeCategory === 'all' ? 'All Questions' : faqCategories.find(c => c.name.toLowerCase() === activeCategory)?.name}
                                                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400" aria-label={`${filteredFaqs.length} questions found`}>({filteredFaqs.length})</span>
                                                        <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent dark:from-blue-400/30" aria-hidden="true"></span>
                                                    </h2>
                                                </div>
                                                
                                                {searchQuery && (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
                                                        Showing results for <span className="font-medium text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <Accordion type="single" collapsible className="space-y-8" aria-labelledby="faq-results-heading">
                                                {filteredFaqs.map((faq, index) => (
                                                    <AccordionItem
                                                        key={faq.id || index}
                                                        value={`item-${faq.id || index}`}
                                                        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/50 relative"
                                                    >
                                                        {/* Enhanced decorative elements */}
                                                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                                                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                                                        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-blue-200/40 dark:border-blue-700/20 rounded-tr-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" aria-hidden="true"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-blue-200/40 dark:border-blue-700/20 rounded-bl-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" aria-hidden="true"></div>
                                                        <AccordionTrigger className="px-8 py-6 text-lg font-medium hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-blue-50/80 group-data-[state=open]:via-blue-100/40 group-data-[state=open]:to-transparent dark:group-data-[state=open]:from-blue-900/30 dark:group-data-[state=open]:via-blue-800/20 dark:group-data-[state=open]:to-transparent" aria-label={`${faq.question} (Click to expand)`}>
                                                            <div className="flex items-center text-left w-full">
                                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-md mr-4 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-all duration-300">
                                                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{index + 1}</span>
                                                                </div>
                                                                <div className="flex-1 pr-4">
                                                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 group-hover:from-blue-800 group-hover:via-blue-600 group-hover:to-blue-500 dark:group-hover:from-blue-300 dark:group-hover:via-blue-400 dark:group-hover:to-blue-300 transition-all duration-300 relative inline-block">
                                                                        {faq.question}
                                                                        {/* Subtle underline effect when open */}
                                                                        <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-transparent dark:from-blue-400/0 dark:via-blue-400/30 to-transparent opacity-0 group-data-[state=open]:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
                                                                    </span>
                                                                    {faq.category_name && (
                                                                        <span className="hidden md:inline-flex ml-3 items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/30 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50/90 dark:hover:from-blue-800/40 dark:hover:to-blue-700/30">
                                                                            <span className="w-2.5 h-2.5 mr-1.5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                                                <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                                                            </span>
                                                                            {faq.category_name}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex-shrink-0 ml-4 transition-transform duration-300">
                                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-md group-data-[state=open]:rotate-180 transition-all duration-300">
                                                                        <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="border-t border-gray-100 dark:border-gray-700">
                                                            <div className="px-8 py-8 text-gray-600 dark:text-gray-400 leading-relaxed bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10 relative">
                                                                {/* Subtle background pattern */}
                                                                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" aria-hidden="true" />
                                                                
                                                                <div className="prose dark:prose-invert prose-blue max-w-none" aria-live="polite">
                                                                    <div className="relative pl-10">
                                                                        {/* Enhanced vertical line with gradient */}
                                                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-100/50 dark:from-blue-600 dark:via-blue-700 dark:to-blue-900/50 rounded-full" aria-hidden="true"></div>
                                                                        
                                                                        {/* Enhanced icon with more sophisticated styling */}
                                                                        <div className="absolute left-[-6px] top-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-md" aria-hidden="true">
                                                                            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                                        </div>
                                                                        
                                                                        {/* Enhanced answer container with decorative elements */}
                                                                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-md relative overflow-hidden">
                                                                            {/* Decorative corner elements */}
                                                                            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-blue-200/40 dark:border-blue-700/20 rounded-tr-lg opacity-60" aria-hidden="true"></div>
                                                                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-blue-200/40 dark:border-blue-700/20 rounded-bl-lg opacity-60" aria-hidden="true"></div>
                                                                            
                                                                            <p className="text-gray-700 dark:text-gray-300 relative z-10">{faq.answer}</p>
                                                                        </div>
                                                                    </div>
                                                                    {faq.category_name && (
                                                                        <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                                                                            <div className="flex items-center">
                                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/30 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50/90 dark:hover:from-blue-800/40 dark:hover:to-blue-700/30">
                                                                                    <span className="w-3 h-3 mr-1.5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                                                                    </span>
                                                                                    {faq.category_name}
                                                                                </span>
                                                                            </div>
                                                                            {faq.updated_at && (
                                                                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                                                                                    Last updated: {new Date(faq.updated_at).toLocaleDateString()}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    ) : (
                                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100/80 dark:border-blue-900/30 p-10 text-center relative overflow-hidden" role="status" aria-live="polite">
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 dark:from-blue-600 dark:via-blue-500 dark:to-blue-600" aria-hidden="true"></div>
                                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-blue-100/20 to-transparent dark:from-blue-400/5 rounded-full blur-2xl" aria-hidden="true"></div>
                                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-blue-100/20 to-transparent dark:from-blue-400/5 rounded-full blur-2xl" aria-hidden="true"></div>
                                        
                                        <div className="w-24 h-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-200 dark:border-blue-800/50 shadow-lg relative overflow-hidden group" aria-hidden="true">
                                            <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 to-transparent dark:from-blue-500/10 dark:to-transparent"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/10 dark:to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" aria-hidden="true"></div>
                                            <Search className="w-12 h-12 text-blue-600 dark:text-blue-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        
                                        <div className="relative mb-8">
                                            <div className="absolute left-1/2 -top-4 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent"></div>
                                            <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 dark:from-blue-300 dark:via-blue-400 dark:to-blue-300">No Results Found</h3>
                                            <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent"></div>
                                        </div>
                                        
                                        <div className="bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-100 dark:border-blue-800/30 rounded-lg p-5 mb-8 max-w-md mx-auto">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                We couldn't find any questions matching your search criteria. Please try different keywords or browse by category.
                                            </p>
                                        </div>
                                        <div className="relative z-10 max-w-lg mx-auto">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 dark:from-blue-900/0 dark:via-blue-900/20 dark:to-blue-900/0 rounded-xl blur-md -z-10" aria-hidden="true"></div>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 dark:border-blue-900/30 shadow-sm">
                                                <AnimatedButton
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setFilteredFaqs(allFaqItems);
                                                        setActiveCategory("all");
                                                    }}
                                                    variant="primary"
                                                    className="px-6 py-2.5 shadow-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 dark:from-blue-600 dark:via-blue-500 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:via-blue-400 dark:hover:to-blue-500 transition-all duration-300 border-blue-400/20 dark:border-blue-500/30 group"
                                                >
                                                    <span className="flex items-center justify-center">
                                                        <span className="mr-2 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-blue-300"></span>
                                                        </span>
                                                        Reset All Filters
                                                    </span>
                                                </AnimatedButton>
                                                <AnimatedButton
                                                    href="/contact"
                                                    variant="outline"
                                                    className="border-blue-200 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700/50 px-6 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group relative overflow-hidden"
                                                    aria-label="Contact our support team for assistance"
                                                >
                                                    {/* Decorative background */}
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 dark:from-blue-900/0 dark:via-blue-900/20 dark:to-blue-900/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" aria-hidden="true"></span>
                                                    
                                                    <span className="relative flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300">
                                                        <span className="mr-1 text-xs opacity-70">•</span>
                                                        Contact Support
                                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                    </span>
                                                </AnimatedButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contact section */}
                <div className="relative my-12">
                    <SectionDivider className="my-10" />
                    {/* Enhanced LOTA emblem integration */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/50 rounded-full shadow-md flex items-center justify-center border border-blue-200 dark:border-blue-800/50 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" aria-hidden="true" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent" aria-hidden="true"></div>
                        <div className="relative text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 font-semibold text-sm">LOTA</div>
                    </div>
                </div>

                <div className="container-wide py-16">
                    <div className="relative bg-gradient-to-br from-blue-50 via-blue-100/80 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 rounded-2xl p-12 text-center max-w-3xl mx-auto border border-blue-200/80 dark:border-blue-800/30 shadow-xl overflow-hidden" role="region" aria-labelledby="contact-section-heading">
                        {/* Enhanced decorative background elements */}
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" aria-hidden="true" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent" aria-hidden="true" />
                        {/* Enhanced decorative corner elements with gradients */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gradient-to-r from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-700 rounded-tl-lg opacity-60" aria-hidden="true"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gradient-to-l from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-700 rounded-tr-lg opacity-60" aria-hidden="true"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gradient-to-tr from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-700 rounded-bl-lg opacity-60" aria-hidden="true"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gradient-to-tl from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-700 rounded-br-lg opacity-60" aria-hidden="true"></div>
                        
                        {/* Enhanced background with subtle pattern and gradient overlay */}
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" aria-hidden="true"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/10 via-transparent to-blue-200/10 dark:from-blue-500/5 dark:via-transparent dark:to-blue-500/5" aria-hidden="true"></div>
                        
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 border border-blue-200/80 dark:border-blue-800/30 relative overflow-hidden">
                                {/* Subtle radial gradient behind icon */}
                                <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 to-transparent dark:from-blue-500/10 dark:to-transparent"></div>
                                <MessageSquare className="w-10 h-10 text-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 relative z-10" aria-hidden="true" />
                            </div>
                            
                            <div className="relative mb-6">
                                <div className="absolute left-1/2 -top-4 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 dark:via-blue-600 to-transparent"></div>
                                <h3 id="contact-section-heading" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 dark:from-blue-300 dark:via-blue-400 dark:to-blue-300 tracking-wide">Still Have Questions?</h3>
                                <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 dark:via-blue-600 to-transparent"></div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                                If you can't find the answer to your question, our team is ready to assist you. Feel free to contact us directly for personalized support.
                            </p>
                            
                            <AnimatedButton href="/contact" variant="primary" size="lg" className="px-8 shadow-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 dark:from-blue-600 dark:via-blue-500 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:via-blue-400 dark:hover:to-blue-500 transition-all duration-300 border-blue-400/20 dark:border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" aria-label="Contact our support team">
                                Contact Us <span className="inline-flex items-center ml-2 group-hover:translate-x-0.5 transition-transform"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                            </AnimatedButton>
                            
                            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                                Our support team typically responds within 24-48 business hours.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}