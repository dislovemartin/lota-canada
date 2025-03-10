import Link from "next/link";
import Image from "next/image";
import { BarChart3, Brain, Plug2 } from "lucide-react";
export function MissingFeatures() {
    return (<section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 underline-accent">Missing Features</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore features we're working on to enhance your business hub experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advanced Analytics */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=400&width=600" alt="Analytics Dashboard" fill className="object-cover"/>
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-background rounded-full text-accent">
                  <BarChart3 size={24}/>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">Advanced Analytics</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Track your business performance with real-time insights and data visualizations
              </p>
              <Link href="/features/analytics" className="block text-center text-accent hover:text-accent/80 transition-colors">
                Learn More
              </Link>
            </div>
          </div>

          {/* AI-Powered Insights */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=400&width=600" alt="AI Interface" fill className="object-cover"/>
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-background rounded-full text-accent">
                  <Brain size={24}/>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">AI-Powered Insights</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Leverage AI to gain actionable insights and optimize your strategies
              </p>
              <Link href="/features/ai-insights" className="block text-center text-accent hover:text-accent/80 transition-colors">
                Learn More
              </Link>
            </div>
          </div>

          {/* Custom Integrations */}
          <div className="bg-secondary rounded-lg overflow-hidden transition-all duration-300 glow-hover">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=400&width=600" alt="API Integration" fill className="object-cover"/>
              <div className="absolute inset-0 bg-accent/20"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-background rounded-full text-accent">
                  <Plug2 size={24}/>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">Custom Integrations</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Seamlessly connect your tools and workflows for a unified experience
              </p>
              <Link href="/features/integrations" className="block text-center text-accent hover:text-accent/80 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
