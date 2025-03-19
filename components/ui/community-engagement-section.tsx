"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AnimatedButton } from "./animated-button";
import { AnimatedHeading } from "./animated-heading";

// Custom icon components to replace lucide-react icons
const BookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

interface CommunityEngagementSectionProps {
  className?: string;
}

export function CommunityEngagementSection({
  className,
}: CommunityEngagementSectionProps) {
  const [activeTab, setActiveTab] = useState("education");

  const tabs = [
    {
      id: "education",
      label: "Education",
      icon: <BookIcon className="w-5 h-5" />,
      content:
        "Our education initiatives focus on providing resources, mentorship, and learning opportunities to underserved communities. We partner with schools and educational institutions to develop programs that foster leadership skills and professional growth.",
      image: "/images/programs/community.svg",
    },
    {
      id: "environment",
      label: "Environment",
      icon: <GlobeIcon className="w-5 h-5" />,
      content:
        "LOTA's environmental programs engage members in sustainability projects, conservation efforts, and awareness campaigns. We believe that responsible leadership includes environmental stewardship and sustainable practices.",
      image: "/images/programs/community-environment.jpg",
    },
    {
      id: "health",
      label: "Health & Wellness",
      icon: <HeartIcon className="w-5 h-5" />,
      content:
        "Our health and wellness initiatives support community health programs, mental health awareness, and wellness education. We organize events and campaigns that promote holistic well-being and healthy lifestyles.",
      image: "/images/programs/community-health.jpg",
    },
    {
      id: "innovation",
      label: "Innovation",
      icon: <LightbulbIcon className="w-5 h-5" />,
      content:
        "LOTA's innovation programs encourage creative problem-solving and entrepreneurial thinking. We provide resources and support for members to develop innovative solutions to community challenges.",
      image: "/images/programs/community-innovation.jpg",
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section
      className={cn(
        "py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950",
        className
      )}
    >
      <div className="container-wide">
        <AnimatedHeading
          title="Community Engagement"
          subtitle="Making a positive impact through volunteer opportunities and community initiatives while building valuable leadership skills."
          underline
          split
          highlight
          animated={true}
          variant="gradient"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column */}
          <motion.div
            className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={activeTabData.image}
              alt={`LOTA ${activeTabData.label} Initiative`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider mb-2">
                  {activeTabData.icon}
                  <span>{activeTabData.label}</span>
                </div>
                <div className="text-2xl font-bold">Community Impact</div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-black text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg flex-grow"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                {activeTabData.icon}
                {activeTabData.label} Initiatives
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                {activeTabData.content}
              </p>

              <div className="mt-auto">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                  Impact Statistics
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      12+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Community Partners
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      1,200+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Volunteer Hours
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      8
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Active Projects
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      95%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Participant Satisfaction
                    </div>
                  </div>
                </div>

                <AnimatedButton
                  href="/programs/community-engagement"
                  variant="primary"
                  size="lg"
                >
                  Get Involved
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
