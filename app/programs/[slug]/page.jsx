var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArrowLeft, Calendar, Clock, Download, MapPin, Share2, Users, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function generateMetadata(_a) {
    return __awaiter(this, arguments, void 0, function* ({ params, }) {
        const { slug } = yield params;
        // Find the program by slug
        const program = programs.find((p) => p.slug === slug) || programs[0];
        return {
            title: `${program.title} | LOTA Canada`,
            description: program.description,
        };
    });
}
export default function ProgramDetail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ params, }) {
        const { slug } = yield params;
        // In a real application, you would fetch this data from an API or CMS
        const program = programs.find((p) => p.slug === slug) || programs[0];
        return (<>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src={program.heroImage || "/placeholder.svg?height=1080&width=1920"} alt={program.title} fill className="object-cover" priority/>
          <div className="absolute inset-0 bg-black/30"/>
        </div>

        <div className="container-wide relative z-10 text-white">
          <div className="max-w-2xl">
            <Link href="/programs" className="inline-flex items-center text-sm hover:underline mb-6">
              <ArrowLeft size={16} className="mr-2"/>
              Back to Programs
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
              {program.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {program.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/programs/${slug}/apply`} className="inline-flex items-center px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors">
                Apply Now
              </Link>
              <button className="inline-flex items-center px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors">
                <Share2 size={18} className="mr-2"/>
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-12 border-b">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start">
              <Calendar className="mr-4 text-primary" size={24}/>
              <div>
                <h3 className="text-sm font-medium mb-1">Duration</h3>
                <p>{program.specs.duration}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Users className="mr-4 text-primary" size={24}/>
              <div>
                <h3 className="text-sm font-medium mb-1">Eligibility</h3>
                <p>{program.specs.eligibility}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="mr-4 text-primary" size={24}/>
              <div>
                <h3 className="text-sm font-medium mb-1">Commitment</h3>
                <p>{program.specs.commitment}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="mr-4 text-primary" size={24}/>
              <div>
                <h3 className="text-sm font-medium mb-1">Location</h3>
                <p>{program.specs.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-normal mb-8">Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p>{program.overview}</p>

                <h3 className="mt-12 mb-6 text-2xl font-normal">
                  Program Structure
                </h3>
                <p>{program.structure}</p>

                <div className="my-12 aspect-video relative">
                  <Image src="/placeholder.svg?height=720&width=1280" alt="Program in action" fill className="object-cover"/>
                </div>

                <h3 className="mt-12 mb-6 text-2xl font-normal">
                  Learning Outcomes
                </h3>
                <ul>
                  {program.outcomes.map((outcome, index) => (<li key={index} className="mb-3">
                      {outcome}
                    </li>))}
                </ul>
              </div>

              {/* Testimonials */}
              <div className="mt-16">
                <h3 className="text-2xl font-normal mb-8">
                  Participant Testimonials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {program.testimonials.map((testimonial, index) => (<div key={index} className="bg-secondary p-8">
                      <blockquote className="text-lg mb-6 font-serif">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-secondary p-8 sticky top-24">
                <h3 className="text-xl font-normal mb-6">
                  Program Specifications
                </h3>

                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Duration
                    </div>
                    <div>{program.specs.duration}</div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Format
                    </div>
                    <div>{program.specs.format}</div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Eligibility
                    </div>
                    <div>{program.specs.eligibility}</div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Commitment
                    </div>
                    <div>{program.specs.commitment}</div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Upcoming Dates
                    </div>
                    <div>{program.specs.dates}</div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Location
                    </div>
                    <div>{program.specs.location}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Fee
                    </div>
                    <div>{program.specs.fee}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href={`/programs/${slug}/apply`} className="w-full inline-flex justify-center items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Apply Now
                  </Link>
                </div>

                <div className="mt-4">
                  <button className="w-full inline-flex justify-center items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                    <Download size={18} className="mr-2"/>
                    Download Program Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 bg-secondary">
        <div className="container-wide">
          <h2 className="text-3xl font-normal mb-12 text-center">
            Application Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {program.applicationSteps.map((step, index) => (<div key={index} className="bg-background p-8">
                <div className="text-4xl font-light text-primary mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-normal mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>))}
          </div>

          <div className="mt-16 text-center">
            <Link href={`/programs/${slug}/apply`} className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Begin Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* Program Curriculum */}
      <section className="py-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-normal mb-12 text-center">
              Program Curriculum
            </h2>

            <div className="space-y-12">
              {program.curriculum.map((module, index) => (<div key={index} className="border-b pb-12">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="text-sm text-muted-foreground mb-1">
                        Module {index + 1}
                      </div>
                      <h3 className="text-xl font-normal">{module.title}</h3>
                    </div>
                    <div className="md:w-2/3">
                      <p className="mb-4">{module.description}</p>
                      <ul className="space-y-2">
                        {module.topics.map((topic, i) => (<li key={i} className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            {topic}
                          </li>))}
                      </ul>
                    </div>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Information */}
      <section className="py-24 bg-secondary">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
                Sustainability
              </div>
              <h2 className="text-3xl font-normal mb-6">
                Our Commitment to Sustainability
              </h2>
              <p className="text-lg mb-8">
                {program.sustainability.description}
              </p>

              <div className="space-y-6">
                {program.sustainability.initiatives.map((initiative, index) => (<div key={index} className="flex items-start">
                    <div className="w-12 h-12 flex items-center justify-center border border-primary rounded-full flex-shrink-0 mr-4">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {initiative.title}
                      </h3>
                      <p>{initiative.description}</p>
                    </div>
                  </div>))}
              </div>
            </div>

            <div className="aspect-square relative">
              <Image src="/placeholder.svg?height=800&width=800" alt="Sustainability initiatives" fill className="object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-24">
        <div className="container-wide">
          <h2 className="text-3xl font-normal mb-12 text-center">
            Related Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((relatedProgram) => (<Link key={relatedProgram.slug} href={`/programs/${relatedProgram.slug}`} className="group">
                  <div className="aspect-[4/3] relative mb-6 overflow-hidden">
                    <Image src={relatedProgram.image ||
                    "/placeholder.svg?height=600&width=800"} alt={relatedProgram.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                  </div>
                  <h3 className="text-xl font-normal mb-2 group-hover:underline">
                    {relatedProgram.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {relatedProgram.description}
                  </p>
                </Link>))}
          </div>
        </div>
      </section>
    </>);
    });
}
const programs = [
    {
        title: "Executive Mentorship Program",
        slug: "executive-mentorship",
        description: "Connect with experienced executives who provide personalized guidance to help you navigate your career path and develop leadership skills.",
        image: "/placeholder.svg?height=600&width=800",
        heroImage: "/placeholder.svg?height=1080&width=1920",
        overview: "The Executive Mentorship Program pairs emerging professionals with experienced executives for personalized guidance and career development. This flagship program is designed to accelerate your professional growth through structured mentorship, skill-building workshops, and networking opportunities with industry leaders.",
        structure: "The program spans six months and includes bi-weekly one-on-one sessions with your assigned mentor, monthly group workshops focused on leadership development, and quarterly networking events. Participants also complete a capstone project addressing a real-world leadership challenge, with guidance from their mentor.",
        outcomes: [
            "Develop a personalized leadership development plan with guidance from an experienced executive",
            "Build a professional network of peers and industry leaders",
            "Gain insights into leadership challenges and strategies across different industries",
            "Enhance your communication, decision-making, and strategic thinking skills",
            "Receive guidance on career advancement and professional development opportunities",
        ],
        specs: {
            duration: "6 months",
            format: "Hybrid (in-person and virtual sessions)",
            eligibility: "Early to mid-career professionals with 3+ years of experience",
            commitment: "5-7 hours per month",
            dates: "Applications open January 15, 2025 | Program begins March 1, 2025",
            location: "Toronto, with virtual options available",
            fee: "$1,500 (scholarships available)",
        },
        applicationSteps: [
            {
                title: "Submit Application",
                description: "Complete the online application form, including your resume and a personal statement outlining your career goals and interest in the program.",
            },
            {
                title: "Application Review",
                description: "Our selection committee reviews all applications based on eligibility criteria, alignment with program objectives, and potential for growth.",
            },
            {
                title: "Interview",
                description: "Selected candidates are invited for an interview to discuss their application, professional aspirations, and expectations for the program.",
            },
            {
                title: "Acceptance & Onboarding",
                description: "Successful applicants receive an acceptance letter and participate in an orientation session to prepare for the program.",
            },
        ],
        curriculum: [
            {
                title: "Leadership Foundations",
                description: "Establish a strong foundation in leadership principles and self-awareness to maximize your mentorship experience.",
                topics: [
                    "Leadership styles and their applications",
                    "Personal strengths assessment and development areas",
                    "Setting effective goals for the mentorship relationship",
                    "Ethical leadership and decision-making frameworks",
                ],
            },
            {
                title: "Communication & Influence",
                description: "Develop advanced communication skills to effectively convey ideas, inspire teams, and influence stakeholders.",
                topics: [
                    "Strategic communication for different audiences",
                    "Persuasive presentation techniques",
                    "Navigating difficult conversations",
                    "Building and leveraging professional relationships",
                ],
            },
            {
                title: "Strategic Thinking",
                description: "Learn to analyze complex situations, identify opportunities, and develop strategic approaches to challenges.",
                topics: [
                    "Industry analysis and competitive positioning",
                    "Problem-solving methodologies for complex challenges",
                    "Innovation and design thinking",
                    "Risk assessment and management",
                ],
            },
            {
                title: "Team Leadership",
                description: "Master the skills needed to build, develop, and lead high-performing teams in diverse environments.",
                topics: [
                    "Team dynamics and development stages",
                    "Inclusive leadership practices",
                    "Performance management and feedback",
                    "Conflict resolution and mediation",
                ],
            },
        ],
        testimonials: [
            {
                quote: "The Executive Mentorship Program provided me with invaluable guidance at a critical point in my career. My mentor helped me navigate complex challenges and identify opportunities for growth that I might have otherwise missed.",
                name: "Michael Zhang",
                title: "Marketing Director, Tech Innovations Inc.",
            },
            {
                quote: "This program transformed my approach to leadership. The combination of one-on-one mentorship and group workshops created a powerful learning environment that accelerated my professional development.",
                name: "Priya Sharma",
                title: "Operations Manager, Global Solutions",
            },
        ],
        sustainability: {
            description: "At LOTA, we're committed to sustainable practices that minimize environmental impact while maximizing social benefit. Our Executive Mentorship Program incorporates sustainability principles throughout its design and implementation.",
            initiatives: [
                {
                    title: "Digital-First Resources",
                    description: "We've reduced paper usage by 95% through our digital resource library and communication platform, saving approximately 2.5 trees per program cycle.",
                },
                {
                    title: "Community Impact Projects",
                    description: "Each cohort completes a community impact project addressing social or environmental challenges, contributing over 500 volunteer hours annually.",
                },
                {
                    title: "Carbon-Neutral Events",
                    description: "All in-person events are carbon-neutral, with emissions offset through investments in renewable energy projects across Canada.",
                },
            ],
        },
    },
    {
        title: "Leadership Workshop Series",
        slug: "leadership-workshops",
        description: "Develop essential leadership skills through interactive workshops led by industry experts and thought leaders.",
        image: "/placeholder.svg?height=600&width=800",
        heroImage: "/placeholder.svg?height=1080&width=1920",
        overview: "The Leadership Workshop Series offers focused, skill-building sessions designed to enhance specific leadership competencies. Each workshop combines theoretical frameworks with practical applications, allowing participants to develop and practice new skills in a supportive environment.",
        structure: "The series consists of six standalone workshops that can be taken individually or as a complete program. Each workshop includes pre-work materials, a full-day interactive session, and follow-up resources for continued learning and application.",
        outcomes: [
            "Acquire practical leadership skills that can be immediately applied in your professional context",
            "Learn from industry experts with extensive experience in leadership development",
            "Practice new techniques in a supportive, collaborative environment",
            "Build a toolkit of leadership strategies for different situations and challenges",
            "Connect with professionals from diverse industries and expand your network",
        ],
        specs: {
            duration: "1 day per workshop (6 workshops total)",
            format: "In-person workshops",
            eligibility: "Open to professionals at all career stages",
            commitment: "8 hours per workshop, plus optional pre and post-work",
            dates: "Monthly workshops beginning February 2025",
            location: "Vancouver Convention Centre",
            fee: "$350 per workshop or $1,800 for the full series",
        },
        applicationSteps: [
            {
                title: "Select Workshops",
                description: "Browse the workshop catalog and select the sessions that align with your development goals and schedule.",
            },
            {
                title: "Register Online",
                description: "Complete the registration form and payment process for your selected workshops.",
            },
            {
                title: "Confirmation",
                description: "Receive a confirmation email with details about your workshop(s), including pre-work materials and logistics.",
            },
            {
                title: "Preparation",
                description: "Complete any pre-work assignments to maximize your learning experience during the workshop.",
            },
        ],
        curriculum: [
            {
                title: "Adaptive Leadership",
                description: "Learn to navigate complex challenges and lead effectively through uncertainty and change.",
                topics: [
                    "Distinguishing technical and adaptive challenges",
                    "Managing resistance to change",
                    "Creating psychological safety during transitions",
                    "Building organizational resilience",
                ],
            },
            {
                title: "Emotional Intelligence",
                description: "Develop your ability to recognize, understand, and manage emotions in yourself and others.",
                topics: [
                    "Self-awareness and emotional regulation",
                    "Empathy and social awareness",
                    "Relationship management in professional contexts",
                    "Using emotional intelligence in decision-making",
                ],
            },
            {
                title: "Strategic Communication",
                description: "Master communication techniques that inspire, influence, and drive action.",
                topics: [
                    "Crafting compelling narratives",
                    "Tailoring messages for different stakeholders",
                    "Non-verbal communication and executive presence",
                    "Crisis communication strategies",
                ],
            },
            {
                title: "Inclusive Leadership",
                description: "Learn to create and lead diverse teams that leverage varied perspectives for innovation and growth.",
                topics: [
                    "Understanding unconscious bias",
                    "Creating inclusive team environments",
                    "Leveraging diversity for enhanced performance",
                    "Developing equitable systems and processes",
                ],
            },
        ],
        testimonials: [
            {
                quote: "The Adaptive Leadership workshop gave me practical tools to navigate the complex challenges my team was facing. I've applied the frameworks we learned and seen immediate improvements in how we approach change.",
                name: "Jordan Taylor",
                title: "Senior Manager, Financial Services",
            },
            {
                quote: "The Emotional Intelligence workshop transformed my approach to leadership. I now have a much better understanding of how emotions impact workplace dynamics and how to create a positive team environment.",
                name: "Olivia Rodriguez",
                title: "Team Lead, Healthcare Innovation",
            },
        ],
        sustainability: {
            description: "Our Leadership Workshop Series is designed with sustainability in mind, minimizing environmental impact while creating lasting value for participants and their organizations.",
            initiatives: [
                {
                    title: "Zero-Waste Events",
                    description: "All workshops follow zero-waste principles, with reusable materials, digital resources, and composting/recycling stations, diverting 98% of waste from landfills.",
                },
                {
                    title: "Local Sourcing",
                    description: "Workshop materials, catering, and services are sourced from local, sustainable businesses, reducing carbon footprint and supporting the local economy.",
                },
                {
                    title: "Sustainability Integration",
                    description: "Environmental and social responsibility principles are integrated into all workshop content, helping participants apply sustainable practices in their leadership roles.",
                },
            ],
        },
    },
    {
        title: "Community Engagement Initiative",
        slug: "community-engagement",
        description: "Participate in community service projects that make a positive impact while building valuable leadership experience.",
        image: "/placeholder.svg?height=600&width=800",
        heroImage: "/placeholder.svg?height=1080&width=1920",
        overview: "The Community Engagement Initiative provides opportunities for emerging leaders to develop their skills while making meaningful contributions to local communities. Participants work in teams to address real community challenges, applying leadership principles in practical contexts while creating positive social impact.",
        structure: "The program runs for four months and includes an orientation session, team formation, project planning workshops, community service implementation, and a final presentation and reflection session. Teams work with community partners to identify needs and develop sustainable solutions.",
        outcomes: [
            "Gain hands-on leadership experience in real-world community contexts",
            "Develop project management, teamwork, and problem-solving skills",
            "Build relationships with community organizations and fellow participants",
            "Create measurable positive impact in local communities",
            "Enhance your resume with demonstrated leadership and community service",
        ],
        specs: {
            duration: "4 months",
            format: "In-person community service with supporting workshops",
            eligibility: "Open to all professionals and students",
            commitment: "8-10 hours per month",
            dates: "Programs begin quarterly (January, April, July, October)",
            location: "Various community sites across Montreal",
            fee: "$250 (covers program materials and project seed funding)",
        },
        applicationSteps: [
            {
                title: "Apply Online",
                description: "Submit your application indicating your interests, skills, and availability for community service projects.",
            },
            {
                title: "Orientation",
                description: "Attend an orientation session to learn about the program structure, community partners, and potential projects.",
            },
            {
                title: "Team Formation",
                description: "Based on your interests and skills, you'll be matched with a team and community partner for your service project.",
            },
            {
                title: "Project Kickoff",
                description: "Meet with your team and community partner to define project scope, goals, and implementation plan.",
            },
        ],
        curriculum: [
            {
                title: "Community Needs Assessment",
                description: "Learn to identify and analyze community needs through research, stakeholder interviews, and collaborative assessment methods.",
                topics: [
                    "Stakeholder mapping and engagement",
                    "Qualitative and quantitative assessment methods",
                    "Asset-based community development",
                    "Prioritizing needs and opportunities",
                ],
            },
            {
                title: "Project Planning & Management",
                description: "Develop skills to plan, implement, and evaluate community service projects effectively.",
                topics: [
                    "Setting SMART objectives",
                    "Resource allocation and budgeting",
                    "Timeline development and milestone tracking",
                    "Risk assessment and mitigation strategies",
                ],
            },
            {
                title: "Collaborative Leadership",
                description: "Learn to lead effectively in collaborative, multi-stakeholder environments.",
                topics: [
                    "Building consensus and managing diverse perspectives",
                    "Facilitating effective meetings and decision-making",
                    "Delegating responsibilities and empowering team members",
                    "Navigating organizational cultures and systems",
                ],
            },
            {
                title: "Impact Measurement",
                description: "Develop frameworks to measure, evaluate, and communicate the impact of community service projects.",
                topics: [
                    "Defining success metrics and indicators",
                    "Data collection and analysis methods",
                    "Storytelling and impact reporting",
                    "Sustainability planning for long-term impact",
                ],
            },
        ],
        testimonials: [
            {
                quote: "The Community Engagement Initiative allowed me to apply my professional skills in a completely different context. Working with our community partner was incredibly rewarding, and I developed leadership skills that I've brought back to my workplace.",
                name: "Alex Chen",
                title: "Project Manager, Construction Industry",
            },
            {
                quote: "This program gave me hands-on experience with project management and team leadership that I couldn't have gotten elsewhere. The skills I developed have been invaluable in my career, and the community impact we created was truly meaningful.",
                name: "Samantha Patel",
                title: "Marketing Specialist, Retail Sector",
            },
        ],
        sustainability: {
            description: "Sustainability is at the core of our Community Engagement Initiative, both in how we operate the program and in the lasting impact we aim to create through community projects.",
            initiatives: [
                {
                    title: "Sustainable Project Design",
                    description: "All community projects are designed with sustainability principles, ensuring solutions that create lasting positive impact with minimal environmental footprint.",
                },
                {
                    title: "Green Transportation",
                    description: "We encourage carpooling, public transit, and cycling to project sites, reducing the program's carbon emissions by approximately 40% compared to individual transportation.",
                },
                {
                    title: "Skills-Based Volunteering",
                    description: "Our approach matches participants' professional skills with community needs, maximizing impact while providing meaningful development opportunities.",
                },
            ],
        },
    },
];
