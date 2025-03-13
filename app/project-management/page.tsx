import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Project Management Features | LOTA Canada",
    description: "Transform your project management with cutting-edge features designed for modern teams.",
};

// Animation variants for staggered animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export default function ProjectManagementPage() {
    // Feature data
    const features = [
        {
            title: "Comprehensive Task & Workflow Management",
            description: "Streamline your projects with intuitive task creation, assignment, and tracking. Visualize progress with Kanban boards, Gantt charts, or list views—tailored to your team's needs.",
            icon: "/images/project-management/task-management-icon.svg",
            iconFallback: "📋",
        },
        {
            title: "Collaboration & Communication",
            description: "Connect your team with real-time messaging and file sharing. Break down silos and boost productivity with seamless collaboration tools.",
            icon: "/images/project-management/collaboration-icon.svg",
            iconFallback: "💬",
        },
        {
            title: "Project Planning & Templates",
            description: "Plan with precision using customizable templates and timelines. Keep every project on track with clear milestones and deadlines.",
            icon: "/images/project-management/planning-icon.svg",
            iconFallback: "📅",
        },
        {
            title: "Reporting & Analytics",
            description: "Gain insights with powerful reports and dashboards. Make data-driven decisions to optimize performance and outcomes.",
            icon: "/images/project-management/analytics-icon.svg",
            iconFallback: "📊",
        },
        {
            title: "Integration with Dev & Business Tools",
            description: "Sync effortlessly with tools like Slack, GitHub, and more. Enhance workflows with a fully integrated ecosystem.",
            icon: "/images/project-management/integration-icon.svg",
            iconFallback: "🔄",
        },
    ];

    // Testimonial data
    const testimonials = [
        {
            quote: "This project management solution transformed how our team collaborates. We've seen a 30% increase in on-time deliveries.",
            author: "Sarah Johnson",
            role: "Project Director",
            company: "TechInnovate",
            avatar: "/images/project-management/avatar-1.svg",
        },
        {
            quote: "The analytics features helped us identify bottlenecks we didn't even know existed. Game-changer for our workflow.",
            author: "Michael Chen",
            role: "Operations Manager",
            company: "GlobalSystems",
            avatar: "/images/project-management/avatar-2.svg",
        },
        {
            quote: "Integration with our existing tools was seamless. Our dev team is now much more aligned with business objectives.",
            author: "Priya Patel",
            role: "CTO",
            company: "FutureWorks",
            avatar: "/images/project-management/avatar-3.svg",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Transform Your Project Management
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Say goodbye to missed deadlines and chaotic workflows. Our project management software empowers your team to stay organized and deliver on time.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Start Free Trial
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                    Request Demo
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center lg:justify-end">
                            <div className="relative h-[300px] w-full max-w-[500px] overflow-hidden rounded-lg shadow-xl sm:h-[350px] md:h-[400px] lg:h-[450px]">
                                <Image
                                    src="/images/project-management/dashboard-preview.svg"
                                    alt="Project management dashboard preview"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background decorative elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-2xl" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto mb-10 max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Five Powerful Features for Modern Teams
                        </h2>
                        <p className="text-muted-foreground md:text-lg">
                            Our comprehensive suite of tools helps teams of all sizes manage projects efficiently and deliver exceptional results.
                        </p>
                    </div>
                    <motion.div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                                    <CardHeader className="pb-2">
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            {feature.icon ? (
                                                <Image
                                                    src={feature.icon}
                                                    alt={feature.title}
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : (
                                                <span className="text-2xl">{feature.iconFallback}</span>
                                            )}
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary/5 py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready to Transform Your Project Management?
                        </h2>
                        <p className="mb-6 text-muted-foreground md:text-lg">
                            Join thousands of teams already using our platform to deliver projects on time and within budget.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto mb-10 max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Trusted by Leading Teams
                        </h2>
                        <p className="text-muted-foreground md:text-lg">
                            See what our customers have to say about our project management solution.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                            {testimonial.avatar ? (
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.author}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                                                    {testimonial.author.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{testimonial.author}</CardTitle>
                                            <CardDescription>
                                                {testimonial.role}, {testimonial.company}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Logos Section */}
            <section className="border-t py-8 md:py-12">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h3 className="mb-6 text-lg font-medium">Trusted by companies worldwide</h3>
                        <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-70">
                            {/* Replace with actual client logos */}
                            <div className="h-8 w-auto">
                                <div className="h-full w-24 bg-muted/30 rounded"></div>
                            </div>
                            <div className="h-8 w-auto">
                                <div className="h-full w-24 bg-muted/30 rounded"></div>
                            </div>
                            <div className="h-8 w-auto">
                                <div className="h-full w-24 bg-muted/30 rounded"></div>
                            </div>
                            <div className="h-8 w-auto">
                                <div className="h-full w-24 bg-muted/30 rounded"></div>
                            </div>
                            <div className="h-8 w-auto">
                                <div className="h-full w-24 bg-muted/30 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="border-t py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto mb-10 max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground md:text-lg">
                            Find answers to common questions about our project management solution.
                        </p>
                    </div>
                    <div className="mx-auto max-w-[800px] space-y-4">
                        {[
                            {
                                question: "How does the free trial work?",
                                answer: "Our free trial gives you full access to all features for 14 days. No credit card required, and you can cancel anytime."
                            },
                            {
                                question: "Can I integrate with my existing tools?",
                                answer: "Yes, our platform integrates with popular tools like Slack, GitHub, Jira, Microsoft Teams, and many more through our API and pre-built connectors."
                            },
                            {
                                question: "Is there a limit to the number of projects?",
                                answer: "No, all plans include unlimited projects. Team size and advanced features vary by plan."
                            },
                            {
                                question: "Do you offer custom enterprise solutions?",
                                answer: "Yes, we offer tailored enterprise solutions with dedicated support, custom integrations, and advanced security features."
                            },
                            {
                                question: "How secure is my data?",
                                answer: "We implement industry-leading security measures including end-to-end encryption, regular security audits, and compliance with GDPR, HIPAA, and other regulations."
                            }
                        ].map((faq, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-primary text-primary-foreground py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Start Your Project Management Journey Today
                        </h2>
                        <p className="mb-6 text-primary-foreground/80 md:text-lg">
                            Join thousands of successful teams who have transformed their project management.
                        </p>
                        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
} 