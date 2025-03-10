"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sponsorTiers = [
  {
    name: "Platinum",
    description:
      "Our highest level of partnership, offering maximum visibility and engagement opportunities.",
    sponsors: [
      {
        id: 1,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
      {
        id: 2,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
    ],
  },
  {
    name: "Gold",
    description:
      "Strategic partners who play a key role in supporting our mission and programs.",
    sponsors: [
      {
        id: 3,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
      {
        id: 4,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
      {
        id: 5,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
    ],
  },
  {
    name: "Silver",
    description:
      "Valued supporters who contribute to the success of our events and initiatives.",
    sponsors: [
      {
        id: 6,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
      {
        id: 7,
        name: "Sponsor Name",
        logo: "/placeholder.svg?height=200&width=200",
        website: "#",
      },
    ],
  },
];

export default function SponsorsPage() {
  return (
    <div className="container-wide mx-auto py-16">
      <AnimatedHeading
        title="OUR SPONSORS"
        subtitle="LOTA is proud to partner with organizations that share our commitment to fostering professional growth and leadership development."
        align="center"
        underline
      />

      <div className="max-w-4xl mx-auto mt-16">
        {sponsorTiers.map((tier, index) => (
          <SponsorTier key={tier.name} tier={tier} index={index} />
        ))}
      </div>

      <SectionDivider className="my-16" />

      <div className="max-w-2xl mx-auto text-center">
        <AnimatedHeading
          title="Become a Sponsor"
          subtitle="Partner with LOTA to support leadership development and gain visibility with our community of emerging professionals."
          align="center"
          size="md"
        />

        <div className="mt-8">
          <AnimatedButton href="/contact" variant="primary">
            Contact Us
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

interface SponsorTierProps {
  tier: (typeof sponsorTiers)[0];
  index: number;
}

function SponsorTier({ tier, index }: SponsorTierProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16 last:mb-0"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{tier.name} Sponsors</h2>
        <p className="text-muted-foreground">{tier.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {tier.sponsors.map((sponsor, sponsorIndex) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            index={sponsorIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SponsorCardProps {
  sponsor: { id: number; name: string; logo: string; website: string };
  index: number;
}

function SponsorCard({ sponsor, index }: SponsorCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="flex flex-col items-center"
    >
      <a
        href={sponsor.website}
        className="group relative w-40 h-40 mb-4 flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={sponsor.logo || "/placeholder.svg"}
          alt={sponsor.name}
          fill
          className="object-contain p-4"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-lg" />
      </a>
      <h3 className="text-lg font-medium text-center">{sponsor.name}</h3>
    </motion.div>
  );
}
