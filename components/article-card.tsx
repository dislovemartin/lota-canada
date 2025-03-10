import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  category: string
  categoryColor: string
  title: string
  description: string
  readTime: string
  url: string
  date: string
  author: string
  image?: string
  imageAlt?: string
}

export function ArticleCard({
  category,
  categoryColor,
  title,
  description,
  readTime,
  url,
  date,
  author,
  image,
  imageAlt = "",
}: ArticleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt || `Featured image for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <span className={`inline-block ${categoryColor} px-2 py-1 rounded text-xs mb-3`}>{category}</span>
        <h3 className="text-xl font-serif mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{readTime}</span>
          <Link href={url} className="text-primary hover:underline">
            Read More
          </Link>
        </div>
        <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          <span>
            By {author} • Published {date}
          </span>
        </div>
      </div>
    </div>
  )
}

