import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Code, Palette, Layout, Zap, Users, LineChart, Shield } from "lucide-react";
import Link from "next/link";
export default function HomepageImplementation() {
    return (<div className="container-wide py-16">
      <Link href="/website-optimization-plan" className="inline-flex items-center text-sm hover:underline mb-6">
        <ArrowLeft size={16} className="mr-2"/>
        Back to Optimization Plan
      </Link>

      <h1 className="text-4xl font-normal mb-4">Homepage Redesign Implementation</h1>
      <p className="text-xl mb-12 max-w-3xl">
        A comprehensive plan for implementing a dynamic, personalized homepage that adapts to user interests and
        showcases LOTA's forward-thinking vision.
      </p>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Specifications</TabsTrigger>
          <TabsTrigger value="design">Design Elements</TabsTrigger>
          <TabsTrigger value="content">Content Strategy</TabsTrigger>
          <TabsTrigger value="timeline">Implementation Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-normal mb-6">Vision & Objectives</h2>
              <p className="mb-6">
                The redesigned LOTA homepage will serve as a dynamic gateway to the organization's offerings, adapting
                to user interests while showcasing LOTA's forward-thinking vision and leadership position. The page will
                balance aesthetic appeal with functionality, creating an engaging experience that drives user action.
              </p>

              <h3 className="text-xl font-normal mb-4">Key Objectives:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Position LOTA as a forward-thinking leader in professional development</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Create a personalized experience that adapts to user interests and behavior</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Showcase LOTA's impact and vision through compelling visuals and storytelling</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Drive engagement with clear pathways to programs, resources, and community</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Optimize for performance, accessibility, and future technological advancements</span>
                </li>
              </ul>

              <h3 className="text-xl font-normal mb-4">Success Metrics:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Increased time on site and reduced bounce rate compared to current homepage</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Higher conversion rates for program applications and membership sign-ups</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Improved user satisfaction scores through post-interaction surveys</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Increased engagement with personalized content recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Positive feedback on the organization's forward-thinking approach</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Key Features & Innovations</h2>

              <div className="space-y-6">
                <div className="bg-secondary p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Zap size={24} className="text-primary"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Dynamic Hero Section</h3>
                      <p>
                        An immersive hero section with animated illustrations of leadership concepts that adapt based on
                        current programs and initiatives. The hero will feature subtle animations that bring leadership
                        concepts to life while maintaining the elegant Aesop-inspired aesthetic.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users size={24} className="text-primary"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Personalized Content Engine</h3>
                      <p>
                        AI-driven content recommendations that adapt to user interests and behavior, showcasing relevant
                        programs, articles, and events. The system will learn from user interactions to continuously
                        refine recommendations while respecting privacy preferences.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <LineChart size={24} className="text-primary"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Interactive Impact Timeline</h3>
                      <p>
                        A visually compelling timeline showcasing LOTA's past achievements and future vision, allowing
                        users to explore the organization's journey and anticipated milestones. The timeline will use
                        subtle animations and micro-interactions to enhance engagement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield size={24} className="text-primary"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Privacy-First Personalization</h3>
                      <p>
                        A transparent approach to personalization that gives users control over their data and
                        preferences while still delivering a tailored experience. Clear opt-in mechanisms and preference
                        controls will be prominently featured.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-normal mb-4">Future-Proofing Elements:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>Modular design architecture allowing for easy updates and feature additions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>Progressive enhancement ensuring functionality across all devices and browsers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>API-driven content delivery for flexibility and integration with future systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>Accessibility-first approach ensuring inclusivity for all users</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-normal mb-6">Visual Concept</h2>
            <div className="aspect-video relative bg-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Homepage visual concept placeholder</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal mb-6">Technical Specifications</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-normal mb-4">Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Code size={24} className="text-primary mt-1"/>
                        <div>
                          <h4 className="font-medium mb-2">Frontend Framework</h4>
                          <p className="text-sm text-muted-foreground mb-2">Next.js with React Server Components</p>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Server-side rendering for optimal performance</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Streaming for improved time-to-interactive</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>React Server Components for reduced client-side JavaScript</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Palette size={24} className="text-primary mt-1"/>
                        <div>
                          <h4 className="font-medium mb-2">Styling & UI</h4>
                          <p className="text-sm text-muted-foreground mb-2">Tailwind CSS with custom design system</p>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Utility-first approach for maintainable styles</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Custom design tokens for Aesop-inspired aesthetic</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Responsive design with mobile-first approach</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Layout size={24} className="text-primary mt-1"/>
                        <div>
                          <h4 className="font-medium mb-2">Content Management</h4>
                          <p className="text-sm text-muted-foreground mb-2">Headless CMS with API-first approach</p>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Structured content modeling for flexibility</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>GraphQL API for efficient data fetching</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Content previews and scheduling capabilities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Zap size={24} className="text-primary mt-1"/>
                        <div>
                          <h4 className="font-medium mb-2">Personalization Engine</h4>
                          <p className="text-sm text-muted-foreground mb-2">Custom AI-driven recommendation system</p>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Edge-based user preference processing</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Privacy-preserving personalization algorithms</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>A/B testing framework for optimization</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Performance Optimization</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Core Web Vitals Focus:</strong> Optimization for LCP, FID, and CLS metrics to ensure
                      excellent user experience and SEO performance.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Image Optimization:</strong> Next.js Image component with automatic WebP/AVIF format
                      delivery, responsive sizing, and lazy loading.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Code Splitting:</strong> Component-level code splitting to reduce initial load time and
                      enable progressive enhancement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Edge Caching:</strong> Strategic caching at the edge for static content while maintaining
                      personalization capabilities.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Resource Prioritization:</strong> Critical CSS inlining and resource hints for optimal
                      loading sequence.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Accessibility Implementation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>WCAG 2.1 AA Compliance:</strong> Full adherence to accessibility guidelines, including
                      keyboard navigation, screen reader support, and color contrast.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Semantic HTML:</strong> Proper use of landmarks, headings, and ARIA attributes for
                      improved screen reader experience.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Reduced Motion Options:</strong> Respecting user preferences for reduced motion with
                      appropriate alternatives.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Focus Management:</strong> Enhanced focus indicators and logical tab order for keyboard
                      users.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Automated Testing:</strong> Integration of accessibility testing in the CI/CD pipeline to
                      prevent regressions.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Security Considerations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Content Security Policy:</strong> Strict CSP implementation to prevent XSS attacks and
                      other security vulnerabilities.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Data Protection:</strong> Client-side encryption for sensitive user preferences and
                      personalization data.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>API Security:</strong> Rate limiting, token-based authentication, and input validation for
                      all API endpoints.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                    <span>
                      <strong>Regular Audits:</strong> Scheduled security audits and penetration testing to identify and
                      address vulnerabilities.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal mb-6">Design Elements</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-normal mb-4">Visual Language</h3>
                <p className="mb-6">
                  The homepage design will maintain the Aesop-inspired aesthetic established for the LOTA website,
                  characterized by clean typography, generous whitespace, and elegant presentation. This visual language
                  will be enhanced with subtle interactive elements that convey innovation and forward thinking without
                  compromising the premium, minimalist look.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Typography</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Serif headings paired with sans-serif body text to create a sophisticated, editorial feel with
                      excellent readability.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-normal mb-1">Heading</div>
                        <div className="text-xs text-muted-foreground">Serif / 300 weight</div>
                      </div>
                      <div>
                        <div className="text-base mb-1">Body Text</div>
                        <div className="text-xs text-muted-foreground">Sans-serif / 400 weight</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Color Palette</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Neutral base with subtle accent colors, creating a timeless aesthetic that allows content to
                      shine.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-background border"></div>
                      <div className="h-8 bg-primary"></div>
                      <div className="h-8 bg-secondary"></div>
                      <div className="h-8 bg-muted"></div>
                    </div>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Spacing System</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Generous whitespace with a consistent rhythm based on a 4px grid system for harmonious
                      proportions.
                    </p>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-primary/20"></div>
                      <div className="h-8 w-full bg-primary/30"></div>
                      <div className="h-12 w-full bg-primary/40"></div>
                      <div className="h-16 w-full bg-primary/50"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Interactive Elements</h3>
                <p className="mb-6">
                  The homepage will feature subtle interactive elements that enhance engagement while maintaining the
                  elegant aesthetic. These interactions will be purposeful and enhance the user experience without
                  creating distraction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Micro-Interactions</h4>
                    <p className="text-sm">
                      Subtle animations triggered by user actions provide feedback and create a sense of responsiveness.
                      Examples include:
                    </p>
                    <ul className="text-sm mt-3 space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Hover states with smooth transitions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Button animations that indicate action</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Scroll-triggered reveals for content sections</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Animated Illustrations</h4>
                    <p className="text-sm">
                      Custom illustrations that subtly animate to bring leadership concepts to life while maintaining
                      the premium aesthetic. These will be:
                    </p>
                    <ul className="text-sm mt-3 space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Minimalist in style with elegant line work</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Animated with subtle, purposeful movements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Responsive to user interaction when appropriate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Layout Structure</h3>
                <p className="mb-6">
                  The homepage layout will be modular and adaptable, allowing for personalized content while maintaining
                  a cohesive structure. The layout will be responsive and accessible across all devices.
                </p>

                <div className="aspect-[16/9] relative bg-secondary mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Layout wireframe placeholder</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Hero Section</h4>
                    <p className="text-sm text-muted-foreground">
                      Full-width hero with animated illustrations and personalized messaging based on user interests or
                      current initiatives.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Content Modules</h4>
                    <p className="text-sm text-muted-foreground">
                      Modular content blocks that can be rearranged and personalized based on user interests and
                      behavior.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Intuitive navigation with clear pathways to key sections, enhanced with subtle animations and
                      personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal mb-6">Content Strategy</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-normal mb-4">Personalization Framework</h3>
                <p className="mb-6">
                  The homepage will leverage a sophisticated personalization framework that adapts content based on user
                  interests, behavior, and stage in the LOTA journey. This framework will balance personalization with
                  privacy, giving users control over their data and preferences.
                </p>

                <div className="bg-secondary p-6 mb-6">
                  <h4 className="font-medium mb-3">Personalization Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium mb-2">User Behavior Signals</h5>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Pages visited and time spent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Content interactions (clicks, downloads)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Search queries and filters used</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Explicit Preferences</h5>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Topics of interest selected by user</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Career stage and goals</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                          <span>Industry and role information</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <h4 className="font-medium mb-3">Privacy-First Approach</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Transparent Data Usage:</strong> Clear explanations of how user data is used for
                        personalization.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Opt-In by Default:</strong> Users must explicitly opt-in to personalization features.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Preference Controls:</strong> Easy-to-use controls for managing personalization
                        preferences.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Edge Computing:</strong> Processing preferences at the edge to minimize data transfer.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Data Minimization:</strong> Collecting only what's necessary for personalization.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Content Modules</h3>
                <p className="mb-6">
                  The homepage will feature a variety of content modules that can be personalized and rearranged based
                  on user interests and behavior. Each module will showcase LOTA's forward-thinking approach and
                  leadership position.
                </p>

                <div className="space-y-6">
                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Featured Programs</h4>
                    <p className="text-sm mb-3">
                      Showcases relevant programs based on user interests and career stage, with clear pathways to
                      application or more information.
                    </p>
                    <div className="text-sm">
                      <strong>Personalization:</strong> Programs are selected based on user interests, career stage, and
                      previous interactions. New users see flagship programs or trending options.
                    </div>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Leadership Insights</h4>
                    <p className="text-sm mb-3">
                      Curated articles, videos, and resources on leadership topics, with an emphasis on future trends
                      and innovative approaches.
                    </p>
                    <div className="text-sm">
                      <strong>Personalization:</strong> Content is selected based on topics of interest, reading
                      history, and emerging trends relevant to the user's industry or role.
                    </div>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Impact Timeline</h4>
                    <p className="text-sm mb-3">
                      Interactive visualization of LOTA's past achievements and future vision, allowing users to explore
                      the organization's journey.
                    </p>
                    <div className="text-sm">
                      <strong>Personalization:</strong> Timeline highlights milestones and future initiatives most
                      relevant to the user's interests and career goals.
                    </div>
                  </div>

                  <div className="bg-secondary p-6">
                    <h4 className="font-medium mb-3">Community Spotlight</h4>
                    <p className="text-sm mb-3">
                      Highlights from the LOTA community, including member stories, upcoming events, and opportunities
                      for engagement.
                    </p>
                    <div className="text-sm">
                      <strong>Personalization:</strong> Features community members with similar interests or career
                      paths, and events relevant to the user's location and preferences.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Messaging Framework</h3>
                <p className="mb-6">
                  The homepage messaging will consistently convey LOTA's forward-thinking approach and leadership
                  position, while adapting to user interests and needs. The tone will be professional, inspiring, and
                  confident.
                </p>

                <div className="bg-secondary p-6">
                  <h4 className="font-medium mb-3">Key Messages</h4>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong>Future-Focused Leadership:</strong>
                        <p className="mt-1">
                          LOTA prepares leaders for tomorrow's challenges through innovative approaches and
                          forward-thinking methodologies.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong>Community of Innovators:</strong>
                        <p className="mt-1">
                          Join a vibrant community of leaders who are shaping the future of their industries and making
                          meaningful impact.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong>Personalized Growth:</strong>
                        <p className="mt-1">
                          Discover tailored pathways for your leadership development, designed to meet your unique goals
                          and challenges.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong>Transformative Impact:</strong>
                        <p className="mt-1">
                          LOTA programs and resources create lasting change for individuals, organizations, and
                          communities.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal mb-6">Implementation Timeline</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-normal mb-4">Phase 1: Discovery & Planning (Weeks 1-2)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>User Research:</strong> Conduct interviews and surveys to understand user needs and
                        preferences.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Technical Assessment:</strong> Evaluate current infrastructure and identify requirements
                        for new features.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Content Audit:</strong> Review existing content and identify gaps for new homepage
                        modules.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Stakeholder Alignment:</strong> Finalize requirements and success metrics with key
                        stakeholders.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Phase 2: Design & Prototyping (Weeks 3-5)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Wireframing:</strong> Create low-fidelity wireframes for homepage layout and modules.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Visual Design:</strong> Develop high-fidelity designs for homepage components.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Animation Concepts:</strong> Design and test subtle animations and micro-interactions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Interactive Prototype:</strong> Create a clickable prototype for user testing and
                        stakeholder review.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>User Testing:</strong> Conduct usability testing with representative users to validate
                        design decisions.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Phase 3: Development (Weeks 6-10)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Frontend Framework:</strong> Set up Next.js with React Server Components and Tailwind
                        CSS.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Content API:</strong> Implement headless CMS integration and content modeling.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Personalization Engine:</strong> Develop and test AI-driven recommendation system.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Interactive Elements:</strong> Implement animations and micro-interactions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Accessibility Implementation:</strong> Ensure WCAG 2.1 AA compliance across all
                        components.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Phase 4: Testing & Optimization (Weeks 11-12)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Quality Assurance:</strong> Comprehensive testing across devices, browsers, and user
                        scenarios.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Performance Optimization:</strong> Fine-tune loading times, animations, and resource
                        delivery.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Accessibility Audit:</strong> Conduct thorough accessibility testing with assistive
                        technologies.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Security Review:</strong> Perform security audit and address any vulnerabilities.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Phase 5: Launch & Iteration (Weeks 13-14)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Soft Launch:</strong> Release to a limited audience for final validation and feedback.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Full Launch:</strong> Roll out to all users with monitoring for any issues.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Analytics Setup:</strong> Implement comprehensive tracking for key metrics and user
                        behavior.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Post-Launch Optimization:</strong> Begin A/B testing and iterative improvements based on
                        user data.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-normal mb-4">Ongoing Optimization (Post-Launch)</h3>
                <div className="bg-secondary p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Data Analysis:</strong> Regular review of user behavior and performance metrics.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>A/B Testing:</strong> Continuous testing of new features and optimizations.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Personalization Refinement:</strong> Ongoing improvement of recommendation algorithms.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        <strong>Content Updates:</strong> Regular refreshes of content modules and featured elements.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>);
}
