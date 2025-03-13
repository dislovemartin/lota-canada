"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Globe, Target, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
export default function MissionPage() {
    return (<>
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="LOTA mission" fill className="object-cover" priority/>
          <div className="absolute inset-0 bg-black/50"/>
        </div>

        <div className="container-wide relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              OUR MISSION
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Empowering the next generation of leaders through connection,
              education, and opportunity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide mx-auto py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedHeading title="Our Purpose" subtitle="The Leaders of Tomorrow Association exists to bridge the gap between emerging talent and established professionals." underline/>

          <AnimatedText>
            <p className="mb-6 text-lg">
              We believe that leadership is not just about position or title,
              but about influence, impact, and the ability to inspire positive
              change. Our mission is to cultivate these qualities in the next
              generation of professionals.
            </p>

            <p className="mb-6 text-lg">
              Through mentorship, educational programs, networking events, and
              community engagement, we create pathways for growth and
              development that prepare our members to lead with purpose,
              integrity, and vision.
            </p>
          </AnimatedText>
        </div>

        <SectionDivider className="my-16"/>

        {/* Mission Pillars */}
        <div>
          <AnimatedHeading title="Our Mission Pillars" align="center" underline/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <MissionPillar icon={<Target className="h-8 w-8"/>} title="Leadership Development" description="We provide structured programs and resources that build essential leadership skills, from communication and decision-making to strategic thinking and emotional intelligence." index={0}/>

            <MissionPillar icon={<Users className="h-8 w-8"/>} title="Mentorship & Connection" description="We facilitate meaningful relationships between emerging leaders and experienced professionals, creating opportunities for guidance, support, and knowledge transfer." index={1}/>

            <MissionPillar icon={<Globe className="h-8 w-8"/>} title="Community Impact" description="We encourage and enable our members to apply their leadership skills to address real-world challenges and make positive contributions to their communities." index={2}/>

            <MissionPillar icon={<Award className="h-8 w-8"/>} title="Professional Excellence" description="We foster a culture of continuous improvement, ethical conduct, and high standards, preparing our members to excel in their chosen fields." index={3}/>
          </div>
        </div>

        <SectionDivider className="my-16"/>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedHeading title="Our Vision" subtitle="A future where leadership excellence is accessible to all, and where diverse perspectives drive innovation and positive change." underline/>

            <AnimatedText>
              <p className="mb-6 text-lg">
                We envision a professional landscape where barriers to
                advancement are removed, where talent and potential are
                recognized regardless of background, and where leadership
                reflects the rich diversity of our communities.
              </p>

              <p className="mb-6 text-lg">
                By investing in the development of tomorrow's leaders today, we
                are working toward a future where organizations and communities
                thrive under the guidance of skilled, ethical, and visionary
                leadership.
              </p>
            </AnimatedText>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8">
              <AnimatedButton href="/about" variant="outline">
                Learn More About Us
              </AnimatedButton>
            </motion.div>
          </div>

          <VisionImage />
        </div>

        <SectionDivider className="my-16"/>

        {/* Call to Action */}
        <div className="bg-black text-white p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedHeading title="Join Our Mission" subtitle="Become part of a community dedicated to fostering leadership excellence and professional growth." align="center" className="text-white" subtitleClassName="text-white/80" underline/>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/contact" variant="secondary">
                Get Involved
              </AnimatedButton>

              <AnimatedButton href="/events" variant="outline" className="border-white text-white hover:bg-white/10">
                Upcoming Events
              </AnimatedButton>
            </motion.div>
          </div>
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
function MissionPillar({ icon, title, description, index, }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-6 text-primary">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>

      <div className="mt-6">
        <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          Learn more <ArrowRight size={16} className="ml-1"/>
        </a>
      </div>
    </motion.div>);
}
function VisionImage() {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }}>
      <div className="relative">
        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=1000" alt="Our vision" fill className="object-cover"/>
        </div>

        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
          <p className="text-lg font-medium mb-2">
            "Leadership is not about being in charge. It's about taking care of
            those in your charge."
          </p>
          <p className="text-sm text-muted-foreground">— Simon Sinek</p>
        </div>
      </div>
    </motion.div>);
}
