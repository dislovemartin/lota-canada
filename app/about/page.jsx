"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
export default function AboutPage() {
    return (<>
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="LOTA leadership team" fill className="object-cover" priority/>
          <div className="absolute inset-0 bg-black/60"/>
        </div>

        <div className="container-wide relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ABOUT LOTA
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Fostering the next generation of business leaders and
              professionals in Toronto and beyond.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide mx-auto py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedHeading title="Our Story" subtitle="The Leaders of Tomorrow Association (LOTA) is dedicated to fostering professional growth and leadership development across Canada." underline/>

          <AnimatedText>
            <p className="mb-6">
              We connect emerging leaders with established professionals,
              creating opportunities for mentorship, networking, and skill
              development. Our community spans diverse industries and
              backgrounds, united by a commitment to excellence and growth.
            </p>

            <p className="mb-6">
              Founded with the vision of bridging gaps and creating
              opportunities, LOTA has grown into a vibrant community of
              professionals at various stages of their careers. We believe in
              the power of connection, education, and mentorship to transform
              careers and lives.
            </p>
          </AnimatedText>
        </div>

        <SectionDivider className="my-16"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedHeading title="Our Mission" underline/>

            <AnimatedText>
              <p className="mb-6">
                To empower the next generation of leaders by providing
                resources, connections, and experiences that accelerate
                professional growth and foster leadership excellence.
              </p>

              <p className="mb-6">
                We are committed to creating an inclusive environment where
                diverse perspectives are valued and where every member has the
                opportunity to develop their leadership potential.
              </p>
            </AnimatedText>
          </div>

          <AnimatedImage src="/placeholder.svg?height=800&width=800" alt="LOTA mission"/>
        </div>

        <SectionDivider className="my-16"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedImage src="/placeholder.svg?height=800&width=800" alt="LOTA vision" className="order-1 md:order-2"/>

          <div className="order-2 md:order-1">
            <AnimatedHeading title="Our Vision" underline/>

            <AnimatedText>
              <p className="mb-6">
                A thriving professional community where emerging leaders have
                access to the resources, mentorship, and opportunities they need
                to reach their full potential and make meaningful contributions
                to their industries and communities.
              </p>

              <p className="mb-6">
                We envision a future where leadership excellence is accessible
                to all, and where diverse perspectives drive innovation and
                positive change.
              </p>
            </AnimatedText>
          </div>
        </div>

        <SectionDivider className="my-16"/>

        <div>
          <AnimatedHeading title="Our Values" align="center" underline/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ValueCard title="Excellence" description="We strive for excellence in all our programs, initiatives, and interactions, setting high standards for ourselves and our community." index={0}/>

            <ValueCard title="Inclusivity" description="We embrace diversity and create an inclusive environment where all perspectives are valued and everyone has the opportunity to contribute and grow." index={1}/>

            <ValueCard title="Innovation" description="We encourage creative thinking and innovative approaches to leadership challenges, fostering a culture of continuous improvement and adaptation." index={2}/>

            <ValueCard title="Integrity" description="We act with honesty, transparency, and ethical conduct in all our endeavors, building trust within our community and beyond." index={3}/>

            <ValueCard title="Collaboration" description="We believe in the power of working together, sharing knowledge, and supporting each other to achieve greater impact and success." index={4}/>

            <ValueCard title="Growth" description="We are committed to continuous learning and development, both as individuals and as an organization, embracing challenges as opportunities to grow." index={5}/>
          </div>
        </div>

        <SectionDivider className="my-16"/>

        <div className="bg-gray-50 p-12 rounded-lg">
          <AnimatedHeading title="Our Impact" subtitle="Since our founding, LOTA has made a significant impact on the professional community." align="center" underline/>

          <AnimatedStats stats={[
            { value: 500, label: "Members", suffix: "+" },
            { value: 48, label: "Events Hosted", suffix: "" },
            { value: 120, label: "Mentorship Connections", suffix: "+" },
            { value: 25, label: "Corporate Partners", suffix: "" },
        ]} variant="minimal" className="mt-12"/>
        </div>

        <div className="mt-16 text-center">
          <AnimatedButton href="/contact" variant="primary" size="lg">
            Join Our Community
          </AnimatedButton>
        </div>
      </div>
    </>);
}
function AnimatedText({ children, className }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>);
}
function AnimatedImage({ src, alt, className }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className={`relative ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover"/>
    </motion.div>);
}
function ValueCard({ title, description, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white p-8 shadow-sm">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>);
}
