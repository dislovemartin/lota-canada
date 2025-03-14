import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project Management Features | LOTA Canada",
    description: "Transform your project management with cutting-edge features designed for modern teams.",
};

export default function ProjectManagementPage() {
    // Feature data
    const features = [
        {
            title: "Task Management",
            description: "Create, assign, and track tasks with ease. Keep your team organized and focused on priorities.",
            icon: "/images/project-management/task-icon.svg",
            iconFallback: "📋"
        },
        {
            title: "Team Collaboration",
            description: "Work together seamlessly with real-time updates. Share files, comments, and feedback in one place.",
            icon: "/images/project-management/team-icon.svg",
            iconFallback: "👥"
        },
        {
            title: "Reporting & Analytics",
            description: "Get insights with powerful analytics and reports. Make data-driven decisions to improve performance.",
            icon: "/images/project-management/report-icon.svg",
            iconFallback: "📊"
        },
        {
            title: "Resource Planning",
            description: "Allocate resources effectively across projects. Prevent bottlenecks and optimize team capacity.",
            icon: "/images/project-management/resource-icon.svg",
            iconFallback: "📆"
        },
        {
            title: "Integration Ecosystem",
            description: "Connect with your favorite tools. Seamless integration with Slack, GitHub, and more.",
            icon: "/images/project-management/integration-icon.svg",
            iconFallback: "🔄"
        },
        {
            title: "Customizable Workflows",
            description: "Adapt processes to your team's needs. Create custom workflows that match how you work.",
            icon: "/images/project-management/workflow-icon.svg",
            iconFallback: "⚙️"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="mb-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                            Transform Your Project Management
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Our comprehensive project management solutions help teams collaborate effectively and deliver projects on time, every time.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                                Get Started
                            </button>
                            <button className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors">
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-xl">
                            {/* Placeholder for hero image */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                                <span className="text-4xl">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Teams</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our suite of tools helps teams of all sizes manage projects efficiently and deliver exceptional results.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                                    {feature.iconFallback && (
                                        <span className="text-2xl">{feature.iconFallback}</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary/5 rounded-xl p-8 mb-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Project Management?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Join thousands of teams already using our platform to deliver projects on time and within budget.
                    </p>
                    <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from teams who have transformed their project management with our platform.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6 shadow-sm">
                        <p className="italic text-gray-600 mb-4">
                            "This platform has completely transformed how our team collaborates. We've seen a 30% increase in on-time deliveries."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                <span>S</span>
                            </div>
                            <div>
                                <p className="font-semibold">Sarah Johnson</p>
                                <p className="text-sm text-gray-500">Project Director, TechInnovate</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg p-6 shadow-sm">
                        <p className="italic text-gray-600 mb-4">
                            "The analytics features helped us identify bottlenecks we didn't even know existed. Game-changer for our workflow."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                <span>M</span>
                            </div>
                            <div>
                                <p className="font-semibold">Michael Chen</p>
                                <p className="text-sm text-gray-500">Operations Manager, GlobalSystems</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg p-6 shadow-sm">
                        <p className="italic text-gray-600 mb-4">
                            "Integration with our existing tools was seamless. Our dev team is now much more aligned with business objectives."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                <span>P</span>
                            </div>
                            <div>
                                <p className="font-semibold">Priya Patel</p>
                                <p className="text-sm text-gray-500">CTO, FutureWorks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our project management solution.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
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
                        }
                    ].map((faq, index) => (
                        <div key={index} className="border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
} 