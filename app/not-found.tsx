"use client"
import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container max-w-md text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-9xl font-bold text-primary">404</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-2xl font-medium mt-4 mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AnimatedButton href="/" variant="primary" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </AnimatedButton>

          <AnimatedButton href="javascript:history.back()" variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}

