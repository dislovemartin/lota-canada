"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4, CheckCircle2, Clock, Code, FileText, LineChart, Palette, Search, Users, } from "lucide-react";
export default function WebsiteOptimizationPlan() {
    return (<div className="container-wide py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          LOTA Website Optimization Plan
        </h1>
        <p className="text-lg mb-8">
          A comprehensive plan to improve the LOTA website across user
          interface, user experience, performance, and accessibility.
        </p>

        <Tabs defaultValue="ui" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="ui" className="flex items-center gap-2">
              <Palette className="h-4 w-4"/>
              <span>UI Improvements</span>
            </TabsTrigger>
            <TabsTrigger value="ux" className="flex items-center gap-2">
              <Users className="h-4 w-4"/>
              <span>UX Enhancements</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4"/>
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4"/>
              <span>Accessibility</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ui" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary"/>
                  User Interface Improvements
                </CardTitle>
                <CardDescription>
                  Enhancing the visual design and interface elements for better
                  user engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Hero Section</h3>
                  <p className="text-muted-foreground">
                    ✅ Increased text contrast by darkening the overlay for
                    better readability
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Added a secondary CTA button to provide clear action
                    paths for users
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Improved image loading with proper sizing and quality
                    attributes
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Navigation</h3>
                  <p className="text-muted-foreground">
                    ✅ Implemented a responsive hamburger menu for mobile
                    devices
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Added visual indicators for active navigation items
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Improved dropdown menu accessibility and visual design
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Design Consistency</h3>
                  <p className="text-muted-foreground">
                    ✅ Standardized button styles across the site
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Expand the color palette to create better visual
                    hierarchy
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Implement consistent spacing and alignment throughout the
                    site
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500"/>
                  <span>3 completed</span>
                  <Clock className="h-4 w-4 ml-4 mr-2 text-amber-500"/>
                  <span>2 in progress</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ux" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary"/>
                  User Experience Enhancements
                </CardTitle>
                <CardDescription>
                  Improving how users interact with and navigate through the
                  website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Content Structure</h3>
                  <p className="text-muted-foreground">
                    ✅ Added clear section headings with improved visual
                    hierarchy
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Reorganizing content with a more logical flow and
                    structure
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Interaction Design</h3>
                  <p className="text-muted-foreground">
                    ✅ Added hover effects to interactive elements for better
                    feedback
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Improved focus states for keyboard navigation
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Enhancing form validation and error messages
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Announcement Banner</h3>
                  <p className="text-muted-foreground">
                    ✅ Made the announcement banner dismissible with local
                    storage persistence
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Improved mobile responsiveness of the announcement text
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Added proper ARIA attributes for screen readers
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500"/>
                  <span>5 completed</span>
                  <Clock className="h-4 w-4 ml-4 mr-2 text-amber-500"/>
                  <span>2 in progress</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-primary"/>
                  Performance Optimization
                </CardTitle>
                <CardDescription>
                  Enhancing loading speed and overall site performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Loading Speed</h3>
                  <p className="text-muted-foreground">
                    ✅ Implemented image optimization with proper sizing and
                    formats
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Added image format conversion to WebP and AVIF
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Implementing lazy loading for below-the-fold content
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Core Web Vitals</h3>
                  <p className="text-muted-foreground">
                    ✅ Improved LCP (Largest Contentful Paint) by optimizing
                    hero images
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Reduced CLS (Cumulative Layout Shift) by specifying image
                    dimensions
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Optimizing INP (Interaction to Next Paint) by improving
                    event handlers
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Code Optimization</h3>
                  <p className="text-muted-foreground">
                    ✅ Enabled CSS optimization in Next.js config
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Implemented package import optimization for smaller
                    bundles
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding code splitting for route-based loading
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500"/>
                  <span>6 completed</span>
                  <Clock className="h-4 w-4 ml-4 mr-2 text-amber-500"/>
                  <span>3 in progress</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary"/>
                  Accessibility Improvements
                </CardTitle>
                <CardDescription>
                  Making the website usable for all users, including those with
                  disabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Semantic HTML</h3>
                  <p className="text-muted-foreground">
                    ✅ Added proper ARIA attributes to interactive elements
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Improved heading structure for better screen reader
                    navigation
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Enhancing landmark regions with appropriate roles
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Keyboard Navigation</h3>
                  <p className="text-muted-foreground">
                    ✅ Implemented visible focus states for keyboard users
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Ensured logical tab order throughout the site
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding keyboard shortcuts for common actions
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Color and Contrast</h3>
                  <p className="text-muted-foreground">
                    ✅ Increased contrast between text and background colors
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding non-color indicators for important information
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Implementing a high contrast mode option
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500"/>
                  <span>5 completed</span>
                  <Clock className="h-4 w-4 ml-4 mr-2 text-amber-500"/>
                  <span>4 in progress</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search className="h-6 w-6 text-primary"/>
              SEO Optimization
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Meta Information</h3>
                  <p className="text-muted-foreground">
                    ✅ Added comprehensive metadata including OpenGraph and
                    Twitter cards
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Implemented proper viewport settings
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding structured data for events and organization
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Content Strategy</h3>
                  <p className="text-muted-foreground">
                    ✅ Added relevant keywords to metadata
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Improving alt text for all images
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Creating a sitemap.xml and robots.txt file
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <LineChart className="h-6 w-6 text-primary"/>
              Analytics and Monitoring
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Implementation Plan</h3>
                  <p className="text-muted-foreground">
                    ⏳ Setting up Vercel Analytics to track user behavior
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Implementing Speed Insights to monitor Core Web Vitals
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Creating custom event tracking for important user
                    interactions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary"/>
              Content Strategy
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Planned Additions</h3>
                  <p className="text-muted-foreground">
                    ⏳ Adding testimonials and success stories to build
                    credibility
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Creating a dedicated FAQ section
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Enhancing information about the organization's mission
                    and impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code className="h-6 w-6 text-primary"/>
              Technical Improvements
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Future Enhancements</h3>
                  <p className="text-muted-foreground">
                    ⏳ Implementing a service worker for offline capabilities
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding proper error handling for form submissions
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Setting up automated accessibility testing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart4 className="h-6 w-6 text-primary"/>
              Performance Optimization
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Loading Speed</h3>
                  <p className="text-muted-foreground">
                    ✅ Implemented image optimization with proper sizing and
                    formats
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Added image format conversion to WebP and AVIF
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Implementing lazy loading for below-the-fold content
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Core Web Vitals</h3>
                  <p className="text-muted-foreground">
                    ✅ Improved LCP (Largest Contentful Paint) by optimizing
                    hero images
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Reduced CLS (Cumulative Layout Shift) by specifying image
                    dimensions
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Optimizing INP (Interaction to Next Paint) by improving
                    event handlers
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Code Optimization</h3>
                  <p className="text-muted-foreground">
                    ✅ Enabled CSS optimization in Next.js config
                  </p>
                  <p className="text-muted-foreground">
                    ✅ Implemented package import optimization for smaller
                    bundles
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Adding code splitting for route-based loading
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary"/>
              Content Strategy
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Planned Additions</h3>
                  <p className="text-muted-foreground">
                    ⏳ Adding testimonials and success stories to build
                    credibility
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Creating a dedicated FAQ section
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Enhancing information about the organization's mission
                    and impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary"/>
              Design Enhancements
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Planned Additions</h3>
                  <p className="text-muted-foreground">
                    ⏳ Adding testimonials and success stories to build
                    credibility
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Creating a dedicated FAQ section
                  </p>
                  <p className="text-muted-foreground">
                    ⏳ Enhancing information about the organization's mission
                    and impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Implementation Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 dark:bg-gray-700">
            <div className="bg-primary h-4 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <p className="text-lg mb-8">
            <span className="font-bold">45%</span> of improvements implemented
          </p>
          <Button size="lg" className="mx-auto">
            View Detailed Implementation Plan
          </Button>
        </div>
      </div>
    </div>);
}
