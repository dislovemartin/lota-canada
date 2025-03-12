import { HeroModern } from "@/components/hero-modern";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { ModernCard } from "@/components/ui/modern-card";
import { SectionDivider } from "@/components/ui/section-divider";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroModern
        title="Leaders of Tomorrow Association"
        subtitle="Empowering professionals through networking, mentorship, and leadership development opportunities across Canada."
        imageSrc="/images/hero/image-asset.jpeg"
        imageAlt="LOTA Hero Background - Professional Leadership"
        ctaText="Learn More"
        ctaHref="/about"
        secondaryCtaText="Join Us"
        secondaryCtaHref="/contact"
        showLogo={true}
        overlayOpacity={0.4}
        className="home-hero"
      />

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-wide">
          <AnimatedHeading
            title="Our Impact"
            subtitle="LOTA has been fostering professional growth and leadership development since our founding."
            align="center"
            underline
          />

          <AnimatedStats
            stats={[
              { value: 500, label: "Members", suffix: "+" },
              { value: 48, label: "Events Hosted", suffix: "" },
              { value: 120, label: "Mentorship Connections", suffix: "+" },
              { value: 25, label: "Corporate Partners", suffix: "" },
            ]}
            variant="minimal"
          />
        </div>
      </section>

      <SectionDivider />

      {/* Programs Section */}
      <section className="py-24">
        <div className="container-wide">
          <AnimatedHeading
            title="Our Programs"
            subtitle="Comprehensive development opportunities designed to nurture leadership skills, professional growth, and community engagement."
            underline
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {programs.map((program) => (
              <ModernCard
                key={program.title}
                title={program.title}
                description={program.description}
                imageSrc={program.image}
                imageAlt={program.title}
                href={program.href}
                aspectRatio="video"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-24 bg-black text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm uppercase tracking-wider text-white/60 mb-2">
                Featured Event
              </span>
              <AnimatedHeading
                title="Annual Leadership Summit 2025"
                className="text-white"
                subtitleClassName="text-white/70"
                subtitle="Join industry leaders, innovators, and emerging professionals for three days of inspiring keynotes, workshops, and networking opportunities."
                underline
              />

              <div className="space-y-4 mb-8 mt-8">
                <div className="flex">
                  <div className="w-32 font-medium text-white/80">Date</div>
                  <div>June 2025</div>
                </div>
                <div className="flex">
                  <div className="w-32 font-medium text-white/80">Location</div>
                  <div>Toronto, Canada</div>
                </div>
                <div className="flex">
                  <div className="w-32 font-medium text-white/80">
                    Registration
                  </div>
                  <div>Updates Coming Soon</div>
                </div>
              </div>

              <AnimatedButton
                href="/events/leadership-summit-2025"
                variant="secondary"
              >
                Stay Tuned
              </AnimatedButton>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=1000"
                alt="Leadership Summit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-sm uppercase tracking-wider mb-2">
                    June 2025
                  </div>
                  <div className="text-2xl font-bold">
                    ONE NIGHT, UNLIMITED OPPORTUNITIES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Knowledge Section */}
      <section className="py-24">
        <div className="container-wide">
          <AnimatedHeading
            title="Knowledge"
            subtitle="Insights, research, and resources to support your professional development journey."
            underline
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {articles.map((article) => (
              <ModernCard
                key={article.title}
                title={article.title}
                description={article.excerpt}
                imageSrc={article.image}
                imageAlt={article.title}
                href={article.href}
                category={article.category}
                aspectRatio="square"
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <AnimatedButton href="/knowledge" variant="outline">
              View all articles
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-wide">
          <AnimatedHeading
            title="What Our Members Say"
            align="center"
            underline
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <TestimonialCard
              name="Sarah Chen"
              title="Program Participant, 2023"
              testimonial="The mentorship and networking opportunities provided by LOTA have been instrumental in my professional development. The connections I've made and the skills I've gained have truly transformed my career trajectory."
              rating={5}
              avatarSrc="/placeholder.svg?height=40&width=40"
            />

            <TestimonialCard
              name="Michael Zhang"
              title="Marketing Director, Tech Innovations Inc."
              testimonial="The Executive Mentorship Program provided me with invaluable guidance at a critical point in my career. My mentor helped me navigate complex challenges and identify opportunities for growth."
              rating={4}
              avatarSrc="/placeholder.svg?height=40&width=40"
            />

            <TestimonialCard
              name="Priya Sharma"
              title="Operations Manager, Global Solutions"
              testimonial="Participating in the Leadership Workshop Series transformed my approach to team management. The practical strategies I learned have helped me build a more collaborative and productive work environment."
              rating={5}
              avatarSrc="/placeholder.svg?height=40&width=40"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-black text-white">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center">
            <AnimatedHeading
              title="Stay Connected"
              subtitle="Subscribe to our newsletter to receive updates on upcoming events, program opportunities, and leadership insights."
              align="center"
              className="text-white"
              subtitleClassName="text-white/70"
              underline
            />

            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 mt-8">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <AnimatedButton variant="secondary">Subscribe</AnimatedButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const programs = [
  {
    title: "Mentorship Program",
    description:
      "Connect with experienced professionals who provide guidance, support, and insights to help you navigate your career path.",
    image: "/images/programs/mentorship.svg",
    href: "/programs/mentorship",
  },
  {
    title: "Leadership Workshop Series",
    description:
      "Develop essential leadership skills through interactive workshops led by industry experts and thought leaders.",
    image: "/images/programs/workshop.svg",
    href: "/programs/workshops",
  },
  {
    title: "Community Engagement",
    description:
      "Participate in community service projects that make a positive impact while building valuable leadership experience.",
    image: "/images/programs/community.svg",
    href: "/programs/community",
  },
];

const articles = [
  {
    title: "Developing Emotional Intelligence",
    excerpt:
      "Learn how emotional intelligence can enhance your leadership effectiveness and team relationships.",
    image: "/images/knowledge/leadership-article.svg",
    category: "Leadership",
    href: "/knowledge/emotional-intelligence",
  },
  {
    title: "Navigating Career Transitions",
    excerpt:
      "Strategies and insights for making successful career transitions at any stage of your professional journey.",
    image: "/images/knowledge/professional-growth.svg",
    category: "Career Growth",
    href: "/knowledge/career-transitions",
  },
  {
    title: "Building a Professional Network",
    excerpt:
      "Practical tips for creating and maintaining a valuable professional network in today's business environment.",
    image: "/images/knowledge/networking.svg",
    category: "Networking",
    href: "/knowledge/networking",
  },
];
