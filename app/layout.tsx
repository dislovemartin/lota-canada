import Announcement from "@/components/announcement"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "LOTA Canada - Leaders of Tomorrow Association",
  description: "Empowering the next generation of business leaders and professionals in Toronto and beyond.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Announcement
            messages={[
              "Join us for our upcoming Leadership Workshop - Register Now!",
              "New mentorship opportunities available - Apply Today!",
              "Visit lotacanada.com for more information about our programs.",
            ]}
          />
          <Header />
          <main className="pt-[calc(56px+40px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
