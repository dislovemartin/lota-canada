"use client";

import { AnimatedHeading } from "@/components/ui/animated-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { motion, useInView } from "framer-motion";
import { Linkedin, Mail, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// Define the Director type
interface Director {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
  mission?: string;
  expertise?: string;
  education?: string;
  experience?: string;
  affiliations?: string;
}

const directors = [
  {
    id: 1,
    name: "Mo Mokbel",
    position: "CEO",
    bio: "Mo Mokbel is a dynamic and visionary leader at the helm of the Leaders of Tomorrow Association. With a diverse background spanning business management, entrepreneurship, and cryptocurrency, he brings a wealth of experience and expertise to the role. As CEO, Mo is responsible for overseeing all aspects of the association, from strategic planning and partnership development to program management and financial oversight. He is committed to fostering a vibrant community of young professionals, empowering them to thrive in their careers and make a positive impact on society.",
    affiliations: "HODL Digital Services: CEO",
    image: "/images/directors/Mo Mokbel - CEO.svg",
    linkedin: "#",
    email: "mo.mokbel@lotacanada.com",
  },
  {
    id: 2,
    name: "Daniel Kim",
    position: "COO",
    bio: "Daniel is a strategic leader profoundly impacting Toronto's business landscape through his active roles across the non-profit, technology, and real estate sectors. As COO at the Leaders of Tomorrow Association, Daniel is instrumental in shaping initiatives that transform young professionals into future business leaders. His leadership enhances organizational effectiveness and expands the reach of the association's programs, fostering an environment rich in networking, leadership, and skill development.",
    education:
      "Educated at Korea University in Business Administration and complemented by a tenure at the South Korean President's Office",
    experience:
      "Daniel's international experience spans across the globe, having previously contributed to facilitating global dialogues at the G20 Summit, Nuclear Security Summit, and the UN General Assembly.",
    image: "/images/directors/Daniel Kim - COO.svg",
    linkedin: "#",
    email: "daniel.kim@lotacanada.com",
  },
  {
    id: 3,
    name: "Andrew Kim",
    position: "CTO",
    bio: "Andrew Kim, CTO at Connex Telecommunications Inc., brings a rich legacy of IT leadership from his previous roles. At Connex, since February 2020, he previously excelled as the Director of Client Engagement Services, mastering the deployment of complex cloud solutions and enhancing customer service technologies. His tenure at Bell Canada and IBM involved significant IT projects, focusing on integration and system optimization. His deep experience in managing technology strategies and vendor relationships positions him to lead Connex's technological advancements effectively, aligning with the company's strategic goals for growth and innovation.",
    image: "/images/directors/Andrew Kim - CTO.svg",
    linkedin: "#",
    email: "andrew.kim@lotacanada.com",
  },
  {
    id: 4,
    name: "David Chau",
    position: "CFO",
    bio: "David is a seasoned financial expert and accomplished real estate developer in the Greater Toronto Area. With a robust background in both finance and property development, David brings a unique blend of financial acumen and industry knowledge to his role as Chief Financial Officer. David's experience in real estate development in the GTA has equipped him with a deep understanding of the local market dynamics and economic trends. As CFO, he leverages this expertise to ensure the financial health and sustainability of the association.",
    affiliations: "Trulife Developments Inc.: CEO",
    image: "/images/directors/David Chau - CFO.svg",
    linkedin: "#",
    email: "david.chau@lotacanada.com",
  },
  {
    id: 5,
    name: "Stone Yu",
    position: "President",
    bio: "As President of the Leaders of Tomorrow Association, Stone Yu leads the charge in championing the development of the next generation of business leaders and professionals in Toronto and beyond. With a deep understanding of the unique challenges faced by emerging professionals, he steers the organization towards creating a dynamic, inclusive environment that fosters networking, skill development, and leadership among young visionaries from diverse cultural backgrounds.",
    mission:
      "Stone Yu is dedicated to bridging the gaps faced by emerging professionals by facilitating a platform where they can unite to exchange ideas, cultivate relationships, and enhance their skills. By promoting inclusivity and diversity, he empowers members to excel in their respective fields and contribute positively to Canada's multicultural society.",
    affiliations:
      "Lucullus Bakery Group: CEO, Partners International: Director, Markham Richmond Hill Vaughan Chinese Business Association: Director, SEAS foundation: VP & Director",
    image: "/images/directors/Stone Yu - Founding President.svg",
    linkedin: "#",
    email: "stone.yu@lotacanada.com",
  },
  {
    id: 6,
    name: "Charles Yin",
    position: "VP of Strategic Alliances",
    bio: "Charles Yin, Business Development Manager of Sihuan Pharmaceutical Holdings Group Ltd; Investment Analyst of Everest Prestige Capital; Co-founder and Vice President of G.A.N. Golf Club; Graduated double major in Human Biology and Statistics from University of Toronto. As Vice President of Alliances, Charles is a strategic visionary adept at forging symbiotic partnerships to drive mutual growth and innovation.",
    expertise:
      "With a proven track record in cultivating and nurturing alliances across diverse industries, Charles excels in creating synergies that maximize resources and expand market reach. Drawing upon his extensive experience in business development and relationship management, Charles Yin is committed to driving organizational success through strategic alliances, alliances that not only amplify market presence but also foster innovation and drive value for all members involved.",
    image: "/images/directors/Charles Yin - VP of membership.svg",
    linkedin: "#",
    email: "charles.yin@lotacanada.com",
  },
  {
    id: 7,
    name: "Sue Mclay",
    position: "VP of Marketing",
    bio: "Sue is a seasoned realtor and VP at Tyler McLay Realty Group working in the vibrant Toronto / GTA area, bringing a wealth of experience and dedication to every client interaction. A proud graduate of the prestigious Schulich School of Business, Sue combines her academic prowess with a genuine passion for community engagement. With a firm belief in the transformative power of connection, she thrives on fostering meaningful relationships within her community.",
    mission:
      "Beyond facilitating property transactions, her mission extends to guiding individuals towards their entrepreneurial dreams. Armed with versatile skills in marketing, event planning, fundraising, and mentorship, she is committed to empowering others to navigate the dynamic business landscape with confidence.",
    image: "/images/directors/Sue Mclay - VP of Marketing.svg",
    linkedin: "#",
    email: "sue.mclay@lotacanada.com",
  },
  {
    id: 8,
    name: "Robin Nan",
    position: "VP of Memberships",
    bio: "Robin Nan is the Founder and President of G.A.N Golf Club and serves as the Marketing Manager at Everest Prestige. He graduated with a degree in Film and Television from Sheridan College, focusing his career on social platform building and entrepreneurial support. In the realm of platform building, Robin has developed a dynamic and resource-rich social network centered around golf, which has become a vital community hub.",
    expertise:
      "As for entrepreneurial support, Robin specializes in providing bridge financing and private loans to address the funding challenges faced by businesses and entrepreneurs. He maintains strong relationships with a broad spectrum of investors and venture capital funds, offering essential financing pathways and practical fundraising advice.",
    image: "/images/directors/Robin Nan - VP of Alliances.svg",
    linkedin: "#",
    email: "robin.nan@lotacanada.com",
  },
  {
    id: 9,
    name: "Martin Lyu",
    position: "VP of IT and Technology",
    bio: "Martin is a visionary entrepreneur and the founder of Soln AI and dve.ai, fueled by a profound passion for crafting inclusive AI solutions that uplift communities worldwide. His dedication to friendly innovation shines through his altruistic spirit, evident in his global educational initiatives aimed at inspiring others. Resourceful and adaptable, Martin excels at bridging cultural divides, leveraging his fluency in English and Mandarin to foster collaboration.",
    affiliations: "American Association for the Advancement of Science (AAAS)",
    image: "/images/directors/Copy of Martin Lyn - Director.svg",
    linkedin: "#",
    email: "martin.lyu@lotacanada.com",
  },
  {
    id: 10,
    name: "Casper Pan",
    position: "Director",
    bio: "Casper Pan, an emerging entrepreneur with a passion for economics, finance, and commercial real estate investments. Armed with a background in Economics and Finance, Casper has honed his expertise in identifying advantageous opportunities and navigating the complexities of the real estate market. Committed to fostering the success of new and upcoming professionals, Casper is dedicated to building a robust network infrastructure that provides support, guidance, and opportunities for growth.",
    image: "/images/directors/Casper Pan - Director.svg",
    linkedin: "#",
    email: "casper.pan@lotacanada.com",
  },
];

export default function BoardPage() {
  // Sort directors to place President at the top, then maintain original order for others
  const sortedDirectors = [...directors].sort((a, b) => {
    if (a.position === "President") return -1;
    if (b.position === "President") return 1;
    return 0;
  });

  // Filter directors by role type (using the sorted array)
  const executiveTeam = sortedDirectors.filter((d) =>
    ["CEO", "COO", "CTO", "CFO", "President"].includes(d.position)
  );

  const vicePresidents = sortedDirectors.filter((d) => d.position.startsWith("VP"));

  const boardMembers = sortedDirectors.filter((d) => d.position === "Director");

  return (
    <div className="container-wide mx-auto py-16">
      <AnimatedHeading
        title="BOARD OF DIRECTORS"
        subtitle="Meet the leadership team guiding the Leaders of Tomorrow Association."
        align="center"
        underline
      />

      <SectionDivider className="mb-16" />

      {/* All Directors in a single grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {sortedDirectors.map((director, index) => (
          <DirectorCard key={director.id} director={director} index={index} />
        ))}
      </div>
    </div>
  );
}

interface DirectorCardProps {
  director: Director;
  index: number;
}

function DirectorCard({ director, index }: DirectorCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg shadow-md group">
        <Image
          src={director.image || "/placeholder.svg"}
          alt={director.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-4">
            <a
              href={director.linkedin}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
              aria-label={`${director.name}'s LinkedIn`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-primary" />
            </a>
            <a
              href={`mailto:${director.email}`}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
              aria-label={`Email ${director.name}`}
            >
              <Mail className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-center">{director.name}</h2>
      <p className="text-primary font-medium text-center mb-2">
        {director.position}
      </p>

      {/* Bio Modal Trigger */}
      <div className="flex-grow">
        <p className="text-sm text-center text-muted-foreground mb-2 line-clamp-3">
          {director.bio}
        </p>
      </div>

      {/* View Full Bio Button */}
      <a
        href={`#bio-${director.id}`}
        className="mt-auto text-xs font-medium text-primary hover:underline"
      >
        View Full Bio
      </a>

      {/* Bio Modal */}
      <div
        id={`bio-${director.id}`}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300 target:opacity-100 target:pointer-events-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            window.location.hash = "";
          }
        }}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold">{director.name}</h3>
              <p className="text-primary font-medium">{director.position}</p>
            </div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-1">Biography</h4>
              <p className="text-gray-700 dark:text-gray-300">{director.bio}</p>
            </div>

            {director.mission && (
              <div>
                <h4 className="text-lg font-semibold mb-1">Mission</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {director.mission}
                </p>
              </div>
            )}

            {director.expertise && (
              <div>
                <h4 className="text-lg font-semibold mb-1">Expertise</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {director.expertise}
                </p>
              </div>
            )}

            {director.education && (
              <div>
                <h4 className="text-lg font-semibold mb-1">Education</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {director.education}
                </p>
              </div>
            )}

            {director.experience && (
              <div>
                <h4 className="text-lg font-semibold mb-1">Experience</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {director.experience}
                </p>
              </div>
            )}

            {director.affiliations && (
              <div>
                <h4 className="text-lg font-semibold mb-1">Affiliations</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {director.affiliations}
                </p>
              </div>
            )}

            <div className="flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <a
                  href={director.linkedin}
                  className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors duration-200"
                  aria-label={`${director.name}'s LinkedIn`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href={`mailto:${director.email}`}
                  className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors duration-200"
                  aria-label={`Email ${director.name}`}
                >
                  <Mail className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
