import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Users,
  Code,
  FileText,
  BarChart4,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  Clock,
  DollarSign,
} from "lucide-react"

export default function ImplementationRoadmap() {
  return (
    <div className="container-wide py-16">
      <h1 className="text-4xl font-normal mb-4">LOTA Website Redesign Implementation Roadmap</h1>
      <p className="text-xl mb-10 max-w-3xl">
        A comprehensive guide to executing the phased implementation of 20 future-focused web pages while maintaining
        our Aesop-inspired aesthetic.
      </p>

      <Tabs defaultValue="immediate">
        <TabsList className="mb-8">
          <TabsTrigger value="immediate">Immediate Actions (30 Days)</TabsTrigger>
          <TabsTrigger value="resources">Resource Planning</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
          <TabsTrigger value="management">Project Management</TabsTrigger>
        </TabsList>

        <TabsContent value="immediate">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Immediate Next Steps: First 30 Days</h2>
              <p className="mb-8">
                The following tasks should be completed within the first 30 days to establish a solid foundation for the
                phased implementation plan:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Week 1-2: Project Setup & Discovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Kickoff meeting</strong> with stakeholders to align on vision, priorities, and success
                          metrics
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Technical audit</strong> of existing website architecture and systems
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Content inventory</strong> to identify existing assets and content gaps
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>User research</strong> including interviews and surveys to validate assumptions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Team assembly</strong> and allocation of resources for Phase 1
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Week 3-4: Design Foundation & Planning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Design system refinement</strong> to extend our Aesop-inspired aesthetic for new
                          components
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Technical architecture planning</strong> for AI integration and other advanced
                          features
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Content strategy development</strong> focused on personalization framework
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Homepage wireframes</strong> and initial design concepts
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Development environment setup</strong> including CI/CD pipeline and testing framework
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Critical Path Tasks & Dependencies</h2>
              <p className="mb-8">
                The following tasks are on the critical path for successful implementation and should be prioritized:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left">Task</th>
                      <th className="py-4 px-6 text-left">Phase</th>
                      <th className="py-4 px-6 text-left">Dependencies</th>
                      <th className="py-4 px-6 text-left">Impact if Delayed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">Design System Extension</td>
                      <td className="py-4 px-6">Setup</td>
                      <td className="py-4 px-6">Stakeholder approval of vision</td>
                      <td className="py-4 px-6">Inconsistent UI across new pages, requiring rework</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">AI Recommendation Framework</td>
                      <td className="py-4 px-6">Phase 1</td>
                      <td className="py-4 px-6">Technical audit, user research</td>
                      <td className="py-4 px-6">Delayed personalization features across multiple pages</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">Content Modeling</td>
                      <td className="py-4 px-6">Phase 1</td>
                      <td className="py-4 px-6">Content inventory, personalization strategy</td>
                      <td className="py-4 px-6">Inability to structure content for personalization</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">Accessibility Framework</td>
                      <td className="py-4 px-6">Setup</td>
                      <td className="py-4 px-6">Design system approval</td>
                      <td className="py-4 px-6">Accessibility issues requiring extensive rework</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium">Analytics Implementation</td>
                      <td className="py-4 px-6">Phase 1</td>
                      <td className="py-4 px-6">KPI definition, technical setup</td>
                      <td className="py-4 px-6">Inability to measure success and optimize features</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Phase 1 Detailed Timeline</h2>
              <div className="bg-secondary p-8 relative">
                <div className="absolute -left-1 top-0 bottom-0 w-2 bg-primary"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-3">
                    <h3 className="font-medium mb-2">Weeks 1-2</h3>
                    <p className="text-sm text-muted-foreground mb-3">Discovery & Setup</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Stakeholder kickoff</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Technical audit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>User research</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="font-medium mb-2">Weeks 3-4</h3>
                    <p className="text-sm text-muted-foreground mb-3">Design & Planning</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Design system extension</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Homepage wireframes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Technical architecture</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="font-medium mb-2">Weeks 5-7</h3>
                    <p className="text-sm text-muted-foreground mb-3">Core Development</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Homepage development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>AI framework integration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>About Us page development</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="font-medium mb-2">Weeks 8-10</h3>
                    <p className="text-sm text-muted-foreground mb-3">Completion & Testing</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Contact Hub & Membership Portal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Integration testing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>User acceptance testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Technical Implementation Priorities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Code className="mr-2 h-5 w-5 text-primary" />
                      AI Recommendation System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      The personalization engine will power multiple pages across all phases and should be implemented
                      with scalability in mind.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Create modular recommendation API with Node.js</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Implement edge-based processing for privacy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Develop content tagging framework for recommendations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Content Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A flexible, structured content model is essential for personalization and future scaling across
                      all 20 pages.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Implement headless CMS with structured content types</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Create modular content components for reuse</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Develop metadata schema for personalization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <BarChart4 className="mr-2 h-5 w-5 text-primary" />
                      Analytics Foundation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive analytics must be implemented early to measure success and inform future iterations.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Set up Google Analytics 4 with enhanced measurement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Implement custom event tracking for interactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Create dashboard for real-time monitoring</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Team Structure & Resources</h2>
              <p className="mb-8">
                A cross-functional team with specialized skills is required to execute this ambitious redesign. The
                following structure is recommended:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-secondary p-6">
                  <div className="flex items-start mb-4">
                    <Users className="mr-3 h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Core Team</h3>
                      <p className="text-sm text-muted-foreground">Primary team members needed throughout all phases</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li>
                      <div className="font-medium text-sm">Project Manager</div>
                      <p className="text-sm text-muted-foreground">100% allocation across all phases</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">UX/UI Designer</div>
                      <p className="text-sm text-muted-foreground">100% in Phase 1, 50% thereafter</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Frontend Developer (2)</div>
                      <p className="text-sm text-muted-foreground">100% allocation across all phases</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Backend Developer</div>
                      <p className="text-sm text-muted-foreground">100% allocation across all phases</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Content Strategist</div>
                      <p className="text-sm text-muted-foreground">100% in Phase 1, 50% thereafter</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">QA Engineer</div>
                      <p className="text-sm text-muted-foreground">50% early phases, 100% during testing</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start mb-4">
                    <Briefcase className="mr-3 h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Specialized Resources</h3>
                      <p className="text-sm text-muted-foreground">Specialists needed for specific components</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li>
                      <div className="font-medium text-sm">AI/ML Engineer</div>
                      <p className="text-sm text-muted-foreground">75% in Phase 1, 25% for maintenance</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">WebGL/3D Developer</div>
                      <p className="text-sm text-muted-foreground">50% for interactive visualizations</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Accessibility Specialist</div>
                      <p className="text-sm text-muted-foreground">25% for audits and recommendations</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">SEO Specialist</div>
                      <p className="text-sm text-muted-foreground">25% across all phases</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Content Writers (2)</div>
                      <p className="text-sm text-muted-foreground">Variable allocation based on phase</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">DevOps Engineer</div>
                      <p className="text-sm text-muted-foreground">25% for CI/CD pipeline and infrastructure</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start mb-4">
                    <DollarSign className="mr-3 h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Budget Considerations</h3>
                      <p className="text-sm text-muted-foreground">Key investments required for implementation</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li>
                      <div className="font-medium text-sm">Headless CMS</div>
                      <p className="text-sm text-muted-foreground">$1,000-2,000/month for enterprise tier</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">AI/ML Services</div>
                      <p className="text-sm text-muted-foreground">$500-1,500/month based on usage</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Cloud Infrastructure</div>
                      <p className="text-sm text-muted-foreground">$1,500-3,000/month for scaling needs</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Analytics Tools</div>
                      <p className="text-sm text-muted-foreground">$500-1,000/month for advanced features</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Design & Prototyping</div>
                      <p className="text-sm text-muted-foreground">$300-500/month for software licenses</p>
                    </li>
                    <li>
                      <div className="font-medium text-sm">Testing Services</div>
                      <p className="text-sm text-muted-foreground">$500-1,000/month for automated testing</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Skills Gap Analysis & Training</h2>
              <p className="mb-8">
                Given the advanced technologies involved in this implementation, the following skills gaps may need to
                be addressed through training or strategic hiring:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left">Technology/Skill</th>
                      <th className="py-4 px-6 text-left">Current Capability</th>
                      <th className="py-4 px-6 text-left">Gap Mitigation Strategy</th>
                      <th className="py-4 px-6 text-left">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">AI/ML Integration</td>
                      <td className="py-4 px-6">Limited experience</td>
                      <td className="py-4 px-6">Hire specialist or contract consultant for knowledge transfer</td>
                      <td className="py-4 px-6">4 weeks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">WebGL/3D Visualization</td>
                      <td className="py-4 px-6">Basic knowledge</td>
                      <td className="py-4 px-6">Training for frontend team + specialist oversight</td>
                      <td className="py-4 px-6">3 weeks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">Headless CMS Architecture</td>
                      <td className="py-4 px-6">Moderate experience</td>
                      <td className="py-4 px-6">Advanced training for content team and developers</td>
                      <td className="py-4 px-6">2 weeks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6 font-medium">Blockchain Integration</td>
                      <td className="py-4 px-6">No experience</td>
                      <td className="py-4 px-6">Contract specialist for implementation and knowledge transfer</td>
                      <td className="py-4 px-6">6 weeks</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium">Accessibility Implementation</td>
                      <td className="py-4 px-6">Basic knowledge</td>
                      <td className="py-4 px-6">Training workshop + accessibility audit partnership</td>
                      <td className="py-4 px-6">2 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Technology Stack Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-normal mb-4">Core Technologies</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Frontend Framework:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Next.js with React Server Components for improved performance and SEO
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Styling:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Tailwind CSS with custom design tokens for Aesop-inspired aesthetic
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Backend:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Node.js with Express for API endpoints and services
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Content Management:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Headless CMS (Contentful or Sanity) for flexible content modeling
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Deployment:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Vercel or AWS Amplify for CI/CD pipeline and edge functions
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-normal mb-4">Specialized Technologies</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">AI/ML:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          TensorFlow.js for client-side processing, OpenAI API for advanced features
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Visualization:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Three.js for WebGL visualizations, D3.js for data visualization
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Analytics:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Google Analytics 4 with custom events, Hotjar for user behavior
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Search:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Algolia or Elasticsearch for advanced semantic search capabilities
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                      <div>
                        <strong className="font-medium">Authentication:</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Auth0 or NextAuth.js for secure user authentication and profiles
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risks">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Risk Assessment Matrix</h2>
              <p className="mb-8">
                The following matrix identifies potential risks to the implementation plan and outlines mitigation
                strategies:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left">Risk</th>
                      <th className="py-4 px-6 text-left">Impact</th>
                      <th className="py-4 px-6 text-left">Probability</th>
                      <th className="py-4 px-6 text-left">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-6">
                        <div className="font-medium">Technical Complexity</div>
                        <p className="text-sm text-muted-foreground">
                          Advanced features like AI recommendations may exceed technical capabilities
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">High</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Create proof of concepts early in Phase 1</li>
                          <li>• Implement phased approach to complex features</li>
                          <li>• Engage specialized consultants as needed</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">
                        <div className="font-medium">Timeline Slippage</div>
                        <p className="text-sm text-muted-foreground">
                          Ambitious timeline may be difficult to maintain across all phases
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">High</span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Build in buffer time for each phase</li>
                          <li>• Identify MVP features vs. enhancements</li>
                          <li>• Weekly progress tracking with early alerts</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">
                        <div className="font-medium">Content Production Delays</div>
                        <p className="text-sm text-muted-foreground">
                          Creating personalized content for 20 pages may exceed content team capacity
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Start content production early in the process</li>
                          <li>• Create reusable content components</li>
                          <li>• Consider additional content resources for spikes</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">
                        <div className="font-medium">Performance Issues</div>
                        <p className="text-sm text-muted-foreground">
                          Advanced features may impact page loading and overall performance
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">High</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Implement performance budgets</li>
                          <li>• Use lazy loading and code splitting</li>
                          <li>• Regular performance testing throughout</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">
                        <div className="font-medium">Accessibility Compliance</div>
                        <p className="text-sm text-muted-foreground">
                          Advanced interactive features may create accessibility challenges
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">High</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Incorporate accessibility from design phase</li>
                          <li>• Regular automated and manual testing</li>
                          <li>• Engage accessibility consultant for review</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">
                        <div className="font-medium">Budget Constraints</div>
                        <p className="text-sm text-muted-foreground">Advanced technologies may exceed planned budget</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Medium
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ul className="text-sm space-y-1">
                          <li>• Prioritize features based on ROI</li>
                          <li>• Consider open-source alternatives where possible</li>
                          <li>• Phase implementation of premium features</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Contingency Planning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                      Technical Fallback Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      If advanced features prove too complex or resource-intensive to implement within timeline or
                      budget constraints:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>AI Recommendations:</strong> Implement rule-based personalization first, with AI
                          enhancement in later phase
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>WebGL Visualizations:</strong> Start with simpler SVG-based visualizations, upgrade
                          later
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Blockchain Verification:</strong> Use standard digital certificates initially
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>VR/AR Elements:</strong> Replace with high-quality interactive media
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Timeline Adjustment Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Process for adjusting timeline if delays occur while maintaining critical path objectives:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Early Warning System:</strong> Weekly progress tracking with defined thresholds for
                          intervention
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Feature Prioritization:</strong> Clearly defined MVP vs. enhancement features for each
                          page
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Phased Rollout:</strong> Plan for soft launch of core features followed by
                          enhancements
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Resource Reallocation:</strong> Maintain flexible team structure to address
                          bottlenecks
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Quality Assurance Plan</h2>
              <div className="bg-secondary p-8">
                <h3 className="text-xl font-normal mb-4">Comprehensive Testing Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Automated Testing</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Unit tests for component functionality</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Integration tests for feature workflows</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>E2E tests for critical user journeys</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Performance testing via Lighthouse CI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Accessibility testing with axe-core</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Manual Testing</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Exploratory testing sessions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>User acceptance testing with stakeholders</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Cross-browser and device testing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Content accuracy and consistency review</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Accessibility testing with screen readers</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">User Testing</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Moderated usability testing sessions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>A/B testing for key interactive elements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Beta testing program with selected users</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Feedback collection via in-site surveys</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Heatmap and session recording analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Success Metrics Framework</h2>
              <p className="mb-8">
                The following framework defines specific, measurable KPIs that will track the success of the website
                redesign implementation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      Technical Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Page Load Speed</h3>
                          <span className="text-xs text-muted-foreground">Target: &lt; 2.5s</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Measured across devices and connection speeds
                        </p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "70%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Core Web Vitals</h3>
                          <span className="text-xs text-muted-foreground">Target: All "Good"</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          LCP, FID, CLS within recommended thresholds
                        </p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Accessibility Score</h3>
                          <span className="text-xs text-muted-foreground">Target: &gt; 95%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Via Lighthouse and manual audits</p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Error Rate</h3>
                          <span className="text-xs text-muted-foreground">Target: &lt; 0.5%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">JS errors and API failures per session</p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      User Engagement Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Time on Site</h3>
                          <span className="text-xs text-muted-foreground">Target: +30%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Average session duration compared to baseline
                        </p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Bounce Rate</h3>
                          <span className="text-xs text-muted-foreground">Target: -15%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Percentage reduction compared to baseline</p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Pages per Session</h3>
                          <span className="text-xs text-muted-foreground">Target: +25%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Number of pages viewed per session</p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Return Visitor Rate</h3>
                          <span className="text-xs text-muted-foreground">Target: +20%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Percentage of visitors who return within 30 days
                        </p>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "55%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Business Impact Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">Program Applications</h3>
                      <p className="text-sm text-muted-foreground">Target: +35% increase</p>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Track application conversion rate</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Measure application completion time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Monitor application source (personalized vs. standard)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">Membership Growth</h3>
                      <p className="text-sm text-muted-foreground">Target: +25% increase</p>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>New membership sign-ups</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Membership renewal rate</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Membership tier distribution</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">Event Registrations</h3>
                      <p className="text-sm text-muted-foreground">Target: +40% increase</p>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Event page to registration conversion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Early registration percentage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Referral registrations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Monitoring & Reporting Plan</h2>
              <div className="bg-secondary p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-normal mb-4">Data Collection & Analysis</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Real-time Analytics:</strong> Implement Google Analytics 4 with enhanced measurement
                          and custom events
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>User Behavior Tracking:</strong> Integrate Hotjar for heatmaps, recordings, and user
                          feedback
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Performance Monitoring:</strong> Set up Lighthouse CI and web vitals tracking
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Error Tracking:</strong> Implement Sentry for real-time error monitoring and alerts
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-normal mb-4">Reporting Cadence</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Weekly Reports:</strong> Technical metrics, development progress, and blocking issues
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Bi-weekly Stakeholder Updates:</strong> Progress against timeline, key achievements,
                          and risks
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Monthly Performance Reviews:</strong> Comprehensive analysis of metrics against
                          targets
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Quarterly Business Impact Reports:</strong> ROI analysis and strategic recommendations
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-normal mb-4">Custom Dashboard</h3>
                  <p className="mb-4">
                    Create a real-time dashboard accessible to stakeholders showing key metrics and progress:
                  </p>
                  <div className="aspect-[16/9] relative bg-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Dashboard visualization placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="management">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Project Management Approach</h2>
              <p className="mb-8">
                To successfully implement this complex, multi-phase website redesign, we recommend an agile project
                management approach with the following structure:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <BarChart4 className="mr-2 h-5 w-5 text-primary" />
                      Governance Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Executive Sponsor:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Provides strategic direction and final approval on major decisions
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Steering Committee:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Meets bi-weekly to review progress, address escalations, and approve major changes
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Project Manager:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Daily oversight of timelines, resources, and deliverables
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Technical Lead:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Oversees technical implementation and architecture decisions
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Team Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Core Development Team:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Frontend and backend developers working in agile sprints
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Design Team:</strong>
                          <p className="mt-1 text-muted-foreground">
                            UX/UI designers collaborating closely with developers
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Content Team:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Content strategists and writers creating personalized content
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Specialized Resources:</strong>
                          <p className="mt-1 text-muted-foreground">
                            AI, WebGL, and accessibility specialists as needed
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg font-medium">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Process Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Agile Methodology:</strong>
                          <p className="mt-1 text-muted-foreground">
                            Two-week sprints with daily standups and end-of-sprint reviews
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Cross-functional Collaboration:</strong>
                          <p className="mt-1 text-muted-foreground">Regular design and development pairing sessions</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Version Control:</strong>
                          <p className="mt-1 text-muted-foreground">
                            GitFlow workflow with feature branches and code reviews
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Continuous Integration:</strong>
                          <p className="mt-1 text-muted-foreground">Automated testing and deployment pipeline</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Communication & Documentation Plan</h2>
              <div className="bg-secondary p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-normal mb-4">Communication Channels</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Daily Standups:</strong>
                          <p className="mt-1 text-sm text-muted-foreground">
                            15-minute synchronous meetings for team coordination
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Slack Channels:</strong>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Dedicated channels for each phase and specialized topic
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Bi-weekly Reviews:</strong>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Sprint reviews with demos and stakeholder feedback
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <div>
                          <strong>Monthly All-hands:</strong>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Progress updates and alignment sessions with all teams
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-normal mb-4">Documentation Hub</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Centralized documentation repository for all project artifacts:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Design System:</strong> Figma library with component documentation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Technical Documentation:</strong> Architecture diagrams and API specifications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Content Strategy:</strong> Personalization guidelines and content models
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Project Plan:</strong> Timeline, resources, and milestone tracking
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>
                          <strong>Testing Documentation:</strong> Test plans, cases, and results
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Project Management Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">Planning & Tracking</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tools for managing tasks, timelines, and resources
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Jira for agile project management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Confluence for documentation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Google Calendar for scheduling</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">Design & Collaboration</h3>
                    <p className="text-sm text-muted-foreground mb-4">Tools for design work and team collaboration</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Figma for design and prototyping</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Slack for team communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Miro for visual collaboration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">Development</h3>
                    <p className="text-sm text-muted-foreground mb-4">Tools for code management and quality</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>GitHub for version control</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>GitHub Actions for CI/CD</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>CodeClimate for code quality</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">Monitoring & Analytics</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tools for tracking performance and user behavior
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Google Analytics 4</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Hotjar for user behavior</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Sentry for error tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Next Steps & Call to Action</h2>
              <div className="bg-primary/10 p-8 border border-primary/20">
                <h3 className="text-xl font-normal mb-4">Immediate Action Items</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Schedule Project Kickoff Meeting</h4>
                      <p className="text-sm text-muted-foreground">
                        Gather all stakeholders to align on vision, timeline, and success metrics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Assemble Core Project Team</h4>
                      <p className="text-sm text-muted-foreground">
                        Identify and allocate key team members for Phase 1 implementation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Conduct Technical Audit & Content Inventory</h4>
                      <p className="text-sm text-muted-foreground">
                        Evaluate current infrastructure and content to inform implementation strategy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Set Up Project Management Infrastructure</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure tools, create documentation repository, and establish workflows
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Schedule Kickoff Meeting
                  </button>
                  <button className="px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                    Download Implementation Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

