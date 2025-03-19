import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Download,
  MapPin,
  Quote,
  Share2,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type ProgramParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<ProgramParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Find the program by slug
  const program = programs.find((p) => p.slug === slug) || programs[0];

  return {
    title: `${program.title} | LOTA Canada`,
    description: program.description,
  };
}

export default async function ProgramDetail({
  params,
}: {
  params: Promise<ProgramParams>;
}) {
  const { slug } = await params;
  // In a real application, you would fetch this data from an API or CMS
  const program = programs.find((p) => p.slug === slug) || programs[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.heroImage || "/placeholder.svg?height=1080&width=1920"}
            alt={program.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary/80" />
        </div>

        <div className="container-wide relative z-10 text-white">
          <div className="max-w-2xl relative">
            {/* Decorative border */}
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10" />

            <Link
              href="/programs"
              className="inline-flex items-center text-sm hover:underline mb-6 group"
            >
              <span className="inline-block w-8 h-[1px] bg-white/60 mr-2 group-hover:bg-white transition-colors" />
              <ArrowLeft size={16} className="mr-2" />
              Back to Programs
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 relative">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {program.title}
              </span>
              <span className="absolute -bottom-3 left-0 w-24 h-[2px] bg-gradient-to-r from-primary to-transparent" />
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href={`/programs/${slug}/apply`}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-white to-white/90 text-black hover:from-white/95 hover:to-white/85 transition-all shadow-lg hover:shadow-xl rounded-sm"
              >
                Apply Now
                <span className="ml-2 text-primary">→</span>
              </Link>
              <button className="inline-flex items-center px-6 py-3 border border-white/80 text-white hover:bg-white/10 transition-colors rounded-sm hover:border-white">
                <Share2 size={18} className="mr-2" />
                Share Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-normal inline-block relative">
              Program Highlights
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start group p-6 rounded-sm border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all">
              <div className="mr-5 p-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                <Calendar className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-primary mb-2 font-medium">
                  Duration
                </h3>
                <p className="font-light text-lg">{program.specs.duration}</p>
              </div>
            </div>

            <div className="flex items-start group p-6 rounded-sm border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all">
              <div className="mr-5 p-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                <Users className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-primary mb-2 font-medium">
                  Eligibility
                </h3>
                <p className="font-light text-lg">
                  {program.specs.eligibility}
                </p>
              </div>
            </div>

            <div className="flex items-start group p-6 rounded-sm border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all">
              <div className="mr-5 p-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-primary mb-2 font-medium">
                  Commitment
                </h3>
                <p className="font-light text-lg">{program.specs.commitment}</p>
              </div>
            </div>

            <div className="flex items-start group p-6 rounded-sm border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all">
              <div className="mr-5 p-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-primary mb-2 font-medium">
                  Location
                </h3>
                <p className="font-light text-lg">{program.specs.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-70" />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="inline-block rounded-sm bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Program Details
              </div>
              <h2 className="text-3xl font-normal mb-8 relative inline-block">
                Overview
                <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gradient-to-r from-primary to-transparent" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed">{program.overview}</p>

                <div className="my-12 p-6 border-l-2 border-primary/30 bg-gradient-to-r from-secondary/80 to-transparent rounded-r-sm">
                  <h3 className="text-2xl font-normal mb-4 text-primary/90">
                    Program Structure
                  </h3>
                  <p className="text-lg leading-relaxed">{program.structure}</p>
                </div>

                <div className="my-12 aspect-video relative rounded-sm overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Program in action"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white text-lg font-medium">
                      Experience the {program.title}
                    </div>
                  </div>
                </div>

                <h3 className="mt-12 mb-6 text-2xl font-normal relative inline-block">
                  Learning Outcomes
                  <span className="absolute -bottom-2 left-0 w-12 h-[2px] bg-gradient-to-r from-primary to-transparent" />
                </h3>
                <ul className="space-y-4">
                  {program.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 border border-transparent hover:border-primary/10 hover:bg-secondary/30 transition-all rounded-sm"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-lg">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonials */}
              <div className="mt-20 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                <div className="text-center mb-12">
                  <div className="inline-block p-2 rounded-full bg-primary/5 mb-4">
                    <Quote className="text-primary" size={24} />
                  </div>
                  <h3 className="text-2xl font-normal relative inline-block">
                    Participant Testimonials
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {program.testimonials.map((testimonial, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-sm transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />

                      <div className="relative p-8 border border-primary/10 bg-white shadow-sm rounded-sm z-10">
                        <div className="absolute -top-5 -left-2 text-primary/20 transform -scale-x-100">
                          <Quote size={40} />
                        </div>

                        <blockquote className="text-lg mb-6 leading-relaxed italic text-gray-700">
                          "{testimonial.quote}"
                        </blockquote>

                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-medium mr-4">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="relative p-8 sticky top-24 rounded-sm overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 z-0" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 z-0" />

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 -translate-x-2 -translate-y-2 z-0" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 translate-x-2 translate-y-2 z-0" />

                <div className="relative z-10">
                  <h3 className="text-xl font-normal mb-8 pb-2 border-b border-primary/20 relative">
                    Program Specifications
                    <span className="absolute bottom-[-1px] left-0 w-12 h-[2px] bg-primary" />
                  </h3>

                  <div className="space-y-6">
                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Duration
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.duration}
                      </div>
                    </div>

                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Format
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.format}
                      </div>
                    </div>

                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Eligibility
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.eligibility}
                      </div>
                    </div>

                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Commitment
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.commitment}
                      </div>
                    </div>

                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Upcoming Dates
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.dates}
                      </div>
                    </div>

                    <div className="border-b border-primary/10 pb-4 hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Location
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.location}
                      </div>
                    </div>

                    <div className="hover:bg-white/5 transition-colors p-2 -mx-2">
                      <div className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                        Fee
                      </div>
                      <div className="font-light text-lg">
                        {program.specs.fee}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="pt-8">
                      <Link
                        href={`/programs/${slug}/apply`}
                        className="w-full inline-flex justify-center items-center px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/95 hover:to-primary/85 transition-all shadow-md hover:shadow-lg rounded-sm mb-4"
                      >
                        Apply Now
                        <span className="ml-2">→</span>
                      </Link>

                      <button className="w-full inline-flex justify-center items-center px-6 py-3 border border-primary/80 bg-transparent hover:bg-primary/5 transition-colors rounded-sm hover:border-primary">
                        <Download size={18} className="mr-2 text-primary/80" />
                        Download Program Guide
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary to-secondary/80" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block p-2 rounded-full bg-primary/5 mb-4">
              <ArrowLeft className="rotate-45 text-primary" size={24} />
            </div>
            <h2 className="text-3xl font-normal relative inline-block">
              Application Process
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {program.applicationSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step connector line for desktop */}
                {index < program.applicationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-primary/50 to-primary/10 -translate-x-4 z-0" />
                )}

                <div className="bg-background p-8 rounded-sm border border-primary/10 shadow-md hover:shadow-lg transition-all relative z-10 h-full">
                  <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium shadow-md">
                    {index + 1}
                  </div>

                  <div className="pt-4">
                    <h3 className="text-xl font-normal mb-4 text-primary/90 border-b border-primary/10 pb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-sm bg-gradient-to-br from-white to-secondary/10 shadow-lg border border-primary/5">
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Ready to take the next step in your leadership journey? Our
                application process is designed to be straightforward and
                focused on your potential.
              </p>
              <Link
                href={`/programs/${slug}/apply`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/95 hover:to-primary/85 transition-all shadow-md hover:shadow-lg rounded-sm"
              >
                Begin Your Application
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Curriculum */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-70" />

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block p-2 rounded-full bg-primary/5 mb-4">
                <Calendar className="text-primary" size={24} />
              </div>
              <h2 className="text-3xl font-normal relative inline-block">
                Program Curriculum
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              </h2>
            </div>

            <div className="space-y-16">
              {program.curriculum.map((module, index) => (
                <div key={index} className="relative">
                  {/* Module connector line */}
                  {index < program.curriculum.length - 1 && (
                    <div className="absolute top-full left-[30px] w-[2px] h-16 bg-gradient-to-b from-primary/50 to-primary/10 -translate-y-4 z-0" />
                  )}

                  <div className="border-b border-primary/10 pb-12 relative">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-medium mr-3">
                            {index + 1}
                          </div>
                          <div className="text-sm uppercase tracking-wider text-primary/80 font-medium">
                            Module {index + 1}
                          </div>
                        </div>
                        <h3 className="text-xl font-normal text-primary/90">
                          {module.title}
                        </h3>
                      </div>
                      <div className="md:w-2/3 bg-gradient-to-r from-secondary/50 to-transparent p-6 rounded-sm border-l-2 border-primary/20">
                        <p className="mb-6 leading-relaxed">
                          {module.description}
                        </p>
                        <div className="border-t border-primary/10 pt-4">
                          <div className="text-sm uppercase tracking-wider text-primary/80 mb-3 font-medium">
                            Topics Covered
                          </div>
                          <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            {module.topics.map((topic, i) => (
                              <li
                                key={i}
                                className="flex items-start group p-2 hover:bg-white/30 transition-colors rounded-sm"
                              >
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 text-primary text-xs mr-3 flex-shrink-0 transition-all">
                                  {i + 1}
                                </span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Information */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary to-secondary/90" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* LOTA emblem for section divider */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-medium">
              LOTA
            </div>
          </div>
        </div>

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block rounded-sm bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6 border-l-2 border-primary">
                Sustainability Initiatives
              </div>
              <h2 className="text-3xl font-normal mb-6 relative inline-block">
                Our Commitment to Sustainability
                <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gradient-to-r from-primary to-transparent" />
              </h2>
              <p className="text-lg mb-10 leading-relaxed max-w-xl">
                {program.sustainability.description}
              </p>

              <div className="space-y-8">
                {program.sustainability.initiatives.map((initiative, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 rounded-full flex-shrink-0 mr-6 transition-all shadow-md">
                      <span className="font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-medium mb-3 text-primary/90 group-hover:text-primary transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {initiative.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-square relative rounded-sm overflow-hidden shadow-xl">
              <div className="absolute inset-0 border border-primary/10 rounded-sm z-20" />
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 -translate-x-2 -translate-y-2 z-10" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 translate-x-2 translate-y-2 z-10" />

              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Sustainability initiatives"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="text-white text-lg font-medium">
                  Sustainable Leadership in Action
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-70" />

        {/* LOTA emblem for section divider */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-medium">
              LOTA
            </div>
          </div>
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block p-2 rounded-full bg-primary/5 mb-4">
              <ArrowLeft className="rotate-90 text-primary" size={24} />
            </div>
            <h2 className="text-3xl font-normal relative inline-block">
              Related Programs
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {programs
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((relatedProgram) => (
                <Link
                  key={relatedProgram.slug}
                  href={`/programs/${relatedProgram.slug}`}
                  className="group relative"
                >
                  <div className="relative">
                    {/* Card background and decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-secondary/10 rounded-sm border border-primary/10 shadow-md group-hover:shadow-lg transition-all z-0" />
                    <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-primary/20 -translate-x-1 -translate-y-1 z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/20 translate-x-1 translate-y-1 z-0 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative p-6 z-10">
                      <div className="aspect-[4/3] relative mb-6 overflow-hidden rounded-sm shadow-md group-hover:shadow-lg transition-all">
                        <Image
                          src={
                            relatedProgram.image ||
                            "/placeholder.svg?height=600&width=800"
                          }
                          alt={relatedProgram.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="inline-block rounded-sm bg-primary/10 px-3 py-1 text-xs text-primary mb-3 border-l border-primary/50">
                        Related Program
                      </div>

                      <h3 className="text-xl font-normal mb-3 group-hover:text-primary transition-colors relative inline-block">
                        {relatedProgram.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all" />
                      </h3>

                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {relatedProgram.description}
                      </p>

                      <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center px-6 py-3 border border-primary/80 bg-transparent hover:bg-primary/5 transition-colors rounded-sm hover:border-primary"
            >
              <span className="mr-2">View All Programs</span>
              <ArrowRight size={18} className="text-primary/80" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const programs = [
  {
    title: "Professional Networking Program",
    slug: "networking",
    description:
      "Connect with industry professionals through exclusive networking events, conferences, and social gatherings designed to expand your professional circle.",
    image: "/images/programs/networking-event.jpg",
    heroImage: "/images/hero/diverse-professionals.jpg",
    overview:
      "The Professional Networking Program provides structured opportunities to build meaningful professional relationships across industries. Through a carefully curated calendar of events, participants gain access to Canada's leading professionals, creating connections that drive career growth and business opportunities.",
    structure:
      "The program includes monthly networking mixers in major Canadian cities, quarterly industry-specific roundtables, two annual conferences featuring keynote speakers and panel discussions, and exclusive access to our digital networking platform for continued engagement between events.",
    outcomes: [
      "Expand your professional network with quality connections across industries",
      "Develop refined networking skills and strategies for building meaningful relationships",
      "Gain access to exclusive industry events and conferences",
      "Discover new business opportunities and potential collaborations",
      "Enhance your professional visibility and personal brand in your industry",
    ],
    specs: {
      duration: "Annual membership with ongoing events",
      format: "In-person networking events and digital platform access",
      eligibility: "Professionals at all career stages across industries",
      commitment: "4-6 hours per month (flexible attendance)",
      dates: "Rolling admissions | Events calendar updated quarterly",
      location:
        "Major cities across Canada (Toronto, Vancouver, Montreal, Calgary, Ottawa)",
      fee: "$750 annual membership (corporate rates available)",
    },
    applicationSteps: [
      {
        title: "Apply for Membership",
        description:
          "Complete the online membership application with your professional profile, industry focus, and networking objectives.",
      },
      {
        title: "Membership Review",
        description:
          "Our membership committee reviews applications to ensure a diverse and complementary mix of professionals across industries and experience levels.",
      },
      {
        title: "Payment & Activation",
        description:
          "Upon approval, complete your membership payment to activate your account and gain immediate access to the digital networking platform.",
      },
      {
        title: "Orientation & Profile Setup",
        description:
          "Attend a virtual orientation session and complete your enhanced networking profile with our guidance to maximize your visibility.",
      },
    ],
    curriculum: [
      {
        title: "Strategic Networking",
        description:
          "Master the art of purposeful networking that creates genuine connections and mutual value.",
        topics: [
          "Identifying high-value networking opportunities",
          "Creating memorable first impressions",
          "Developing authentic relationship-building strategies",
          "Following up effectively to nurture new connections",
        ],
      },
      {
        title: "Professional Presence",
        description:
          "Develop a compelling professional presence that enhances your credibility and influence in networking contexts.",
        topics: [
          "Personal branding for industry positioning",
          "Executive presence and confidence in professional settings",
          "Digital presence optimization across platforms",
          "Storytelling techniques for memorable introductions",
        ],
      },
      {
        title: "Relationship Management",
        description:
          "Learn systematic approaches to nurturing and leveraging your professional network for mutual benefit.",
        topics: [
          "CRM strategies for professional relationships",
          "Creating value exchanges in your network",
          "Maintaining connections across geographic distances",
          "Reactivating dormant professional relationships",
        ],
      },
      {
        title: "Strategic Connections",
        description:
          "Develop advanced strategies for connecting with high-value contacts and building strategic alliances.",
        topics: [
          "Accessing decision-makers and industry leaders",
          "Building mutually beneficial strategic partnerships",
          "Cross-industry networking for innovation",
          "Leveraging your network for career advancement",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "LOTA's Professional Networking Program has been transformative for my career. I've made connections with industry leaders that led directly to new business partnerships and a significant promotion within my company.",
        name: "David Chen",
        title: "VP of Business Development, Maple Innovations",
      },
      {
        quote:
          "The quality of connections I've made through this program is exceptional. Unlike typical networking events, LOTA creates an environment where meaningful relationships develop naturally. I've gained mentors, collaborators, and friends who have been instrumental in my professional growth.",
        name: "Sarah Patel",
        title: "Founder & CEO, EcoSolutions Canada",
      },
    ],
    sustainability: {
      description:
        "Our Professional Networking Program is designed with environmental and social responsibility at its core. We implement sustainable practices throughout our events and digital platforms while fostering connections that drive positive impact.",
      initiatives: [
        {
          title: "Green Event Certification",
          description:
            "All our networking events meet Green Meeting Industry Council standards, with zero single-use plastics, locally-sourced catering, and comprehensive waste diversion programs achieving 95% landfill diversion.",
        },
        {
          title: "Virtual Networking Options",
          description:
            "Our hybrid event model and digital platform reduce travel emissions by an estimated 40% while maintaining high-quality networking experiences for remote participants.",
        },
        {
          title: "Impact Networking",
          description:
            "Quarterly events specifically connect professionals working in sustainability and social impact sectors, facilitating partnerships that have launched 15+ collaborative projects addressing environmental and social challenges.",
        },
      ],
    },
  },
  {
    title: "Leadership Workshop Series",
    slug: "leadership-workshops",
    description:
      "Develop essential leadership skills through hands-on workshops focused on practical experiences and real-world application.",
    image: "/images/programs/leadership-workshop.jpg",
    heroImage: "/images/hero/leadership-workshop-hero.jpg",
    overview:
      "The Leadership Workshop Series is LOTA's flagship professional development program focused on practical skill-building through experiential learning. Each intensive workshop puts theory into immediate practice, with participants working through real business scenarios under the guidance of industry veterans and leadership experts.",
    structure:
      "The series consists of eight specialized workshops that build progressively on leadership competencies. Each workshop includes pre-work case studies, a full-day immersive session with role-playing and simulation exercises, and a 30-day action plan with executive coaching support for implementation in your workplace.",
    outcomes: [
      "Acquire practical leadership skills that can be immediately applied in your professional context",
      "Learn from industry experts with extensive experience in leadership development",
      "Practice new techniques in a supportive, collaborative environment",
      "Build a toolkit of leadership strategies for different situations and challenges",
      "Connect with professionals from diverse industries and expand your network",
    ],
    specs: {
      duration: "1 day per workshop (6 workshops total)",
      format: "In-person workshops",
      eligibility: "Open to professionals at all career stages",
      commitment: "8 hours per workshop, plus optional pre and post-work",
      dates: "Monthly workshops beginning February 2025",
      location: "Vancouver Convention Centre",
      fee: "$350 per workshop or $1,800 for the full series",
    },
    applicationSteps: [
      {
        title: "Select Workshops",
        description:
          "Browse the workshop catalog and select the sessions that align with your development goals and schedule.",
      },
      {
        title: "Register Online",
        description:
          "Complete the registration form and payment process for your selected workshops.",
      },
      {
        title: "Confirmation",
        description:
          "Receive a confirmation email with details about your workshop(s), including pre-work materials and logistics.",
      },
      {
        title: "Preparation",
        description:
          "Complete any pre-work assignments to maximize your learning experience during the workshop.",
      },
    ],
    curriculum: [
      {
        title: "Adaptive Leadership",
        description:
          "Learn to navigate complex challenges and lead effectively through uncertainty and change.",
        topics: [
          "Distinguishing technical and adaptive challenges",
          "Managing resistance to change",
          "Creating psychological safety during transitions",
          "Building organizational resilience",
        ],
      },
      {
        title: "Emotional Intelligence",
        description:
          "Develop your ability to recognize, understand, and manage emotions in yourself and others.",
        topics: [
          "Self-awareness and emotional regulation",
          "Empathy and social awareness",
          "Relationship management in professional contexts",
          "Using emotional intelligence in decision-making",
        ],
      },
      {
        title: "Strategic Communication",
        description:
          "Master communication techniques that inspire, influence, and drive action.",
        topics: [
          "Crafting compelling narratives",
          "Tailoring messages for different stakeholders",
          "Non-verbal communication and executive presence",
          "Crisis communication strategies",
        ],
      },
      {
        title: "Inclusive Leadership",
        description:
          "Learn to create and lead diverse teams that leverage varied perspectives for innovation and growth.",
        topics: [
          "Understanding unconscious bias",
          "Creating inclusive team environments",
          "Leveraging diversity for enhanced performance",
          "Developing equitable systems and processes",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "The Adaptive Leadership workshop gave me practical tools to navigate the complex challenges my team was facing. I've applied the frameworks we learned and seen immediate improvements in how we approach change.",
        name: "Jordan Taylor",
        title: "Senior Manager, Financial Services",
      },
      {
        quote:
          "The Emotional Intelligence workshop transformed my approach to leadership. I now have a much better understanding of how emotions impact workplace dynamics and how to create a positive team environment.",
        name: "Olivia Rodriguez",
        title: "Team Lead, Healthcare Innovation",
      },
    ],
    sustainability: {
      description:
        "Our Leadership Workshop Series is designed with sustainability in mind, minimizing environmental impact while creating lasting value for participants and their organizations.",
      initiatives: [
        {
          title: "Zero-Waste Events",
          description:
            "All workshops follow zero-waste principles, with reusable materials, digital resources, and composting/recycling stations, diverting 98% of waste from landfills.",
        },
        {
          title: "Local Sourcing",
          description:
            "Workshop materials, catering, and services are sourced from local, sustainable businesses, reducing carbon footprint and supporting the local economy.",
        },
        {
          title: "Sustainability Integration",
          description:
            "Environmental and social responsibility principles are integrated into all workshop content, helping participants apply sustainable practices in their leadership roles.",
        },
      ],
    },
  },
  {
    title: "Mentorship Program",
    slug: "mentorship",
    description:
      "Receive personalized guidance from industry professionals who share their expertise and insights to accelerate your career development.",
    image: "/images/programs/mentorship-program.jpg",
    heroImage: "/images/hero/mentorship-hero.jpg",
    overview:
      "The Mentorship Program creates powerful one-on-one relationships between emerging professionals and established industry leaders. Our structured approach ensures mentees receive targeted guidance on their specific career goals while mentors gain fresh perspectives and develop their leadership capabilities.",
    structure:
      "The program runs for eight months and includes a comprehensive matching process, bi-weekly mentoring sessions, monthly peer learning circles, quarterly skills workshops, and ongoing support from our program coordinators. Each mentorship pair establishes clear goals and develops a personalized development plan.",
    outcomes: [
      "Receive personalized guidance tailored to your specific career goals and challenges",
      "Gain insider knowledge and wisdom from experienced industry professionals",
      "Develop critical professional skills through targeted feedback and coaching",
      "Navigate career transitions and advancement opportunities with expert support",
      "Build a lasting professional relationship with an established industry leader",
    ],
    specs: {
      duration: "8 months",
      format: "One-on-one mentoring with supporting group activities",
      eligibility:
        "Early to mid-career professionals with 1-7 years of experience",
      commitment: "6-8 hours per month",
      dates: "Programs begin bi-annually (February and August)",
      location: "Virtual and in-person options available across Canada",
      fee: "$450 (scholarships available for qualified applicants)",
    },
    applicationSteps: [
      {
        title: "Submit Application",
        description:
          "Complete the detailed application form outlining your career background, goals, development areas, and what you're seeking in a mentor.",
      },
      {
        title: "Assessment & Matching",
        description:
          "Participate in our comprehensive assessment process to identify your learning style, career aspirations, and mentorship needs for optimal mentor matching.",
      },
      {
        title: "Mentor Introduction",
        description:
          "Once matched, participate in a facilitated introduction session with your potential mentor to ensure compatibility and establish initial rapport.",
      },
      {
        title: "Goal Setting & Agreement",
        description:
          "Work with your mentor and program coordinator to establish clear goals, expectations, and a structured development plan for your mentorship journey.",
      },
    ],
    curriculum: [
      {
        title: "Career Development Planning",
        description:
          "Create a comprehensive career development strategy with guidance from your mentor to achieve your professional goals.",
        topics: [
          "Career trajectory mapping and milestone planning",
          "Skill gap analysis and development planning",
          "Industry trend analysis and opportunity identification",
          "Personal brand development and positioning",
        ],
      },
      {
        title: "Leadership Development",
        description:
          "Develop essential leadership capabilities through personalized guidance and practical application.",
        topics: [
          "Leadership style assessment and refinement",
          "Influence and stakeholder management",
          "Decision-making frameworks for complex situations",
          "Executive presence and communication",
        ],
      },
      {
        title: "Strategic Networking",
        description:
          "Learn to build and leverage professional relationships that advance your career objectives.",
        topics: [
          "Network mapping and relationship development",
          "Industry-specific networking strategies",
          "Mentorship circle development",
          "Building mutually beneficial professional relationships",
        ],
      },
      {
        title: "Professional Challenges",
        description:
          "Develop strategies to navigate complex workplace challenges with guidance from experienced mentors.",
        topics: [
          "Workplace conflict resolution techniques",
          "Navigating organizational politics effectively",
          "Work-life integration strategies",
          "Career transition and advancement planning",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "The Mentorship Program connected me with an executive who fundamentally changed my career trajectory. My mentor provided insights that helped me navigate complex organizational challenges and identify growth opportunities I hadn't considered. The structured approach ensured our relationship remained focused and productive.",
        name: "Thomas Wilson",
        title: "Director of Operations, National Bank Financial",
      },
      {
        quote:
          "As someone transitioning to a leadership role, the guidance I received through LOTA's Mentorship Program was invaluable. My mentor shared practical strategies that helped me develop my management style and build confidence in my decision-making. The program's framework ensured I received personalized support while developing practical leadership skills.",
        name: "Aisha Rahman",
        title: "Team Lead, Healthcare Innovation Lab",
      },
    ],
    sustainability: {
      description:
        "Our Mentorship Program integrates sustainability principles throughout its design and implementation, creating lasting positive impact for participants while minimizing environmental footprint.",
      initiatives: [
        {
          title: "Digital Mentorship Platform",
          description:
            "Our custom digital platform facilitates virtual mentoring sessions, reducing travel-related emissions by approximately 60% while maintaining high-quality mentorship experiences through video conferencing and collaborative tools.",
        },
        {
          title: "Sustainable Leadership Development",
          description:
            "We integrate environmental and social responsibility principles into our mentorship curriculum, empowering the next generation of leaders to implement sustainable practices in their organizations.",
        },
        {
          title: "Mentorship Impact Measurement",
          description:
            "Our comprehensive impact assessment framework tracks not only professional development outcomes but also how mentees implement sustainable practices in their organizations, creating a multiplier effect.",
        },
      ],
    },
  },
];
