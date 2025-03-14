"use client";

import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Article metadata
const article = {
    title: "The Role of Emotional Intelligence in Modern Leadership",
    subtitle: "How understanding and managing emotions can transform your leadership effectiveness",
    author: "Dr. Emily Chen",
    authorRole: "Leadership Development Specialist",
    authorImage: "/images/knowledge/authors/emily-chen.jpg",
    publishDate: "March 5, 2025",
    readTime: "8 min read",
    category: "Leadership",
    heroImage: "/images/knowledge/emotional-intelligence-hero.jpg",
    tags: ["Emotional Intelligence", "Leadership", "Professional Development", "Team Management"],
};

// Related articles
const relatedArticles = [
    {
        title: "Navigating Career Transitions Successfully",
        slug: "/knowledge/career-transitions",
        image: "/images/knowledge/career-transitions.jpg",
        excerpt: "Strategies for managing change and thriving during professional transitions.",
    },
    {
        title: "Building Effective Networking Strategies",
        slug: "/knowledge/networking",
        image: "/images/knowledge/networking.jpg",
        excerpt: "How to create meaningful professional connections that advance your career.",
    },
    {
        title: "The Future of Leadership in a Digital World",
        slug: "/knowledge/future-leadership",
        image: "/images/knowledge/future-leadership.jpg",
        excerpt: "Exploring how technology is reshaping leadership practices and expectations.",
    },
];

export default function EmotionalIntelligencePage() {
    return (
        <Suspense fallback={<div>Loading article...</div>}>
            <EmotionalIntelligenceContent />
        </Suspense>
    );
}

function EmotionalIntelligenceContent() {
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
                                <h2>Understanding Emotional Intelligence</h2>
                                <p>
                                    Emotional intelligence (EI) has emerged as a critical factor in leadership effectiveness in today's complex business environment. First popularized by psychologist Daniel Goleman, emotional intelligence refers to the ability to recognize, understand, and manage our own emotions, as well as recognize, understand, and influence the emotions of others.
                                </p>
                                <p>
                                    For leaders, emotional intelligence is not just a "soft skill" but a fundamental capability that impacts decision-making, team dynamics, organizational culture, and ultimately, business outcomes. Research consistently shows that leaders with high emotional intelligence create more engaged teams, foster innovation, and drive better performance.
                                </p>

                                <h2>The Four Components of Emotional Intelligence</h2>
                                <p>
                                    Emotional intelligence comprises four key components that work together to create effective leadership:
                                </p>
                                <ol>
                                    <li>
                                        <strong>Self-awareness:</strong> The ability to recognize and understand your own emotions, strengths, weaknesses, values, and impact on others. Self-aware leaders make better decisions because they understand how their emotions affect their judgment.
                                    </li>
                                    <li>
                                        <strong>Self-management:</strong> The ability to control disruptive emotions and adapt to changing circumstances. Leaders who can manage their emotions remain calm under pressure and set a positive example for their teams.
                                    </li>
                                    <li>
                                        <strong>Social awareness:</strong> The ability to understand the emotions, needs, and concerns of others. This includes empathy, organizational awareness, and service orientation. Socially aware leaders can read the room and respond appropriately to team dynamics.
                                    </li>
                                    <li>
                                        <strong>Relationship management:</strong> The ability to influence, coach, and mentor others, and manage conflict effectively. Leaders skilled in relationship management build strong teams and navigate complex interpersonal situations successfully.
                                    </li>
                                </ol>

                                <h2>Emotional Intelligence in Practice</h2>
                                <p>
                                    How does emotional intelligence manifest in day-to-day leadership? Consider these scenarios:
                                </p>
                                <ul>
                                    <li>
                                        A leader notices their own frustration rising during a challenging meeting. Instead of reacting impulsively, they pause, acknowledge their emotion, and choose a more measured response (self-awareness and self-management).
                                    </li>
                                    <li>
                                        During a period of organizational change, a leader recognizes team members' anxiety and addresses their concerns directly, providing clarity and reassurance (social awareness).
                                    </li>
                                    <li>
                                        When team conflict arises, a leader facilitates a productive conversation that acknowledges different perspectives and works toward resolution (relationship management).
                                    </li>
                                </ul>

                                <h2>Developing Emotional Intelligence</h2>
                                <p>
                                    Unlike IQ, emotional intelligence can be developed throughout life. Here are strategies for leaders looking to enhance their emotional intelligence:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Practice mindfulness:</strong> Regular mindfulness meditation helps increase self-awareness and emotional regulation.
                                    </li>
                                    <li>
                                        <strong>Seek feedback:</strong> Ask trusted colleagues for honest feedback about your emotional responses and leadership style.
                                    </li>
                                    <li>
                                        <strong>Keep an emotion journal:</strong> Track emotional reactions to situations to identify patterns and triggers.
                                    </li>
                                    <li>
                                        <strong>Develop active listening skills:</strong> Focus completely on the speaker, observe non-verbal cues, and ask clarifying questions.
                                    </li>
                                    <li>
                                        <strong>Work with a coach:</strong> A leadership coach can provide personalized guidance for developing emotional intelligence.
                                    </li>
                                </ul>

                                <h2>The Business Case for Emotional Intelligence</h2>
                                <p>
                                    Organizations increasingly recognize the value of emotional intelligence in leadership. Studies show that teams led by emotionally intelligent leaders experience:
                                </p>
                                <ul>
                                    <li>Higher employee engagement and retention</li>
                                    <li>Improved collaboration and innovation</li>
                                    <li>Better conflict resolution</li>
                                    <li>More effective change management</li>
                                    <li>Stronger customer relationships</li>
                                </ul>
                                <p>
                                    In one notable study by TalentSmart, emotional intelligence was found to be the strongest predictor of performance, explaining 58% of success in all types of jobs.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    As leadership continues to evolve in our complex, fast-paced world, emotional intelligence stands out as an essential capability. Leaders who invest in developing their emotional intelligence create more resilient, engaged, and high-performing teams. They navigate change more effectively and build stronger relationships with colleagues, team members, and customers.
                                </p>
                                <p>
                                    The good news is that emotional intelligence can be cultivated through intentional practice and reflection. By focusing on the four components—self-awareness, self-management, social awareness, and relationship management—leaders can enhance their effectiveness and create more positive, productive work environments.
                                </p>
                                <p>
                                    In the words of Daniel Goleman, "The most effective leaders are all alike in one crucial way: they all have a high degree of emotional intelligence." As you continue your leadership journey, consider how developing your emotional intelligence might transform your impact and results.
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
                                            Dr. Emily Chen is a leadership development specialist with over 15 years of experience working with executives across industries. She holds a Ph.D. in Organizational Psychology and is the author of "Emotional Leadership: Transforming Teams Through Emotional Intelligence."
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
                                            <a href="#" className="text-gray-700 hover:text-primary">Understanding Emotional Intelligence</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">The Four Components of Emotional Intelligence</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Emotional Intelligence in Practice</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Developing Emotional Intelligence</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">The Business Case for Emotional Intelligence</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Conclusion</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-primary/5 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Join Our Next Workshop</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Develop your emotional intelligence skills with our interactive workshop led by industry experts.
                                    </p>
                                    <Button asChild className="w-full">
                                        <Link href="/programs/workshops">Learn More</Link>
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
                            Ready to Enhance Your Leadership Skills?
                        </h2>
                        <p className="text-xl mb-8">
                            Join LOTA Canada's mentorship program and connect with experienced leaders who can help you develop your emotional intelligence and other essential leadership capabilities.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                            <Link href="/programs/mentorship">Explore Mentorship Program</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
} 