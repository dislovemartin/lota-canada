import type React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  title: string
  testimonial: string
  avatarSrc?: string
  avatarFallback?: string
  rating?: number
}

export function TestimonialCard({
  name,
  title,
  testimonial,
  avatarSrc,
  avatarFallback,
  rating,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        {rating && (
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < rating ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("h-4 w-4", i < rating ? "text-primary fill-primary" : "text-muted-foreground")}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        )}
        <blockquote className="text-lg font-serif italic">&ldquo;{testimonial}&rdquo;</blockquote>
      </CardHeader>
      <CardFooter className="flex items-center gap-4 pt-4 border-t">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{avatarFallback || name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

