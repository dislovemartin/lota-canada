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
    title: "Building Effective Networking Strategies",
    subtitle: "How to create meaningful professional connections that advance your career",
    author: "Jennifer Wei",
    authorRole: "Networking & Relationship Building Specialist",
    authorImage: "/images/knowledge/authors/jennifer-wei.jpg",
    publishDate: "March 5, 2025",
    readTime: "8 min read",
    category: "Professional Development",
    heroImage: "/images/knowledge/networking.jpg",
    tags: ["Networking", "Professional Relationships", "Career Growth", "Communication"],
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
        title: "Navigating Career Transitions Successfully",
        slug: "/knowledge/career-transitions",
        image: "/images/knowledge/career-transitions.jpg",
        excerpt: "Strategies for managing change and thriving during professional transitions.",
    },
    {
        title: "Developing a Growth Mindset",
        slug: "/knowledge/growth-mindset",
        image: "/images/knowledge/growth-mindset.jpg",
        excerpt: "Cultivating a mindset that embraces challenges and sees failure as an opportunity to learn.",
    },
];

export default function NetworkingPage() {
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
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Award className="h-4 w-4" />
                            <span className="ml-1">Networking</span>
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
                                <h2>The Power of Strategic Networking</h2>
                                <p>
                                    Networking is often misunderstood as simply collecting business cards or adding connections on LinkedIn. In reality, effective networking is about building genuine, mutually beneficial relationships that can support your professional growth and create opportunities for collaboration and advancement.
                                </p>
                                <p>
                                    Research consistently shows that up to 85% of jobs are filled through networking, and professionals with strong networks tend to receive better compensation and more frequent promotions. Beyond career advancement, a robust professional network provides access to industry insights, mentorship opportunities, and potential partnerships.
                                </p>

                                <h2>Shifting Your Networking Mindset</h2>
                                <p>
                                    The foundation of effective networking begins with the right mindset. Many professionals approach networking with a "what can I get" perspective, which often leads to transactional and ultimately unsatisfying connections. Instead, successful networkers adopt these principles:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Focus on giving, not just receiving:</strong> Look for ways to provide value to others through your knowledge, connections, or resources.
                                    </li>
                                    <li>
                                        <strong>Cultivate genuine curiosity:</strong> Approach networking conversations with a sincere interest in learning about others and their work.
                                    </li>
                                    <li>
                                        <strong>Think long-term:</strong> Build relationships with a long-term perspective rather than seeking immediate benefits.
                                    </li>
                                    <li>
                                        <strong>Quality over quantity:</strong> Prioritize developing deeper connections with a smaller number of people rather than collecting superficial contacts.
                                    </li>
                                </ul>

                                <h2>Strategic Networking Approaches</h2>
                                <p>
                                    Effective networking requires a strategic approach tailored to your professional goals and personal style. Consider these different networking methods and how they might serve your objectives:
                                </p>

                                <h3>1. Traditional In-Person Networking</h3>
                                <p>
                                    Despite the rise of digital networking, in-person connections remain powerful for building trust and rapport. Key opportunities include:
                                </p>
                                <ul>
                                    <li>Industry conferences and trade shows</li>
                                    <li>Professional association meetings</li>
                                    <li>Alumni events</li>
                                    <li>Community service and volunteer opportunities</li>
                                    <li>Workshops and seminars</li>
                                </ul>
                                <p>
                                    <strong>Pro tip:</strong> Before attending events, research attendees and speakers to identify potential connections aligned with your goals. Prepare thoughtful questions that demonstrate your interest and knowledge.
                                </p>

                                <h3>2. Digital Networking</h3>
                                <p>
                                    Online platforms have expanded networking possibilities beyond geographical limitations. Effective digital networking includes:
                                </p>
                                <ul>
                                    <li>
                                        <strong>LinkedIn optimization:</strong> Maintain an updated profile that clearly communicates your expertise and interests. Engage regularly with industry content and participate in relevant groups.
                                    </li>
                                    <li>
                                        <strong>Virtual events:</strong> Participate in webinars, online conferences, and virtual meetups, using chat features and breakout rooms to connect with others.
                                    </li>
                                    <li>
                                        <strong>Content creation:</strong> Share your expertise through articles, posts, or comments that demonstrate your knowledge and perspective.
                                    </li>
                                </ul>
                                <p>
                                    <strong>Pro tip:</strong> When connecting with someone new online, always include a personalized message explaining why you're interested in connecting and referencing shared interests or experiences.
                                </p>

                                <h3>3. Informational Interviews</h3>
                                <p>
                                    Informational interviews—conversations where you seek advice and insights rather than job opportunities—are powerful networking tools. They allow you to:
                                </p>
                                <ul>
                                    <li>Learn about different roles, industries, or organizations</li>
                                    <li>Gain insider perspectives on career paths</li>
                                    <li>Build relationships with experienced professionals</li>
                                    <li>Expand your network through referrals</li>
                                </ul>
                                <p>
                                    <strong>Pro tip:</strong> Prepare specific, thoughtful questions that demonstrate your research and genuine interest. Always follow up with a thank-you note highlighting specific insights you gained from the conversation.
                                </p>

                                <h2>Mastering Networking Conversations</h2>
                                <p>
                                    Many professionals find networking conversations challenging or uncomfortable. These techniques can help you navigate conversations more confidently and effectively:
                                </p>

                                <h3>Starting Conversations</h3>
                                <p>
                                    Begin with open-ended questions that invite meaningful dialogue:
                                </p>
                                <ul>
                                    <li>"What projects are you most excited about in your work right now?"</li>
                                    <li>"How did you get started in this industry?"</li>
                                    <li>"What trends are you seeing in your field that others might not be noticing yet?"</li>
                                    <li>"What's been the most surprising aspect of your professional journey?"</li>
                                </ul>

                                <h3>Active Listening</h3>
                                <p>
                                    Effective networking relies on genuine listening, not just waiting for your turn to speak:
                                </p>
                                <ul>
                                    <li>Maintain eye contact and provide verbal and non-verbal cues that you're engaged</li>
                                    <li>Ask follow-up questions that build on what the person has shared</li>
                                    <li>Avoid interrupting or immediately shifting the conversation to yourself</li>
                                    <li>Take mental notes of details you can reference in future interactions</li>
                                </ul>

                                <h3>Sharing Your Story</h3>
                                <p>
                                    When it's your turn to talk about yourself, be prepared with a concise, engaging narrative:
                                </p>
                                <ul>
                                    <li>Develop a 30-second "elevator pitch" that communicates who you are and what you're passionate about</li>
                                    <li>Share specific examples that illustrate your expertise or interests</li>
                                    <li>Adapt your story based on the context and the person you're speaking with</li>
                                    <li>Focus on aspects of your experience that might be relevant or interesting to your conversation partner</li>
                                </ul>

                                <h2>Building and Maintaining Your Network</h2>
                                <p>
                                    Networking is not a one-time activity but an ongoing practice of relationship building. These strategies will help you develop and sustain a valuable professional network:
                                </p>

                                <h3>Systematic Follow-Up</h3>
                                <p>
                                    The most successful networkers excel at following up after initial meetings:
                                </p>
                                <ul>
                                    <li>Send a personalized message within 24-48 hours of meeting someone new</li>
                                    <li>Reference specific points from your conversation to demonstrate your attentiveness</li>
                                    <li>Share relevant articles, resources, or connections that might be valuable to them</li>
                                    <li>Suggest a specific next step if appropriate, such as a coffee meeting or virtual chat</li>
                                </ul>

                                <h3>Relationship Nurturing</h3>
                                <p>
                                    Maintain connections through regular, meaningful interactions:
                                </p>
                                <ul>
                                    <li>Create a system for staying in touch with key contacts (e.g., quarterly check-ins)</li>
                                    <li>Share relevant updates, articles, or opportunities that align with their interests</li>
                                    <li>Celebrate their professional achievements and milestones</li>
                                    <li>Look for opportunities to provide support or assistance without expecting immediate returns</li>
                                </ul>

                                <h3>Strategic Network Expansion</h3>
                                <p>
                                    Continuously evaluate and expand your network to align with your evolving goals:
                                </p>
                                <ul>
                                    <li>Regularly assess gaps in your network related to your current and future objectives</li>
                                    <li>Seek introductions to specific individuals or groups who can provide diverse perspectives</li>
                                    <li>Join new communities or organizations that align with your developing interests</li>
                                    <li>Consider creating your own networking opportunities by hosting events or forming discussion groups</li>
                                </ul>

                                <h2>Overcoming Common Networking Challenges</h2>
                                <p>
                                    Even experienced professionals encounter obstacles in networking. Here are strategies for addressing common challenges:
                                </p>

                                <h3>For Introverts</h3>
                                <p>
                                    If large events drain your energy:
                                </p>
                                <ul>
                                    <li>Focus on smaller, more intimate gatherings or one-on-one meetings</li>
                                    <li>Prepare questions and talking points in advance to reduce anxiety</li>
                                    <li>Set manageable goals (e.g., having three meaningful conversations rather than meeting everyone)</li>
                                    <li>Schedule recovery time after networking events</li>
                                </ul>

                                <h3>For Career Changers</h3>
                                <p>
                                    When building a network in a new field:
                                </p>
                                <ul>
                                    <li>Leverage existing contacts for introductions to professionals in your target industry</li>
                                    <li>Join industry-specific groups and online communities</li>
                                    <li>Attend beginner-friendly events and workshops</li>
                                    <li>Be transparent about your transition and your transferable skills</li>
                                </ul>

                                <h3>For Remote Workers</h3>
                                <p>
                                    If you work remotely or in a geographically isolated area:
                                </p>
                                <ul>
                                    <li>Maximize digital networking platforms and virtual events</li>
                                    <li>Consider travel to key industry conferences or meetups when possible</li>
                                    <li>Start or join virtual communities related to your field</li>
                                    <li>Use video calls rather than phone or email when possible to build stronger connections</li>
                                </ul>

                                <h2>Conclusion</h2>
                                <p>
                                    Effective networking is a skill that can be developed and refined over time. By approaching networking with a strategic mindset focused on building genuine relationships, you can create a professional community that supports your growth, provides valuable opportunities, and enriches your career journey.
                                </p>
                                <p>
                                    Remember that the most valuable networking is reciprocal—as you receive support and opportunities through your connections, look for ways to contribute to others' success as well. This approach not only strengthens your individual relationships but also helps create a more collaborative and supportive professional ecosystem.
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
                                            Jennifer Wei is a networking and relationship building specialist with expertise in helping professionals create meaningful connections. With a background in organizational psychology, she has coached hundreds of professionals on developing authentic networking strategies that align with their personal styles and career goals.
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
                                            <a href="#" className="text-gray-700 hover:text-primary">The Power of Strategic Networking</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Shifting Your Networking Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Strategic Networking Approaches</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Mastering Networking Conversations</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Building and Maintaining Your Network</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Overcoming Common Networking Challenges</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Conclusion</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-primary/5 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Networking Workshop</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Join our upcoming workshop on building authentic professional relationships in the digital age.
                                    </p>
                                    <Button asChild className="w-full">
                                        <Link href="/programs/workshops">Register Now</Link>
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
                            Expand Your Professional Network with LOTA Canada
                        </h2>
                        <p className="text-xl mb-8">
                            Join our community events and connect with professionals across industries to build meaningful relationships that advance your career.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                            <Link href="/events">Upcoming Networking Events</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
} 