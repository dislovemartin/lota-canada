"use client";

import { HeroSection } from "@/components/ui/hero-section";
import { ScrollParallax } from "@/components/ui/scroll-parallax";
import { MouseParallax } from "@/components/ui/mouse-parallax";
import { AnimatedText } from "@/components/ui/animated-text";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimationDemo() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Demo */}
      <HeroSection
        title="Animation Components Demo"
        subtitle="Explore our collection of reusable animation components built with Framer Motion"
        imageSrc="/images/hero/diverse-professionals.jpg"
        imageAlt="Animation Demo Hero"
        ctaText="Explore Components"
        ctaHref="#components"
        secondaryCtaText="View Source"
        secondaryCtaHref="https://github.com/your-repo"
        height="large"
        textAnimation="words"
        overlayOpacity={0.7}
      />

      {/* Components Showcase */}
      <section id="components" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedText
              text="Animation Components"
              variant="chars"
              tag="h2"
              className="text-4xl font-bold mb-4 text-gray-900"
            />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These components make it easy to add sophisticated animations to your Next.js projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            {/* ScrollParallax Demo */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">ScrollParallax</h3>
              <div className="h-80 relative overflow-hidden rounded-lg">
                <ScrollParallax
                  className="w-full h-full"
                  speed={0.5}
                  direction="up"
                  fadeOut={true}
                >
                  <Image
                    src="/images/hero/image-asset2.jpeg"
                    alt="Parallax Demo"
                    fill
                    className="object-cover"
                  />
                </ScrollParallax>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                    <p className="font-medium">Scroll to see the effect</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-b-lg">
                <p className="text-gray-700">
                  The ScrollParallax component creates smooth parallax effects based on scroll position.
                </p>
              </div>
            </div>

            {/* MouseParallax Demo */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">MouseParallax</h3>
              <div className="h-80 relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <MouseParallax className="p-8" intensity={20}>
                  <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center">
                    <p className="text-white font-bold">Move your mouse</p>
                  </div>
                </MouseParallax>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-b-lg">
                <p className="text-gray-700">
                  The MouseParallax component creates interactive elements that respond to mouse movement.
                </p>
              </div>
            </div>

            {/* AnimatedText Demo */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">AnimatedText</h3>
              <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 flex flex-col items-center justify-center space-y-8">
                <AnimatedText
                  text="Words Animation"
                  variant="words"
                  tag="h3"
                  className="text-2xl font-bold text-gray-900"
                />

                <AnimatedText
                  text="Characters Animation"
                  variant="chars"
                  tag="h3"
                  className="text-2xl font-bold text-gray-900"
                />

                <AnimatedText
                  text="Slide Up Animation"
                  variant="slide-up"
                  tag="h3"
                  className="text-2xl font-bold text-gray-900"
                />
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-b-lg">
                <p className="text-gray-700">
                  The AnimatedText component provides various text animation effects with customizable options.
                </p>
              </div>
            </div>

            {/* HeroSection Demo */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">HeroSection</h3>
              <div className="h-80 relative overflow-hidden rounded-lg">
                <Image
                  src="/images/hero/diverse-professionals.jpg"
                  alt="Hero Section Demo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-2xl font-bold mb-2">Complete Hero Component</h3>
                    <p className="text-sm">
                      Combines all animation components into a polished hero section
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-b-lg">
                <p className="text-gray-700">
                  The HeroSection component is a complete solution for creating animated hero sections with minimal setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedText
              text="How to Use"
              variant="slide-up"
              tag="h2"
              className="text-4xl font-bold mb-4 text-gray-900"
            />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some examples of how to use these animation components in your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">ScrollParallax Example</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`<ScrollParallax
  className="w-full h-64"
  speed={0.5}
  direction="up"
  fadeOut={true}
>
  <Image
    src="/image.jpg"
    alt="Parallax Image"
    fill
    className="object-cover"
  />
</ScrollParallax>`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">MouseParallax Example</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`<MouseParallax
  className="p-8"
  intensity={20}
  inverted={false}
>
  <div className="w-40 h-40 bg-blue-500 rounded-lg">
    Move your mouse around
  </div>
</MouseParallax>`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">AnimatedText Example</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`<AnimatedText
  text="This text will animate"
  variant="words"
  tag="h2"
  className="text-3xl font-bold"
  delay={0.2}
  staggerChildren={0.1}
/>`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">HeroSection Example</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`<HeroSection
  title="Welcome to Our Website"
  subtitle="Discover amazing content"
  imageSrc="/hero.jpg"
  imageAlt="Hero Image"
  ctaText="Get Started"
  ctaHref="/start"
  height="full"
  textAnimation="words"
  overlayOpacity={0.6}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
