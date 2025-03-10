import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | LOTA Canada",
  description:
    "Learn about the Leaders of Tomorrow Association, our mission, leadership team, and how we're fostering the next generation of business leaders in Toronto and beyond.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

