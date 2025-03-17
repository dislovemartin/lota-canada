import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/diverse-professionals.jpg"
          alt="LOTA Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container-wide relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-wide">
            The Leaders of Tomorrow Association
            <br />
            Fosters Professional Growth
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl">
            Empowering professionals through networking, mentorship, and
            leadership development opportunities across Canada.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors font-medium rounded-md"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white hover:bg-white/10 transition-colors font-medium rounded-md"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
