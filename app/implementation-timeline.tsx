"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function ImplementationTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)

  const togglePhase = (phase: string) => {
    if (expandedPhase === phase) {
      setExpandedPhase(null)
    } else {
      setExpandedPhase(phase)
    }
  }

  return (
    <div className="container-wide py-16">
      <h1 className="text-4xl font-normal mb-4">LOTA Website Redesign: Implementation Timeline</h1>
      <p className="text-xl mb-10 max-w-3xl">
        A comprehensive timeline with specific timeframes for implementing all 20 future-focused web pages while
        maintaining our Aesop-inspired aesthetic.
      </p>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Timeline Overview</TabsTrigger>
          <TabsTrigger value="phase1">Phase 1: Core Pages</TabsTrigger>
          <TabsTrigger value="phase2">Phase 2: Knowledge Hub</TabsTrigger>
          <TabsTrigger value="phase3">Phase 3: Program Pages</TabsTrigger>
          <TabsTrigger value="phase4">Phase 4: Community Pages</TabsTrigger>
          <TabsTrigger value="phase5">Phase 5: Innovation Center</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Project Timeline Overview</h2>
              <p className="mb-8">
                The LOTA website redesign will be implemented over a 12-month period, divided into 5 phases with
                specific milestones and deliverables:
              </p>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                {/* Phase 1 */}
                <div className="relative pl-20 pb-16">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium">1</span>
                  </div>
                  <div className="absolute left-[7.5rem] top-8 w-3 h-3 rounded-full bg-primary"></div>

                  <h3 className="text-xl font-normal mb-2">Phase 1: Core Pages (Months 1-3)</h3>
                  <p className="text-muted-foreground mb-4">
                    Implementation of the foundational pages that establish the site structure and design system
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Key Milestones
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 1: Design system & technical foundation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 2: Homepage & About Us implementation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 3: Contact Hub & Membership Portal</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Extended design system with new components</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>4 core pages with responsive design</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>AI recommendation framework foundation</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative pl-20 pb-16">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium">2</span>
                  </div>
                  <div className="absolute left-[7.5rem] top-8 w-3 h-3 rounded-full bg-primary"></div>

                  <h3 className="text-xl font-normal mb-2">Phase 2: Knowledge Hub (Months 4-5)</h3>
                  <p className="text-muted-foreground mb-4">
                    Development of the knowledge center with personalized content recommendations
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Key Milestones
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 4: Knowledge Hub & Research Lab</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 5: Leadership Observatory & Resource Library</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>4 knowledge pages with content personalization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Advanced search functionality</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Interactive data visualizations</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative pl-20 pb-16">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium">3</span>
                  </div>
                  <div className="absolute left-[7.5rem] top-8 w-3 h-3 rounded-full bg-primary"></div>

                  <h3 className="text-xl font-normal mb-2">Phase 3: Program Pages (Months 6-7)</h3>
                  <p className="text-muted-foreground mb-4">
                    Implementation of program-related pages with interactive elements
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Key Milestones
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 6: Programs Overview & Executive Mentorship</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 7: Leadership Workshops & Future Leaders</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>4 program pages with application workflows</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>AI-powered mentor matching system</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Interactive program comparison tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="relative pl-20 pb-16">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium">4</span>
                  </div>
                  <div className="absolute left-[7.5rem] top-8 w-3 h-3 rounded-full bg-primary"></div>

                  <h3 className="text-xl font-normal mb-2">Phase 4: Community Pages (Months 8-9)</h3>
                  <p className="text-muted-foreground mb-4">
                    Development of community-focused pages with networking features
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Key Milestones
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 8: Community Platform & Events Evolution</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 9: Global Chapter Network & Alumni Network</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>4 community pages with member directories</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Interactive event calendar and registration</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Global chapter map with real-time updates</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Phase 5 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium">5</span>
                  </div>
                  <div className="absolute left-[7.5rem] top-8 w-3 h-3 rounded-full bg-primary"></div>

                  <h3 className="text-xl font-normal mb-2">Phase 5: Innovation Center (Months 10-12)</h3>
                  <p className="text-muted-foreground mb-4">
                    Implementation of forward-looking pages with advanced interactive features
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Key Milestones
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 10: Innovation Lab & Future of Work</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 11: Sustainability Leadership & Digital Transformation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Month 12: Final integration, testing, and launch</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>4 innovation pages with advanced visualizations</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>WebGL-powered interactive experiences</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Predictive analytics dashboards</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                            <span>Complete integration of all 20 pages</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Critical Dependencies & Resource Allocation</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-normal mb-4">Critical Dependencies</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-primary" />
                        Design System Completion
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The extended design system must be completed by the end of Month 1 to enable consistent
                        development across all pages.
                      </p>
                    </div>

                    <div className="bg-secondary p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-primary" />
                        AI Framework Implementation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The AI recommendation framework must be functional by the end of Month 3 to support
                        personalization features in subsequent phases.
                      </p>
                    </div>

                    <div className="bg-secondary p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-primary" />
                        Content Production Timeline
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Content creation must begin 1 month before the development of each page to ensure timely
                        implementation.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-normal mb-4">Resource Allocation Timeline</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Resource</th>
                          <th className="py-2 px-4 text-left">Phase 1</th>
                          <th className="py-2 px-4 text-left">Phase 2</th>
                          <th className="py-2 px-4 text-left">Phase 3</th>
                          <th className="py-2 px-4 text-left">Phase 4</th>
                          <th className="py-2 px-4 text-left">Phase 5</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Project Manager</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">UX/UI Designer</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">50%</td>
                          <td className="py-2 px-4">50%</td>
                          <td className="py-2 px-4">75%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Frontend Developers (2)</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Backend Developer</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">75%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">AI/ML Engineer</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">50%</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">25%</td>
                          <td className="py-2 px-4">75%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-medium">Content Team</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">100%</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">75%</td>
                          <td className="py-2 px-4">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Key Milestones & Review Points</h2>

              <div className="space-y-4">
                <div className="bg-secondary p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-primary rounded-full mr-4">
                      <span className="font-medium">M1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Month 3: Core Pages Completion</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Review of all core pages, design system, and technical foundation before proceeding to Phase 2.
                      </p>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>End of Month 3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-primary rounded-full mr-4">
                      <span className="font-medium">M2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Month 5: Knowledge Hub Completion</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Review of knowledge pages, content personalization, and search functionality before proceeding
                        to Phase 3.
                      </p>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>End of Month 5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-primary rounded-full mr-4">
                      <span className="font-medium">M3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Month 7: Program Pages Completion</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Review of program pages, application workflows, and mentor matching system before proceeding to
                        Phase 4.
                      </p>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>End of Month 7</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-primary rounded-full mr-4">
                      <span className="font-medium">M4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Month 9: Community Pages Completion</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Review of community pages, event calendar, and chapter map before proceeding to Phase 5.
                      </p>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>End of Month 9</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-primary rounded-full mr-4">
                      <span className="font-medium">M5</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Month 12: Final Launch</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Comprehensive review of all 20 pages, performance testing, and accessibility validation before
                        final launch.
                      </p>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>End of Month 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                View Detailed Phase 1 Timeline <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phase1">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Phase 1: Core Pages (Months 1-3)</h2>
              <p className="mb-8">
                The first phase focuses on establishing the foundation of the website by implementing the core pages and
                technical infrastructure. This phase is critical as it sets up the design system, technical
                architecture, and content framework that will support all subsequent phases.
              </p>

              <div className="bg-secondary p-8 mb-8">
                <h3 className="text-xl font-normal mb-4">Month 1: Foundation & Planning</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Weeks 1-2: Discovery & Setup</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Conduct user research and stakeholder interviews</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Audit existing design assets and brand guidelines</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create initial wireframes for core pages</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Define user personas and journey maps</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Technical Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Conduct technical audit of existing website</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Set up development environment and CI/CD pipeline</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Define technical architecture and stack</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create repository structure and documentation</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Weeks 3-4: Design System & Technical Foundation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Extend design system with new components</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create high-fidelity mockups for Homepage</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design responsive layouts for all core pages</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create animation and interaction specifications</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Technical Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement component library in code</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Set up headless CMS and content models</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create base layout templates and navigation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement analytics and monitoring setup</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 mb-8">
                <h3 className="text-xl font-normal mb-4">Month 2: Homepage & About Us Implementation</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Weeks 5-6: Homepage Development</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Finalize homepage content and imagery</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create animated illustrations for hero section</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design micro-interactions and hover states</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Conduct usability testing on homepage prototype</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement responsive homepage layout</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop dynamic hero section with animations</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create featured programs and articles components</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement newsletter subscription functionality</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Weeks 7-8: About Us Page Development</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Finalize About Us content and team profiles</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design interactive timeline of LOTA's history</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create visual assets for mission and values</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design team member profile components</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement responsive About Us page layout</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop interactive timeline component</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create team member grid with filtering</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement parallax scrolling effects</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8">
                <h3 className="text-xl font-normal mb-4">Month 3: Contact Hub & Membership Portal</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Weeks 9-10: Contact & Connect Hub</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design smart contact form with routing logic</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create interactive map showing LOTA's presence</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design multi-channel communication options</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create FAQ section with expandable answers</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement contact form with validation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop intelligent routing system for inquiries</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Integrate interactive map with location data</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create appointment scheduling functionality</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Weeks 11-12: Membership Portal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design personalized dashboard layout</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create tiered membership visualization</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design member profile and settings pages</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create onboarding flow for new members</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement authentication and authorization</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop personalized dashboard with recommendations</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create membership management functionality</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement digital credentials with verification</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Phase 1 Deliverables & Testing</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-normal mb-4">Deliverables</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Extended Design System</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Complete component library with documentation, design tokens, and usage guidelines
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">4 Core Pages</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Homepage, About Us, Contact Hub, and Membership Portal with responsive design
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Technical Foundation</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Next.js application with headless CMS integration, authentication, and analytics
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">AI Framework Foundation</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Initial implementation of recommendation engine for personalization features
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-normal mb-4">Testing & Quality Assurance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Usability Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Conduct moderated testing sessions with representative users to validate design decisions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Performance Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Measure Core Web Vitals and optimize for speed across devices and connection types
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Accessibility Audit</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Ensure WCAG 2.1 AA compliance through automated and manual testing
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Cross-Browser Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Verify functionality and appearance across major browsers and devices
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="inline-flex items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Back to Overview
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                View Phase 2 Timeline <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phase2">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-normal mb-6">Phase 2: Knowledge Hub (Months 4-5)</h2>
              <p className="mb-8">
                The second phase focuses on developing the knowledge center with personalized content recommendations,
                advanced search functionality, and interactive data visualizations. This phase builds upon the technical
                foundation established in Phase 1.
              </p>

              <div className="bg-secondary p-8 mb-8">
                <h3 className="text-xl font-normal mb-4">Month 4: Knowledge Hub & Research Lab</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Weeks 13-14: Knowledge Hub Transformation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design knowledge hub layout with filtering options</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create article card and detail page templates</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop content categorization system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create initial set of featured articles</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement knowledge hub with filtering and sorting</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop personalized content recommendation system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create article detail page with related content</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement content search functionality</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Weeks 15-16: Research & Insights Laboratory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design interactive data visualization components</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create research methodology documentation templates</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop white paper and case study formats</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create initial set of research content</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement interactive data visualizations with D3.js</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop explorable datasets with interactive filters</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create research methodology documentation system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement collaborative research initiatives platform</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8">
                <h3 className="text-xl font-normal mb-4">Month 5: Leadership Observatory & Resource Library</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Weeks 17-18: Future of Leadership Observatory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design interactive trend radar visualization</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create expert commentary and analysis templates</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop case study format for innovative approaches</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create initial set of leadership trend content</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement interactive trend radar with WebGL</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop expert commentary submission system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create predictive scenarios visualization tool</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement real-time data visualization of trends</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Weeks 19-20: Leadership Resource Library</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Design & Content Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Design resource library interface with advanced filters</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create templates for different resource types</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop curated collections for specific challenges</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create initial set of downloadable resources</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">Development Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement advanced search with semantic understanding</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Develop resource rating and review system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Create secure download system for resources</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 mr-2"></span>
                              <span>Implement personalized resource recommendations</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-6">Phase 2 Deliverables & Testing</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-normal mb-4">Deliverables</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Knowledge Hub Pages</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Complete knowledge center with personalized content recommendations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Research Laboratory</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Interactive platform for showcasing research with data visualizations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Leadership Observatory</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Forward-looking resource center tracking emerging leadership trends
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Resource Library</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Comprehensive, searchable library of leadership resources
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-normal mb-4">Testing & Quality Assurance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Search Functionality Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Validate search accuracy, relevance, and performance with various queries
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Data Visualization Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Ensure accuracy and performance of interactive visualizations across devices
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Content Personalization Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Validate recommendation algorithms with different user profiles
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-medium">Resource Download Testing</strong>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Verify secure download functionality for various resource types
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="inline-flex items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Back to Overview
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                View Phase 3 Timeline <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phase3">
          <div className="space-y-12">
            <h2 className="text-2xl font-normal mb-6">Phase 3: Program Pages (Months 6-7)</h2>
            <p className="mb-8">
              The third phase focuses on implementing program-related pages with interactive elements, application
              workflows, and AI-powered features. This phase leverages the design system and technical foundation
              established in earlier phases.
            </p>

            {/* Content for Phase 3 would continue here with similar structure to Phase 1 and 2 */}
            <div className="flex justify-center">
              <button className="inline-flex items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Back to Overview
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phase4">
          <div className="space-y-12">
            <h2 className="text-2xl font-normal mb-6">Phase 4: Community Pages (Months 8-9)</h2>
            <p className="mb-8">
              The fourth phase focuses on developing community-focused pages with networking features, event management,
              and global chapter coordination. This phase builds upon the personalization and interactive elements from
              previous phases.
            </p>

            {/* Content for Phase 4 would continue here with similar structure to previous phases */}
            <div className="flex justify-center">
              <button className="inline-flex items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Back to Overview
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phase5">
          <div className="space-y-12">
            <h2 className="text-2xl font-normal mb-6">Phase 5: Innovation Center (Months 10-12)</h2>
            <p className="mb-8">
              The final phase focuses on implementing forward-looking pages with advanced interactive features, WebGL
              visualizations, and predictive analytics. This phase completes the 20-page redesign and integrates all
              components into a cohesive experience.
            </p>

            {/* Content for Phase 5 would continue here with similar structure to previous phases */}
            <div className="flex justify-center">
              <button className="inline-flex items-center px-6 py-3 border border-primary bg-transparent hover:bg-primary/5 transition-colors">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Back to Overview
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

