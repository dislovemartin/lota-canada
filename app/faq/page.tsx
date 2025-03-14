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
import { AlertCircle, ArrowRight, MessageSquare, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Suspense, useState } from "react";

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
    question: string;
    answer: string;
}

interface FAQCategory {
    name: string;
    icon: ReactNode;
    items: FAQItem[];
}

// FAQ data grouped by categories
const faqCategories: FAQCategory[] = [
    {
        name: "General",
        icon: <AlertCircle className="w-5 h-5" />,
        items: [
            {
                question: "What is LOTA Canada?",
                answer: "LOTA Canada (Leaders of Tomorrow Association) is a non-profit organization dedicated to empowering the next generation of business leaders and professionals in Toronto and across Canada through mentorship, networking, and professional development opportunities.",
            },
            {
                question: "How can I become a member of LOTA Canada?",
                answer: "You can become a member by visiting our membership page and completing the application form. Membership is open to professionals at all career stages who are committed to leadership development and community engagement.",
            },
        ],
    },
    {
        name: "Events & Programs",
        icon: <MessageSquare className="w-5 h-5" />,
        items: [
            {
                question: "What types of events does LOTA Canada organize?",
                answer: "LOTA Canada organizes a variety of events including leadership workshops, networking sessions, speaker series, mentorship programs, and our annual Leadership Summit. Check our events page for upcoming opportunities.",
            },
            {
                question: "Are there opportunities to volunteer with LOTA Canada?",
                answer: "Yes, we welcome volunteers who are passionate about leadership development. Volunteer opportunities include event coordination, mentorship, committee participation, and more. Contact us for current volunteer openings.",
            },
            {
                question: "Does LOTA Canada offer scholarships or financial assistance?",
                answer: "Yes, we offer limited scholarships and financial assistance for our programs to ensure accessibility. Eligibility criteria and application details are available on our programs page.",
            },
        ],
    },
    {
        name: "Partnerships",
        icon: <ArrowRight className="w-5 h-5" />,
        items: [
            {
                question: "How can my organization partner with LOTA Canada?",
                answer: "We offer various partnership opportunities including event sponsorship, program collaboration, and strategic alliances. Please visit our sponsors page or contact our partnerships team to discuss potential collaboration.",
            },
            {
                question: "Is LOTA Canada active outside of Toronto?",
                answer: "While our primary operations are based in Toronto, we have initiatives and members across Canada. We're continuously expanding our reach to serve leaders nationwide.",
            },
            {
                question: "What makes LOTA Canada different from other professional organizations?",
                answer: "LOTA Canada distinguishes itself through its focus on holistic leadership development, inclusive community approach, and innovative programming. We combine professional advancement with community impact and personal growth.",
            },
        ],
    },
];

// Get all FAQ items flattened for search functionality
const allFaqItems = faqCategories.flatMap(category => category.items);

export default function FAQPage() {
    return (
        <Suspense fallback={<div>Loading FAQ...</div>}>
            <FAQContent />
        </Suspense>
    );
}

function FAQContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFaqs, setFilteredFaqs] = useState(allFaqItems);
    const [activeCategory, setActiveCategory] = useState("all");

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
            <div id="main-content">
                <FAQStructuredData questions={allFaqItems} />
                
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "FAQ", href: "/faq" },
                    ]}
                    className="container-wide pt-4 pb-2"
                />

                <div className="bg-blue-50 dark:bg-blue-950/20 py-12">
                    <div className="container-wide">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <AnimatedHeading
                                title="Frequently Asked Questions"
                                subtitle="Find answers to common questions about LOTA Canada"
                                animated
                                variant="gradient"
                                size="xl"
                                className="mb-8"
                            />

                            <div className="relative max-w-xl mx-auto">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for questions..."
                                    className="pl-10 py-6 text-lg rounded-full border-transparent bg-white dark:bg-gray-800"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container-wide py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Category sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                                <h3 className="text-xl font-medium mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => filterByCategory("all")}
                                            className={cn(
                                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                                activeCategory === "all"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            )}
                                        >
                                            All Questions
                                        </button>
                                    </li>
                                    {faqCategories.map((category, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => filterByCategory(category.name.toLowerCase())}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center",
                                                    activeCategory === category.name.toLowerCase()
                                                        ? "bg-primary text-primary-foreground"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                )}
                                            >
                                                <span className="mr-2 opacity-70">{category.icon}</span>
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* FAQ Accordion */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            {filteredFaqs.length > 0 ? (
                                <Accordion type="single" collapsible className="space-y-4">
                                    {filteredFaqs.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                                        >
                                            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-4 text-muted-foreground">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-medium mb-2">No results found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        We couldn't find any questions matching your search
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setFilteredFaqs(allFaqItems);
                                            setActiveCategory("all");
                                        }}
                                        className="text-primary hover:underline"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Contact section */}
                <SectionDivider className="my-8" />

                <div className="container-wide py-12">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl font-medium mb-4">Still have questions?</h3>
                        <p className="text-muted-foreground mb-6">
                            If you can't find the answer to your question, feel free to contact us directly.
                        </p>
                        <AnimatedButton href="/contact" variant="primary" size="lg">
                            Contact Us
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
} 