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
    title: "Developing a Growth Mindset",
    subtitle: "Cultivating a mindset that embraces challenges and sees failure as an opportunity to learn",
    author: "Dr. Alex Thompson",
    authorRole: "Psychologist & Leadership Coach",
    authorImage: "/images/knowledge/authors/alex-thompson.jpg",
    publishDate: "April 18, 2025",
    readTime: "9 min read",
    category: "Personal Development",
    heroImage: "/images/knowledge/growth-mindset.jpg",
    tags: ["Growth Mindset", "Personal Development", "Learning", "Resilience", "Psychology"],
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
        title: "Building Effective Networking Strategies",
        slug: "/knowledge/networking",
        image: "/images/knowledge/networking.jpg",
        excerpt: "How to create meaningful professional connections that advance your career.",
    },
];

export default function GrowthMindsetPage() {
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
                            <span className="ml-1">Growth Mindset</span>
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
                                <h2>Understanding the Growth Mindset</h2>
                                <p>
                                    The concept of a growth mindset, pioneered by psychologist Carol Dweck, represents a fundamental shift in how we view our abilities, challenges, and potential for development. At its core, a growth mindset is the belief that our abilities are not fixed traits but can be developed through dedication, hard work, and learning from feedback.
                                </p>
                                <p>
                                    This perspective stands in contrast to a fixed mindset, which assumes that our intelligence, talents, and capabilities are static qualities that cannot be significantly changed. The distinction between these two mindsets has profound implications for how we approach challenges, respond to setbacks, and ultimately achieve our goals.
                                </p>

                                <h2>Fixed vs. Growth Mindset: Key Differences</h2>
                                <p>
                                    Understanding the differences between fixed and growth mindsets helps clarify why this concept is so powerful:
                                </p>

                                <h3>Approach to Challenges</h3>
                                <ul>
                                    <li>
                                        <strong>Fixed Mindset:</strong> Avoids challenges to prevent failure and maintain the appearance of competence.
                                    </li>
                                    <li>
                                        <strong>Growth Mindset:</strong> Embraces challenges as opportunities to stretch abilities and learn.
                                    </li>
                                </ul>

                                <h3>Response to Obstacles</h3>
                                <ul>
                                    <li>
                                        <strong>Fixed Mindset:</strong> Gives up easily when facing obstacles, seeing them as evidence of inherent limitations.
                                    </li>
                                    <li>
                                        <strong>Growth Mindset:</strong> Persists in the face of setbacks, viewing them as part of the learning process.
                                    </li>
                                </ul>

                                <h3>Attitude Toward Effort</h3>
                                <ul>
                                    <li>
                                        <strong>Fixed Mindset:</strong> Sees effort as fruitless or a sign that you're not naturally talented.
                                    </li>
                                    <li>
                                        <strong>Growth Mindset:</strong> Views effort as the path to mastery and a necessary component of achievement.
                                    </li>
                                </ul>

                                <h3>Response to Criticism</h3>
                                <ul>
                                    <li>
                                        <strong>Fixed Mindset:</strong> Ignores useful feedback or becomes defensive when receiving criticism.
                                    </li>
                                    <li>
                                        <strong>Growth Mindset:</strong> Seeks and learns from feedback, seeing it as valuable information for improvement.
                                    </li>
                                </ul>

                                <h3>Reaction to Others' Success</h3>
                                <ul>
                                    <li>
                                        <strong>Fixed Mindset:</strong> Feels threatened by the success of others, seeing it as highlighting personal inadequacies.
                                    </li>
                                    <li>
                                        <strong>Growth Mindset:</strong> Finds inspiration and lessons in others' success, using it as motivation.
                                    </li>
                                </ul>

                                <h2>The Science Behind Growth Mindset</h2>
                                <p>
                                    The concept of growth mindset isn't just motivational psychology—it's grounded in neuroscience research on brain plasticity. Studies have shown that the brain continues to form new neural connections throughout life, especially when we engage in learning and challenge ourselves.
                                </p>
                                <p>
                                    Research has demonstrated that:
                                </p>
                                <ul>
                                    <li>When we learn new skills, our brains physically change and strengthen connections between neurons.</li>
                                    <li>The process of making mistakes and correcting them builds stronger neural pathways than getting something right the first time.</li>
                                    <li>Believing in your ability to improve actually changes how your brain responds to mistakes, making you more likely to learn from them.</li>
                                </ul>
                                <p>
                                    This scientific foundation reinforces what growth mindset advocates have long observed: our abilities truly can develop significantly with persistent effort and effective strategies.
                                </p>

                                <h2>Benefits of Cultivating a Growth Mindset</h2>
                                <p>
                                    Adopting a growth mindset offers numerous advantages across various aspects of life:
                                </p>

                                <h3>Professional Development</h3>
                                <ul>
                                    <li>Greater resilience in the face of workplace challenges</li>
                                    <li>Increased willingness to take on stretch assignments that accelerate learning</li>
                                    <li>Improved ability to receive and implement feedback</li>
                                    <li>Enhanced problem-solving capabilities through persistent effort</li>
                                </ul>

                                <h3>Learning and Education</h3>
                                <ul>
                                    <li>Higher achievement levels, particularly in challenging subjects</li>
                                    <li>Increased persistence when facing difficult material</li>
                                    <li>Greater enjoyment of the learning process itself</li>
                                    <li>Reduced anxiety about performance and evaluation</li>
                                </ul>

                                <h3>Personal Growth</h3>
                                <ul>
                                    <li>Improved self-awareness and emotional regulation</li>
                                    <li>Greater willingness to step outside comfort zones</li>
                                    <li>Enhanced ability to overcome limiting beliefs</li>
                                    <li>More fulfilling relationships through openness to growth and change</li>
                                </ul>

                                <h3>Leadership</h3>
                                <ul>
                                    <li>Creation of psychologically safer environments for teams</li>
                                    <li>Improved mentoring and development of others</li>
                                    <li>Greater innovation through encouraging experimentation</li>
                                    <li>More effective handling of organizational challenges and change</li>
                                </ul>

                                <h2>Strategies for Developing a Growth Mindset</h2>
                                <p>
                                    Shifting from a fixed to a growth mindset is a journey that requires consistent practice and self-awareness. Here are practical strategies to help cultivate a growth mindset:
                                </p>

                                <h3>1. Become Aware of Your Mindset Triggers</h3>
                                <p>
                                    Start by identifying situations that tend to trigger a fixed mindset response:
                                </p>
                                <ul>
                                    <li>Notice when you avoid challenges or give up quickly</li>
                                    <li>Pay attention to negative self-talk like "I'm not good at this" or "I'll never learn this"</li>
                                    <li>Recognize when you feel defensive about feedback</li>
                                    <li>Be aware of feelings of jealousy or threat when others succeed</li>
                                </ul>
                                <p>
                                    Simply becoming conscious of these patterns is the first step toward changing them.
                                </p>

                                <h3>2. Reframe Your Thinking</h3>
                                <p>
                                    Practice consciously shifting your perspective when you notice fixed mindset thoughts:
                                </p>
                                <ul>
                                    <li>Replace "I'm not good at this" with "I'm not good at this <em>yet</em>"</li>
                                    <li>Instead of "This is too hard," try "This requires more effort and different strategies"</li>
                                    <li>Shift from "I made a mistake, I'm a failure" to "Mistakes help me learn and improve"</li>
                                    <li>Change "That person is naturally talented" to "That person has put in tremendous effort to develop their skills"</li>
                                </ul>

                                <h3>3. Embrace Challenges</h3>
                                <p>
                                    Deliberately seek out situations that stretch your abilities:
                                </p>
                                <ul>
                                    <li>Set learning goals rather than performance goals</li>
                                    <li>Take on projects slightly beyond your current skill level</li>
                                    <li>Try new activities where you don't expect immediate success</li>
                                    <li>View challenging tasks as opportunities for growth rather than tests of your ability</li>
                                </ul>

                                <h3>4. Develop a Learning Orientation</h3>
                                <p>
                                    Focus on the process of learning rather than just outcomes:
                                </p>
                                <ul>
                                    <li>Celebrate effort and progress, not just achievements</li>
                                    <li>Ask questions like "What did I learn?" rather than just "Did I succeed?"</li>
                                    <li>Keep a learning journal to track insights and growth over time</li>
                                    <li>Seek out feedback and use it constructively</li>
                                </ul>

                                <h3>5. Practice Self-Compassion</h3>
                                <p>
                                    Be kind to yourself during the growth process:
                                </p>
                                <ul>
                                    <li>Recognize that developing new mindsets and skills takes time</li>
                                    <li>Avoid harsh self-criticism when you slip into fixed mindset thinking</li>
                                    <li>Acknowledge that discomfort is part of growth</li>
                                    <li>Celebrate small wins along the way</li>
                                </ul>

                                <h2>Growth Mindset in Organizations</h2>
                                <p>
                                    The principles of growth mindset can transform not just individuals but entire organizations. Leaders can foster a culture of growth by:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Rewarding effort and learning:</strong> Recognize and celebrate process, improvement, and lessons learned, not just results.
                                    </li>
                                    <li>
                                        <strong>Encouraging risk-taking:</strong> Create psychological safety that allows for experimentation and learning from failure.
                                    </li>
                                    <li>
                                        <strong>Providing developmental feedback:</strong> Focus feedback on specific behaviors and growth opportunities rather than fixed traits.
                                    </li>
                                    <li>
                                        <strong>Modeling growth behaviors:</strong> Leaders should openly discuss their own learning journeys, challenges, and mistakes.
                                    </li>
                                    <li>
                                        <strong>Supporting continuous development:</strong> Provide resources and opportunities for ongoing learning and skill development.
                                    </li>
                                </ul>
                                <p>
                                    Organizations with strong growth mindset cultures typically see higher employee engagement, greater innovation, and improved adaptability to change.
                                </p>

                                <h2>Common Misconceptions About Growth Mindset</h2>
                                <p>
                                    As the concept of growth mindset has gained popularity, several misconceptions have emerged:
                                </p>

                                <h3>Misconception 1: Growth Mindset Means Believing Anyone Can Do Anything</h3>
                                <p>
                                    A growth mindset doesn't deny that people have different starting points, natural inclinations, or that some skills may come more easily to certain individuals. Rather, it recognizes that regardless of starting point, significant improvement is possible through effort and effective strategies.
                                </p>

                                <h3>Misconception 2: Growth Mindset Is Just About Effort</h3>
                                <p>
                                    While effort is important, a true growth mindset also emphasizes finding effective strategies, seeking help when needed, and learning from feedback. Praising effort alone without helping someone develop better approaches can be counterproductive.
                                </p>

                                <h3>Misconception 3: You Either Have a Growth Mindset or You Don't</h3>
                                <p>
                                    In reality, most people have a mixture of fixed and growth mindsets that vary across different domains of their lives. Someone might have a growth mindset about their professional skills but a fixed mindset about their artistic abilities. The goal is to expand the areas where you apply a growth perspective.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    Developing a growth mindset is a powerful way to unlock your potential and enhance your resilience in the face of challenges. By understanding that abilities can be developed through dedication and hard work, you open yourself to a lifetime of learning and growth.
                                </p>
                                <p>
                                    Remember that shifting your mindset is itself a growth process—it takes time, awareness, and consistent practice. Be patient with yourself as you work to recognize and reframe fixed mindset thoughts and behaviors. With persistence, you can cultivate a perspective that embraces challenges, persists through obstacles, values effort, and learns from criticism—all qualities that contribute to greater achievement and fulfillment in both personal and professional realms.
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
                                            Dr. Alex Thompson is a psychologist and leadership coach specializing in mindset development and performance psychology. With over 15 years of experience working with executives, athletes, and organizations, Dr. Thompson helps individuals and teams unlock their potential through evidence-based psychological principles.
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
                                            <a href="#" className="text-gray-700 hover:text-primary">Understanding the Growth Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Fixed vs. Growth Mindset: Key Differences</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">The Science Behind Growth Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Benefits of Cultivating a Growth Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Strategies for Developing a Growth Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Growth Mindset in Organizations</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Common Misconceptions About Growth Mindset</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 hover:text-primary">Conclusion</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-primary/5 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Growth Mindset Workshop</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Join our interactive workshop to develop practical strategies for cultivating a growth mindset in your personal and professional life.
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
                            Ready to Transform Your Mindset?
                        </h2>
                        <p className="text-xl mb-8">
                            Join LOTA Canada's personal development programs and learn how to apply growth mindset principles to overcome challenges and achieve your goals.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                            <Link href="/programs/personal-development">Explore Programs</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
} 