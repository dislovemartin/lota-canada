import { ArticleCard } from "@/components/article-card";
import Link from "next/link";
export const metadata = {
    title: "Knowledge Hub | LOTA Canada",
    description: "Access resources, articles, and insights from LOTA to support your professional development and leadership journey.",
};
export default function KnowledgePage() {
    return (<div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif mb-8">Knowledge Hub</h1>
      <p className="text-lg mb-12 max-w-3xl">
        Access resources, articles, and insights to support your professional development and leadership journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCard category="Leadership" categoryColor="bg-blue-100 text-blue-800" title="Developing Emotional Intelligence in Leadership" description="Learn how emotional intelligence can enhance your leadership effectiveness and team relationships." readTime="5 min read" url="/knowledge/emotional-intelligence-leadership" date="February 15, 2025" author="Sarah Johnson" image="/images/knowledge/leadership-article.svg" imageAlt="Leader demonstrating emotional intelligence in a team meeting"/>

        <ArticleCard category="Career Growth" categoryColor="bg-green-100 text-green-800" title="Navigating Career Transitions Successfully" description="Strategies and insights for making successful career transitions at any stage of your professional journey." readTime="8 min read" url="/knowledge/career-transitions" date="January 28, 2025" author="Michael Chen" image="/images/knowledge/professional-growth.svg" imageAlt="Professional at a career crossroads considering different paths"/>

        <ArticleCard category="Networking" categoryColor="bg-purple-100 text-purple-800" title="Building a Professional Network That Works" description="Practical tips for creating and maintaining a valuable professional network in today's business environment." readTime="6 min read" url="/knowledge/professional-networking" date="February 5, 2025" author="Priya Patel" image="/images/knowledge/networking.svg" imageAlt="Professionals exchanging business cards at a networking event"/>

        <ArticleCard category="Productivity" categoryColor="bg-yellow-100 text-yellow-800" title="Time Management Techniques for Busy Professionals" description="Effective strategies to manage your time and increase productivity in a demanding work environment." readTime="7 min read" url="/knowledge/time-management" date="January 12, 2025" author="David Wilson" image="/images/knowledge/professional-growth.svg" imageAlt="Professional organizing tasks with a digital calendar"/>

        <ArticleCard category="Communication" categoryColor="bg-red-100 text-red-800" title="Mastering Public Speaking and Presentations" description="Overcome anxiety and deliver compelling presentations that engage and influence your audience." readTime="10 min read" url="/knowledge/public-speaking" date="February 20, 2025" author="Emma Rodriguez" image="/images/knowledge/leadership-article.svg" imageAlt="Speaker presenting to an engaged audience"/>

        <ArticleCard category="Leadership" categoryColor="bg-blue-100 text-blue-800" title="Leading Through Change and Uncertainty" description="Strategies for effective leadership during organizational change and uncertain business environments." readTime="9 min read" url="/knowledge/leading-through-change" date="January 30, 2025" author="James Thompson" image="/images/knowledge/leadership-article.svg" imageAlt="Leader guiding team through organizational change"/>
      </div>

      <div className="mt-12 text-center">
        <Link href="/knowledge/all" className="inline-block px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
          View All Resources
        </Link>
      </div>
    </div>);
}
