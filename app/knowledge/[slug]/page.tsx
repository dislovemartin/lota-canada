import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"

interface ArticleDetailProps {
  params: {
    slug: string
  }
}

export default function ArticleDetail({ params }: ArticleDetailProps) {
  // In a real application, you would fetch this data from an API or CMS
  const article = articles.find((a) => a.slug === params.slug) || articles[0]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container-wide">
          <Link href="/knowledge" className="inline-flex items-center text-sm hover:underline mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Knowledge
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block text-sm text-muted-foreground">{article.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-normal mb-6">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {article.readTime} min read
              </div>
              <div>By {article.author}</div>
            </div>

            <div className="aspect-[16/9] relative mb-12">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {article.content.map((section, index) => (
                <div key={index}>
                  {section.type === "paragraph" && <p>{section.content}</p>}
                  {section.type === "heading" && <h2 className="text-2xl font-normal mt-12 mb-6">{section.content}</h2>}
                  {section.type === "subheading" && (
                    <h3 className="text-xl font-normal mt-8 mb-4">{section.content}</h3>
                  )}
                  {section.type === "list" && (
                    <ul className="space-y-2 my-6">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.type === "quote" && (
                    <blockquote className="border-l-4 border-primary pl-6 italic my-8">
                      {section.content}
                      {section.attribution && (
                        <footer className="text-sm text-muted-foreground mt-2">— {section.attribution}</footer>
                      )}
                    </blockquote>
                  )}
                  {section.type === "image" && (
                    <div className="my-12 aspect-video relative">
                      <Image src={section.src || "/placeholder.svg"} alt={section.alt} fill className="object-cover" />
                      {section.caption && (
                        <div className="text-sm text-muted-foreground mt-2 text-center">{section.caption}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-b py-6 mt-12">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Share this article</div>
                <button className="inline-flex items-center text-sm hover:underline">
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Categories</div>
                <div className="flex gap-2">
                  <Link
                    href={`/knowledge/category/${article.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm hover:underline"
                  >
                    {article.category}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 bg-secondary">
        <div className="container-wide">
          <h2 className="text-3xl font-normal mb-12 text-center">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles
              .filter((a) => a.slug !== params.slug)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/knowledge/${relatedArticle.slug}`}
                  className="group bg-background"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={relatedArticle.image || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-sm text-muted-foreground">{relatedArticle.category}</div>
                    <h3 className="text-xl font-normal mb-2 group-hover:underline">{relatedArticle.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

const articles = [
  {
    title: "The Evolution of Leadership in the Digital Age",
    slug: "leadership-digital-age",
    excerpt:
      "Exploring how technology is reshaping leadership paradigms and the skills needed to thrive in an increasingly digital world.",
    category: "Leadership",
    image: "/placeholder.svg?height=800&width=1200",
    date: "March 15, 2025",
    readTime: 8,
    author: "Dr. Sarah Chen",
    content: [
      {
        type: "paragraph",
        content:
          "The digital revolution has fundamentally transformed how organizations operate, communicate, and create value. As technology continues to evolve at an unprecedented pace, leaders face new challenges and opportunities that require a shift in mindset, skills, and approaches. This article explores the changing landscape of leadership in the digital age and provides insights into how leaders can adapt and thrive in this new environment.",
      },
      {
        type: "heading",
        content: "The Changing Leadership Landscape",
      },
      {
        type: "paragraph",
        content:
          "Traditional leadership models were developed in an era of relative stability and predictability. Hierarchical structures, centralized decision-making, and long-term strategic planning were effective in environments where change was gradual and markets were well-defined. However, the digital age has introduced unprecedented levels of volatility, uncertainty, complexity, and ambiguity (VUCA).",
      },
      {
        type: "paragraph",
        content:
          "Today's leaders must navigate rapid technological change, global interconnectedness, information overload, and shifting workforce expectations. The command-and-control approach that characterized industrial-era leadership is increasingly ineffective in this new landscape. Instead, successful digital-age leaders embrace adaptability, collaboration, continuous learning, and distributed decision-making.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=600&width=1000",
        alt: "Digital leadership transformation",
        caption:
          "The transformation from traditional to digital leadership requires fundamental shifts in mindset and approach.",
      },
      {
        type: "heading",
        content: "Essential Skills for Digital-Age Leaders",
      },
      {
        type: "subheading",
        content: "Digital Fluency",
      },
      {
        type: "paragraph",
        content:
          "While leaders don't need to be technical experts, they must understand how digital technologies impact their organization and industry. Digital fluency involves recognizing the strategic implications of emerging technologies, asking the right questions, and making informed decisions about technology investments and implementations.",
      },
      {
        type: "subheading",
        content: "Adaptive Thinking",
      },
      {
        type: "paragraph",
        content:
          "In a rapidly changing environment, the ability to adapt quickly is crucial. Adaptive leaders embrace experimentation, learn from failures, and adjust strategies based on new information. They maintain a growth mindset and encourage the same in their teams, viewing challenges as opportunities for learning and innovation.",
      },
      {
        type: "subheading",
        content: "Collaborative Leadership",
      },
      {
        type: "paragraph",
        content:
          "Digital transformation requires cross-functional collaboration and the integration of diverse perspectives. Effective leaders create environments where collaboration thrives, breaking down silos and fostering connections across teams, departments, and even organizational boundaries.",
      },
      {
        type: "list",
        items: [
          "Building psychological safety to encourage open communication and idea-sharing",
          "Developing clear processes for collaborative decision-making",
          "Leveraging digital tools to facilitate collaboration across geographic and temporal boundaries",
          "Recognizing and rewarding collaborative behaviors and outcomes",
        ],
      },
      {
        type: "quote",
        content:
          "The most effective leaders in the digital age don't command and control—they connect and collaborate, creating networks of empowered teams that can respond rapidly to changing conditions.",
        attribution: "Dr. Sarah Chen",
      },
      {
        type: "heading",
        content: "Leading Remote and Hybrid Teams",
      },
      {
        type: "paragraph",
        content:
          "The digital age has accelerated the shift toward remote and hybrid work arrangements, presenting new challenges for leaders. Managing teams across different locations and time zones requires intentional approaches to communication, culture-building, and performance management.",
      },
      {
        type: "paragraph",
        content:
          "Successful leaders of distributed teams focus on outcomes rather than activities, establish clear expectations and communication protocols, and create opportunities for meaningful connection despite physical distance. They leverage digital tools to maintain visibility into work progress while avoiding micromanagement.",
      },
      {
        type: "heading",
        content: "Ethical Considerations in Digital Leadership",
      },
      {
        type: "paragraph",
        content:
          "As organizations become increasingly data-driven and digitally enabled, leaders face complex ethical questions around privacy, algorithmic bias, cybersecurity, and the societal impacts of technology. Digital-age leaders must develop frameworks for ethical decision-making that consider not only legal compliance but also the broader implications of technological choices.",
      },
      {
        type: "paragraph",
        content:
          "Transparency, accountability, and a commitment to using technology in ways that benefit humanity are essential components of ethical digital leadership. Leaders should engage diverse stakeholders in discussions about ethical considerations and establish governance structures that ensure responsible technology use.",
      },
      {
        type: "heading",
        content: "Developing Digital Leadership Capabilities",
      },
      {
        type: "paragraph",
        content:
          "Organizations can foster digital leadership capabilities through a combination of formal learning, experiential opportunities, and supportive structures. Leadership development programs should incorporate digital elements, such as simulations, virtual collaboration exercises, and projects focused on digital transformation.",
      },
      {
        type: "paragraph",
        content:
          "Mentoring and reverse mentoring programs can be particularly effective, pairing experienced leaders with digitally native employees for mutual learning. Creating communities of practice where leaders can share experiences and insights about digital leadership challenges also accelerates capability development.",
      },
      {
        type: "heading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "The digital age demands a new approach to leadership—one that embraces technology as a strategic enabler, fosters collaboration and adaptability, and addresses the ethical implications of digital transformation. By developing the mindsets and skills needed for this new era, leaders can help their organizations navigate disruption and create sustainable value in an increasingly digital world.",
      },
      {
        type: "paragraph",
        content:
          "As we continue to experience technological advancement at an unprecedented pace, the most successful leaders will be those who can balance technological savvy with human-centered approaches, leveraging digital tools to enhance human potential rather than replace it.",
      },
    ],
  },
  {
    title: "Building Resilience: Strategies for Professional Growth",
    slug: "building-resilience",
    excerpt:
      "Practical approaches to developing resilience and adaptability in the face of professional challenges and setbacks.",
    category: "Professional Development",
    image: "/placeholder.svg?height=800&width=1200",
    date: "February 28, 2025",
    readTime: 6,
    author: "Michael Zhang",
    content: [
      {
        type: "paragraph",
        content:
          "In today's rapidly changing professional landscape, resilience has become an essential skill for career success and personal well-being. This article explores practical strategies for building resilience, helping you navigate challenges, bounce back from setbacks, and continue growing professionally despite obstacles.",
      },
      {
        type: "heading",
        content: "Understanding Resilience",
      },
      {
        type: "paragraph",
        content:
          "Resilience is often misunderstood as simply the ability to endure hardship. However, true resilience is more dynamic—it's the capacity to adapt, learn, and grow through challenging experiences. Resilient professionals don't just survive difficulties; they emerge stronger, with new insights and capabilities.",
      },
      {
        type: "paragraph",
        content:
          "Research shows that resilience isn't a fixed trait but a set of skills and mindsets that can be developed over time. By understanding the components of resilience and practicing specific strategies, you can enhance your ability to thrive amid uncertainty and change.",
      },
      {
        type: "heading",
        content: "Key Strategies for Building Professional Resilience",
      },
      {
        type: "subheading",
        content: "Cultivate a Growth Mindset",
      },
      {
        type: "paragraph",
        content:
          "A growth mindset—the belief that abilities can be developed through dedication and hard work—is foundational to resilience. When you view challenges as opportunities for learning rather than threats to your competence, you're more likely to persist through difficulties and learn from setbacks.",
      },
      {
        type: "list",
        items: [
          "Reframe failures as valuable learning experiences",
          "Focus on the process and effort rather than just outcomes",
          "Seek feedback and use it to improve",
          "Celebrate progress and small wins along the way",
        ],
      },
      {
        type: "subheading",
        content: "Build Strong Professional Relationships",
      },
      {
        type: "paragraph",
        content:
          "Social support is a critical factor in resilience. Cultivating meaningful connections with colleagues, mentors, and professional networks provides emotional support, practical assistance, and diverse perspectives during challenging times.",
      },
      {
        type: "quote",
        content:
          "No one succeeds in a vacuum. The most resilient professionals actively build and maintain supportive relationships that help them navigate both opportunities and challenges.",
        attribution: "Michael Zhang",
      },
      {
        type: "subheading",
        content: "Develop Emotional Intelligence",
      },
      {
        type: "paragraph",
        content:
          "Emotional intelligence—the ability to recognize, understand, and manage your own emotions and empathize with others—enhances resilience by helping you respond effectively to stressful situations. When you can identify and regulate your emotional responses, you're better equipped to make clear decisions and maintain perspective during difficulties.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=600&width=1000",
        alt: "Components of resilience",
        caption:
          "The interconnected components of professional resilience: mindset, relationships, emotional intelligence, and adaptability.",
      },
      {
        type: "heading",
        content: "Practical Exercises to Strengthen Resilience",
      },
      {
        type: "subheading",
        content: "Reflection Practices",
      },
      {
        type: "paragraph",
        content:
          "Regular reflection helps you process experiences, extract lessons, and integrate new insights. Consider implementing these reflection practices into your routine:",
      },
      {
        type: "list",
        items: [
          "Keep a professional journal to document challenges, responses, and learnings",
          "Schedule weekly reflection time to review successes, setbacks, and opportunities for growth",
          "Practice the 'What Went Well' exercise: identify three things that went well each day and why they happened",
          "Use structured frameworks like 'What? So What? Now What?' to analyze challenging situations",
        ],
      },
      {
        type: "subheading",
        content: "Stress Management Techniques",
      },
      {
        type: "paragraph",
        content:
          "Effective stress management is essential for maintaining resilience. Develop a toolkit of techniques that work for you, such as:",
      },
      {
        type: "list",
        items: [
          "Mindfulness meditation to stay present and reduce rumination",
          "Physical exercise to reduce stress hormones and improve mood",
          "Deep breathing exercises for immediate stress reduction",
          "Boundary-setting practices to prevent burnout",
        ],
      },
      {
        type: "heading",
        content: "Building Organizational Resilience",
      },
      {
        type: "paragraph",
        content:
          "Leaders play a crucial role in fostering resilience within their teams and organizations. Creating a resilient culture involves:",
      },
      {
        type: "list",
        items: [
          "Establishing psychological safety where team members feel comfortable taking risks and sharing challenges",
          "Providing appropriate resources and support for professional development",
          "Modeling resilient behaviors and transparent communication",
          "Recognizing and celebrating resilience in action",
        ],
      },
      {
        type: "paragraph",
        content:
          "Organizations that prioritize resilience are better positioned to navigate industry disruptions, adapt to changing market conditions, and retain talented professionals through challenging periods.",
      },
      {
        type: "heading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "Building resilience is an ongoing journey rather than a destination. By intentionally cultivating a growth mindset, strong professional relationships, emotional intelligence, and effective stress management practices, you can enhance your capacity to thrive amid professional challenges.",
      },
      {
        type: "paragraph",
        content:
          "Remember that resilience doesn't mean avoiding difficulty or never experiencing setbacks. Instead, it's about developing the skills and mindsets that allow you to navigate challenges effectively, learn from experiences, and continue growing professionally despite obstacles.",
      },
    ],
  },
  {
    title: "The Power of Mentorship: Research and Insights",
    slug: "power-of-mentorship",
    excerpt:
      "Examining the impact of mentorship on career advancement, skill development, and professional satisfaction.",
    category: "Mentorship",
    image: "/placeholder.svg?height=800&width=1200",
    date: "January 20, 2025",
    readTime: 7,
    author: "Dr. Priya Sharma",
    content: [
      {
        type: "paragraph",
        content:
          "Mentorship has long been recognized as a powerful catalyst for professional development. From ancient apprenticeships to modern corporate mentoring programs, the practice of experienced individuals guiding those earlier in their journey has stood the test of time. This article examines current research on mentorship's impact and provides insights into maximizing its benefits for both mentors and mentees.",
      },
      {
        type: "heading",
        content: "The Measurable Impact of Mentorship",
      },
      {
        type: "paragraph",
        content:
          "Recent research provides compelling evidence for mentorship's positive effects on career trajectories. A five-year study by Gartner found that employees who participated in a mentoring program were promoted five times more often than those who did not. Similarly, research from Cornell University showed that mentored employees had higher salary growth and were more likely to stay with their organizations.",
      },
      {
        type: "paragraph",
        content:
          "Beyond these tangible outcomes, mentorship contributes significantly to professional satisfaction, confidence, and sense of belonging—factors increasingly recognized as crucial for long-term career success and well-being.",
      },
      {
        type: "quote",
        content:
          "The research is clear: effective mentorship creates a positive ripple effect that extends beyond individual careers to benefit organizations and entire professional communities.",
        attribution: "Dr. Priya Sharma",
      },
      {
        type: "heading",
        content: "Key Benefits for Mentees",
      },
      {
        type: "subheading",
        content: "Accelerated Skill Development",
      },
      {
        type: "paragraph",
        content:
          "Mentors provide shortcuts to learning by sharing their accumulated wisdom and helping mentees avoid common pitfalls. This guidance allows mentees to develop technical and soft skills more rapidly than they might through experience alone.",
      },
      {
        type: "subheading",
        content: "Expanded Professional Networks",
      },
      {
        type: "paragraph",
        content:
          "Effective mentors often introduce mentees to their professional networks, opening doors to new opportunities and perspectives. This network expansion can be particularly valuable for individuals from underrepresented groups who may face structural barriers to building connections.",
      },
      {
        type: "subheading",
        content: "Enhanced Career Navigation",
      },
      {
        type: "paragraph",
        content:
          "Mentors help mentees make informed career decisions by providing industry insights, organizational context, and personalized guidance based on the mentee's strengths and goals. This navigation support is especially valuable during career transitions and when facing complex professional choices.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=600&width=1000",
        alt: "Mentorship benefits",
        caption: "The multifaceted benefits of mentorship for professional development and career advancement.",
      },
      {
        type: "heading",
        content: "Benefits for Mentors",
      },
      {
        type: "paragraph",
        content:
          "While mentorship is often discussed primarily in terms of benefits to mentees, research shows that mentors also gain significantly from these relationships. Mentoring provides opportunities for leadership development, fresh perspectives, and the satisfaction of contributing to others' growth.",
      },
      {
        type: "list",
        items: [
          "Strengthened leadership and coaching skills",
          "Exposure to new ideas and perspectives",
          "Increased reflection on own practices and assumptions",
          "Enhanced reputation and professional fulfillment",
          "Expanded professional network through mentee connections",
        ],
      },
      {
        type: "heading",
        content: "Characteristics of Effective Mentorship",
      },
      {
        type: "paragraph",
        content:
          "Not all mentoring relationships yield the same results. Research identifies several factors that contribute to particularly effective mentorship:",
      },
      {
        type: "subheading",
        content: "Clear Expectations and Structure",
      },
      {
        type: "paragraph",
        content:
          "Successful mentoring relationships begin with clear expectations about goals, meeting frequency, communication methods, and the roles of both parties. While flexibility is important, a basic structure provides a foundation for productive engagement.",
      },
      {
        type: "subheading",
        content: "Trust and Psychological Safety",
      },
      {
        type: "paragraph",
        content:
          "Effective mentorship requires an environment where mentees feel safe discussing challenges, asking questions, and showing vulnerability. Mentors build this trust through consistency, confidentiality, and non-judgmental support.",
      },
      {
        type: "subheading",
        content: "Balanced Challenge and Support",
      },
      {
        type: "paragraph",
        content:
          "The most effective mentors balance challenging their mentees to stretch beyond comfort zones while providing the support needed to navigate difficulties. This balance helps mentees develop resilience and confidence alongside specific skills.",
      },
      {
        type: "heading",
        content: "Evolving Models of Mentorship",
      },
      {
        type: "paragraph",
        content:
          "Traditional one-to-one mentorship remains valuable, but new models are emerging to address contemporary professional needs:",
      },
      {
        type: "list",
        items: [
          "Group mentoring: One mentor works with multiple mentees, fostering peer learning alongside mentor guidance",
          "Reverse mentoring: Junior employees mentor senior colleagues on topics like technology, diversity perspectives, or emerging trends",
          "Peer mentoring: Colleagues at similar career stages support each other's development through structured exchange",
          "Flash mentoring: Short-term, focused mentoring sessions addressing specific challenges or questions",
          "Virtual mentoring: Technology-enabled mentorship that transcends geographic limitations",
        ],
      },
      {
        type: "heading",
        content: "Implementing Effective Mentorship Programs",
      },
      {
        type: "paragraph",
        content:
          "Organizations seeking to harness the power of mentorship should consider these evidence-based practices when designing programs:",
      },
      {
        type: "list",
        items: [
          "Thoughtful matching processes that consider goals, learning styles, and interpersonal dynamics",
          "Training for both mentors and mentees on effective practices and expectations",
          "Regular check-ins to monitor relationship progress and address challenges",
          "Flexibility to accommodate different mentoring styles and needs",
          "Recognition of mentoring contributions in performance evaluations and organizational culture",
        ],
      },
      {
        type: "heading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "The research is clear: effective mentorship creates substantial benefits for individuals, organizations, and professional communities. By understanding the elements that contribute to successful mentoring relationships and implementing thoughtful approaches, we can maximize these benefits and create more supportive, dynamic professional environments.",
      },
      {
        type: "paragraph",
        content:
          "Whether you're considering becoming a mentor, seeking mentorship, or developing a mentoring program, the investment in these relationships consistently yields returns that extend far beyond the immediate participants—creating ripples of positive impact throughout professional communities.",
      },
    ],
  },
]

