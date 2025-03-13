import { ProgramCard } from "@/components/program-card";
export const metadata = {
    title: "Leadership Programs | LOTA Canada",
    description: "Discover LOTA's professional development programs designed to help young professionals develop leadership skills, expand their networks, and advance their careers.",
};
export default function ProgramsPage() {
    return (<div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif mb-8">Our Programs</h1>
      <p className="text-lg mb-12 max-w-3xl">
        LOTA offers a variety of programs designed to help young professionals develop leadership skills, expand their
        networks, and advance their careers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProgramCard title="Leadership Development" description="A 12-week program designed to help emerging leaders develop essential leadership skills through workshops, mentoring, and practical exercises." image="/images/programs/workshop.svg" imageAlt="Young professionals participating in a leadership workshop" date="Next cohort: March 2025" url="/programs/leadership-development"/>
        <ProgramCard title="Business Networking" description="Monthly networking events connecting young professionals with established business leaders across various industries." image="/images/programs/community.svg" imageAlt="Professionals networking at a LOTA business event" date="Ongoing monthly events" url="/programs/business-networking"/>
        <ProgramCard title="Professional Mentorship" description="A structured mentorship program pairing emerging professionals with experienced leaders for career guidance and professional development." image="/images/programs/mentorship.svg" imageAlt="Mentor and mentee in a professional meeting" date="Applications open April 2025" url="/programs/professional-mentorship"/>
        <ProgramCard title="Industry Workshops" description="Specialized workshops focusing on industry-specific skills and knowledge, led by experts in their respective fields." image="/images/programs/workshop.svg" imageAlt="Industry expert leading a specialized workshop" date="Various dates throughout 2025" url="/programs/industry-workshops"/>
        <ProgramCard title="Community Leadership" description="Opportunities for young professionals to lead community service projects, developing leadership skills while making a positive impact." image="/images/programs/community.svg" imageAlt="LOTA members leading a community service project" date="Next project: April 2025" url="/programs/community-leadership"/>
        <ProgramCard title="Executive Shadowing" description="A unique opportunity for selected participants to shadow executives in partner organizations, gaining insights into high-level decision-making." image="/images/programs/mentorship.svg" imageAlt="Young professional shadowing an executive in a corporate setting" date="Applications open May 2025" url="/programs/executive-shadowing"/>
      </div>
    </div>);
}
