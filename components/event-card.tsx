import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  title: string
  description: string
  category: string
  date: string
  time: string
  location: string
  registrationUrl: string
  image?: string
  imageAlt?: string
}

export function EventCard({
  title,
  description,
  category,
  date,
  time,
  location,
  registrationUrl,
  image,
  imageAlt = "",
}: EventCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt || `${title} event`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif mb-1">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{category}</span>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <strong>Date:</strong> {date}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Time:</strong> {time}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Location:</strong> {location}
          </p>
        </div>
        <Link
          href={registrationUrl}
          className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Register Now
        </Link>
      </div>
    </div>
  )
}

