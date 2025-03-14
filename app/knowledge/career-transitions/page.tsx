"use client";

import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Article metadata
const article = {
    title: "Navigating Career Transitions Successfully",
    subtitle: "Strategies for managing change and thriving during professional transitions",
    author: "Michael Rodriguez",
    authorRole: "Career Development Coach",
    authorImage: "/images/knowledge/authors/michael-rodriguez.jpg",
    publishDate: "February 12, 2025",
    readTime: "7 min read",
    category: "Career Growth",
    heroImage: "/images/knowledge/career-transitions.jpg",
    tags: ["Career Development", "Professional Growth", "Change Management", "Leadership"],
};

// Related articles
const relatedArticles = [
    {
        title: "The Role of Emotional Intelligence in Modern Leadership",
        slug: "/knowledge/emotional-intelligence",
        image: "/images/knowledge/emotional-intelligence-hero.jpg",
        excerpt: "How understanding and managing emotions can transform your leadership effectiveness.",
    },
    {
        title: "Building Effective Networking Strategies",
        slug: "/knowledge/networking",
        image: "/images/knowledge/networking.jpg",
        excerpt: "How to create meaningful professional connections that advance your career.",
    },
    {
        title: "Developing a Growth Mindset",
        slug: "/knowledge/growth-mindset",
        image: "/images/knowledge/growth-mindset.jpg",
        excerpt: "Cultivating a mindset that embraces challenges and sees failure as an opportunity to learn.",
    },
];

export default function CareerTransitionsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container-wide relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center space-x-2 text-primary mb-4">
                            <Award className="h-4 w-4" />
                            <span className="text-sm font-medium">{article.category}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                            {article.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-6">
                            {article.subtitle}
                        </p>
                        <div className="flex flex-wrap items-center text-sm text-gray-300 gap-4">
                            <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{article.publishDate}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="prose prose-lg max-w-none"
                            >
                                <h2>Understanding Career Transitions</h2>
                                <p>
                                    Career transitions are significant professional changes that can include shifting to a new role, changing industries, starting a business, or returning to the workforce after a break. These transitions can be voluntary, driven by personal goals and aspirations, or involuntary, resulting from organizational changes, economic shifts, or other external factors.
                                </p>
                                <p>
                                    Regardless of the catalyst, navigating career transitions successfully requires careful planning, self-awareness, and strategic action. This article explores key strategies to help you manage career changes effectively and emerge stronger on the other side.
                                </p>

                                <h2>Assessing Your Current Situation</h2>
                                <p>
                                    Before making any significant career move, it's essential to conduct a thorough assessment of your current situation:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Skills inventory:</strong> Document your technical skills, soft skills, and transferable competencies. Identify which skills are most valuable in your target role or industry.
                                    </li>
                                    <li>
                                        <strong>Values clarification:</strong> Reflect on your core values and how they align with your current and potential future roles. Career satisfaction often hinges on value alignment.
                                    </li>
                                    <li>
                                        <strong>Interests and passions:</strong> Consider what genuinely engages and energizes you. Sustainable career transitions often incorporate elements that you find personally meaningful.
                                    </li>
                                    <li>
                                        <strong>Financial considerations:</strong> Evaluate your financial situation and determine what resources you need during the transition period. This might include savings, potential income changes, or educational investments.
                                    </li>
                                </ul>

                                <h2>Developing a Transition Strategy</h2>
                                <p>
                                    With a clear understanding of your current situation, you can develop a strategic approach to your career transition:
                                </p>
                                <ol>
                                    <li>
                                        <strong>Set clear goals:</strong> Define specific, measurable objectives for your transition. What role do you want? In what timeframe? What compensation level are you targeting?
                                    </li>
                                    <li>
                                        <strong>Research thoroughly:</strong> Investigate your target role, industry, or organization. Understand the skills, qualifications, and experience typically required.
                                    </li>
                                    <li>
                                        <strong>Identify skill gaps:</strong> Compare your current skills with those needed for your target position. Develop a plan to acquire or strengthen necessary competencies.
                                    </li>
                                    <li>
                                        <strong>Build a support network:</strong> Connect with mentors, peers, and industry professionals who can provide guidance, feedback, and potential opportunities.
                                    </li>
                                    <li>
                                        <strong>Create a timeline:</strong> Establish a realistic schedule for your transition, including key milestones like skill development, networking events, and application deadlines.
                                    </li>
                                </ol>

                                <h2>Overcoming Common Challenges</h2>
                                <p>
                                    Career transitions often come with obstacles. Here are strategies for addressing common challenges:
                                </p>
                                <h3>1. Lack of Experience in the New Field</h3>
                                <p>
                                    If you're transitioning to a new industry or role where you lack direct experience:
                                </p>
                                <ul>
                                    <li>Volunteer or take on pro bono projects to build relevant experience</li>
                                    <li>Pursue certifications or courses to demonstrate commitment and knowledge</li>
                                    <li>Highlight transferable skills from previous roles</li>
                                    <li>Consider a lateral move within your current organization to gain exposure</li>
                                </ul>

                                <h3>2. Networking in a New Industry</h3>
                                <p>
                                    Building connections in an unfamiliar field can be challenging:
                                </p>
                                <ul>
                                    <li>Join industry associations and attend their events</li>
                                    <li>Participate in online communities and forums</li>
                                    <li>Request informational interviews with professionals in your target field</li>
                                    <li>Leverage alumni networks from your educational institutions</li>
                                </ul>

                                <h3>3. Managing the Emotional Impact</h3>
                                <p>
                                    Career transitions can be emotionally taxing:
                                </p>
                                <ul>
                                    <li>Acknowledge the emotional aspects of change, including potential feelings of uncertainty or imposter syndrome</li>
                                    <li>Maintain a support system of friends, family, or a coach who can provide perspective</li>
                                    <li>Practice self-care routines to manage stress</li>
                                    <li>Celebrate small wins along the way</li>
                                </ul>

                                <h2>Case Study: Successful Career Transition</h2>
                                <p>
                                    Sarah, a marketing executive with 15 years of experience, decided to transition into the tech industry as a product manager. Despite having no direct product management experience, she successfully made the transition by:
                                </p>
                                <ul>
                                    <li>Completing a product management certification program</li>
                                    <li>Volunteering to lead product-focused initiatives within her marketing role</li>
                                    <li>Building relationships with product managers through industry events</li>
                                    <li>Reframing her marketing experience to highlight relevant skills like user research, cross-functional collaboration, and strategic planning</li>
                                    <li>Starting with a hybrid marketing/product role before moving into a full product management position</li>
                                </ul>
                                <p>
                                    Within 18 months, Sarah had successfully established herself in her new career path, demonstrating that strategic planning and persistence can overcome the challenges of career transition.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    Career transitions represent both challenges and opportunities for professional growth. By approaching your transition with self-awareness, strategic planning, and resilience, you can successfully navigate the change and emerge with a more fulfilling and aligned career path.
                                </p>
                                <p>
                                    Remember that transitions rarely follow a linear path. Be prepared to adapt your strategy as you gain new insights and as circumstances change. With the right mindset and approach, your career transition can be a transformative journey that leads to greater professional satisfaction and success.
                                </p>
                            </motion.div>

                            {/* Tags */}
                            <div className="mt-12 flex flex-wrap gap-2">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Author Bio */}
                            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="relative h-20 w-20 rounded-full overflow-hidden">
                                            <Image
                                                src={article.authorImage}
                                                alt={article.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{article.author}</h3>
                                        <p className="text-gray-600 mb-3">{article.authorRole}</p>
                                        <p className="text-sm text-gray-700">
                                            Michael Rodriguez is a career development coach with over a decade of experience helping professionals navigate career transitions. He specializes in working with mid-career professionals looking to pivot into new industries or roles.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Understanding Career Transitions</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Assessing Your Current Situation</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Developing a Transition Strategy</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Overcoming Common Challenges</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Case Study: Successful Career Transition</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Conclusion</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-primary/5 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">One-on-One Career Coaching</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Get personalized guidance for your career transition from our experienced mentors and coaches.
                                    </p>
                                    <Button asChild className="w-full">
                                        <Link href="/programs/mentorship">Book a Session</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Related Articles */}
            <section className="py-16 bg-gray-50">
                <div className="container-wide">
                    <AnimatedHeading
                        title="Related Articles"
                        subtitle="Continue your learning journey with these recommended reads"
                        align="center"
                        underline
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {relatedArticles.map((article, index) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                    <Link
                                        href={article.slug}
                                        className="inline-flex items-center text-primary font-medium hover:underline"
                                    >
                                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-primary text-white">
                <div className="container-wide text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Take the Next Step in Your Career?
                        </h2>
                        <p className="text-xl mb-8">
                            Join LOTA Canada's career development workshops and connect with professionals who have successfully navigated career transitions.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                            <Link href="/programs/workshops">Explore Our Workshops</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
} 