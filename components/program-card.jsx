import Image from "next/image";
import Link from "next/link";
export function ProgramCard({ title, description, image, imageAlt = "", date, url }) {
    return (<div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-gray-500 italic mb-4">{date}</p>
        <Link href={url} className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
          Learn More
        </Link>
      </div>
    </div>);
}
